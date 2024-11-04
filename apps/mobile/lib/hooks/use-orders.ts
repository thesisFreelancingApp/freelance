import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./use-auth";
import type { Order, OrderStatus } from "~/types/order";

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: ordersError } = await supabase
        .from("Order")
        .select(
          `
          *,
          service:serviceId(*),
          buyer:buyerId(*),
          seller:sellerId(*),
          dispute:disputeid(*)
        `
        )
        .or(`buyerId.eq.${user.id},sellerId.eq.${user.id}`)
        .order("createdAt", { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch orders")
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const { error: updateError } = await supabase
        .from("Order")
        .update({ status })
        .eq("id", orderId);

      if (updateError) throw updateError;
      await fetchOrders();
      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Failed to update order"),
      };
    }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to order changes
    const subscription = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Order",
          filter: `buyerId=eq.${user?.id},sellerId=eq.${user?.id}`,
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    orders,
    loading,
    error,
    refreshOrders: fetchOrders,
    updateOrderStatus,
  };
}
