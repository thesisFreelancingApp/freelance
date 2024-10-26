import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Briefcase, MessageSquare } from "lucide-react";

// Simulated data import
const userData = {
  name: "John Doe",
  activeProjects: 5,
  newMessages: 3,
  unreadNotifications: 2,
  recentProjects: [
    { id: 1, name: "Logo design for TechStart" },
    { id: 2, name: "Website development for GreenEco" },
    { id: 3, name: "Content writing for BlogMaster" },
  ],
  pendingOffers: [
    { id: 1, name: "Mobile app design", price: 500 },
    { id: 2, name: "Document translation", price: 200 },
    { id: 3, name: "Video editing for YouTuber", price: 300 },
  ],
};

export default function WelcomeBack() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back to FreelanceHub, {userData.name}
          </CardTitle>
          <CardDescription className="text-center">
            Your favorite freelancing platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Activity Summary</h2>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{userData.activeProjects} active projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span>{userData.newMessages} new messages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {userData.unreadNotifications} unread notifications
                  </span>
                </div>
              </div>
              <Button className="w-full">View Dashboard</Button>
            </div>
            <div>
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="projects">Recent Projects</TabsTrigger>
                  <TabsTrigger value="offers">Pending Offers</TabsTrigger>
                </TabsList>
                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {userData.recentProjects.map((project) => (
                        <div key={project.id} className="text-sm">
                          {project.name}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="offers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Offers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {userData.pendingOffers.map((offer) => (
                        <div key={offer.id} className="text-sm">
                          {offer.name} - ${offer.price}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full">
            <h3 className="mb-2 text-lg font-semibold">Quick Search</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Search for projects..."
                className="flex-grow"
              />
              <Button>Search</Button>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Need help? Contact our 24/7 customer support
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
