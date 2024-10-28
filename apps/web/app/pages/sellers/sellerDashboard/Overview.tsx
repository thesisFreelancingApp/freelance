"use client";
import { DollarSign, Package, CreditCard, Star } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getSellerTotalEarnings } from "@/server.actions/seller-dashboard.actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

const recentOrders = [
  {
    id: 1,
    client: "Alice Johnson",
    service: "Logo Design",
    status: "In Progress",
    amount: 150,
  },
  {
    id: 2,
    client: "Bob Smith",
    service: "Web Development",
    status: "Completed",
    amount: 500,
  },
  {
    id: 3,
    client: "Charlie Brown",
    service: "SEO Optimization",
    status: "Pending",
    amount: 300,
  },
];

const earningsData = [
  { month: "Jan", earnings: 1000 },
  { month: "Feb", earnings: 1500 },
  { month: "Mar", earnings: 1200 },
  { month: "Apr", earnings: 1800 },
  { month: "May", earnings: 2000 },
  { month: "Jun", earnings: 2400 },
];

type FreelancerRating = {
  id: number;
  createdAt: Date;
  rating: number;
  buyerId: string;
  sellerId: string;
  serviceId: number;
  review: string | null;
};

type SellerData = {
  username: string | null;
  totalEarnings: number | null;
  freelancerRatings: FreelancerRating[] | null; // Allow it to be an array or null
};

interface OverviewProps {
  sellerData: SellerData | null; // Accept sellerData as a prop
}

export function Overview({ sellerData }: OverviewProps) {
  // console.log(sellerData);

  // Calculate average rating
  const averageRating =
    sellerData?.freelancerRatings && sellerData.freelancerRatings.length > 0
      ? (
          sellerData.freelancerRatings.reduce(
            (acc, rating) => acc + rating.rating,
            0,
          ) / sellerData.freelancerRatings.length
        ).toFixed(1) // Calculate average rating
      : null;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-black bg-white border border-gray-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellerData?.totalEarnings !== null
                ? `$${sellerData?.totalEarnings}`
                : "Loading..."}
            </div>
            <p className="text-xs text-gray-600">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="text-black bg-white border border-gray-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="w-4 h-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="text-black bg-white border border-gray-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Completed
            </CardTitle>
            <CreditCard className="w-4 h-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-gray-600">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="text-black bg-white border border-gray-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="w-4 h-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageRating !== null ? averageRating : "N/A"}
            </div>
            <p className="text-xs text-gray-600">+0.1 from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 text-black bg-white border border-gray-300">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-100">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="text-right">
                      ${order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3 text-black bg-white border border-gray-300">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={earningsData}>
                <Bar dataKey="earnings" fill="#3b3b3b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
