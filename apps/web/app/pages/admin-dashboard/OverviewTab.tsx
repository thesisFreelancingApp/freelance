'use client'

import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DollarSign, Users, ShoppingBag, Activity, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 7000 },
  { name: 'Jun', value: 6000 },
  { name: 'Jul', value: 8000 },
]

const userActivityData = [
  { name: 'Mon', active: 4000, new: 2400 },
  { name: 'Tue', active: 3000, new: 1398 },
  { name: 'Wed', active: 2000, new: 9800 },
  { name: 'Thu', active: 2780, new: 3908 },
  { name: 'Fri', active: 1890, new: 4800 },
  { name: 'Sat', active: 2390, new: 3800 },
  { name: 'Sun', active: 3490, new: 4300 },
]

const serviceDistributionData = [
  { name: 'Web Development', value: 400 },
  { name: 'Design', value: 300 },
  { name: 'Marketing', value: 300 },
  { name: 'Writing', value: 200 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const recentOrders = [
  { id: 'ORD001', service: 'Logo Design', buyer: 'Alice Johnson', amount: 150, status: 'Completed' },
  { id: 'ORD002', service: 'Web Development', buyer: 'Bob Smith', amount: 1200, status: 'In Progress' },
  { id: 'ORD003', service: 'Content Writing', buyer: 'Charlie Brown', amount: 80, status: 'Pending' },
  { id: 'ORD004', service: 'SEO Optimization', buyer: 'Diana Prince', amount: 500, status: 'Completed' },
  { id: 'ORD005', service: 'Video Editing', buyer: 'Ethan Hunt', amount: 300, status: 'In Progress' },
]

const topSellers = [
  { name: 'John Doe', avatar: '/placeholder.svg?height=40&width=40', earnings: 5200, services: 24 },
  { name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40', earnings: 4800, services: 22 },
  { name: 'Mike Johnson', avatar: '/placeholder.svg?height=40&width=40', earnings: 4500, services: 20 },
  { name: 'Emily Brown', avatar: '/placeholder.svg?height=40&width=40', earnings: 4200, services: 19 },
]

export function OverviewTab() {
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-blue-200 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-green-200 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-yellow-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-yellow-200 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <Activity className="h-4 w-4 text-red-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-red-200 flex items-center">
              <TrendingDown className="h-4 w-4 mr-1" />
              -5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">User Activity</CardTitle>
            <CardDescription>Active vs New Users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{order.buyer[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{order.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.buyer} - ${order.amount}
                      </p>
                    </div>
                    <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'In Progress' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Service Distribution</CardTitle>
            <CardDescription>Breakdown of service categories</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
                  labelStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              {serviceDistributionData.map((item, index) => (
                <div className="flex items-center" key={item.name}>
                  <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div className="text-sm">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Top Sellers</CardTitle>
            <CardDescription>Best performing sellers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {topSellers.map((seller, index) => (
                  <div key={seller.name} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={seller.avatar} alt={seller.name} />
                      <AvatarFallback>{seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${seller.earnings} - {seller.services} services
                      </p>
                    </div>
                    <Badge variant="secondary">#{index + 1}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Platform Statistics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1 text-sm font-medium">User Satisfaction</div>
                  <div className="text-right font-medium">95%</div>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1 text-sm font-medium">Order Completion Rate</div>
                  <div className="text-right font-medium">88%</div>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1  text-sm font-medium">Dispute Resolution Rate</div>
                  <div className="text-right font-medium">92%</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1 text-sm font-medium">Average Response Time</div>
                  <div className="text-right font-medium">2.5 hours</div>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}