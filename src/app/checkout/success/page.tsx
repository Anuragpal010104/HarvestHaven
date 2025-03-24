// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle2, Loader2, ShoppingBag } from "lucide-react"

// export default function CheckoutSuccessPage() {
//   const searchParams = useSearchParams()
//   const [isLoading, setIsLoading] = useState(true)
//   const [paymentStatus, setPaymentStatus] = useState("processing")
//   const [orderDetails, setOrderDetails] = useState(null)

//   // Get the payment_intent and payment_intent_client_secret from the URL
//   const paymentIntentId = searchParams.get("payment_intent")

//   useEffect(() => {
//     async function getPaymentStatus() {
//       try {
//         // In a real implementation, you would make an API call to your backend
//         // to verify the payment status using the payment intent ID
//         // const response = await fetch(`/api/payment-status?payment_intent=${paymentIntentId}`)
//         // const data = await response.json()

//         // For demo purposes, we'll simulate a successful payment after a delay
//         await new Promise((resolve) => setTimeout(resolve, 2000))

//         setPaymentStatus("succeeded")
//         setOrderDetails({
//           id: `ORD-${Math.floor(Math.random() * 10000)
//             .toString()
//             .padStart(4, "0")}`,
//           date: new Date().toLocaleDateString(),
//           amount: 78.99,
//           email: "customer@example.com",
//         })
//       } catch (error) {
//         console.error("Error fetching payment status:", error)
//         setPaymentStatus("failed")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     if (paymentIntentId) {
//       getPaymentStatus()
//     } else {
//       // If there's no payment intent ID, we'll assume this is a direct visit
//       // and show a generic success message
//       setTimeout(() => {
//         setPaymentStatus("succeeded")
//         setOrderDetails({
//           id: `ORD-${Math.floor(Math.random() * 10000)
//             .toString()
//             .padStart(4, "0")}`,
//           date: new Date().toLocaleDateString(),
//           amount: 78.99,
//           email: "customer@example.com",
//         })
//         setIsLoading(false)
//       }, 1500)
//     }
//   }, [paymentIntentId])

//   return (
//     <div className="container flex items-center justify-center py-12 md:py-24">
//       <Card className="mx-auto max-w-md w-full">
//         {isLoading ? (
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
//             <p className="text-center text-muted-foreground">Processing your payment...</p>
//           </CardContent>
//         ) : paymentStatus === "succeeded" ? (
//           <>
//             <CardHeader className="text-center">
//               <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//                 <CheckCircle2 className="h-6 w-6 text-green-600" />
//               </div>
//               <CardTitle className="text-2xl">Payment Successful!</CardTitle>
//               <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {orderDetails && (
//                 <div className="rounded-md border p-4 space-y-2">
//                   <p>
//                     <span className="font-medium">Order Number:</span> {orderDetails.id}
//                   </p>
//                   <p>
//                     <span className="font-medium">Date:</span> {orderDetails.date}
//                   </p>
//                   <p>
//                     <span className="font-medium">Total:</span> ${orderDetails.amount.toFixed(2)}
//                   </p>
//                   <p>
//                     <span className="font-medium">Email:</span> {orderDetails.email}
//                   </p>
//                 </div>
//               )}
//               <p className="text-sm text-muted-foreground">
//                 A confirmation email has been sent to your email address. You can also view your order details in your
//                 account.
//               </p>
//             </CardContent>
//             <CardFooter className="flex justify-center">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 <ShoppingBag className="mr-2 h-4 w-4" />
//                 <Link href="/">Continue Shopping</Link>
//               </Button>
//             </CardFooter>
//           </>
//         ) : (
//           <>
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl">Payment Failed</CardTitle>
//               <CardDescription>We're sorry, but there was an issue processing your payment.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">
//                 Please try again or use a different payment method. If the problem persists, please contact our customer
//                 support.
//               </p>
//             </CardContent>
//             <CardFooter className="flex justify-center">
//               <Button variant="outline" asChild>
//                 <Link href="/checkout">Try Again</Link>
//               </Button>
//             </CardFooter>
//           </>
//         )}
//       </Card>
//     </div>
//   )
// }

