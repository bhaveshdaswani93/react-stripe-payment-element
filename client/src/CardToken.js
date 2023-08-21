import React, { useState } from "react";
import { useStripe, CardElement } from "@stripe/react-stripe-js";

const STRIPE_PUBLIC_KEY = "your_stripe_public_key";

const CardToken = () => {
  const [cardElement, setCardElement] = useState(null);
  const [token, setToken] = useState(null);

  const stripe = useStripe(STRIPE_PUBLIC_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = await stripe.createToken(cardElement);
    setToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        stripe={stripe}
        style={{ width: "100%" }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CardToken;