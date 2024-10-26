import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Messages() {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle>Client Messages</CardTitle>
        <CardDescription>Communicate with your clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Alice Johnson</p>
              <p className="text-sm text-muted-foreground">
                Hey, I was wondering about the progress on my logo design...
              </p>
            </div>
            <Button variant="outline" size="sm">Reply</Button>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar-2.jpg" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Bob Smith</p>
              <p className="text-sm text-muted-foreground">
                Thanks for completing the project! I'm very satisfied with...
              </p>
            </div>
            <Button variant="outline" size="sm">Reply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
