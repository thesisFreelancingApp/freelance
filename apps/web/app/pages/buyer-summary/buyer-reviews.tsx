import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Pencil, Trash2 } from "lucide-react"

interface Review {
  id: number
  service: string
  rating: number
  comment: string
}

interface BuyerReviewsProps {
  reviews: {
    count: number
    averageRating: number
    recentComments: Review[]
  }
  onUpdateReview: (id: number, newRating: number, newComment: string) => void
  onDeleteReview: (id: number) => void
}

export function BuyerReviews({ reviews, onUpdateReview, onDeleteReview }: BuyerReviewsProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Avis Donnés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <span className="text-xl font-bold">{reviews.averageRating}</span>
          <span className="text-sm text-muted-foreground">({reviews.count} avis)</span>
        </div>
        <ScrollArea className="h-[280px] w-full">
          {reviews.recentComments.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{review.service[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{review.service}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mettre à jour l'avis</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        onUpdateReview(review.id, parseInt(formData.get('rating') as string), formData.get('comment') as string)
                      }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">
                              Évaluation
                            </Label>
                            <Input
                              id="rating"
                              name="rating"
                              type="number"
                              defaultValue={review.rating}
                              min="1"
                              max="5"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="comment" className="text-right">
                              Commentaire
                            </Label>
                            <Textarea
                              id="comment"
                              name="comment"
                              defaultValue={review.comment}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button type="submit">Mettre à jour l'avis</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => onDeleteReview(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
