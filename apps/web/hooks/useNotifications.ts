"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  markAsRead,
  markAllAsRead,
} from "@/server.actions/notifications/notifications.actions";

// Define the NotificationType enum to match your schema
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
  const supabase = createClient();

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: notifications } = await supabase
      .from("Notification")
      .select("*")
      .eq("recipientId", user.id)
      .order("createdAt", { ascending: false })
      .limit(50);

    if (notifications) {
      setNotifications(notifications);
      setUnreadCount(notifications.filter((n) => !n.isRead).length);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Notification" },
        () => fetchNotifications(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead: async (id: string) => {
      await markAsRead(id);
      await fetchNotifications();
    },
    markAllAsRead: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await markAllAsRead(user.id);
      await fetchNotifications();
    },
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
