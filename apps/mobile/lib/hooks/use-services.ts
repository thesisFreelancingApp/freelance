import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import type { Service } from "~/types/service";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: servicesError } = await supabase
        .from("Service")
        .select(
          `
          *,
          creator:creatorId(
            id,
            profile:PersonalProfile(
              firstName,
              lastName,
              profilePic,
              title
            )
          ),
          packages:ServicePackage(*),
          ratings:Rating(
            id,
            rating,
            review,
            createdAt,
            rater:PersonalProfile!raterId(
              firstName,
              lastName,
              profilePic
            )
          )
        `
        )
        .eq("isPublic", true)
        .order("createdAt", { ascending: false });

      if (servicesError) throw servicesError;

      // Transform the data to match your Service type
      const transformedServices: Service[] = data.map((service) => ({
        ...service,
        creator: {
          id: service.creator.id,
          profile: service.creator.profile,
        },
        packages: service.packages || [],
        ratings: service.ratings || [],
      }));

      setServices(transformedServices);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch services")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    // Subscribe to changes
    const subscription = supabase
      .channel("services_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Service",
        },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices,
  };
}
