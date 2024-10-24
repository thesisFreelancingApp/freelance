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
import { CheckCircle, Lightbulb, Users } from "lucide-react";

// Simulated data import
const newUserData = {
  name: "Alice Smith",
  popularCategories: [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Graphic Design" },
    { id: 3, name: "Content Writing" },
  ],
  featuredFreelancers: [
    { id: 1, name: "John Doe", skill: "Full-Stack Developer" },
    { id: 2, name: "Jane Smith", skill: "UX/UI Designer" },
    { id: 3, name: "Mike Johnson", skill: "Copywriter" },
  ],
};

export default function WelcomeNewUser() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to FreelanceHub, {newUserData.name}!
          </CardTitle>
          <CardDescription className="text-center">
            Your journey as a freelancer starts here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Getting Started</h2>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <span>Complete your profile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  <span>Browse available projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Connect with clients</span>
                </div>
              </div>
              <Button className="w-full">Complete Your Profile</Button>
            </div>
            <div>
              <Tabs defaultValue="categories" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="categories">
                    Popular Categories
                  </TabsTrigger>
                  <TabsTrigger value="freelancers">
                    Featured Freelancers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="categories">
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {newUserData.popularCategories.map((category) => (
                        <div key={category.id} className="text-sm">
                          {category.name}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="freelancers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Freelancers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {newUserData.featuredFreelancers.map((freelancer) => (
                        <div key={freelancer.id} className="text-sm">
                          {freelancer.name} - {freelancer.skill}
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
            <h3 className="mb-2 text-lg font-semibold">
              Find Your First Project
            </h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Search for projects..."
                className="flex-grow"
              />
              <Button>Search</Button>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Need help getting started? Check out our comprehensive guide for new
            freelancers
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
