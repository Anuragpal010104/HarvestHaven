"use client";

import { Suspense } from "react";
import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment status...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}

