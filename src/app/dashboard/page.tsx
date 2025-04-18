"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import { UserLayout } from "@/app/dashboard/user-layout";
import { RecentOrdersList } from "@/app/dashboard/components/recent-orders-list";
import { useAuth } from "@/lib/AuthContext";

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/products">
              <Button size="sm" className="w-full sm:w-auto">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 in the last month</p>
            </CardContent>
          </Card>
          {/* Add other cards */}
        </div>

        <Tabs defaultValue="recent-orders" className="space-y-4 w-full">
          <TabsList className="flex flex-wrap justify-start gap-2">
            <TabsTrigger value="recent-orders" className="text-xs sm:text-sm">Recent Orders</TabsTrigger>
            <TabsTrigger value="addresses" className="text-xs sm:text-sm">Saved Addresses</TabsTrigger>
            <TabsTrigger value="wishlist" className="text-xs sm:text-sm">Wishlist</TabsTrigger>
          </TabsList>
          <TabsContent value="recent-orders" className="space-y-4 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your recent purchases and their status</CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <RecentOrdersList />
              </CardContent>
            </Card>
          </TabsContent>
          {/* Add other TabsContent */}
        </Tabs>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Account Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Personal Information</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p><span className="font-medium">Name:</span> {user.displayName || "John Doe"}</p>
                  <p><span className="font-medium">Email:</span> {user.email || "john.doe@example.com"}</p>
                  <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-600 text-xs sm:text-sm">
                  Edit Profile
                </Button>
              </div>
              {/* Add preferences section */}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}