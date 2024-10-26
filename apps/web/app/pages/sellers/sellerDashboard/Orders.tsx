import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentOrders = [
  { id: 1, client: "Alice Johnson", service: "Logo Design", status: "In Progress", amount: 150 },
  { id: 2, client: "Bob Smith", service: "Web Development", status: "Completed", amount: 500 },
  { id: 3, client: "Charlie Brown", service: "SEO Optimization", status: "Pending", amount: 300 },
]

export function Orders() {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-800">Orders Management</CardTitle>
        <CardDescription className="text-gray-600">View and manage your current orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="text-gray-800">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-100">
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.client}</TableCell>
                <TableCell>{order.service}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">${order.amount}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-600 hover:bg-gray-200">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
