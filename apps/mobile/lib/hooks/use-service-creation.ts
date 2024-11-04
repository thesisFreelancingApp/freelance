import { useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./use-auth";
import type { ServiceCreationInput } from "~/types/service";

export function useServiceCreation() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createService = async (input: ServiceCreationInput) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      setLoading(true);
      setError(null);

      // First create the service
      const { data: service, error: serviceError } = await supabase
        .from("Service")
        .insert({
          name: input.name,
          description: input.description,
          medias: { images: input.images },
          tags: input.tags,
          creatorId: user.id,
          categoryId: input.categoryId,
          isPublic: true,
        })
        .select()
        .single();

      if (serviceError) throw serviceError;

      // Then create the packages
      const packagesWithServiceId = input.packages.map((pkg) => ({
        ...pkg,
        serviceId: service.id,
      }));

      const { error: packagesError } = await supabase
        .from("ServicePackage")
        .insert(packagesWithServiceId);

      if (packagesError) throw packagesError;

      return { data: service, error: null };
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to create service");
      setError(error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    createService,
    loading,
    error,
  };
}
