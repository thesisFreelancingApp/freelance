import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { Message } from "~/types/message";

export function useChat(roomId: string, currentUserId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    markMessagesAsRead();

    const subscription = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          filter: `chatRoomId=eq.${roomId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);

          // Mark message as read if it's not from current user
          if (newMessage.senderId !== currentUserId) {
            markMessageAsRead(newMessage.id);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, currentUserId]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("Message")
      .select(
        `
        *,
        sender:senderId(
          id,
          firstName,
          lastName,
          profilePic
        )
      `
      )
      .eq("chatRoomId", roomId)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data);
    setLoading(false);
  };

  const markMessagesAsRead = async () => {
    const { error } = await supabase
      .from("Message")
      .update({ isRead: true })
      .eq("chatRoomId", roomId)
      .eq("senderId", currentUserId)
      .eq("isRead", false);

    if (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    const { error } = await supabase
      .from("Message")
      .update({ isRead: true })
      .eq("id", messageId);

    if (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const sendMessage = async (content: string, senderId: string) => {
    const { data, error } = await supabase
      .from("Message")
      .insert({
        chatRoomId: roomId,
        senderId,
        content,
        createdAt: new Date().toISOString(),
        isRead: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return null;
    }

    return data;
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
