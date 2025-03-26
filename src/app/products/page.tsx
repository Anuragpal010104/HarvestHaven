"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { getAllProducts, Product, addToCart, addToWishlist } from "@/lib/db";
import { auth } from "@/lib/firebase";

export default function ProductsPage() {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      toast.error("Please log in", {
        description: "You need to be logged in to add items to your cart.",
      });
      return;
    }

    try {
      await addToCart(user.uid, product);
      toast.success("Added to cart", {
        description: `1 × ${product.title} added to your cart.`,
      });
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart", {
        description: error.message || "Something went wrong.",
      });
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!user) {
      toast.error("Please log in", {
        description: "You need to be logged in to add items to your wishlist.",
      });
      return;
    }

    try {
      await addToWishlist(user.uid, product.id);
      toast.success("Added to wishlist", {
        description: `${product.title} has been added to your wishlist.`,
      });
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist", {
        description: error.message || "Something went wrong.",
      });
    }
  };

  if (loading) {
    return <div className="container px-4 py-12 text-center">Loading products...</div>;
  }

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
          <Card key={product.id} className="h-full transition-all hover:shadow-lg flex flex-col">
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.imageBase64 || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                <div className="flex items-center flex-shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">4.5</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex flex-col gap-2 flex-grow justify-end">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}