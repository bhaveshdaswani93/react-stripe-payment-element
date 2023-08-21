import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import SaveCardForm from './StripeCardToken';

const YOUR_STRIPE_PUBLIC_KEY = "pk_test_51MtSZpBFNANcjAh5TLuOoq8BVzEammEEeVvT9rtbKtsZPu7C1s0duqTiVcuxFFY364btF9nVDBj57HMDH1mRED9H00bKAgdYP1"

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

function PaymentCard() {
return (
  <Elements stripe={stripePromise}>
      <SaveCardForm />
</Elements>
)
}

export default PaymentCard;
