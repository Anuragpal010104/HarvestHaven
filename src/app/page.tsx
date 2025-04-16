"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ShoppingCart, Star, Heart } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { getAllProducts, Product, addToCart, addToWishlist } from "@/lib/db";
import { auth } from "@/lib/firebase";

export default function Home() {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        // Show only first 3 products as featured (or you could add a 'featured' field in Firestore)
        setProducts(fetchedProducts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load featured products");
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Pure Organic Products for a Healthier Life
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Discover our range of certified organic products sourced directly from trusted farmers and producers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
              <Image
                src="https://images.pexels.com/photos/767240/pexels-photo-767240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Organic products"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                Featured Products
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Best Sellers</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most popular organic products loved by our customers.
              </p>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading featured products...</div>
          ) : (
            <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="h-full flex flex-col transition-shadow hover:shadow-xl rounded-xl">
                <Link href={`/products/${product.id}`} className="block relative group">
                  <div className="relative h-60 overflow-hidden rounded-t-xl">
                    <Image
                      src={product.imageBase64 || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
    
                  <div className="mt-4 flex flex-col gap-2 flex-grow justify-end">
                    <span className="font-bold text-lg text-green-600">${product.price.toFixed(2)}</span>
                    <div className="flex flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full flex-1 transition-all duration-200 hover:bg-green-600 hover:text-white"
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
                        className="rounded-full flex-1 transition-all duration-200 hover:bg-red-500 hover:text-white"
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
          )}
          <div className="flex justify-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {/* Why Choose Us */}
<section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          We're committed to providing the highest quality organic products.
        </p>
      </div>
    </div>
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white mx-auto w-full max-w-sm">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4 flex-shrink-0">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm md:text-base flex-grow">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're committed to providing the highest quality organic products.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}

const features = [
  {
    title: "100% Certified Organic",
    description: "All our products are certified organic, ensuring they meet the highest standards.",
  },
  {
    title: "Direct from Farmers",
    description: "We source directly from organic farmers, ensuring fair prices and fresh products.",
  },
  {
    title: "Eco-Friendly Packaging",
    description: "Our packaging is biodegradable and made from recycled materials.",
  },
];