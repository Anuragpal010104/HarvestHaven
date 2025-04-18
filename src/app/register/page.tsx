// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!firstName || !lastName || !email || !password) {
      toast.error("Registration failed", { description: "All fields are required." });
      setIsLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Registration failed", { description: "Invalid email format." });
      setIsLoading(false);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user.uid);
  
      const userData = {
        firstName,
        lastName,
        email,
        role: "buyer",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      // Create users document
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
  
      // Create buyerProfiles document
      const buyerProfileData = {
        shippingAddresses: [],
        wishlist: [],
      };
      await setDoc(doc(db, "buyerProfiles", userCredential.user.uid), buyerProfileData);
  
      // 🎉 Show success toast BEFORE redirecting
      toast.success("Registration successful", {
        description: "Welcome to OrganicMarket!",
      });
  
      setTimeout(() => {
        router.push("/");
      }, 1000); // Small delay for toast visibility
    } catch (error: unknown) {
      let message = "Registration failed. Please try again.";
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          message = "This email is already registered.";
        } else if (error.code === "permission-denied") {
          message = "Permission denied. Check Firestore security rules.";
        } else if (error.code === "invalid-argument") {
          message = "Invalid data sent to Firestore.";
        } else if (error.code === "unauthenticated") {
          message = "User not authenticated.";
        } else {
          message = error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }
      console.error("Error details:", error);
      toast.error("Registration failed", { description: message });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container flex items-center justify-center py-12 md:py-24">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create a buyer account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" name="first-name" type="text" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" name="last-name" type="text" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}