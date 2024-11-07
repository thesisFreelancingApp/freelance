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
import { useEffect, useState } from "react";
import { getServices } from "@/server.actions/dashboard/services.action";
import type { ServiceType } from "@/server.actions/dashboard/services.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// const services = [
//   {
//     id: 1,
//     name: "Web Development",
//     category: "IT & Programming",
//     status: "Active",
//     price: "$500",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "Logo Design",
//     category: "Design & Creative",
//     status: "Pending Review",
//     price: "$100",
//     rating: 4.5,
//   },
//   {
//     id: 3,
//     name: "Content Writing",
//     category: "Writing & Translation",
//     status: "Active",
//     price: "$50",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Video Editing",
//     category: "Video & Animation",
//     status: "Disabled",
//     price: "$200",
//     rating: 4.2,
//   },
//   {
//     id: 5,
//     name: "Social Media Management",
//     category: "Digital Marketing",
//     status: "Active",
//     price: "$300",
//     rating: 4.6,
//   },
// ];

export function ServicesTab() {
  const [servicesData, setServicesData] = useState<ServiceType[]>();

  useEffect(() => {
    async function getServicesData() {
      const data = await getServices();
      setServicesData(data);
      console.log(data);
    }
    getServicesData();
  }, []);

  return (
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
            {servicesData?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      service.status === "Active"
                        ? "default"
                        : service.status === "Pending Review"
                          ? "secondary"
                          : "destructive"
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

// Dummy data for services
const services = [
  { id: 1, name: 'Web Development', category: 'Programming', creator: 'Alice Johnson', status: 'Active' },
  { id: 2, name: 'Logo Design', category: 'Design', creator: 'Bob Smith', status: 'Active' },
  { id: 3, name: 'Content Writing', category: 'Writing', creator: 'Charlie Brown', status: 'Inactive' },
  { id: 4, name: 'SEO Optimization', category: 'Marketing', creator: 'David Lee', status: 'Active' },
  { id: 5, name: 'Video Editing', category: 'Multimedia', creator: 'Eva Green', status: 'Active' },
]

export default function ServicesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Filter services based on search term, category, and status
  const filteredServices = services.filter(service => 
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     service.creator.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || service.category === categoryFilter) &&
    (statusFilter === 'All' || service.status === statusFilter)
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Services Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Writing">Writing</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Multimedia">Multimedia</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Add New Service</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>{service.creator}</TableCell>
              <TableCell>{service.status}</TableCell>
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
                    <DropdownMenuItem>Edit service</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete service</DropdownMenuItem>
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
