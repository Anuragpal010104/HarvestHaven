"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserLayout } from "@/app/dashboard/user-layout"
import { Eye, RefreshCw, Search } from "lucide-react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const orders = [
    {
      id: "ORD-2023-1001",
      date: "May 15, 2023",
      total: 78.99,
      status: "Delivered",
      items: 4,
    },
    {
      id: "ORD-2023-0932",
      date: "April 28, 2023",
      total: 42.5,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-2023-0875",
      date: "April 10, 2023",
      total: 124.95,
      status: "Delivered",
      items: 6,
    },
    {
      id: "ORD-2023-0791",
      date: "March 22, 2023",
      total: 56.75,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-2023-0645",
      date: "February 14, 2023",
      total: 89.99,
      status: "Delivered",
      items: 5,
    },
    {
      id: "ORD-2023-1045",
      date: "May 30, 2023",
      total: 35.25,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-2023-1032",
      date: "May 25, 2023",
      total: 67.8,
      status: "Shipped",
      items: 3,
    },
    {
      id: "ORD-2023-0999",
      date: "May 10, 2023",
      total: 112.45,
      status: "Delivered",
      items: 7,
    },
    {
      id: "ORD-2023-0950",
      date: "May 2, 2023",
      total: 29.99,
      status: "Delivered",
      items: 1,
    },
    {
      id: "ORD-2023-0900",
      date: "April 20, 2023",
      total: 45.5,
      status: "Delivered",
      items: 2,
    },
  ]

  const filterByDate = (date: string | number | Date, filter: string) => {
    const orderDate = new Date(date)
    const now = new Date()

    switch (filter) {
      case "last30":
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return orderDate >= thirtyDaysAgo
      case "last3months":
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(now.getMonth() - 3)
        return orderDate >= threeMonthsAgo
      case "last6months":
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 6)
        return orderDate >= sixMonthsAgo
      default:
        return true
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      (searchTerm === "" || order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (dateFilter === "all" || filterByDate(order.date, dateFilter)),
  )

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
          <div className="flex items-center space-x-2">
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">Lifetime orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((order) => filterByDate(order.date, "last30")).length}
              </div>
              <p className="text-xs text-muted-foreground">In the last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Across all orders</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by order ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last3months">Last 3 Months</SelectItem>
                    <SelectItem value="last6months">Last 6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No orders found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${order.status === "Delivered" ? "bg-green-50 text-green-700" : ""}
                            ${order.status === "Shipped" ? "bg-blue-50 text-blue-700" : ""}
                            ${order.status === "Processing" ? "bg-yellow-50 text-yellow-700" : ""}
                            ${order.status === "Cancelled" ? "bg-red-50 text-red-700" : ""}
                          `}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/orders/${order.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View order</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                            <span className="sr-only">Reorder</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}

