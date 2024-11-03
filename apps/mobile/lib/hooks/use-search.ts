import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import type { Service } from "~/types/service";

export function useSearch(query: string) {
  const [results, setResults] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchServices() {
      if (!query) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("Service")
          .select(
            `
            *,
            packages:ServicePackage(*),
            ratings:Rating(*)
          `
          )
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(10);

        if (error) throw error;
        setResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    searchServices();
  }, [query]);

  return { results, isLoading };
}
