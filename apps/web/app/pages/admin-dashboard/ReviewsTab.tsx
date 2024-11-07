import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getReviews } from "@/server.actions/dashboard/reviews.action";
import type { FormattedReviewsType } from "@/server.actions/dashboard/reviews.action";

export function ReviewsTab() {
  const [reviewsData, setReviewsData] = useState<FormattedReviewsType>();
  useEffect(() => {
    async function getReviewsData() {
      const data = await getReviews();
      setReviewsData(data);
    }
    getReviewsData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Reviews</CardTitle>
        <CardDescription>Manage and moderate user reviews.</CardDescription>
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
            {reviewsData?.map((review) => (
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
  );
}
