// components/FeaturedServices.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/index"; // Suppose que tu aies un fichier types.ts pour centraliser les types
import { Star } from "lucide-react";
import Link from "next/link";

interface FeaturedServicesProps {
  services: Service[];
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  services,
}) => {
  return (
    <div className="py-16 bg-secondary/10">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Gigs en vedette</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col h-full p-4 rounded-lg shadow-md bg-card"
            >
              <img
                src={service.images?.[0] || "/placeholder.svg"}
                alt={service.name}
                className="object-cover w-full h-48 mb-4 rounded-t-lg"
              />
              <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
              <p className="flex-grow mb-2 text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="flex items-center mb-2">
                <Star
                  className="mr-1 text-yellow-400 fill-yellow-400"
                  size={16}
                />
                <span>
                  {service.ratings && service.ratings.length > 0
                    ? (
                        service.ratings.reduce(
                          (acc, rating) => acc + rating.rating,
                          0,
                        ) / service.ratings.length
                      ).toFixed(1)
                    : "N/A"}
                </span>
              </div>
              {service.packages && service.packages.length > 0 && (
                <p className="mb-2 font-bold text-primary">
                  Starting at $
                  {parseFloat(service.packages[0].price).toFixed(2)}
                </p>
              )}
              <Link href={`/service/${service.id}`} className="mt-auto">
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
