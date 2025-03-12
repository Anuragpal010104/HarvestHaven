//seller/register/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Leaf } from "lucide-react"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function SellerRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("Registration failed", { description: "Passwords do not match!" })
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Registration failed", { description: "Invalid email format." })
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      console.log("Seller created:", userCredential.user.uid)

      const sellerData = {
        name: formData.name,
        email: formData.email,
        role: "seller",
      }
      console.log("Writing to Firestore:", sellerData)

      await setDoc(doc(db, "sellers", userCredential.user.uid), sellerData)
      console.log("Firestore write successful")

      toast.success("Registration successful", { description: "Welcome to the seller portal!" })
      router.push("/seller/dashboard")
    } catch (error: any) {
      let message = error.message
      if (error.code === "auth/email-already-in-use") {
        message = "Email is already in use."
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters."
      }
      console.error("Error details:", error)
      toast.error("Registration failed", { description: message })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center py-12 md:py-24">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl">Seller Portal</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Seller Registration</CardTitle>
          <CardDescription className="text-center">Create an account to start selling organic products</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seller@example.com" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Already have a seller account?{" "}
            <Link href="/seller/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </div>
          <div className="text-sm text-center text-gray-500">
            <Link href="/login" className="text-green-600 hover:underline">
              Back to buyer login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}