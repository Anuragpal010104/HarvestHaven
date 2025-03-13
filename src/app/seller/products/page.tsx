"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { Edit, Plus, Trash } from "lucide-react";
import { SellerLayout } from "@/app/seller/seller-layout";
import { addProduct, getProductsBySeller, deleteProduct, Product } from "@/lib/db";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SellerProducts() {
  const router = useRouter();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null as File | null,
  });

  // Define available categories
  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Pantry Items",
    "Other",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setSeller(user);
          const sellerProducts = await getProductsBySeller(user.uid);
          setProducts(sellerProducts);
        } catch (error) {
          console.error("Error loading products:", error);
          router.push("/login");
        }
      } else {
        setSeller(null);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAddProduct = async () => {
    if (!seller) {
      alert("You must be logged in to add a product.");
      return;
    }

    setLoading(true);
    try {
      const productToAdd = {
        sellerId: seller.uid,
        title: newProduct.title,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
        category: newProduct.category,
      };

      const newProductId = await addProduct(productToAdd, newProduct.image || undefined);
      
      const updatedProducts = await getProductsBySeller(seller.uid);
      setProducts(updatedProducts);
      
      setNewProduct({ 
        title: "", 
        description: "", 
        price: "", 
        category: "", 
        stock: "", 
        image: null 
      });
      setIsAddProductOpen(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerLayout>
      <div className="p-4 md:p-8 pt-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Products</h2>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button disabled={loading}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Product Name</Label>
                  <Input 
                    id="title" 
                    value={newProduct.title} 
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} 
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newProduct.description} 
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={newProduct.stock} 
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} 
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Product Image (max 1MB)</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files?.[0] || null })} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddProductOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddProduct}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {product.imageBase64 && (
                  <img 
                    src={product.imageBase64} 
                    alt={product.title} 
                    className="max-w-full h-auto"
                  />
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleDeleteProduct(product.id)} 
                  variant="destructive"
                  disabled={loading}
                >
                  <Trash />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SellerLayout>
  );
}