import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function useTyping(roomId: string, userId: string) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`typing:${roomId}`);

    channel.on("presence", { event: "sync" }, () => {
      const newState = channel.presenceState();
      const typing = Object.values(newState)
        .flat()
        .filter((p: any) => p.userId !== userId && p.isTyping)
        .map((p: any) => p.userId);
      setTypingUsers(typing);
    });

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId, userId]);

  const startTyping = async () => {
    setIsTyping(true);
    await supabase.channel(`typing:${roomId}`).track({
      userId,
      isTyping: true,
    });
  };

  const stopTyping = async () => {
    setIsTyping(false);
    await supabase.channel(`typing:${roomId}`).track({
      userId,
      isTyping: false,
    });
  };

  return {
    isTyping,
    typingUsers,
    startTyping,
    stopTyping,
  };
}
