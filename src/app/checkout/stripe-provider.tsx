"use client"

import { type ReactNode, useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// This would be your publishable key from your Stripe dashboard
// In a real app, this would be an environment variable
const stripePromise = loadStripe("pk_test_your_publishable_key")

interface StripeProviderProps {
  children: ReactNode
}

export function StripeProvider({ children }: StripeProviderProps) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Create a PaymentIntent as soon as the page loads
    // In a real implementation, this would be a server-side API call
    // to create a PaymentIntent with the order amount
    async function createPaymentIntent() {
      try {
        // This would be a fetch to your backend API in a real implementation
        // const response = await fetch("/api/create-payment-intent", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ amount: 1000 }), // amount in cents
        // });
        // const data = await response.json();
        // setClientSecret(data.clientSecret);

        // For demo purposes, we're setting a mock client secret
        setClientSecret("mock_client_secret")
      } catch (error) {
        console.error("Error creating payment intent:", error)
      }
    }

    createPaymentIntent()
  }, [])

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as "stripe", // Ensure the theme matches the expected literal type
    },
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          {children}
        </Elements>
      )}
      {!clientSecret && (
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
    </>
  )
}

