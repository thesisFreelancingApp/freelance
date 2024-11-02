import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { ChatRoom } from "~/types/message";

export function useChatRooms(userId: string) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();

    // Subscribe to new chat rooms
    const subscription = supabase
      .channel("chat_rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatRoom",
        },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("ChatRoom")
      .select(
        `
        *,
        participants:ChatRoomParticipant(
          id,
          participantId,
          role,
          profile:participantId(
            id,
            firstName,
            lastName,
            profilePic
          )
        ),
        lastMessage:Message(
          id,
          content,
          createdAt,
          senderId,
          isRead
        )
      `
      )
      .eq("participants.participantId", userId)
      .order("updatedAt", { ascending: false });

    if (error) {
      console.error("Error fetching chat rooms:", error);
      return;
    }

    setRooms(data);
    setLoading(false);
  };

  return {
    rooms,
    loading,
    refreshRooms: fetchRooms,
  };
}
