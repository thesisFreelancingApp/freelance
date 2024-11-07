<<<<<<< HEAD
'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { DashboardHeader } from './DashboardHeader'
import { OverviewTab } from './OverviewTab'
import { UsersTab } from './UsersTab'
import { ServicesTab } from './ServicesTab'
import { OrdersTab } from './OrdersTab'
import { DisputesTab } from './DisputesTab'
import { MessagesTab } from './MessagesTab'
import { ReviewsTab } from './ReviewsTab'
import { AnalyticsTab } from './AnalyticsTab'
import { SettingsTab } from './SettingsTab'

export function AdminDashboard() {
  return (
    <div className="hidden flex-col md:flex">
      {/* <DashboardHeader /> */}
      <div className="flex-1 space-y-4 p-8 pt-6" style={{ width: '84rem' }}>
      <div className="flex items-center justify-between space-y-2">
=======
"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DashboardHeader } from './DashboardHeader'
import { OverviewTab } from "./OverviewTab";
import {UsersTab} from "./UsersTab";
import ServicesTab from "./ServicesTab";
import OrdersTab from "./OrdersTab";
import DisputesTab from "./DisputesTab";
import { MessagesTab } from "./MessagesTab";
import { ReviewsTab } from "./ReviewsTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { SettingsTab } from "./SettingsTab";
import { WithdrawalRequestsTab } from "./WithdrawalRequestsTab"
// import {getAllOrders} from "@/server.actions/admin/getAuthUserRole"
import { useEffect, useState } from "react";

const AdminDashboard = async () => {
  // const orders = await getAllOrders(); // Call the server action here

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const ordersData = await getAllOrders(); // Call the server action here

//         // If ordersData is undefined, set an empty array; otherwise, set the orders data
//         setOrders(ordersData ?? []); // Update state with the fetched data
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setOrders([]); // Optionally set to empty array in case of error
//       }
//     };

//     fetchOrders();
//   }, []); // Empty dependency array means it only runs on mount

// console.log(orders,"___________________")

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6" style={{ width: "84rem" }}>
        <div className="flex items-center justify-between space-y-2">
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
<<<<<<< HEAD
=======
            <TabsTrigger value="ww">Withdraw</TabsTrigger>
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
<<<<<<< HEAD
          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="users"><UsersTab /></TabsContent>
          <TabsContent value="services"><ServicesTab /></TabsContent>
          <TabsContent value="orders"><OrdersTab /></TabsContent>
          <TabsContent value="disputes"><DisputesTab /></TabsContent>
          <TabsContent value="messages"><MessagesTab /></TabsContent>
          <TabsContent value="reviews"><ReviewsTab /></TabsContent>
          <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
=======
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          <TabsContent value="orders">
            {/* Pass orders to OrdersTab */}
            <OrdersTab  />
          </TabsContent>
          <TabsContent value="ww">
            <WithdrawalRequestsTab />
          </TabsContent>
          <TabsContent value="disputes">
            <DisputesTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
