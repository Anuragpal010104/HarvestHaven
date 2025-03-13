"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, RefreshCw } from "lucide-react"

export function RecentOrdersList() {
  const [orders] = useState([
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
  ])

  return (
    <div>
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
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
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-center">
        <Link href="/dashboard/orders">
          <Button variant="outline">View All Orders</Button>
        </Link>
      </div>
    </div>
  )
}

