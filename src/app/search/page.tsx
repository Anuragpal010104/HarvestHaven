"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star, SearchIcon } from "lucide-react"

// Define the Product interface
interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState("all")
  const [category, setCategory] = useState("all")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock product data with explicit typing
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Organic Avocados",
      description: "Fresh, ripe avocados grown without pesticides",
      price: 4.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "fruits",
    },
    {
      id: 2,
      name: "Raw Honey",
      description: "Pure, unfiltered honey from organic beekeepers",
      price: 8.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      category: "pantry",
    },
    {
      id: 3,
      name: "Organic Quinoa",
      description: "Protein-rich ancient grain, sustainably farmed",
      price: 6.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      category: "pantry",
    },
    {
      id: 4,
      name: "Almond Milk",
      description: "Creamy plant-based milk alternative",
      price: 3.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      category: "dairy",
    },
    {
      id: 5,
      name: "Organic Kale",
      description: "Fresh, nutrient-dense leafy greens",
      price: 2.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      category: "fruits",
    },
    {
      id: 15,
      name: "Organic Whole Milk",
      description: "Creamy, nutrient-rich milk from grass-fed cows",
      price: 4.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "dairy",
    },
    {
      id: 16,
      name: "Free-Range Eggs",
      description: "Farm-fresh eggs from free-range hens",
      price: 5.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      category: "dairy",
    },
    {
      id: 23,
      name: "Extra Virgin Olive Oil",
      description: "Cold-pressed from organic olives",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "pantry",
    },
    {
      id: 24,
      name: "Organic Almond Butter",
      description: "Creamy, protein-rich spread with no additives",
      price: 9.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      category: "pantry",
    },
  ]

  // Filter and sort products based on search term and filters
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let results: Product[] = [...allProducts]

      // Filter by search term
      if (query) {
        results = results.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )
      }

      // Filter by category
      if (category !== "all") {
        results = results.filter((product) => product.category === category)
      }

      // Filter by price range
      if (priceRange !== "all") {
        switch (priceRange) {
          case "under5":
            results = results.filter((product) => product.price < 5)
            break
          case "5to10":
            results = results.filter((product) => product.price >= 5 && product.price <= 10)
            break
          case "over10":
            results = results.filter((product) => product.price > 10)
            break
        }
      }

      // Sort results
      switch (sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          results.sort((a, b) => b.price - a.price)
          break
        case "rating":
          results.sort((a, b) => b.rating - a.rating)
          break
        // Default is relevance, no sorting needed
      }

      setSearchResults(results)
      setIsLoading(false)
    }, 500)
  }, [query, sortBy, priceRange, category, allProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("q", searchTerm)
    window.history.pushState(null, "", `/search?${params.toString()}`)
    // Force re-render
    window.dispatchEvent(new Event("popstate"))
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Search Results</h1>
        <p className="max-w-[600px] text-gray-500">
          {query ? `Showing results for &quot;${query}&quot;` : "Browse our organic products"}
        </p>
        <form onSubmit={handleSearch} className="w-full max-w-md relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="sm" className="absolute right-1 top-1 h-7">
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="pantry">Pantry Items</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under5">Under $5</SelectItem>
                <SelectItem value="5to10">$5 to $10</SelectItem>
                <SelectItem value="over10">Over $10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-100 animate-pulse mb-2 w-3/4" />
                    <div className="h-3 bg-gray-100 animate-pulse mb-4 w-full" />
                    <div className="h-4 bg-gray-100 animate-pulse w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">We couldn&apos;t find any products matching your search criteria.</p>
              <Button asChild>
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">
                  Showing {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((product) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}