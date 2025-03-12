import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"

export default function DairyEggsPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Dairy & Eggs</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Organic dairy products and free-range eggs from ethically raised animals.
          </p>
        </div>
      </div>

      {/* Category Banner */}
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden my-8">
        <Image
          src="/placeholder.svg?height=300&width=1200"
          alt="Organic dairy products and eggs"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Ethically Sourced</h2>
            <p className="mb-4">
              Our dairy products and eggs come from farms that prioritize animal welfare and sustainable practices.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">Shop All</Button>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {subcategories.map((subcategory, index) => (
          <Link key={index} href={subcategory.href} className="group">
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src={subcategory.image || "/placeholder.svg"}
                alt={subcategory.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">{subcategory.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </div>

      {/* All Products */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border rounded-md p-1">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => (
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
      </div>
    </div>
  )
}

const subcategories = [
  {
    name: "Milk & Cream",
    href: "/products/dairy/milk-cream",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Cheese",
    href: "/products/dairy/cheese",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Yogurt & Kefir",
    href: "/products/dairy/yogurt-kefir",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Eggs",
    href: "/products/dairy/eggs",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const featuredProducts = [
  {
    id: 15,
    name: "Organic Whole Milk",
    description: "Creamy, nutrient-rich milk from grass-fed cows",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 16,
    name: "Free-Range Eggs",
    description: "Farm-fresh eggs from free-range hens",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    badge: "New",
  },
  {
    id: 17,
    name: "Organic Greek Yogurt",
    description: "Thick, creamy yogurt with live cultures",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 18,
    name: "Organic Cheddar Cheese",
    description: "Aged, sharp cheddar from organic milk",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
]

const allProducts = [
  {
    id: 15,
    name: "Organic Whole Milk",
    description: "Creamy, nutrient-rich milk from grass-fed cows",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
  },
  {
    id: 16,
    name: "Free-Range Eggs",
    description: "Farm-fresh eggs from free-range hens",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: 17,
    name: "Organic Greek Yogurt",
    description: "Thick, creamy yogurt with live cultures",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 18,
    name: "Organic Cheddar Cheese",
    description: "Aged, sharp cheddar from organic milk",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
  {
    id: 19,
    name: "Organic Butter",
    description: "Creamy butter from grass-fed cows",
    price: 4.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
  },
  {
    id: 20,
    name: "Organic Almond Milk",
    description: "Dairy-free alternative made from organic almonds",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 21,
    name: "Organic Mozzarella",
    description: "Fresh, soft cheese perfect for salads and pizza",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
  {
    id: 22,
    name: "Organic Kefir",
    description: "Probiotic-rich fermented milk drink",
    price: 4.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
  },
]

