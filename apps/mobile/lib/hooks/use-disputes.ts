import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./use-auth";
import type { Dispute, DisputeStatus } from "~/types/dispute";

export function useDisputes() {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDisputes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: disputesError } = await supabase
        .from("Dispute")
        .select(
          `
          *,
          service:serviceId(*),
          initiatorSeller:initiatorSellerId(*),
          initiatorBuyer:initiatorBuyerId(*),
          participants:DisputeParticipant(
            *,
            participantSeller:participantSellerId(*),
            participantBuyer:participantBuyerId(*)
          ),
          messages:DisputeMessage(
            *,
            senderSeller:senderSellerId(*),
            senderBuyer:senderBuyerId(*)
          )
        `
        )
        .or(`initiatorSellerId.eq.${user.id},initiatorBuyerId.eq.${user.id}`)
        .order("createdAt", { ascending: false });

      if (disputesError) throw disputesError;
      setDisputes(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch disputes")
      );
    } finally {
      setLoading(false);
    }
  };

  const createDispute = async (
    description: string,
    orderId: string,
    isSeller: boolean
  ) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data: order, error: orderError } = await supabase
        .from("Order")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      const disputeData = {
        description,
        status: "OPEN" as DisputeStatus,
        serviceId: order.serviceId,
        projectId: order.projectId,
        ...(isSeller
          ? { initiatorSellerId: user.id }
          : { initiatorBuyerId: user.id }),
      };

      const { data, error: disputeError } = await supabase
        .from("Dispute")
        .insert(disputeData)
        .select()
        .single();

      if (disputeError) throw disputeError;

      // Update order with dispute reference
      await supabase
        .from("Order")
        .update({ disputeid: data.id })
        .eq("id", orderId);

      await fetchDisputes();
      return { data, error: null };
    } catch (err) {
      return {
        error:
          err instanceof Error ? err : new Error("Failed to create dispute"),
      };
    }
  };

  const updateDisputeStatus = async (
    disputeId: string,
    status: DisputeStatus
  ) => {
    try {
      const { error: updateError } = await supabase
        .from("Dispute")
        .update({ status })
        .eq("id", disputeId);

      if (updateError) throw updateError;
      await fetchDisputes();
      return { error: null };
    } catch (err) {
      return {
        error:
          err instanceof Error ? err : new Error("Failed to update dispute"),
      };
    }
  };

  useEffect(() => {
    fetchDisputes();

    const subscription = supabase
      .channel("disputes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Dispute",
          filter: `initiatorSellerId=eq.${user?.id},initiatorBuyerId=eq.${user?.id}`,
        },
        () => {
          fetchDisputes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    disputes,
    loading,
    error,
    createDispute,
    updateDisputeStatus,
    refreshDisputes: fetchDisputes,
  };
}
