import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const messages = [
  { id: 1, from: 'Alice Johnson', message: 'Hello, I have a question about my order.', time: '10:30 AM' },
  { id: 2, from: 'Bob Smith', message: 'Can you review my latest submission?', time: '11:45 AM' },
  { id: 3, from: 'Charlie Brown', message: 'I need help with my account settings.', time: '1:15 PM' },
  { id: 4, from: 'Diana Prince', message: 'When will my order be completed?', time: '2:30 PM' },
  { id: 5, from: 'Ethan Hunt', message: 'Id like to report a bug on the platform.', time: '3:45 PM' },
]

export function MessagesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
        <CardDescription>
          View and respond to user messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{message.from}</p>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}