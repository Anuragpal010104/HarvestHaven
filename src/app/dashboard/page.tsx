"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Heart, MapPin, ShoppingBag } from "lucide-react";
import { UserLayout } from "@/app/dashboard/user-layout";
import { RecentOrdersList } from "@/app/dashboard/components/recent-orders-list";
// import { SavedAddressList } from "@/app/dashboard/components/saved-address-list";
// import { WishlistItems } from "@/app/dashboard/components/wishlist-items";
import { useAuth } from "@/lib/AuthContext"; // Adjust the path to your AuthContext file

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Replace with your login page route
    }
  }, [user, loading, router]);

  // Show a loading state while checking auth
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or custom loading component
  }

  // If no user, return null (the redirect will handle it)
  if (!user) {
    return null;
  }

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 in the last month</p>
            </CardContent>
          </Card>
          {/* ... other cards remain unchanged ... */}
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="recent-orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="recent-orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your recent purchases and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrdersList />
              </CardContent>
            </Card>
          </TabsContent>
          {/* ... other tabs remain unchanged ... */}
        </Tabs>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span> {user.displayName || "John Doe"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email || "john.doe@example.com"}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> (555) 123-4567 {/* Update with real data if available */}
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-600">
                  Edit Profile
                </Button>
              </div>
              {/* ... preferences section remains unchanged ... */}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}