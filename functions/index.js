const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
setGlobalOptions({})
app.use(cors({ origin: true }));
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// Payment creation endpoint
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total); // Read 'total' from the query parameter

  if (total && total > 0) {
    try {
      // Create payment intent with amount in cents
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Amount should be in the smallest currency unit (e.g., cents for USD)
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret, // Send the client secret back to the frontend
      });
    } catch (error) {
      logger.error("Error creating payment intent:", error);
      res.status(500).json({
        message: "Error creating payment intent.",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "Total must be greater than 0",
    });
  }
});

exports.api = onRequest(app);
