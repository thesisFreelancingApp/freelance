import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star } from "lucide-react"

interface SellerReview {
  id: number
  seller: string
  service: string
  rating: number
  comment: string
}

interface SellerReviewsProps {
  reviews: SellerReview[]
}

export function SellerReviews({ reviews }: SellerReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avis des Vendeurs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px] w-full">
          {reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{review.seller[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{review.seller}</p>
                  <p className="text-xs text-muted-foreground">{review.service}</p>
                </div>
                <div className="flex items-center ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
