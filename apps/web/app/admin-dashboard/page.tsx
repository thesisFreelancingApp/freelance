'use client'

import * as React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircledIcon, CircleIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'
import { Bell, ChevronDown, CreditCard, DollarSign, Download, LayoutDashboard, LogOut, MessageSquare, PieChart, Settings, Star, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@radix-ui/react-label'

// Dummy data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'USER', lastLogin: '2023-04-01', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'ADMIN', lastLogin: '2023-04-02', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'USER', lastLogin: '2023-04-03', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'USER', lastLogin: '2023-04-04', status: 'Active' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'ADMIN', lastLogin: '2023-04-05', status: 'Active' },
]

const services = [
  { id: 1, name: 'Web Development', category: 'IT & Programming', status: 'Active', price: '$500', rating: 4.8 },
  { id: 2, name: 'Logo Design', category: 'Design & Creative', status: 'Pending Review', price: '$100', rating: 4.5 },
  { id: 3, name: 'Content Writing', category: 'Writing & Translation', status: 'Active', price: '$50', rating: 4.7 },
  { id: 4, name: 'Video Editing', category: 'Video & Animation', status: 'Disabled', price: '$200', rating: 4.2 },
  { id: 5, name: 'Social Media Management', category: 'Digital Marketing', status: 'Active', price: '$300', rating: 4.6 },
]

const orders = [
  { id: 1, service: 'Web Development', buyer: 'Alice Johnson', seller: 'Bob Smith', amount: 500, status: 'COMPLETED' },
  { id: 2, service: 'Logo Design', buyer: 'Charlie Brown', seller: 'Diana Prince', amount: 100, status: 'IN_PROGRESS' },
  { id: 3, service: 'Content Writing', buyer: 'Ethan Hunt', seller: 'Alice Johnson', amount: 200, status: 'PENDING' },
  { id: 4, service: 'Video Editing', buyer: 'Bob Smith', seller: 'Charlie Brown', amount: 300, status: 'COMPLETED' },
  { id: 5, service: 'Social Media Management', buyer: 'Diana Prince', seller: 'Ethan Hunt', amount: 400, status: 'IN_PROGRESS' },
]

const disputes = [
  { id: 1, order: 'Web Development', disputeBy: 'Alice Johnson', status: 'OPEN', date: '2023-04-01' },
  { id: 2, order: 'Logo Design', disputeBy: 'Charlie Brown', status: 'IN_PROGRESS', date: '2023-04-02' },
  { id: 3, order: 'Content Writing', disputeBy: 'Ethan Hunt', status: 'RESOLVED', date: '2023-04-03' },
  { id: 4, order: 'Video Editing', disputeBy: 'Bob Smith', status: 'OPEN', date: '2023-04-04' },
  { id: 5, order: 'Social Media Management', disputeBy: 'Diana Prince', status: 'IN_PROGRESS', date: '2023-04-05' },
]

const messages = [
  { id: 1, from: 'Alice Johnson', message: 'Hello, I have a question about my order.', time: '10:30 AM' },
  { id: 2, from: 'Bob Smith', message: 'Can you review my latest submission?', time: '11:45 AM' },
  { id: 3, from: 'Charlie Brown', message: 'I need help with my account settings.', time: '1:15 PM' },
  { id: 4, from: 'Diana Prince', message: 'When will my order be completed?', time: '2:30 PM' },
  { id: 5, from: 'Ethan Hunt', message: 'Id like to report a bug on the platform.', time: '3:45 PM' },
]

const reviews = [
  { id: 1, service: 'Web Development', reviewer: 'Alice Johnson', rating: 5, comment: 'Excellent service!' },
  { id: 2, service: 'Logo Design', reviewer: 'Bob Smith', rating: 4, comment: 'Good work, but took longer than expected.' },
  { id: 3, service: 'Content Writing', reviewer: 'Charlie Brown', rating: 5, comment: 'Very professional and quick.' },
  { id: 4, service: 'Video Editing', reviewer: 'Diana Prince', rating: 3, comment: 'Decent work, but needs improvement.' },
  { id: 5, service: 'Social Media Management', reviewer: 'Ethan Hunt', rating: 5, comment: 'Outstanding results!' },
]

const analyticsData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
]

export default function AdminDashboard() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <LayoutDashboard className="mr-2 h-6 w-6" />
          {/* <h2 className="text-lg font-semibold">Admin Dashboard</h2> */}
          <div className="ml-auto flex items-center space-x-4">
            {/* <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">shadcn</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
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
                    Active Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Disputes
                  </CardTitle>
                  <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
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
                    <BarChart data={analyticsData}>
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
                        tickFormatter={(value) => 
                          `$${value.toLocaleString()}`
                        }
                      />
                      <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Disputes</CardTitle>
                  <CardDescription>
                    There are {disputes.length} disputes requiring attention.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {disputes.map((dispute) => (
                        <div className="flex items-center" key={dispute.id}>
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{dispute.disputeBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {dispute.order}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Disputed by {dispute.disputeBy}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            {dispute.status === 'OPEN' && (
                              <Badge variant="secondary">Open</Badge>
                            )}
                            {dispute.status === 'IN_PROGRESS' && (
                              <Badge variant="default">In Progress</Badge>
                            )}
                            {dispute.status === 'RESOLVED' && (
                              <Badge variant="outline">Resolved</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, roles, and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Manage services offered on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              service.status === 'Active'
                                ? 'default'
                                : service.status === 'Pending Review'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{service.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {service.rating}
                            <Star className="ml-1 h-4 w-4 fill-primary text-primary" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">Edit</Button>
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
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.buyer}</TableCell>
                        <TableCell>{order.seller}</TableCell>
                        <TableCell>${order.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'COMPLETED'
                                ? 'default'
                                : order.status === 'IN_PROGRESS'
                                ? 'secondary'
                                : 'outline'
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
          </TabsContent>
          <TabsContent value="disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Resolution</CardTitle>
                <CardDescription>
                  Manage and resolve user disputes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dispute ID</TableHead>
                      <TableHead>Related Order</TableHead>
                      <TableHead>Raised By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.id}</TableCell>
                        <TableCell>{dispute.order}</TableCell>
                        <TableCell>{dispute.disputeBy}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              dispute.status === 'OPEN'
                                ? 'destructive'
                                : dispute.status === 'IN_PROGRESS'
                                ? 'default'
                                : 'outline'
                            }
                          >
                            {dispute.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{dispute.date}</TableCell>
                        <TableCell>
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
                <CardTitle>Message Center</CardTitle>
                <CardDescription>
                  View and respond to user messages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{message.from}</p>
                          <p className="text-sm text-muted-foreground">{message.message}</p>
                          <p className="text-xs text-muted-foreground">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Reviews</CardTitle>
                <CardDescription>
                  Manage and moderate user reviews.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.service}</TableCell>
                        <TableCell>{review.reviewer}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {review.rating}
                            <Star className="ml-1 h-4 w-4 fill-primary text-primary" />
                          </div>
                        </TableCell>
                        <TableCell>{review.comment}</TableCell>
                        <TableCell>
                          <Button variant="ghost">Moderate</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>
                  View detailed analytics and reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={analyticsData}>
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
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Manage global platform settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Platform Name</Label>
                      <Input id="name" placeholder="Enter platform name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fee">Platform Fee (%)</Label>
                      <Input id="fee" placeholder="Enter platform fee percentage" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Input id="currency" placeholder="Enter default currency" />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}