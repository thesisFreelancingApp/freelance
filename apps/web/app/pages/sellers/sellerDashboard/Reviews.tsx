import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type FreelancerRating = {
  id: number;
  createdAt: Date;
  rating: number;
  buyerId: string;
  sellerId: string;
  serviceId: number;
  review: string | null;
};

type SellerData = {
  username: string | null;
  totalEarnings: number | null;
  freelancerRatings: FreelancerRating[] | null; // Allow it to be an array or null
};

interface ReviewsProps {
  sellerData: SellerData | null; // Accept sellerData as a prop
}

export function Reviews({ sellerData }: ReviewsProps) {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle>Client Reviews</CardTitle>
        <CardDescription>See what your clients are saying about your services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sellerData && sellerData.freelancerRatings && sellerData.freelancerRatings.length > 0 ? (
            sellerData.freelancerRatings.map((rating) => (
              <div key={rating.id} className="border-b pb-4">
                <div className="flex items-center space-x-2">
                  {/* Render stars based on rating */}
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className={`h-5 w-5 ${index < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <h3 className="text-lg font-medium mt-2">{rating.review || 'No review provided'}</h3>
                <p className="text-sm font-medium mt-2">- Buyer ID: {rating.buyerId}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
