import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const orders = [
  { id: 1, service: 'Web Development', buyer: 'Alice Johnson', seller: 'Bob Smith', amount: 500, status: 'COMPLETED' },
  { id: 2, service: 'Logo Design', buyer: 'Charlie Brown', seller: 'Diana Prince', amount: 100, status: 'IN_PROGRESS' },
  { id: 3, service: 'Content Writing', buyer: 'Ethan Hunt', seller: 'Alice Johnson', amount: 200, status: 'PENDING' },
  { id: 4, service: 'Video Editing', buyer: 'Bob Smith', seller: 'Charlie Brown', amount: 300, status: 'COMPLETED' },
  { id: 5, service: 'Social Media Management', buyer: 'Diana Prince', seller: 'Ethan Hunt', amount: 400, status: 'IN_PROGRESS' },
]

export function OrdersTab() {
  return (
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
  )
}