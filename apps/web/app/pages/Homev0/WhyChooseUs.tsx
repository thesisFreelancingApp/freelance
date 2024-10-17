import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Award, Shield, Headphones } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description: "Competitive rates for quality work",
  },
  {
    icon: Award,
    title: "Top Freelancers",
    description: "Access to skilled professionals worldwide",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are always protected",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
