import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Reviews() {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle>Client Reviews</CardTitle>
        <CardDescription>See what your clients are saying about your services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <h3 className="text-lg font-medium mt-2">Excellent work!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              John did an amazing job on my website. He was professional, timely, and delivered beyond my expectations.
            </p>
            <p className="text-sm font-medium mt-2">- Alice Johnson</p>
          </div>
          <div className="border-b pb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mt-2">Great service</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The logo design was good, but there were a few revisions needed. Overall, I'm satisfied with the result.
            </p>
            <p className="text-sm font-medium mt-2">- Bob Smith</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
