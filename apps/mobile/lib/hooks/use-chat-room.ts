import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { ChatRoom } from "~/types/message";

export function useChatRoom(roomId: string | undefined) {
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!roomId) return;

    fetchRoom();

    const subscription = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatRoom",
          filter: `id=eq.${roomId}`,
        },
        () => {
          fetchRoom();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const fetchRoom = async () => {
    if (!roomId) return;

    try {
      const { data, error: fetchError } = await supabase
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
          )
        `
        )
        .eq("id", roomId)
        .single();

      if (fetchError) throw fetchError;
      setRoom(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    room,
    loading,
    error,
    refreshRoom: fetchRoom,
  };
}
