"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getProductById, Product } from "@/lib/db";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    if (!user) {
      toast.error("Please log in", {
        description: "You need to be logged in to add items to your cart.",
      });
      return;
    }
    if (!product) return;

    try {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      const cartItem = {
        productId: product.id,
        name: product.title,
        price: product.price,
        quantity,
        image: product.imageBase64 || "/placeholder.svg",
      };

      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        const existingItemIndex = existingItems.findIndex(
          (item: any) => item.productId === cartItem.productId
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += quantity;
          await updateDoc(cartRef, { items: updatedItems });
        } else {
          await updateDoc(cartRef, { items: [...existingItems, cartItem] });
        }
      } else {
        await setDoc(cartRef, {
          userId: user.uid,
          items: [cartItem],
        });
      }

      toast.success("Added to cart", {
        description: `${quantity} × ${product.title} added to your cart.`,
      });
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart", {
        description: error.message || "Something went wrong.",
      });
    }
  };

  if (loading) {
    return <div className="container px-4 py-12 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="container px-4 py-12 text-center">Product not found</div>;
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
          <Image
            src={product.imageBase64 || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.5 (Static rating)</span>
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
            <Button variant="outline" size="lg">Buy Now</Button>
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
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About this product</h3>
              <p className="text-gray-500">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock}</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}