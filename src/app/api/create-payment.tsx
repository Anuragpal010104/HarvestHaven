import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In a real implementation, this would be an environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(request: Request) {
  try {
    const { amount, currency = "usd", metadata = {} } = await request.json()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      // In a real implementation, you might want to capture payment data
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}

