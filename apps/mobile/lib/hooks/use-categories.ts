import { useState, useEffect } from "react";
import { supabase } from "../supabase";

interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("MainCategories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, refreshCategories: fetchCategories };
}
