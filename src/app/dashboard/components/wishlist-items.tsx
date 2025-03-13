"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingCart, Trash } from "lucide-react"

export function WishlistItems() {
  // const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Organic Avocados",
      description: "Fresh, ripe avocados grown without pesticides",
      price: 4.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Raw Honey",
      description: "Pure, unfiltered honey from organic beekeepers",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
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
      id: 3,
      name: "Organic Quinoa",
      description: "Protein-rich ancient grain, sustainably farmed",
      price: 6.49,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
    {
      id: 23,
      name: "Extra Virgin Olive Oil",
      description: "Cold-pressed from organic olives",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
    },
    {
      id: 16,
      name: "Free-Range Eggs",
      description: "Farm-fresh eggs from free-range hens",
      price: 5.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
    },
    {
      id: 24,
      name: "Organic Almond Butter",
      description: "Creamy, protein-rich spread with no additives",
      price: 9.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    // toast({
    //   title: "Removed from wishlist",
    //   description: "Item has been removed from your wishlist.",
    // })
  }

  const addToCart = (item: { id?: number; name: any; description?: string; price?: number; image?: string; rating?: number }) => {
    // toast({
    //   title: "Added to cart",
    //   description: `${item.name} has been added to your cart.`,
    // })
  }

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Save items you love to your wishlist and revisit them anytime.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <div className="relative h-48 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 shadow-sm hover:text-red-500"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <Button size="sm" onClick={() => addToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

