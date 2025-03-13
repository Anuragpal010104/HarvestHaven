"use client"

import { UserLayout } from "@/app/dashboard/user-layout"
import { SavedAddressList } from "@/app/dashboard/components/saved-address-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddressesPage() {
  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Addresses</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Manage your delivery addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <SavedAddressList />
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}

