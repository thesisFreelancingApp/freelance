import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "user" | "order" | "dispute" | "service";
  title: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "user",
    title: "New User Registration",
    description: "John Doe joined the platform",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "order",
    title: "Order Completed",
    description: "Order #1234 was marked as completed",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    type: "dispute",
    title: "New Dispute",
    description: "Dispute opened for Order #5678",
    timestamp: "10 minutes ago",
  },
  {
    id: "4",
    type: "service",
    title: "New Service",
    description: "Web Development service was added",
    timestamp: "15 minutes ago",
  },
];

const ActivityFeed = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600" />
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityFeed;