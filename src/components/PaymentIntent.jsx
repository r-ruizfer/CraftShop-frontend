import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import service from "../services/config";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

function PaymentIntent({ productDetails }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    const response = await service.post(`/payment/create-payment-intent`, {
      products: productDetails,
    });
    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
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
