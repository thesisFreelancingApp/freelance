import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredFreelancers = [
  {
    name: "John Doe",
    skill: "Web Developer",
    price: "$50/hr",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    skill: "Graphic Designer",
    price: "$45/hr",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Mike Johnson",
    skill: "Content Writer",
    price: "$35/hr",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const FeaturedFreelancers = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured Freelancers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFreelancers.map((freelancer, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{freelancer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{freelancer.skill}</p>
                <p className="text-primary font-bold">{freelancer.price}</p>
                <Button className="mt-4 w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;
