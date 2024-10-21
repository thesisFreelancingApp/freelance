"use client"

import { useState } from "react"
import { Sidebar } from "@/app/pages/sellerDashboard/Sidebar"
// import { Header } from "@/app/pages/sellerDashboard/Header"
import { Overview } from "@/app/pages/sellerDashboard/Overview"
import { Orders } from "@/app/pages/sellerDashboard/Orders"
import { Earnings } from "@/app/pages/sellerDashboard/Earnings"
import { Messages } from "@/app/pages/sellerDashboard/Messages"
import { Reviews } from "@/app/pages/sellerDashboard/Reviews"
import { Analytics } from "@/app/pages/sellerDashboard/Analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* <Header /> */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Overview /></TabsContent>
          <TabsContent value="orders"><Orders /></TabsContent>
          <TabsContent value="earnings"><Earnings /></TabsContent>
          <TabsContent value="messages"><Messages /></TabsContent>
          <TabsContent value="reviews"><Reviews /></TabsContent>
          <TabsContent value="analytics"><Analytics /></TabsContent>
        </Tabs>
      </main>
    </div>
  )
}