import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-background py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find the perfect <span className="text-primary">freelancer</span> for
          your project
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-muted-foreground">
          Hire top freelancers in web development, design, marketing, and more.
        </p>
        <div className="max-w-3xl mx-auto relative mb-12">
          <Input
            type="text"
            placeholder="Find services"
            className="pl-12 pr-4 py-6 rounded-full text-lg shadow-lg"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={24}
          />
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            size="lg"
          >
            Search
          </Button>
        </div>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="rounded-full">
            Post a Job
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Become a Freelancer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
