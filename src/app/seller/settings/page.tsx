"use client"

import { useState } from "react"
import { SellerLayout } from "@/app/seller/seller-layout" // Updated import path as per your context
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"

export default function SellerSettingsPage() {
  // const { toast } = useToast()
  const [profileForm, setProfileForm] = useState({
    storeName: "Organic Bliss",
    contactEmail: "contact@organicbliss.com",
    phone: "(555) 987-6543",
    address: "123 Green Lane, Eco City",
  })

  const [paymentForm, setPaymentForm] = useState({
    bankName: "Eco Bank",
    accountNumber: "1234567890",
    routingNumber: "987654321",
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShipping: false,
    flatRate: true,
    flatRateAmount: "5.99",
    processingTime: "1-2 business days",
  })

  const [storePrefs, setStorePrefs] = useState({
    autoAcceptOrders: true,
    showStockLevels: false,
    allowBackorders: false,
  })

  const handleProfileSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // toast({
    //   title: "Profile updated",
    //   description: "Your seller profile has been updated successfully.",
    // })
  }

  const handlePaymentSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // toast({
    //   title: "Payment details updated",
    //   description: "Your payment information has been saved.",
    // })
  }

  const handleShippingChange = (key: string, value: string | boolean) => {
    setShippingSettings({
      ...shippingSettings,
      [key]: value,
    })
    // toast({
    //   title: "Shipping settings updated",
    //   description: "Your shipping preferences have been saved.",
    // })
  }

  const handleStorePrefsChange = (key: string, value: boolean) => {
    setStorePrefs({
      ...storePrefs,
      [key]: value,
    })
    // toast({
    //   title: "Store preferences updated",
    //   description: "Your store settings have been saved.",
    // })
  }

  return (
    <SellerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Seller Settings</h2>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Store Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Settings</TabsTrigger>
            <TabsTrigger value="store">Store Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Store Profile</CardTitle>
                <CardDescription>Update your store details and contact information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      value={profileForm.storeName}
                      onChange={(e) => setProfileForm({ ...profileForm, storeName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={profileForm.contactEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Manage where your earnings will be deposited.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input
                      id="bank-name"
                      value={paymentForm.bankName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, bankName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      value={paymentForm.accountNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, accountNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input
                      id="routing-number"
                      value={paymentForm.routingNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, routingNumber: e.target.value })}
                    />
                  </div>
                  <Button type="submit">Update Payment Details</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure your shipping options and processing times.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Options</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="free-shipping">Free Shipping</Label>
                      <p className="text-sm text-muted-foreground">Offer free shipping on all orders</p>
                    </div>
                    <Switch
                      id="free-shipping"
                      checked={shippingSettings.freeShipping}
                      onCheckedChange={(checked: boolean) => handleShippingChange("freeShipping", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="flat-rate">Flat Rate Shipping</Label>
                      <p className="text-sm text-muted-foreground">Charge a fixed shipping rate</p>
                    </div>
                    <Switch
                      id="flat-rate"
                      checked={shippingSettings.flatRate}
                      onCheckedChange={(checked: boolean) => handleShippingChange("flatRate", checked)}
                    />
                  </div>
                  {shippingSettings.flatRate && (
                    <div className="grid gap-2">
                      <Label htmlFor="flat-rate-amount">Flat Rate Amount ($)</Label>
                      <Input
                        id="flat-rate-amount"
                        type="number"
                        value={shippingSettings.flatRateAmount}
                        onChange={(e) => handleShippingChange("flatRateAmount", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Processing Time</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="processing-time">Order Processing Time</Label>
                    <Input
                      id="processing-time"
                      value={shippingSettings.processingTime}
                      onChange={(e) => handleShippingChange("processingTime", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Store Preferences</CardTitle>
                <CardDescription>Customize how your store operates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-accept">Auto-Accept Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically accept incoming orders
                      </p>
                    </div>
                    <Switch
                      id="auto-accept"
                      checked={storePrefs.autoAcceptOrders}
                      onCheckedChange={(checked: boolean) => handleStorePrefsChange("autoAcceptOrders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-stock">Show Stock Levels</Label>
                      <p className="text-sm text-muted-foreground">
                        Display available stock to customers
                      </p>
                    </div>
                    <Switch
                      id="show-stock"
                      checked={storePrefs.showStockLevels}
                      onCheckedChange={(checked: boolean) => handleStorePrefsChange("showStockLevels", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-backorders">Allow Backorders</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept orders for out-of-stock items
                      </p>
                    </div>
                    <Switch
                      id="allow-backorders"
                      checked={storePrefs.allowBackorders}
                      onCheckedChange={(checked: boolean) => handleStorePrefsChange("allowBackorders", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your store status and data.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">Temporarily Close Store</Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete Store
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  )
}