import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

const reviews = [
  { id: 1, service: 'Web Development', reviewer: 'Alice Johnson', rating: 5, comment: 'Excellent service!' },
  { id: 2, service: 'Logo Design', reviewer: 'Bob Smith', rating: 4, comment: 'Good work, but took longer than expected.' },
  { id: 3, service: 'Content Writing', reviewer: 'Charlie Brown', rating: 5, comment: 'Very professional and quick.' },
  { id: 4, service: 'Video Editing', reviewer: 'Diana Prince', rating: 3, comment: 'Decent work, but needs improvement.' },
  { id: 5, service: 'Social Media Management', reviewer: 'Ethan Hunt', rating: 5, comment: 'Outstanding results!' },
]

export function ReviewsTab() {
  return (
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
  )
}