import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"

export default function FruitsVegetablesPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Fruits & Vegetables</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Fresh, organic fruits and vegetables sourced directly from certified organic farms.
          </p>
        </div>
      </div>

      {/* Category Banner */}
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden my-8">
        <Image
          src="/placeholder.svg?height=300&width=1200"
          alt="Fresh organic fruits and vegetables"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Farm Fresh Goodness</h2>
            <p className="mb-4">
              Our fruits and vegetables are harvested at peak ripeness and delivered to your door within days.
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
    name: "Fresh Fruits",
    href: "/products/fruits/fresh-fruits",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Fresh Vegetables",
    href: "/products/fruits/fresh-vegetables",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Organic Berries",
    href: "/products/fruits/organic-berries",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Leafy Greens",
    href: "/products/fruits/leafy-greens",
    image: "/placeholder.svg?height=200&width=300",
  },
]

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
    id: 7,
    name: "Organic Blueberries",
    description: "Sweet, antioxidant-rich berries",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    badge: "New",
  },
  {
    id: 9,
    name: "Organic Spinach",
    description: "Nutrient-packed leafy greens",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Organic Bananas",
    description: "Sweet, potassium-rich fruit",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
]

const allProducts = [
  {
    id: 1,
    name: "Organic Avocados",
    description: "Fresh, ripe avocados grown without pesticides",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Organic Blueberries",
    description: "Sweet, antioxidant-rich berries",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Organic Spinach",
    description: "Nutrient-packed leafy greens",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Organic Bananas",
    description: "Sweet, potassium-rich fruit",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
  {
    id: 11,
    name: "Organic Carrots",
    description: "Crunchy, vitamin-rich root vegetables",
    price: 2.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
  },
  {
    id: 12,
    name: "Organic Tomatoes",
    description: "Juicy, flavorful vine-ripened tomatoes",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 13,
    name: "Organic Kale",
    description: "Nutrient-dense leafy green superfood",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
  {
    id: 14,
    name: "Organic Apples",
    description: "Crisp, sweet apples from organic orchards",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
  },
]

