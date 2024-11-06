import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DollarSign,
  Users,
  CreditCard,
  MessageCircleQuestion,
} from "lucide-react";
import {
  getStats,
  getMonthlyRevenue,
} from "@/server.actions/dashboard/overview.action";
import type {
  OverviewStats,
  MonthlyRevenue,
} from "@/server.actions/dashboard/overview.action";
import { useEffect, useState } from "react";

// const analyticsData = [
//   { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
// ];

// const disputes = [
//   {
//     id: 1,
//     order: "Web Development",
//     disputeBy: "Alice Johnson",
//     status: "OPEN",
//     date: "2023-04-01",
//   },
//   {
//     id: 2,
//     order: "Logo Design",
//     disputeBy: "Charlie Brown",
//     status: "IN_PROGRESS",
//     date: "2023-04-02",
//   },
//   {
//     id: 3,
//     order: "Content Writing",
//     disputeBy: "Ethan Hunt",
//     status: "RESOLVED",
//     date: "2023-04-03",
//   },
//   {
//     id: 4,
//     order: "Video Editing",
//     disputeBy: "Bob Smith",
//     status: "OPEN",
//     date: "2023-04-04",
//   },
//   {
//     id: 5,
//     order: "Social Media Management",
//     disputeBy: "Diana Prince",
//     status: "IN_PROGRESS",
//     date: "2023-04-05",
//   },
// ];

export function OverviewTab() {
  const [overviewData, setOverviewData] = useState<OverviewStats | undefined>();
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>();

  useEffect(() => {
    async function stats() {
      const stats = await getStats();
      const revenue = await getMonthlyRevenue();
      setOverviewData(stats);
      setMonthlyRevenue(revenue);
      console.log(stats, revenue);
    }
    stats();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData?.totalRevenue} DT
            </div>
            <p className="text-xs text-muted-foreground">
              +{overviewData?.totalRevenuePercentageChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData?.activeUsersCount}
            </div>
            <p className="text-xs text-muted-foreground">
              +{overviewData?.activeUsersPercentageChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData?.totalServices}
            </div>
            <p className="text-xs text-muted-foreground">
              +{overviewData?.totalServicesPercentageChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Disputes
            </CardTitle>
            <MessageCircleQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData?.disputesCount}
            </div>
            <p className="text-xs text-muted-foreground">
              +{overviewData?.activeDisputesPercentageChange}% since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyRevenue}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {overviewData?.disputes.map((dispute) => (
                  <div className="flex items-center" key={dispute.id}>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {dispute.initiatorSeller?.profile.firstName?.charAt(
                          0,
                        ) ||
                          dispute.initiatorBuyer?.profile.firstName?.charAt(
                            0,
                          ) ||
                          "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {dispute.service?.name ||
                          dispute.project?.title ||
                          "No associated order"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Disputed by{" "}
                        {dispute.initiatorSeller?.profile.firstName ||
                          dispute.initiatorBuyer?.profile.firstName ||
                          "Unknown"}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge
                        variant={
                          dispute.status === "OPEN"
                            ? "destructive"
                            : dispute.status === "IN_PROGRESS"
                              ? "default"
                              : "outline"
                        }
                      >
                        {dispute.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}