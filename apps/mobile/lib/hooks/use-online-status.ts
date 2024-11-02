import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function useOnlineStatus(userId: string) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Set user as online
    updateOnlineStatus(true);

    const channel = supabase.channel(`presence:${userId}`);
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online_at: new Date().toISOString() });
      }
    });

    // Handle app state changes (background/foreground)
    const handleAppStateChange = (
      state: "active" | "background" | "inactive"
    ) => {
      updateOnlineStatus(state === "active");
    };

    // Cleanup
    return () => {
      updateOnlineStatus(false);
      channel.unsubscribe();
    };
  }, [userId]);

  const updateOnlineStatus = async (status: boolean) => {
    await supabase
      .from("PersonalProfile")
      .update({ isOnline: status, lastSeen: new Date().toISOString() })
      .eq("id", userId);
  };

  return isOnline;
}
