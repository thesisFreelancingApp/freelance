import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    content:
      "This platform has been a game-changer for our business. We've found amazing talent that has helped us grow exponentially.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Freelance Designer",
    content:
      "As a freelancer, this platform has given me the opportunity to work with clients from all over the world. It's been an incredible journey.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Small Business Owner",
    content:
      "The quality of work I've received has been consistently high. It's made a real difference to my business.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
