"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function ProductsPage() {
  const [user] = useAuthState(auth);

  const addToCart = async (product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  }) => {
    if (!user) {
      toast.error("Please log in", {
        description: "You need to be logged in to add items to your cart.",
      });
      return;
    }

    try {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      const cartItem = {
        productId: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || "/placeholder.svg",
      };

      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        const existingItemIndex = existingItems.findIndex(
          (item: any) => item.productId === cartItem.productId
        );

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += 1;
          await updateDoc(cartRef, { items: updatedItems });
        } else {
          // Add new item
          await updateDoc(cartRef, { items: [...existingItems, cartItem] });
        }
      } else {
        // Create new cart
        await setDoc(cartRef, {
          userId: user.uid,
          items: [cartItem],
        });
      }

      toast.success("Added to cart", {
        description: `1 × ${product.name} added to your cart.`,
      });
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart", {
        description: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            All Products
          </h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our selection of certified organic products
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="h-full transition-all hover:shadow-lg"
          >
            <Link href={`/products/${product.id}`} className="block">
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
            </Link>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const products = [
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
  {
    id: 4,
    name: "Almond Milk",
    description: "Creamy plant-based milk alternative",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Organic Kale",
    description: "Fresh, nutrient-dense leafy greens",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Coconut Oil",
    description: "Cold-pressed, unrefined coconut oil",
    price: 9.99,
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
    badge: "New",
  },
  {
    id: 8,
    name: "Chia Seeds",
    description: "Nutrient-packed superfood seeds",
    price: 7.49,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
];