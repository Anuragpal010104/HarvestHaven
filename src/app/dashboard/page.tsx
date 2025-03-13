"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Heart, MapPin, ShoppingBag } from "lucide-react"
import { UserLayout } from "@/app/dashboard/user-layout"
import { RecentOrdersList } from "@/app/dashboard/components/recent-orders-list"
import { SavedAddressList } from "@/app/dashboard/components/saved-address-list"
import { WishlistItems } from "@/app/dashboard/components/wishlist-items"

export default function UserDashboard() {
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Home, Work, and Other</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Added 2 new items recently</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Monthly organic box</p>
            </CardContent>
          </Card>
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

          <TabsContent value="addresses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <SavedAddressList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <WishlistItems />
              </CardContent>
            </Card>
          </TabsContent>
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
                    <span className="font-medium">Name:</span> John Doe
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> john.doe@example.com
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> (555) 123-4567
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-600">
                  Edit Profile
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Preferences</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Newsletter:</span> Subscribed
                  </p>
                  <p>
                    <span className="font-medium">SMS Notifications:</span> Enabled
                  </p>
                  <p>
                    <span className="font-medium">Default Payment:</span> Visa ending in 4242
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-600">
                  Manage Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}

