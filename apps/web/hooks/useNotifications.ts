"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  markAsRead,
  markAllAsRead,
} from "@/server.actions/notifications/notifications.actions";

export type NotificationType =
  | "NEW_ORDER"
  | "ORDER_STATUS_CHANGE"
  | "NEW_MESSAGE"
  | "NEW_RATING"
  | "PAYMENT_RECEIVED"
  | "SERVICE_APPROVED"
  | "DISPUTE_CREATED"
  | "DISPUTE_RESOLVED";

interface Notification {
  id: string;
  type: NotificationType;
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any> | null;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current session
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError);
        throw new Error("Authentication error");
      }

      if (!user) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      // Add authorization header
      const { data, error: fetchError } = await supabase
        .from("Notification")
        .select("*")
        .eq("recipientId", user.id)
        .order("createdAt", { ascending: false })
        .limit(50)
        .throwOnError(); // This will throw an error if there's an issue

      if (fetchError) {
        console.error("Fetch error:", fetchError);
        throw new Error(fetchError.message);
      }

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.isRead).length);
      }
    } catch (err) {
      console.error("Error in fetchNotifications:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch notifications",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Set up real-time subscription
    const setupSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const channel = supabase
        .channel(`notifications:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "Notification",
            filter: `recipientId=eq.${user.id}`,
          },
          (payload) => {
            console.log("Received notification update:", payload);
            fetchNotifications();
          },
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        });

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupSubscription();
    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn());
    };
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead: async (id: string) => {
      try {
        await markAsRead(id);
        await fetchNotifications();
      } catch (err) {
        console.error("Error marking as read:", err);
        setError("Failed to mark notification as read");
      }
    },
    markAllAsRead: async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        await markAllAsRead(user.id);
        await fetchNotifications();
      } catch (err) {
        console.error("Error marking all as read:", err);
        setError("Failed to mark all notifications as read");
      }
    },
    refresh: fetchNotifications,
  };
}

// Creating a notification check the type of notification in the schema we have a lot of types ,content and metadata are different for each type , the link is optional but you can add it if you want to redirect the user to a specific page
// await createNotification({
//     recipientId: userId,
//     type: "NEW_ORDER",
//     content: "You have received a new order",
//     link: `/orders/${orderId}`,
//     metadata: {
//       orderId,
//       amount,
//       buyerName
//     }
//   });
