"use client";
import { Button } from "@/components/ui/button";
import { Freelancer } from "@/types/index";
import { Star } from "lucide-react";
interface TopFreelancersProps {
  freelancers: Freelancer[];
}

export const TopFreelancers: React.FC<TopFreelancersProps> = ({
  freelancers,
}) => {
  return (
    <div className="py-16 bg-secondary/10">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Freelances de premier ordre
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {freelancers.map((freelancer, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-lg shadow-md bg-background"
            >
              <h3 className="mb-2 font-bold">{freelancer.name}</h3>
              <p className="mb-2 text-muted-foreground">
                {freelancer.expertise}
              </p>
              <div className="flex items-center justify-center mb-4">
                <Star
                  className="mr-1 text-yellow-400 fill-yellow-400"
                  size={16}
                />
                <span>{freelancer.rating}</span>
              </div>
              <Button variant="outline" className="w-full">
                Voir le profil
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFreelancers;
