'use client'

import { useEffect, useState } from 'react'
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
import { DisputeType, getDisputes } from '@/server.actions/dashboard/disputes.action'

export default function DisputesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [disputesData, setDisputesData] = useState<DisputeType[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Fetch disputes when the component is mounted or when page/state changes
    const fetchData = async () => {
      try {
        const disputes = await getDisputes(currentPage, 10, searchTerm, statusFilter);
        setDisputesData(disputes);

        // Assuming you have a way to calculate the total number of pages
        // You might need to fetch the total number of disputes or set it via a backend call
        setTotalPages(5); // Adjust this based on your backend response
      } catch (error) {
        console.error('Error fetching disputes:', error);
      }
    };
    fetchData();
  }, [currentPage, searchTerm, statusFilter]); // Dependencies to refetch when any of these values change

  // Filter disputes based on search term and status
  const filteredDisputes = disputesData?.filter(dispute =>
    (dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     dispute.initiator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     dispute.respondent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     dispute.relatedItem?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || dispute.status === statusFilter)
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Disputes Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search disputes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dispute ID</TableHead>
            <TableHead>Initiator</TableHead>
            <TableHead>Respondent</TableHead>
            <TableHead>Related Item</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDisputes?.length ? (
            filteredDisputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell>{dispute.id}</TableCell>
                <TableCell>{dispute.initiator}</TableCell>
                <TableCell>{dispute.respondent}</TableCell>
                <TableCell>{dispute.relatedItem}</TableCell>
                <TableCell>{dispute.status}</TableCell>
                <TableCell>{dispute.createdAt}</TableCell>
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
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem>Assign mediator</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Close dispute</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No disputes found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          variant="ghost" 
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
