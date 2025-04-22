"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import the Link component

export default function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setStatus(searchParams.get("status"));
    setOrderId(searchParams.get("orderId"));
  }, [searchParams]);

  if (!status) {
    return <div>Loading payment status...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {status === "success" ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="mb-2">Thank you for your purchase.</p>
          {orderId && <p className="mb-4">Order ID: <span className="font-mono">{orderId}</span></p>}
          <Button asChild>
            <Link href="/dashboard/orders">View My Orders</Link> {/* Use Link component */}
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h1>
          <p className="mb-4">There was a problem processing your payment. Please try again.</p>
          <Button asChild>
            <Link href="/cart">Return to Cart</Link> {/* Use Link component */}
          </Button>
        </>
      )}
    </div>
  );
}