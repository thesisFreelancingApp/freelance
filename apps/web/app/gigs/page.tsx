"use client";
import React, { useEffect, useState } from "react";
import {
  searchServices,
  getServicesByCategory,
  getAllServices,
} from "@/server.actions/services.actions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string;
  ratings: { rating: number }[];
  price: string;
}

const Search: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const categoryId: number | null =
    Number(searchParams.get("category_id")) || null;
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        if (query && !categoryId) {
          const services: any = await searchServices(query);
          setFeaturedServices(services);
        } else if (query && categoryId) {
          const services: any = await searchServices(query, categoryId);
          setFeaturedServices(services);
        } else if (!query && categoryId) {
          const services: any = await getServicesByCategory(categoryId);
          setFeaturedServices(services);
        }  else {
          const services: any = await getAllServices();
          setFeaturedServices(services);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [query]);

  return (
    <div className="bg-secondary/10 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Gigs en vedette</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading && (
            <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Loading...
            </div>
          )}
          {!loading && featuredServices.length > 0 ? (
            featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>
                <div className="flex items-center mb-2">
                  <Star
                    className="text-yellow-400 fill-yellow-400 mr-1"
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
                <p className="font-bold text-primary">{service.price}</p>
                <Link href={`/service/${service.id}`}>
                  <Button className="mt-4 w-full">View Details</Button>
                </Link>
              </div>
            ))
          ) : !loading && (
            <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              No services found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
