import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./use-auth";
import type { UserProfile, ProfileUpdateInput } from "~/types/profile";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch user data with profile and preferences
      const { data: userData, error: userError } = await supabase
        .from("AuthUser")
        .select(
          `
          *,
          profile:PersonalProfile(*),
          preferences:UserPreferences(*)
        `
        )
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      // Fetch ratings stats
      const { data: ratingsData, error: ratingsError } = await supabase
        .from("Rating")
        .select("rating")
        .eq("rateeId", user.id);

      if (ratingsError) throw ratingsError;

      // Calculate average rating
      const averageRating =
        ratingsData.length > 0
          ? ratingsData.reduce((acc, curr) => acc + curr.rating, 0) /
            ratingsData.length
          : 0;

      // Fetch active orders count
      const { count: activeOrders, error: ordersError } = await supabase
        .from("Order")
        .select("*", { count: true })
        .eq("sellerId", user.id)
        .eq("status", "ACTIVE");

      if (ordersError) throw ordersError;

      // Fetch completed orders count
      const { count: completedOrders, error: completedError } = await supabase
        .from("Order")
        .select("*", { count: true })
        .eq("sellerId", user.id)
        .eq("status", "COMPLETED");

      if (completedError) throw completedError;

      setProfile({
        ...userData,
        stats: {
          averageRating,
          totalReviews: ratingsData.length,
          activeOrders: activeOrders || 0,
          completedOrders: completedOrders || 0,
        },
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch profile")
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: ProfileUpdateInput) => {
    if (!user) return { error: new Error("No user found") };

    try {
      setLoading(true);
      const now = new Date().toISOString();

      // Update AuthUser
      if (updates.name || updates.username) {
        const { error: userError } = await supabase
          .from("AuthUser")
          .update({
            name: updates.name,
            username: updates.username,
            updatedAt: now,
          })
          .eq("id", user.id);

        if (userError) throw userError;
      }

      // Update PersonalProfile
      if (updates.profile) {
        const { error: profileError } = await supabase
          .from("PersonalProfile")
          .update({
            ...updates.profile,
            updatedAt: now,
          })
          .eq("id", user.id);

        if (profileError) throw profileError;
      }

      // Update UserPreferences
      if (updates.preferences) {
        const { error: preferencesError } = await supabase
          .from("UserPreferences")
          .update({
            ...updates.preferences,
            updatedAt: now,
          })
          .eq("userId", user.id);

        if (preferencesError) throw preferencesError;
      }

      // Refetch profile to get updated data
      await fetchProfile();

      return { error: null };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
}
