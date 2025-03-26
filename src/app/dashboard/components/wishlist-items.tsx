// wishlist-items.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { Product, getWishlistItems, removeFromWishlist, addToCart as addToCartDb } from "@/lib/db";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export function WishlistItems() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const items = await getWishlistItems(user.uid);
        setWishlistItems(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user) return;
    try {
      await removeFromWishlist(user.uid, productId);
      setWishlistItems(items => items.filter(item => item.id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const addToCart = async (product: Product) => {
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
        productId: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.imageBase64 || "/placeholder.svg",
      };

      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        const existingItemIndex = existingItems.findIndex(
          (item: any) => item.productId === cartItem.productId
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += 1;
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
        description: `1 × ${product.title} added to your cart.`,
      });
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  if (!wishlistItems.length) {
    return <div>Your wishlist is empty</div>;
  }

  return (
    <div className="space-y-4">
      {wishlistItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={item.imageBase64 || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
            <p className="font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => addToCart(item)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRemoveFromWishlist(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}