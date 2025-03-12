import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Lock, ShieldCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            How we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500">Last Updated: March 1, 2023</p>
        </div>
      </div>

      {/* Privacy Policy Overview */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Our Commitment to Privacy</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {privacyCommitments.map((commitment, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <commitment.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{commitment.title}</h3>
                <p className="text-gray-500">{commitment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Privacy Policy Tabs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Privacy Policy Details</h2>
        <Tabs defaultValue="collection" className="max-w-4xl mx-auto">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="collection">Information Collection</TabsTrigger>
            <TabsTrigger value="use">How We Use Data</TabsTrigger>
            <TabsTrigger value="sharing">Information Sharing</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Information We Collect</h3>
                <p className="text-gray-500">
                  We collect various types of information to provide and improve our services to you. Here's what we
                  collect:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personal Information</h4>
                      <p className="text-sm text-gray-500">
                        When you create an account or place an order, we collect information such as your name, email
                        address, phone number, billing address, and shipping address.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Payment Information</h4>
                      <p className="text-sm text-gray-500">
                        When you make a purchase, we collect payment information, including credit card numbers or other
                        financial information. This information is encrypted and stored securely.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Order History</h4>
                      <p className="text-sm text-gray-500">
                        We maintain records of your purchase history, including the products you've bought, when you
                        bought them, and how much you paid.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Usage Information</h4>
                      <p className="text-sm text-gray-500">
                        We collect information about how you interact with our website, including the pages you visit,
                        the time you spend on each page, the links you click, and the products you view.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Device Information</h4>
                      <p className="text-sm text-gray-500">
                        We collect information about the device you use to access our website, including the hardware
                        model, operating system, unique device identifiers, and mobile network information.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="use" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">How We Use Your Information</h3>
                <p className="text-gray-500">We use the information we collect for various purposes, including:</p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Providing Services</h4>
                      <p className="text-sm text-gray-500">
                        We use your information to process orders, deliver products, provide customer support, and
                        maintain your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Improving Our Services</h4>
                      <p className="text-sm text-gray-500">
                        We analyze how you use our website to improve our products and services, develop new features,
                        and enhance your shopping experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personalization</h4>
                      <p className="text-sm text-gray-500">
                        We use your information to personalize your experience, such as recommending products you might
                        like based on your purchase history and browsing behavior.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Marketing</h4>
                      <p className="text-sm text-gray-500">
                        With your consent, we use your information to send you marketing communications about our
                        products, services, and promotions. You can opt out of these communications at any time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Security</h4>
                      <p className="text-sm text-gray-500">
                        We use your information to protect our website, products, services, and customers from
                        fraudulent, unauthorized, or illegal activity.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sharing" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Information Sharing and Disclosure</h3>
                <p className="text-gray-500">
                  We respect your privacy and are committed to protecting your personal information. We do not sell your
                  personal information to third parties. However, we may share your information in the following
                  circumstances:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Service Providers</h4>
                      <p className="text-sm text-gray-500">
                        We share information with third-party service providers who help us operate our business, such
                        as payment processors, shipping companies, and customer service providers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Business Transfers</h4>
                      <p className="text-sm text-gray-500">
                        If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your
                        information may be transferred as part of that transaction.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Legal Requirements</h4>
                      <p className="text-sm text-gray-500">
                        We may disclose your information if required to do so by law or in response to valid requests by
                        public authorities (e.g., a court or government agency).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Protection of Rights</h4>
                      <p className="text-sm text-gray-500">
                        We may disclose your information to protect the safety, rights, or property of OrganicMarket,
                        our customers, or others.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rights" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Your Rights and Choices</h3>
                <p className="text-gray-500">
                  We respect your privacy rights and provide you with reasonable access and control over your
                  information. Here are the rights and choices available to you:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Access and Update</h4>
                      <p className="text-sm text-gray-500">
                        You can access and update your personal information by logging into your account and visiting
                        the account settings page.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Data Deletion</h4>
                      <p className="text-sm text-gray-500">
                        You can request the deletion of your personal information by contacting our customer service
                        team. Please note that we may retain certain information as required by law or for legitimate
                        business purposes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Marketing Communications</h4>
                      <p className="text-sm text-gray-500">
                        You can opt out of receiving marketing communications from us by clicking the "unsubscribe" link
                        in any marketing email we send you or by contacting our customer service team.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Cookies</h4>
                      <p className="text-sm text-gray-500">
                        Most web browsers are set to accept cookies by default. You can usually choose to set your
                        browser to remove or reject cookies. Please note that if you choose to remove or reject cookies,
                        this could affect certain features of our website.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Do Not Track</h4>
                      <p className="text-sm text-gray-500">
                        Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to
                        have your online activities tracked. We currently do not respond to "Do Not Track" signals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Data Security */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Data Security</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">How We Protect Your Information</h3>
            <p className="text-gray-500">
              We take the security of your personal information seriously and use appropriate technical and
              organizational measures to protect your personal information against unauthorized or unlawful processing
              and against accidental loss, destruction, or damage.
            </p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Encryption</h4>
                  <p className="text-sm text-gray-500">
                    We use industry-standard encryption technologies when transferring and receiving personal
                    information. All payment information is encrypted using SSL technology.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Secure Storage</h4>
                  <p className="text-sm text-gray-500">
                    We store your personal information on secure servers that are protected by firewalls and other
                    security measures.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Access Controls</h4>
                  <p className="text-sm text-gray-500">
                    We limit access to your personal information to those employees, agents, contractors, and other
                    third parties who have a business need to know.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Regular Audits</h4>
                  <p className="text-sm text-gray-500">
                    We regularly review our security systems and processes to ensure they remain effective and
                    up-to-date.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-6">
          If you have any questions or concerns about our Privacy Policy or how we handle your personal information,
          please contact our Privacy Team.
        </p>
        <div className="text-center">
          <p className="font-medium">Email: privacy@organicmarket.com</p>
          <p className="font-medium">Phone: (555) 123-4567</p>
          <p className="font-medium">Address: 123 Organic Way, Portland, OR 97201</p>
        </div>
      </div>
    </div>
  )
}

const privacyCommitments = [
  {
    title: "Transparency",
    description:
      "We're committed to being transparent about the data we collect and how we use it. We believe in clear, straightforward privacy policies.",
    icon: ShieldCheck,
  },
  {
    title: "Security",
    description:
      "We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
    icon: Lock,
  },
  {
    title: "Control",
    description:
      "We give you control over your personal information. You can access, update, or delete your data, and manage your communication preferences.",
    icon: ShieldCheck,
  },
]

