import { useEffect, useState } from "react";
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

      // First try to fetch just the Service table
      const { data: servicesData, error: servicesError } = await supabase
        .from("Service")
        .select("*");

      if (servicesError) {
        console.error("Error fetching services:", servicesError);
        throw servicesError;
      }

      // If that works, then try to fetch with relations
      const { data: fullData, error: fullError } = await supabase.from(
        "Service"
      ).select(`
          *,
          packages:ServicePackage(id, name, price, deliveryTime),
          ratings:Rating(rating)
        `);

      if (fullError) {
        console.error("Error fetching full service data:", fullError);
        throw fullError;
      }

      setServices(fullData || []);
    } catch (err) {
      console.error("Error in fetchServices:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch services")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, isLoading, error, refetch: fetchServices };
}
