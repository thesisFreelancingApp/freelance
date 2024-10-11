import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { name: "Logo Design", price: "Starting at $50" },
  { name: "Content Writing", price: "Starting at $30" },
  { name: "Web Development", price: "Starting at $100" },
  { name: "Social Media Marketing", price: "Starting at $80" },
  { name: "Video Editing", price: "Starting at $70" },
  { name: "SEO Optimization", price: "Starting at $90" },
];

const ExploreServices = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Explore Trending Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-medium">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;
