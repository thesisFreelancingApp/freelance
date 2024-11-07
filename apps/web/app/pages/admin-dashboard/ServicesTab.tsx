'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { ChevronDown, MoreHorizontal, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { getServices, deleteService } from '@/server.actions/dashboard/services.action'
import { getAllCategories } from '@/server.actions/category/category.actions'
import { useRouter } from 'next/navigation'

type Services = {
  id: string;
  name: string;
  description: string | null;
  medias?: any;
  isPublic: boolean;
  tags: string[];
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  status: string;

  creator: {
    name: string
    id: string;
    profileId: string;
    sellerRating?: number;
    totalEarnings?: number;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      lastName: string
      firstName: string
      id: string;
      name: string;
    };
    professionalProfile?: {
      id: string;
      expertise: string;
    };
  };

  category: {
    id: number;
    name: string;
    description?: string;
    iconUrl?: string;
  };

  buyers: Array<{
    id: string;
    name: string;
  }>;

  ratings: Array<{
    id: string;
    rating: number;
    comment?: string;
    createdAt: Date;
  }>;

  packages: Array<{
    id: string;
    price: number;
    description: string;
  }>;

  Dispute: Array<{
    id: string;
    description: string;
    createdAt: Date;
    status: string;
  }>;

  Order: Array<{
    id: string;
    amount: number;
    orderDate: Date;
  }>;
};

export default function ServicesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [services, setServices] = useState<Services[]>([]);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]); // State for categories
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  // Fetch services with pagination
  const fetchServices = async (page = 1) => {
    const data = await getServices(page, pageSize);
    //@ts-ignore
    setServices(data.services);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };

  // Fetch categories for the filter dropdown
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories(); // Fetch categories from server
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
    fetchCategories(); // Fetch categories when component mounts
  }, [currentPage]);

  // Filter services based on search term, category, and status
  const filteredServices = services.filter(service => 
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.creator?.name || "").toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || service.category?.name === categoryFilter) &&
    (statusFilter === 'All' || service.status === statusFilter)
  );

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this service?");
      if (confirmed) {
        await deleteService(serviceId);
        fetchServices(currentPage);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

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
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Public</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.category?.name || 'N/A'}</TableCell>
              <TableCell>{`${service.creator?.profile?.firstName || 'Unknown'} ${service.creator?.profile?.lastName || ''}`}</TableCell>
              <TableCell>{service.isPublic.toString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewDetails(service.id)}>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit service</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete service
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="px-4">Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
