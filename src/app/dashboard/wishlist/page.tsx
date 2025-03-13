"use client"

import { UserLayout } from "@/app/dashboard/user-layout"
import { WishlistItems } from "@/app/dashboard/components/wishlist-items"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WishlistPage() {
  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Wishlist</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saved Items</CardTitle>
            <CardDescription>Products you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <WishlistItems />
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}

