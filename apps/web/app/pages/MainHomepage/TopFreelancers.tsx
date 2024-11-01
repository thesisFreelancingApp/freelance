"use client";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@prisma/client";
import { Badge, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

import Link from 'next/link';

interface TopFreelancersProps {
  freelancers: UserProfile[];
}


const TopFreelancers: React.FC<TopFreelancersProps> = ({
  freelancers,
}) => {
 
  return (
    <div className="py-16 bg-secondary/10">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Freelances de premier ordre
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {freelancers.slice(0, 6).map((freelancer, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-lg shadow-md bg-background"
            >
              <Avatar className="w-16 h-16 mx-auto mb-4 rounded-full">
                <img
                  src={freelancer.profilePic} // Ensure profilePic is a property of UserProfile
                  alt={`${freelancer.firstName} ${freelancer.lastName}`}
                  className="w-full h-full rounded-full"
                />
              </Avatar>
              <h3 className="mb-2 font-bold">
                {freelancer.firstName} {freelancer.lastName}
              </h3>
              <p className="mb-2 text-muted-foreground">
                {/* Additional information can go here */}
              </p>
              <div className="flex items-center justify-center mb-4">
                <Star
                  className="mr-1 text-yellow-400 fill-yellow-400"
                  size={16}
                />
                <span>{freelancer.professionalProfile?.rating}</span> {/* Access rating from professionalProfile */}
              </div>
              <Link href={`/${freelancer.username}`}> {/* Ensure username is a property of UserProfile */}
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Voir le profil
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFreelancers;
