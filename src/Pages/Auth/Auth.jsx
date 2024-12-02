import React, { useContext, useState } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/FireBase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // FIXED: Properly called `useNavigate()`
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });

  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name; // Signin or Signup

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [action]: true }));
      let userInfo;

      if (action === "signin") {
        // Handle Sign-In
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Handle Sign-Up
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      }

      dispatch({
        type: "SET_USER",
        user: userInfo.user,
      });

      navigate("/"); // Navigate to the home page after success
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <section className={classes.signin}>
      <Link to="/">
        <img
          src="https://www.allaboutlean.com/wp-content/uploads/2019/10/Amazon-Logo.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.signin_container}>
        <h1>Sign in</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.signin_button}
            disabled={loading.signIn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign in"}
          </button>
        </form>

        <p>
          By signing in, you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our Privacy Notice, Cookies Notice, and
          Interest-Based Ads Notice.
        </p>

        <button
          type="button"
          name="signup"
          onClick={authHandler}
          className={classes.signin_registerbutton}
          disabled={loading.signUP}
        >
          {loading.signUP ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
