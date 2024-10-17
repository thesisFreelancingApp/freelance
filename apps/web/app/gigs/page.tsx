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
        } else {
          const services: any = await getAllServices();
          setFeaturedServices(services);
        }
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [query]);

  return (
    <div className="py-16 bg-secondary/10">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Gigs en vedette</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {loading && (
            <div className="p-6 transition-shadow rounded-lg shadow-md bg-background hover:shadow-lg">
              Loading...
            </div>
          )}
          {!loading && featuredServices.length > 0
            ? featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="p-6 transition-shadow rounded-lg shadow-md bg-background hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold">{service.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
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
                  <p className="font-bold text-primary">{service.price}</p>
                  <Link href={`/service/${service.id}`}>
                    <Button className="w-full mt-4">View Details</Button>
                  </Link>
                </div>
              ))
            : !loading && (
                <div className="p-6 transition-shadow rounded-lg shadow-md bg-background hover:shadow-lg">
                  No services found.
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Search;
