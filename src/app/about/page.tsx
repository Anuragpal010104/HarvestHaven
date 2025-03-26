import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, CheckCircle2 } from "lucide-react";

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
          <Image src="/placeholder.svg" alt="Our organic farm" layout="fill" className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-500">
            OrganicMarket was founded in 2015 by a group of passionate organic farmers and food enthusiasts who believed
            in a better way to bring fresh, organic produce to consumers.
          </p>
          <p className="text-gray-500">
            What started as a small farmers&apos; market stand has grown into a thriving online marketplace connecting
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
    </div>
  );
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
] as const;
