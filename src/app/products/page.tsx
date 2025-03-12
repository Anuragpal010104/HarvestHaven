"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Edit, Plus, Trash } from "lucide-react"
import { SellerLayout } from "@/app/seller/seller-layout";

export default function SellerProducts() {
//   const { toast } = useToast()
  const [products, setProducts] = useState(initialProducts)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "/placeholder.svg?height=200&width=200",
  })

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: (products.length + 1).toString(),
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "/placeholder.svg?height=200&width=200",
    })
    setIsAddProductOpen(false)

    // toast({
    // //   title: "Product added",
    //   description: "Your product has been added successfully.",
    // })
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))

    // toast({
    //   title: "Product deleted",
    //   description: "Your product has been deleted successfully.",
    // })
  }

  return (
    <SellerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new organic product to your store.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Organic Avocados"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Fresh, ripe avocados grown without pesticides"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="4.99"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    defaultValue={newProduct.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
                      <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                      <SelectItem value="pantry">Pantry Items</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock</p>
                    <p className="text-xl font-bold">{product.stock}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SellerLayout>
  )
}

const initialProducts = [
  {
    id: "1",
    name: "Organic Avocados",
    description: "Fresh, ripe avocados grown without pesticides",
    price: 4.99,
    stock: 50,
    category: "fruits",
    image: "https://images.pexels.com/photos/5454020/pexels-photo-5454020.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    name: "Raw Honey",
    description: "Pure, unfiltered honey from organic beekeepers",
    price: 8.99,
    stock: 30,
    category: "pantry",
    image: "https://images.pexels.com/photos/7990484/pexels-photo-7990484.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    name: "Organic Quinoa",
    description: "Protein-rich ancient grain, sustainably farmed",
    price: 6.49,
    stock: 45,
    category: "pantry",
    image: "https://images.pexels.com/photos/1640767/pexels-photo-1640767.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

