import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/FireBase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // 1. Call backend to get the client secret using the total in the request body
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100 }`, // Send total as JSON in the request body
      });
      const clientSecret = response.data.clientSecret; // Correct the key name here

      // 2. Client-side confirmation of the payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // 3. After confirmation, save order to Firestore and clear the basket
      if (!user?.uid) {
        throw new Error("User is not authenticated or UID is missing.");
      }

      const orderData = {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      };

      // Firestore v9 write
      const userOrdersRef = collection(db, "user", user.uid, "orders");
      const orderDocRef = doc(userOrdersRef, paymentIntent.id);
      await setDoc(orderDocRef, orderData);

      // 4. Clear the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setCardError("An error occurred while processing your payment.");
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Matthew</div>
            <div>Charlotte, NC</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.product_list}>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Processing...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
