"use client";

import { Sidebar } from "@/app/pages/sellers/sellerDashboard/Sidebar";
import { useEffect, useState } from "react";
// import { Header } from "@/app/pages/sellerDashboard/Header"
import { Analytics } from "@/app/pages/sellers/sellerDashboard/Analytics";
import { Earnings } from "@/app/pages/sellers/sellerDashboard/Earnings";
import { Messages } from "@/app/pages/sellers/sellerDashboard/Messages";
import { Orders } from "@/app/pages/sellers/sellerDashboard/Orders";
import { Overview } from "@/app/pages/sellers/sellerDashboard/Overview";
import { Reviews } from "@/app/pages/sellers/sellerDashboard/Reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSellerTotalEarnings } from "@/server.actions/seller-dashboard.actions";

export default function SellerDashboard() {
  const [sellerData, setSellerData] = useState<{
    username: string | null;
    totalEarnings: number | null;
    freelancerRatings:
      | {
          id: number;
          createdAt: Date;
          rating: number;
          buyerId: string;
          sellerId: string;
          serviceId: number;
          review: string | null;
        }[]
      | null; // Allow it to be an array or null
  } | null>(null);

  const [error, setError] = useState<string | null>(null); // Allow string or null

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const data = await getSellerTotalEarnings();
        setSellerData(data);
      } catch (err) {
        setError((err as Error).message); // Handle error appropriately
      }
    };

    fetchEarnings();
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* <Header /> */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview sellerData={sellerData} />
          </TabsContent>
          <TabsContent value="orders">
            <Orders />
          </TabsContent>
          <TabsContent value="earnings">
            <Earnings />
          </TabsContent>
          <TabsContent value="messages">
            <Messages />
          </TabsContent>
          <TabsContent value="reviews">
            <Reviews sellerData={sellerData} />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
