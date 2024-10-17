"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
  jobs: string;
  level: string;
  skills: string[] | string; // Skills can be a string or array
  languages: string[] | string; // Languages can be a string or array
  created_at: string;
  price: number; // Added price property
}

const FeaturedFreelancers = () => {
  const [featuredFreelancers, setFeaturedFreelancers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      const data = response.data.map((freelancer: User) => ({
        ...freelancer,
        // Parse skills and languages if they are stringified arrays
        skills: typeof freelancer.skills === 'string' ? JSON.parse(freelancer.skills) : freelancer.skills,
        languages: typeof freelancer.languages === 'string' ? JSON.parse(freelancer.languages) : freelancer.languages,
      }));
      setFeaturedFreelancers(data);
    } catch (error) {
      console.error("Error fetching featured freelancers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFreelancers.map((freelancer, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={freelancer.profile_pic || ''}
                alt={`${freelancer.first_name || ''} ${freelancer.last_name || ''}`}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{`${freelancer.first_name} ${freelancer.last_name}`}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Join the skills array into a comma-separated string */}
                <p className="text-muted-foreground mb-2">
                  {Array.isArray(freelancer.skills)
                    ? freelancer.skills.join(', ')
                    : freelancer.skills}
                </p>
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
