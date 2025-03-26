"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, CreditCard, Loader2, Lock, MapPin, ShoppingBag } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState("shipping")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    saveAddress: true,
  })

  const cartItems = [
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
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 9.99 : shippingMethod === "same-day" ? 14.99 : 5.99
  const discount = discountApplied ? 5.0 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal + shipping + tax - discount

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode ||
      !shippingInfo.country
    ) {
      return
    }
    setActiveStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setActiveStep("confirmation")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "organic10") {
      setDiscountApplied(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Checkout</h1>
        <p className="max-w-[600px] text-gray-500">Complete your purchase securely</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeStep} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shipping" disabled={activeStep !== "shipping"}>
                Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={activeStep !== "payment" && activeStep !== "confirmation"}>
                Payment
              </TabsTrigger>
              <TabsTrigger value="confirmation" disabled={activeStep !== "confirmation"}>
                Confirmation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        name="apartment"
                        value={shippingInfo.apartment}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={shippingInfo.country}
                          onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        name="saveAddress"
                        checked={shippingInfo.saveAddress}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <Label htmlFor="saveAddress" className="text-sm font-normal">
                        Save this address for future orders
                      </Label>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Label>Shipping Method *</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-2">
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal">
                              Standard Shipping (3-5 business days)
                            </Label>
                          </div>
                          <div className="font-medium">$5.99</div>
                        </div>
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-normal">
                              Express Shipping (1-2 business days)
                            </Label>
                          </div>
                          <div className="font-medium">$9.99</div>
                        </div>
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="same-day" id="same-day" />
                            <Label htmlFor="same-day" className="font-normal">
                              Same Day Delivery (select areas only)
                            </Label>
                          </div>
                          <div className="font-medium">$14.99</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" asChild>
                        <Link href="/cart">Back to Cart</Link>
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Choose how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="font-normal">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="font-normal">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-4">
                        <div className="rounded-md border p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">Secure Card Payment</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Lock className="h-3 w-3 mr-1" />
                              Encrypted
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="bg-white" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" className="bg-white" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" className="bg-white" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="nameOnCard">Name on Card</Label>
                              <Input id="nameOnCard" placeholder="John Doe" className="bg-white" />
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 mt-4">
                            Your card information is encrypted and never stored on our servers. We use Stripe for secure
                            payment processing.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">Billing Address</Label>
                          <Select defaultValue="same">
                            <SelectTrigger id="billingAddress">
                              <SelectValue placeholder="Select billing address" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="same">Same as shipping address</SelectItem>
                              <SelectItem value="different">Use a different billing address</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="rounded-md border p-4 bg-gray-50 mt-4">
                        <p className="text-sm text-gray-500">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" type="button" onClick={() => setActiveStep("shipping")}>
                        Back to Shipping
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Pay $${total.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="confirmation" className="space-y-4">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
                  <CardDescription>
                    Thank you for your order. We&apos;ve received your payment and will process your order shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Order Number:</span> ORD-
                        {Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")}
                      </p>
                      <p>
                        <span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        {paymentMethod === "card" ? "Credit Card" : "PayPal"}
                      </p>
                      <p>
                        <span className="font-medium">Total Amount:</span> ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>
                        {shippingInfo.address}
                        {shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}
                      </p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p>{shippingInfo.country === "US" ? "United States" : shippingInfo.country}</p>
                      <p>{shippingInfo.email}</p>
                      {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-sm">
                      {shippingMethod === "standard"
                        ? "Standard Shipping (3-5 business days)"
                        : shippingMethod === "express"
                          ? "Express Shipping (1-2 business days)"
                          : "Same Day Delivery"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Order Summary</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{item.name}</h4>
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
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/")}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="discountCode">Discount Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="discountCode"
                      placeholder="Enter code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      disabled={discountApplied}
                    />
                    <Button onClick={handleApplyDiscount} disabled={!discountCode || discountApplied} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discountApplied && <p className="text-xs text-green-600">Discount code applied successfully!</p>}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 items-center text-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Checkout
                </div>
                <div className="flex gap-2">
                  <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
                  <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=Amex"
                    alt="American Express"
                    width={40}
                    height={30}
                  />
                  <Image src="/placeholder.svg?height=30&width=40&text=PayPal" alt="PayPal" width={40} height={30} />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}