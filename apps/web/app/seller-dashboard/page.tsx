"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  BarChart3,
  Bell,
  MessageSquare,
  Package,
  Plus,
  Search,
  Star,
  DollarSign,
  Briefcase,
  Users,
} from "lucide-react";

// Sample data based on the provided schema
const revenueData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2600 },
  { name: "May", total: 3100 },
  { name: "Jun", total: 2900 },
];

const servicesData = [
  { id: "1", name: "Logo Design", category: "Design", orders: 12, rating: 4.8 },
  {
    id: "2",
    name: "Website Development",
    category: "Programming",
    orders: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Content Writing",
    category: "Writing",
    orders: 15,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Video Editing",
    category: "Video & Animation",
    orders: 6,
    rating: 4.6,
  },
  {
    id: "5",
    name: "SEO Optimization",
    category: "Digital Marketing",
    orders: 10,
    rating: 4.8,
  },
];

const activeOrdersData = [
  {
    id: "1",
    buyer: "Olivia Martin",
    service: "Logo Design",
    status: "In Progress",
    dueDate: "2023-07-15",
  },
  {
    id: "2",
    buyer: "Jackson Lee",
    service: "Website Development",
    status: "Revision",
    dueDate: "2023-07-18",
  },
  {
    id: "3",
    buyer: "Isabella Nguyen",
    service: "Content Writing",
    status: "Pending",
    dueDate: "2023-07-20",
  },
];

const messagesData = [
  {
    id: "1",
    from: "Olivia Martin",
    subject: "Logo Design Feedback",
    preview: "Hi, I've reviewed the initial...",
    time: "10:23 AM",
  },
  {
    id: "2",
    from: "Jackson Lee",
    service: "Website Development",
    preview: "Can we discuss the responsive...",
    time: "Yesterday",
  },
  {
    id: "3",
    from: "Isabella Nguyen",
    service: "Content Writing",
    preview: "I have a question about the...",
    time: "2 days ago",
  },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredServices = servicesData.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (serviceFilter === "all" ||
        service.category.toLowerCase() === serviceFilter.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, John!</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="orders">Active Orders</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Orders
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Seller Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
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
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Services</CardTitle>
                <CardDescription>
                  Your best-selling gigs this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {servicesData.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/placeholder-${service.category.toLowerCase()}.jpg`}
                          alt={service.name}
                        />
                        <AvatarFallback>{service.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.category}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {service.orders} orders
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Services</CardTitle>
              <CardDescription>Create and manage your gigs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[300px]"
                  />
                  <Select
                    value={serviceFilter}
                    onValueChange={setServiceFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="video & animation">
                        Video & Animation
                      </SelectItem>
                      <SelectItem value="digital marketing">
                        Digital Marketing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Gig
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.orders}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-400" />
                          {service.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost">Edit</Button>
                        <Button variant="ghost" className="text-red-500">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Manage your ongoing gigs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeOrdersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "In Progress"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messagesData.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted"
                  >
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={message.from}
                      />
                      <AvatarFallback>
                        {message.from
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{message.from}</p>
                      <p className="text-sm text-muted-foreground">
                        {message.subject}
                      </p>
                      <p className="text-sm">{message.preview}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {message.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> View All Messages
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Total Earnings</h4>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <Progress value={75} className="mt-2" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    75% of your earnings goal
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    Pending Clearance
                  </h4>
                  <div className="text-2xl font-bold">$3,500.00</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Expected to clear in 7 days
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    Available for Withdrawal
                  </h4>
                  <div className="text-2xl font-bold">$12,750.50</div>
                  <Button className="mt-2">Withdraw Funds</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
