"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SellerLayout } from "@/app/seller/seller-layout"
import { Download, Search, User } from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      orders: 12,
      spent: 459.99,
      lastOrder: "May 15, 2023",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      orders: 8,
      spent: 324.5,
      lastOrder: "April 28, 2023",
      status: "active",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      orders: 5,
      spent: 189.95,
      lastOrder: "April 10, 2023",
      status: "active",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      orders: 3,
      spent: 124.75,
      lastOrder: "March 22, 2023",
      status: "inactive",
    },
    {
      id: 5,
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      orders: 7,
      spent: 289.99,
      lastOrder: "May 5, 2023",
      status: "active",
    },
    {
      id: 6,
      name: "Robert Martinez",
      email: "robert.martinez@example.com",
      orders: 2,
      spent: 79.98,
      lastOrder: "February 14, 2023",
      status: "inactive",
    },
    {
      id: 7,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      orders: 9,
      spent: 345.75,
      lastOrder: "May 20, 2023",
      status: "active",
    },
    {
      id: 8,
      name: "James Thomas",
      email: "james.thomas@example.com",
      orders: 4,
      spent: 156.5,
      lastOrder: "April 5, 2023",
      status: "active",
    },
    {
      id: 9,
      name: "Patricia White",
      email: "patricia.white@example.com",
      orders: 1,
      spent: 49.99,
      lastOrder: "January 30, 2023",
      status: "inactive",
    },
    {
      id: 10,
      name: "John Harris",
      email: "john.harris@example.com",
      orders: 6,
      spent: 234.95,
      lastOrder: "May 12, 2023",
      status: "active",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      (searchTerm === "" ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || customer.status === statusFilter),
  )

  return (
    <SellerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter((customer) => customer.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">+1 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {(
                  customers.reduce((sum, customer) => sum + customer.spent, 0) /
                  customers.reduce((sum, customer) => sum + customer.orders, 0)
                ).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">+$5.25 from last month</p>
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
                    placeholder="Search customers..."
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
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No customers found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=32&width=32&text=${customer.name.charAt(0)}`}
                              alt={customer.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/seller/customers/${customer.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}

