import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CreditCard, HelpCircle, Package, Search, ShieldCheck, ShoppingCart, Truck, User } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Help Center</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Find answers to common questions and get the support you need.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for help..." className="pl-10 py-6 text-lg" />
          <Button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700">Search</Button>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Topics</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {popularTopics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                    <topic.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold">{topic.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{topic.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Tabs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Tabs defaultValue="ordering" className="max-w-3xl mx-auto">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="ordering">Ordering</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="ordering" className="mt-6 space-y-4">
            {orderingFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </TabsContent>

          <TabsContent value="shipping" className="mt-6 space-y-4">
            {shippingFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </TabsContent>

          <TabsContent value="returns" className="mt-6 space-y-4">
            {returnsFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </TabsContent>

          <TabsContent value="account" className="mt-6 space-y-4">
            {accountFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Help Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Browse Help by Category</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helpCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>
                      <Link href={topic.href} className="text-green-600 hover:underline flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        {topic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <Link href={category.href} className="text-green-600 font-medium hover:underline text-sm">
                  View all articles →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-green-50 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-6">
          Can't find what you're looking for? Our customer support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700">Contact Support</Button>
          <Button variant="outline">Live Chat</Button>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2">{question}</h3>
        <p className="text-gray-500">{answer}</p>
      </CardContent>
    </Card>
  )
}

const popularTopics = [
  {
    title: "Order Tracking",
    description: "Track your order status and delivery",
    icon: Truck,
    href: "/help/order-tracking",
  },
  {
    title: "Returns & Refunds",
    description: "How to return items and get refunds",
    icon: Package,
    href: "/help/returns",
  },
  {
    title: "Payment Methods",
    description: "Accepted payment options and billing",
    icon: CreditCard,
    href: "/help/payment",
  },
  {
    title: "Account Management",
    description: "Manage your profile and preferences",
    icon: User,
    href: "/help/account",
  },
  {
    title: "Product Information",
    description: "Details about our organic products",
    icon: BookOpen,
    href: "/help/products",
  },
  {
    title: "Shipping Policy",
    description: "Delivery times and shipping options",
    icon: Truck,
    href: "/help/shipping",
  },
  {
    title: "Shopping Guide",
    description: "Tips for shopping on our platform",
    icon: ShoppingCart,
    href: "/help/shopping-guide",
  },
  {
    title: "Security & Privacy",
    description: "How we protect your information",
    icon: ShieldCheck,
    href: "/help/security",
  },
]

const orderingFaqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, provide shipping information, and complete payment.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it. Go to 'My Orders' in your account and select the order you wish to change. After 1 hour, please contact customer support for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, we offer eco-friendly gift wrapping for an additional $5. You can select this option during checkout and include a personalized message.",
  },
]

const shippingFaqs = [
  {
    question: "How long will it take to receive my order?",
    answer:
      "Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. Delivery times may vary based on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within the United States. We're working on expanding our shipping options to international locations in the future.",
  },
  {
    question: "Is there free shipping?",
    answer:
      "Yes, we offer free standard shipping on all orders over $50. Orders under $50 have a flat shipping rate of $5.99.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also find tracking information in the 'My Orders' section of your account.",
  },
]

const returnsFaqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Perishable items cannot be returned unless they arrived damaged or spoiled.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, go to 'My Orders' in your account, select the order containing the item you wish to return, and follow the return instructions. You'll receive a return shipping label via email.",
  },
  {
    question: "How long does it take to process a refund?",
    answer:
      "Once we receive your returned item, it takes 3-5 business days to process your refund. The funds may take an additional 5-10 business days to appear in your account, depending on your payment method.",
  },
  {
    question: "What if I received a damaged or incorrect item?",
    answer:
      "If you received a damaged or incorrect item, please contact customer support within 48 hours of delivery. We'll arrange for a replacement or refund at no additional cost to you.",
  },
]

const accountFaqs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Register' button in the top right corner of the website. Fill in your details, including your name, email address, and password, then click 'Create Account'.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "If you've forgotten your password, click on 'Login', then 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
  },
  {
    question: "Can I have multiple shipping addresses?",
    answer:
      "Yes, you can save multiple shipping addresses in your account. Go to 'My Account' > 'Addresses' to add, edit, or remove shipping addresses.",
  },
  {
    question: "How do I update my payment information?",
    answer:
      "To update your payment information, go to 'My Account' > 'Payment Methods'. From there, you can add new payment methods or edit existing ones.",
  },
]

const helpCategories = [
  {
    title: "Orders & Payments",
    href: "/help/orders",
    topics: [
      { title: "How to place an order", href: "/help/orders/how-to-place-an-order" },
      { title: "Payment methods", href: "/help/orders/payment-methods" },
      { title: "Order cancellation", href: "/help/orders/order-cancellation" },
      { title: "Invoices and receipts", href: "/help/orders/invoices-and-receipts" },
    ],
  },
  {
    title: "Shipping & Delivery",
    href: "/help/shipping",
    topics: [
      { title: "Shipping options", href: "/help/shipping/shipping-options" },
      { title: "Delivery timeframes", href: "/help/shipping/delivery-timeframes" },
      { title: "Tracking your package", href: "/help/shipping/tracking-your-package" },
      { title: "International shipping", href: "/help/shipping/international-shipping" },
    ],
  },
  {
    title: "Returns & Refunds",
    href: "/help/returns",
    topics: [
      { title: "Return policy", href: "/help/returns/return-policy" },
      { title: "How to return an item", href: "/help/returns/how-to-return" },
      { title: "Refund processing time", href: "/help/returns/refund-processing" },
      { title: "Damaged or incorrect items", href: "/help/returns/damaged-items" },
    ],
  },
  {
    title: "Account & Profile",
    href: "/help/account",
    topics: [
      { title: "Creating an account", href: "/help/account/creating-an-account" },
      { title: "Managing your profile", href: "/help/account/managing-profile" },
      { title: "Password reset", href: "/help/account/password-reset" },
      { title: "Privacy settings", href: "/help/account/privacy-settings" },
    ],
  },
  {
    title: "Products & Quality",
    href: "/help/products",
    topics: [
      { title: "Organic certification", href: "/help/products/organic-certification" },
      { title: "Product freshness", href: "/help/products/product-freshness" },
      { title: "Allergen information", href: "/help/products/allergen-information" },
      { title: "Product reviews", href: "/help/products/product-reviews" },
    ],
  },
  {
    title: "Seller Information",
    href: "/help/sellers",
    topics: [
      { title: "Becoming a seller", href: "/help/sellers/becoming-a-seller" },
      { title: "Seller requirements", href: "/help/sellers/seller-requirements" },
      { title: "Seller fees", href: "/help/sellers/seller-fees" },
      { title: "Seller support", href: "/help/sellers/seller-support" },
    ],
  },
]

