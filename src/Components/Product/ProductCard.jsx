import React, { useContext } from "react";
import { Rating } from "@mui/material";
import classes from "./product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { DataContext } from "../DataProvider/DataProvider";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function ProductCard({
  product,
  flex = false,
  renderDesc = false,
  renderAdd = true,
}) {
  const { image, title, id, rating = {}, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const onAddToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "500px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate || 0} precision={0.1} readOnly />
          <small>({rating.count || 0} reviews)</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={onAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
