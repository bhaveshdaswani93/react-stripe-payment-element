const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: 'pk_test_51MtSZpBFNANcjAh5TLuOoq8BVzEammEEeVvT9rtbKtsZPu7C1s0duqTiVcuxFFY364btF9nVDBj57HMDH1mRED9H00bKAgdYP1',
  });
});

app.post("/create-token", async (req, res) => {
  const stripe = require('stripe')('sk_test_51MtSZpBFNANcjAh5Trrd4oxVxC1zz6oWZcT6tAVGsTh9qvicAbaiwc2yvuiQfICAY6bHuiX6fhMJ9nE7wyzsgXea00exjH2PyP');

  const token = await stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 6,
      exp_year: 2024,
      cvc: '314',
    },
  });

  res.send({
    token,
  });
})

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);
    const clientSecret = "pi_3NBFdpBFNANcjAh51wwhgZMe_secret_o9yfXLTlEOohWzU3QTnPndIkG";

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: clientSecret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
