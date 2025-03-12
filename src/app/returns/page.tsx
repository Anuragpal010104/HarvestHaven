import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, CheckCircle2, Package, ShieldCheck } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Returns & Refunds</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our hassle-free return policy and refund process.
          </p>
        </div>
      </div>

      {/* Return Policy Overview */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Our Return Policy</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {returnPolicyHighlights.map((highlight, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <highlight.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-500">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Process Tabs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Return Process</h2>
        <Tabs defaultValue="process" className="max-w-4xl mx-auto">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="process">How to Return</TabsTrigger>
            <TabsTrigger value="refunds">Refund Process</TabsTrigger>
            <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">How to Return an Item</h3>
                <p className="text-gray-500">
                  We've made our return process simple and convenient. Follow these steps to return an item:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Initiate Your Return</h4>
                      <p className="text-sm text-gray-500">
                        Log in to your account, go to "My Orders," and select the order containing the item you wish to
                        return. Click on "Return Item" and follow the instructions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Print Return Label</h4>
                      <p className="text-sm text-gray-500">
                        Once your return is approved, you'll receive a return shipping label via email. Print the label
                        and attach it to your package.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Package Your Return</h4>
                      <p className="text-sm text-gray-500">
                        Place the item in its original packaging if possible, or use a secure box. Include all original
                        tags, accessories, and documentation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Ship Your Return</h4>
                      <p className="text-sm text-gray-500">
                        Drop off your package at any authorized shipping location. We recommend keeping the tracking
                        number for your records.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold">Track Your Refund</h4>
                      <p className="text-sm text-gray-500">
                        You can track the status of your return and refund in the "My Orders" section of your account.
                        You'll also receive email updates.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refunds" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Refund Process</h3>
                <p className="text-gray-500">
                  Once we receive your return, our team will inspect the item and process your refund. Here's what to
                  expect:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Processing Time</h4>
                      <p className="text-sm text-gray-500">
                        Once we receive your returned item, it takes 3-5 business days to inspect the item and process
                        your refund.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Refund Method</h4>
                      <p className="text-sm text-gray-500">
                        Refunds are issued to the original payment method used for the purchase. If you paid with a
                        credit card, the refund will be credited back to that card.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Refund Amount</h4>
                      <p className="text-sm text-gray-500">
                        Your refund will include the full purchase price of the returned item. Shipping costs are
                        non-refundable unless the return is due to our error.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Bank Processing Time</h4>
                      <p className="text-sm text-gray-500">
                        After we process your refund, it may take an additional 5-10 business days for the funds to
                        appear in your account, depending on your financial institution.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Store Credit Option</h4>
                      <p className="text-sm text-gray-500">
                        You can choose to receive store credit instead of a refund to your original payment method.
                        Store credit is issued immediately upon approval of your return.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exceptions" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Return Exceptions</h3>
                <p className="text-gray-500">
                  While we accept most returns, there are some exceptions to our return policy:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Perishable Items</h4>
                      <p className="text-sm text-gray-500">
                        Due to their nature, perishable items such as fresh produce, dairy, and baked goods cannot be
                        returned unless they arrived damaged or spoiled. Please contact customer service within 24 hours
                        of delivery for these issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personal Care Items</h4>
                      <p className="text-sm text-gray-500">
                        For health and safety reasons, personal care items that have been opened or used cannot be
                        returned. Unopened items in their original packaging can be returned.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Gift Cards</h4>
                      <p className="text-sm text-gray-500">
                        Gift cards and e-gift certificates are not returnable or refundable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Clearance Items</h4>
                      <p className="text-sm text-gray-500">
                        Items marked as "Final Sale" or "Clearance" cannot be returned unless they are defective.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Special Circumstances</h4>
                      <p className="text-sm text-gray-500">
                        If you have a special circumstance not covered by our standard return policy, please contact our
                        customer service team. We'll do our best to assist you.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Damaged or Incorrect Items */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Damaged or Incorrect Items</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">What to Do If You Receive a Damaged or Incorrect Item</h3>
            <p className="text-gray-500">
              If you receive a damaged item or an item different from what you ordered, please follow these steps:
            </p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Contact Us Immediately</h4>
                  <p className="text-sm text-gray-500">
                    Contact our customer service team within 48 hours of receiving your order. You can reach us by
                    email, phone, or through the contact form on our website.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Provide Details</h4>
                  <p className="text-sm text-gray-500">
                    Include your order number, a description of the issue, and photos of the damaged or incorrect item
                    if possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Our Response</h4>
                  <p className="text-sm text-gray-500">
                    Our team will review your case and respond within 24 hours with instructions on how to proceed. We
                    may ask for additional information or photos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Resolution</h4>
                  <p className="text-sm text-gray-500">
                    Depending on the situation, we'll arrange for a replacement to be sent to you or issue a full
                    refund. In most cases, you won't need to return the damaged item.
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
          {returnFaqs.map((faq, index) => (
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

const returnPolicyHighlights = [
  {
    title: "30-Day Returns",
    description:
      "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.",
    icon: ArrowLeftRight,
  },
  {
    title: "Easy Process",
    description:
      "Our return process is simple and hassle-free. Initiate your return online, print a prepaid shipping label, and drop off your package.",
    icon: Package,
  },
  {
    title: "Satisfaction Guarantee",
    description:
      "We stand behind the quality of our products. If you're not completely satisfied, we'll make it right.",
    icon: ShieldCheck,
  },
]

const returnFaqs = [
  {
    question: "Can I return an item if I changed my mind?",
    answer:
      "Yes, you can return most items within 30 days if you change your mind. The item must be unused and in its original packaging with all tags attached.",
  },
  {
    question: "How long does it take to process a refund?",
    answer:
      "Once we receive your returned item, it takes 3-5 business days to process your refund. After that, it may take an additional 5-10 business days for the funds to appear in your account, depending on your financial institution.",
  },
  {
    question: "Do I have to pay for return shipping?",
    answer:
      "For standard returns, we provide a prepaid return shipping label at a flat fee of $5.99, which is deducted from your refund. If the return is due to our error (damaged, defective, or incorrect item), return shipping is free.",
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer:
      "Yes, you can exchange an item for a different size, color, or product of equal value. Initiate the exchange through the 'My Orders' section of your account and follow the instructions.",
  },
  {
    question: "What if my item arrived damaged?",
    answer:
      "If your item arrived damaged, please contact our customer service team within 48 hours of delivery. We'll arrange for a replacement or refund at no additional cost to you.",
  },
  {
    question: "Can I return a gift?",
    answer:
      "Yes, you can return a gift. You'll need the order number from the gift receipt. The refund will be issued as store credit to you, not to the original purchaser.",
  },
]

