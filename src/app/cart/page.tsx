import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ShoppingCart, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Pure Organic Products for a Healthier Life
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Discover our range of certified organic products sourced directly from trusted farmers and producers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Organic products"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                Featured Products
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Best Sellers</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most popular organic products loved by our customers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're committed to providing the highest quality organic products.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const featuredProducts = [
  {
    id: 1,
    name: "Organic Avocados",
    description: "Fresh, ripe avocados grown without pesticides",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Raw Honey",
    description: "Pure, unfiltered honey from organic beekeepers",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Organic Quinoa",
    description: "Protein-rich ancient grain, sustainably farmed",
    price: 6.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
]

const features = [
  {
    title: "100% Certified Organic",
    description: "All our products are certified organic, ensuring they meet the highest standards.",
  },
  {
    title: "Direct from Farmers",
    description: "We source directly from organic farmers, ensuring fair prices and fresh products.",
  },
  {
    title: "Eco-Friendly Packaging",
    description: "Our packaging is biodegradable and made from recycled materials.",
  },
]

