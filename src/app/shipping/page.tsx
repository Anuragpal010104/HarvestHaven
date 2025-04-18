import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Globe, Truck } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shipping Information</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to know about our shipping policies and delivery options.
          </p>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Shipping Options</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {shippingOptions.map((option, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <option.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-500 mb-4">{option.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery Time:</span>
                    <span className="text-sm font-medium">{option.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cost:</span>
                    <span className="text-sm font-medium">{option.cost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shipping Policy Tabs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Shipping Policies</h2>
        <Tabs defaultValue="domestic" className="max-w-4xl mx-auto">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="domestic">Domestic Shipping</TabsTrigger>
            <TabsTrigger value="international">International Shipping</TabsTrigger>
            <TabsTrigger value="restrictions">Shipping Restrictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="domestic" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Domestic Shipping Policy</h3>
                <p className="text-gray-500">
                  We currently ship to all 50 states in the US. Shipping times and costs vary based on your location and the shipping method you choose.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Free Shipping on Orders Over $50</h4>
                      <p className="text-sm text-gray-500">
                        All orders over $50 qualify for free standard shipping. Orders under $50 have a flat shipping rate of $5.99.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Perishable Items</h4>
                      <p className="text-sm text-gray-500">
                        Perishable items are shipped with appropriate insulation and ice packs when necessary to ensure freshness. These items may have special shipping requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Order Processing</h4>
                      <p className="text-sm text-gray-500">
                        Orders are typically processed within 1-2 business days. Once your order ships, you&apos;ll receive a confirmation email with tracking information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Delivery Estimates</h4>
                      <p className="text-sm text-gray-500">
                        Delivery estimates are provided at checkout and are based on your location and the shipping method selected. Please note that these are estimates and actual delivery times may vary.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="international" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">International Shipping</h3>
                <p className="text-gray-500">
                  Currently, we only ship within the United States. We&apos;re working on expanding our shipping options to international locations in the future. We appreciate your patience and understanding.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Future International Shipping Plans</h4>
                      <p className="text-sm text-gray-500">
                        We plan to expand our shipping to Canada and select European countries in the coming months. Sign up for our newsletter to be notified when international shipping becomes available.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">International Orders</h4>
                      <p className="text-sm text-gray-500">
                        If you&apos;re interested in placing a large international order, please contact our customer service team to discuss special shipping arrangements.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="restrictions" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Shipping Restrictions</h3>
                <p className="text-gray-500">
                  Due to the nature of some products and varying regulations, there are certain restrictions on what we can ship and where.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Perishable Products</h4>
                      <p className="text-sm text-gray-500">
                        Perishable items such as fresh produce, dairy, and certain baked goods may have shipping restrictions based on distance and weather conditions to ensure quality upon arrival.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Alcohol Products</h4>
                      <p className="text-sm text-gray-500">
                        Organic wines and other alcoholic beverages can only be shipped to certain states due to varying state laws. Age verification is required upon delivery.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Remote Locations</h4>
                      <p className="text-sm text-gray-500">
                        Additional shipping charges may apply for deliveries to remote locations, islands, or areas outside standard delivery routes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Tracking Information */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Order Tracking</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">How to Track Your Order</h3>
            <p className="text-gray-500">
              Once your order ships, you&apos;ll receive a confirmation email with tracking information. You can also track your order through your account on our website.
            </p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Track from Your Account</h4>
                  <p className="text-sm text-gray-500">
                    Log in to your account and go to "My Orders" to view the status and tracking information for all your recent orders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Track via Email</h4>
                  <p className="text-sm text-gray-500">
                    Click the tracking link in your shipping confirmation email to be directed to the carrier&apos;s tracking page.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Delivery Updates</h4>
                  <p className="text-sm text-gray-500">
                    You&apos;ll receive email notifications about important updates to your delivery status, including when your order is out for delivery.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {shippingFaqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-500">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const shippingOptions = [
  {
    title: "Standard Shipping",
    description: "Our most economical shipping option for non-urgent deliveries.",
    deliveryTime: "3-5 business days",
    cost: "Free on orders over $50, otherwise $5.99",
    icon: Truck
  },
  {
    title: "Express Shipping",
    description: "Faster delivery for when you need your organic products sooner.",
    deliveryTime: "1-2 business days",
    cost: "$9.99",
    icon: Clock
  },
  {
    title: "Same-Day Delivery",
    description: "Available in select metro areas for orders placed before 10am local time.",
    deliveryTime: "Same day",
    cost: "$14.99",
    icon: Truck
  }
]

const shippingFaqs = [
  {
    question: "When will my order ship?",
    answer: "Orders are typically processed within 1-2 business days. Once your order ships, you&apos;ll receive a confirmation email with tracking information."
  },
  {
    question: "Can I change my shipping address after placing an order?",
    answer: "You can change your shipping address within 1 hour of placing your order. After that, please contact customer service as soon as possible to request an address change."
  },
  {
    question: "Do you ship to PO boxes?",
    answer: "Yes, we ship to PO boxes for non-perishable items using USPS. However, perishable items cannot be shipped to PO boxes."
  },
  {
    question: "What if my package is lost or damaged?",
    answer: "If your package is lost or damaged during transit, please contact our customer service team within 48 hours of the expected delivery date. We&apos;ll work with the carrier to resolve the issue."
  },
  {
    question: "How are perishable items shipped?",
    answer: "Perishable items are shipped with appropriate insulation and ice packs when necessary to ensure freshness. We use expedited shipping for perishable items to minimize transit time."
  },
  {
    question: "Can I request a specific delivery date?",
    answer: "For standard and express shipping, we cannot guarantee specific delivery dates. However, for same-day delivery, you can select a delivery window during checkout."
  }
]