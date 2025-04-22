"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image" // Import the Image component for optimization

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
}

export default function SearchClient() {
  const searchParams = useSearchParams()
  const { push } = useRouter() // Use useRouter for navigation
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)

  // Mock product data
  const allProducts: Product[] = useMemo(() => [
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
    // ...add other products as needed...
  ], [])

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return allProducts
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, allProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("q", searchTerm)
    // Use useRouter to navigate instead of window.history
    push(`/search?${params.toString()}`)
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Search Results</h1>
        <p className="max-w-[600px] text-gray-500">
          {searchTerm ? `Showing results for "${searchTerm}"` : "Browse our organic products"}
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={120}
                height={120}
                className="mb-2 object-cover rounded"
              />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <div className="font-bold mb-2">${product.price.toFixed(2)}</div>
              <Button size="sm">Add to Cart</Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}