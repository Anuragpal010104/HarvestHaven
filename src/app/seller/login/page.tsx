//app/seller/login/page.tsx
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
import { auth } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function SellerLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Seller login successful", { description: "Welcome to your seller dashboard!" })
      router.push("/seller/dashboard")
    } catch (error: unknown) {
      let message = "An unexpected error occurred."
      if (error instanceof FirebaseError) {
        message = error.message
        if (error.code === "auth/wrong-password") {
          message = "Incorrect password."
        } else if (error.code === "auth/user-not-found") {
          message = "No seller found with this email."
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email format."
        }
      }
      toast.error("Login failed", { description: message })
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
          <CardTitle className="text-2xl font-bold text-center">Seller Login</CardTitle>
          <CardDescription className="text-center">Login to manage your organic products</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seller@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/seller/forgot-password" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Don&apos;t have a seller account?{" "}
            <Link href="/seller/register" className="text-green-600 hover:underline">
              Register as a seller
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