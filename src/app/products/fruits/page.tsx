"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { getProductsByCategory, Product } from "@/lib/db";

export default function FruitsVegetablesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByCategory("fruits & vegetables");
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching fruits products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="container px-4 py-12 text-center">Loading fruits & vegetables...</div>;
  }

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
      <div className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="h-full transition-all hover:shadow-lg">
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">4.5</span>
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
        ))}
      </div>
    </div>
  );
}