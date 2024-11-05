import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import type { Service } from "~/types/service";

export function useService(id: string) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: serviceData, error: serviceError } = await supabase
        .from("Service")
        .select(
          `
          *,
          creator:PersonalProfile!creatorId(
            id,
            firstName,
            lastName,
            profilePic,
            title
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
        .eq("id", id)
        .single();

      if (serviceError) throw serviceError;

      setService(serviceData);
    } catch (err) {
      console.error("Error fetching service:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch service")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    service,
    isLoading,
    error,
    refetch: fetchService,
  };
}
