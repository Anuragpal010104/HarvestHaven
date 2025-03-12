"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"

interface Params {
  id: string;
}

export default function ProductPage({ params }: { params: Params }) {
//   const { toast } = useToast()
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const addToCart = () => {
    // toast({
    //   title: "Added to cart",
    //   description: `${quantity} × ${product.name} added to your cart.`,
    // })
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-green-600 mb-8 hover:underline"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-gray-500">{product.description}</p>

          <div className="space-y-2">
            <div className="font-medium">Quantity</div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decreaseQuantity}>
                <Minus className="h-3 w-3" />
              </Button>
              <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={increaseQuantity}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="bg-green-600 hover:bg-green-700" size="lg" onClick={addToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              Buy Now
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Free shipping on orders over $50</p>
            <p>30-day return policy</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About this product</h3>
              <p className="text-gray-500">
                {product.description ||
                  `${product.description} Our ${product.name.toLowerCase()} are sourced directly from certified organic farms that follow sustainable farming practices. We ensure that all our products are free from pesticides, GMOs, and artificial additives.`}
              </p>
              <p className="text-gray-500">
                By choosing our organic products, you're not only making a healthier choice for yourself and your family
                but also supporting sustainable agriculture and environmental conservation.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>100% certified organic</li>
                <li>Sourced from trusted farms</li>
                <li>No pesticides or chemicals</li>
                <li>Non-GMO</li>
                <li>Sustainably grown</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{review.name}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{review.date}</div>
                      <p className="text-gray-500">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You might also like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 font-bold">${product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Organic Avocados",
    description: "Fresh, ripe avocados grown without pesticides",
    price: 4.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Raw Honey",
    description: "Pure, unfiltered honey from organic beekeepers",
    price: 8.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Organic Quinoa",
    description: "Protein-rich ancient grain, sustainably farmed",
    price: 6.49,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: "Almond Milk",
    description: "Creamy plant-based milk alternative",
    price: 3.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    reviews: 42,
  },
]

const relatedProducts = [
  {
    id: 5,
    name: "Organic Kale",
    description: "Fresh, nutrient-dense leafy greens",
    price: 2.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Coconut Oil",
    description: "Cold-pressed, unrefined coconut oil",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Organic Blueberries",
    description: "Sweet, antioxidant-rich berries",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Chia Seeds",
    description: "Nutrient-packed superfood seeds",
    price: 7.49,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
]

const reviews = [
  {
    name: "Sarah J.",
    rating: 5,
    date: "2 months ago",
    comment:
      "These are the best organic avocados I've ever had! They arrived perfectly ripe and lasted for days. Will definitely order again.",
  },
  {
    name: "Michael T.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great quality and taste. Only giving 4 stars because one of the avocados was a bit bruised, but the rest were perfect.",
  },
  {
    name: "Emily R.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Love that these are truly organic and pesticide-free. You can taste the difference! Fast shipping too.",
  },
]

