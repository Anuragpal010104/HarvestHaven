"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SellerLayout } from "@/app/seller/seller-layout"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { ArrowDown, ArrowUp, DollarSign, ShoppingBag, Users } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")

  return (
    <SellerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button>Download Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,231.89</div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  20.1%
                </div>
                <div className="text-xs text-muted-foreground">from last month</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  8.2%
                </div>
                <div className="text-xs text-muted-foreground">from last month</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12.5%
                </div>
                <div className="text-xs text-muted-foreground">from last month</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-red-500 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  0.5%
                </div>
                <div className="text-xs text-muted-foreground">from last month</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Your revenue trends for the selected period</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart
                    data={[
                      { name: "Jan", value: 2500 },
                      { name: "Feb", value: 1800 },
                      { name: "Mar", value: 3200 },
                      { name: "Apr", value: 4200 },
                      { name: "May", value: 4800 },
                      { name: "Jun", value: 3800 },
                    ]}
                    xAxisKey="name"
                    yAxisKey="value"
                    height={350}
                    className="mt-4"
                    showTooltip={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                    valueFormatter={(value: number) => `$${value}`}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Distribution of sales across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={[
                      { name: "Fruits & Vegetables", value: 35 },
                      { name: "Dairy & Eggs", value: 25 },
                      { name: "Pantry Items", value: 30 },
                      { name: "Other", value: 10 },
                    ]}
                    valueFormatter={(value: number) => `${value}%`}
                    height={300}
                    className="mt-4"
                    showTooltip={true}
                    showLegend={true}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Your best-selling products by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { name: "Organic Avocados", value: 1200 },
                      { name: "Raw Honey", value: 900 },
                      { name: "Organic Quinoa", value: 800 },
                      { name: "Free-Range Eggs", value: 750 },
                      { name: "Olive Oil", value: 600 },
                    ]}
                    xAxisKey="name"
                    yAxisKey="value"
                    height={350}
                    className="mt-4"
                    showTooltip={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                    valueFormatter={(value: number) => `$${value}`}
                    layout="vertical"
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>New customers over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart
                    data={[
                      { name: "Jan", value: 5 },
                      { name: "Feb", value: 3 },
                      { name: "Mar", value: 7 },
                      { name: "Apr", value: 4 },
                      { name: "May", value: 8 },
                      { name: "Jun", value: 6 },
                    ]}
                    xAxisKey="name"
                    yAxisKey="value"
                    height={350}
                    className="mt-4"
                    showTooltip={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analysis</CardTitle>
                <CardDescription>Detailed breakdown of your sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Sales analysis charts and data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Detailed analysis of your product performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Product performance charts and data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Detailed analysis of your customer behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Customer insights charts and data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  )
}

