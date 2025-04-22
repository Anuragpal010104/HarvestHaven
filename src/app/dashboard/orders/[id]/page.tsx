"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserLayout } from "@/app/dashboard/user-layout"
import { ArrowLeft, ChevronRight, Package, RefreshCw, Truck } from "lucide-react"

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [orderId, setOrderId] = useState<string | null>(null);

  // Mock order data
  const [order] = useState({
    id: orderId,
    date: "May 15, 2023",
    status: "Delivered",
    total: 78.99,
    subtotal: 69.99,
    shipping: 5.0,
    tax: 4.0,
    paymentMethod: "Visa ending in 4242",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Organic Avocados",
        description: "Fresh, ripe avocados grown without pesticides",
        price: 4.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Raw Honey",
        description: "Pure, unfiltered honey from organic beekeepers",
        price: 8.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 7,
        name: "Organic Blueberries",
        description: "Sweet, antioxidant-rich berries",
        price: 5.99,
        quantity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 15,
        name: "Organic Whole Milk",
        description: "Creamy, nutrient-rich milk from grass-fed cows",
        price: 4.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 16,
        name: "Free-Range Eggs",
        description: "Farm-fresh eggs from free-range hens",
        price: 5.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "May 15, 2023",
        time: "10:30 AM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Payment Confirmed",
        date: "May 15, 2023",
        time: "10:35 AM",
        description: "Payment has been successfully processed.",
      },
      {
        status: "Order Processed",
        date: "May 15, 2023",
        time: "2:45 PM",
        description: "Your order has been prepared and is ready for shipping.",
      },
      {
        status: "Shipped",
        date: "May 16, 2023",
        time: "9:20 AM",
        description: "Your order has been shipped and is on its way to you.",
      },
      {
        status: "Delivered",
        date: "May 17, 2023",
        time: "2:15 PM",
        description: "Your order has been delivered successfully.",
      },
    ],
  });

  useEffect(() => {
    params.then((resolvedParams) => {
      setOrderId(resolvedParams.id);
    });
  }, [params]);

  if (!orderId) {
    return <div>Loading...</div>;
  }

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/dashboard/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h2 className="text-2xl font-bold">Order #{order.id}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reorder
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Placed on {order.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Order Status */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Order Status</h3>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                        {order.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#tracking">
                        View Tracking
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-px bg-border ml-3" />
                    <ol className="space-y-6">
                      {order.timeline.map((event, index) => (
                        <li key={index} className="relative pl-8">
                          <div
                            className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border ${
                              index === order.timeline.length - 1
                                ? "bg-green-100 border-green-600"
                                : "bg-muted border-border"
                            } flex items-center justify-center z-10`}
                          >
                            {index === order.timeline.length - 1 && (
                              <div className="h-2 w-2 rounded-full bg-green-600" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h4 className="font-medium">{event.status}</h4>
                              <span className="ml-auto text-sm text-muted-foreground">
                                {event.date}, {event.time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                          <div className="mt-1 flex items-center text-sm">
                            <span>Qty: {item.quantity}</span>
                            <span className="mx-2">•</span>
                            <span>${item.price.toFixed(2)} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{order.paymentMethod}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Return Items
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="mr-2 h-4 w-4" />
                  Track Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

