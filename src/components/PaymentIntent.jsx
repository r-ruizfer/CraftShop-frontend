import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import service from "../services/config";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Make sure you add your publishable API key to the .env.local
// !IMPORTANT. If using VITE, make sure you use the correct variable naming and usage (import.meta.env.VITE_VARIABLE_NAME)

function PaymentIntent({ productDetails }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect()
  }, []);
  
  const handleUseEffect = async () => {
    const response = await service.post(`/payment/create-payment-intent`, productDetails)
    setClientSecret(response.data.clientSecret)
  }

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="app">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;