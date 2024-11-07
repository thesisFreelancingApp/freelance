<<<<<<< HEAD
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
=======
'use client'

import { useState } from 'react'
import { ChevronDown, MoreHorizontal, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
<<<<<<< HEAD
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getOrders } from "@/server.actions/dashboard/orders.action";
import type { OrderType } from "@/server.actions/dashboard/orders.action";

// const orders = [
//   {
//     id: 1,
//     service: "Web Development",
//     buyer: "Alice Johnson",
//     seller: "Bob Smith",
//     amount: 500,
//     status: "COMPLETED",
//   },
//   {
//     id: 2,
//     service: "Logo Design",
//     buyer: "Charlie Brown",
//     seller: "Diana Prince",
//     amount: 100,
//     status: "IN_PROGRESS",
//   },
//   {
//     id: 3,
//     service: "Content Writing",
//     buyer: "Ethan Hunt",
//     seller: "Alice Johnson",
//     amount: 200,
//     status: "PENDING",
//   },
//   {
//     id: 4,
//     service: "Video Editing",
//     buyer: "Bob Smith",
//     seller: "Charlie Brown",
//     amount: 300,
//     status: "COMPLETED",
//   },
//   {
//     id: 5,
//     service: "Social Media Management",
//     buyer: "Diana Prince",
//     seller: "Ethan Hunt",
//     amount: 400,
//     status: "IN_PROGRESS",
//   },
// ];

export function OrdersTab() {
  const [ordersData, setOrdersData] = useState<OrderType[]>();

  useEffect(() => {
    async function getOrdersData() {
      const data = await getOrders();
      setOrdersData(data);
      console.log(data);
    }
    getOrdersData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          View and manage orders on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.service}</TableCell>
                <TableCell>{order.buyer}</TableCell>
                <TableCell>{order.seller}</TableCell>
                <TableCell>${order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "COMPLETED"
                        ? "default"
                        : order.status === "IN_PROGRESS"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
=======
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dummy data for orders
const orders = [
  { id: 'ORD001', buyer: 'Alice Johnson', seller: 'David Lee', amount: 150, status: 'COMPLETED', date: '2023-05-15' },
  { id: 'ORD002', buyer: 'Bob Smith', seller: 'Eva Green', amount: 200, status: 'IN_PROGRESS', date: '2023-05-16' },
  { id: 'ORD003', buyer: 'Charlie Brown', seller: 'Frank White', amount: 100, status: 'PENDING', date: '2023-05-17' },
  { id: 'ORD004', buyer: 'Diana Prince', seller: 'George Black', amount: 300, status: 'COMPLETED', date: '2023-05-18' },
  { id: 'ORD005', buyer: 'Ethan Hunt', seller: 'Helen Red', amount: 250, status: 'CANCELLED', date: '2023-05-19' },
]

export default function OrdersTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Filter orders based on search term, status, and date range
  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || order.status === statusFilter) &&
    (!startDate || order.date >= startDate) &&
    (!endDate || order.date <= endDate)
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.buyer}</TableCell>
              <TableCell>{order.seller}</TableCell>
              <TableCell>${order.amount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
