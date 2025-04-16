// Move the file to `src/app/api/create-payment/page.tsx` to align with Next.js App Router conventions.
// Update the file structure to ensure the API route is accessible at `/api/create-payment`.

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { amount, currency = "usd", metadata = {} } = body;

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (typeof currency !== "string") {
      return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 });
  }
}

