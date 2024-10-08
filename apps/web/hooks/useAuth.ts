"use client";
// a custom hook that is used to get the current user and the auth state
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { authService } from "../lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();

    const unsubscribe = authService.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, loading };
}