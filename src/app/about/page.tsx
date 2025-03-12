import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About OrganicMarket</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our mission is to make organic food accessible to everyone while supporting sustainable farming practices.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="Our organic farm" fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-500">
            OrganicMarket was founded in 2015 by a group of passionate organic farmers and food enthusiasts who believed
            in a better way to bring fresh, organic produce to consumers.
          </p>
          <p className="text-gray-500">
            What started as a small farmers' market stand has grown into a thriving online marketplace connecting
            organic producers directly with conscious consumers. Our journey has been guided by our commitment to
            sustainability, fair trade practices, and promoting healthy living.
          </p>
          <p className="text-gray-500">
            Today, we work with over 100 certified organic farmers and producers across the country, offering a wide
            range of organic products from fresh produce to pantry staples.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-gray-500 mt-2">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-green-600">{member.role}</p>
              <p className="text-gray-500 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Certifications */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold">{cert.title}</h3>
                <p className="text-gray-500 mt-2">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us */}
      <div className="bg-green-50 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-gray-500 max-w-3xl mx-auto mb-6">
          Whether you're a consumer looking for healthy organic options or a producer committed to sustainable farming,
          we invite you to join our growing community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700">Shop Organic Products</Button>
          <Button variant="outline">Become a Seller</Button>
        </div>
      </div>
    </div>
  )
}

const values = [
  {
    title: "Sustainability",
    description:
      "We're committed to environmentally friendly practices throughout our supply chain, from farm to table.",
  },
  {
    title: "Transparency",
    description: "We believe in complete transparency about our products, their origins, and how they're produced.",
  },
  {
    title: "Community",
    description:
      "We support local farmers and producers, fostering a community that values healthy, sustainable living.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Former organic farmer with a passion for sustainable agriculture and food systems.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    bio: "Supply chain expert ensuring our products reach you fresh and on time.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Priya Patel",
    role: "Product Specialist",
    bio: "Certified nutritionist who curates our product selection for quality and health benefits.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Rodriguez",
    role: "Farmer Relations",
    bio: "Works directly with our network of organic farmers to maintain quality standards.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const certifications = [
  {
    title: "USDA Organic Certified",
    description:
      "All our products meet the strict standards set by the USDA National Organic Program, ensuring they're grown and processed according to federal guidelines.",
  },
  {
    title: "Fair Trade Certified",
    description: "We ensure fair prices and working conditions for farmers and workers who produce our goods.",
  },
  {
    title: "Non-GMO Project Verified",
    description: "Our products are verified to be produced without genetic engineering or GMO ingredients.",
  },
  {
    title: "B Corp Certified",
    description:
      "We meet the highest standards of verified social and environmental performance, transparency, and accountability.",
  },
]

