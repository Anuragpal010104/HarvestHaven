"use client"

import { type ReactNode, useState, useEffect, useMemo } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_your_publishable_key")

interface StripeProviderProps {
  children: ReactNode
}

export function StripeProvider({ children }: StripeProviderProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        // Replace this with an actual API call in production
        // const response = await fetch("/api/create-payment-intent", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ amount: 1000 }), // amount in cents
        // });
        // const data = await response.json();
        // setClientSecret(data.clientSecret);

        setClientSecret("mock_client_secret") // Mocked for demo
      } catch (error) {
        console.error("Error creating payment intent:", error)
      }
    }

    createPaymentIntent()
  }, [])

  const options: StripeElementsOptions | undefined = useMemo(() => {
    return clientSecret
      ? {
          clientSecret,
          appearance: {
            theme: "stripe" as const, // ✅ Correct usage of `as const`
          },
        }
      : undefined
  }, [clientSecret])

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  ) : (
    <div
      className="flex items-center justify-center p-6"
      aria-live="polite"
      role="status"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  )
}
