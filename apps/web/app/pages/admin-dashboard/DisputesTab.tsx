import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const disputes = [
  { id: 1, order: 'Web Development', disputeBy: 'Alice Johnson', status: 'OPEN', date: '2023-04-01' },
  { id: 2, order: 'Logo Design', disputeBy: 'Charlie Brown', status: 'IN_PROGRESS', date: '2023-04-02' },
  { id: 3, order: 'Content Writing', disputeBy: 'Ethan Hunt', status: 'RESOLVED', date: '2023-04-03' },
  { id: 4, order: 'Video Editing', disputeBy: 'Bob Smith', status: 'OPEN', date: '2023-04-04' },
  { id: 5, order: 'Social Media Management', disputeBy: 'Diana Prince', status: 'IN_PROGRESS', date: '2023-04-05' },
]

export function DisputesTab() {
  return (
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
  )
}