import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

const services = [
  { id: 1, name: 'Web Development', category: 'IT & Programming', status: 'Active', price: '$500', rating: 4.8 },
  { id: 2, name: 'Logo Design', category: 'Design & Creative', status: 'Pending Review', price: '$100', rating: 4.5 },
  { id: 3, name: 'Content Writing', category: 'Writing & Translation', status: 'Active', price: '$50', rating: 4.7 },
  { id: 4, name: 'Video Editing', category: 'Video & Animation', status: 'Disabled', price: '$200', rating: 4.2 },
  { id: 5, name: 'Social Media Management', category: 'Digital Marketing', status: 'Active', price: '$300', rating: 4.6 },
]

export function ServicesTab() {
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
  )
}