import { useState } from "react";
import { supabase } from "../supabase";

export function useMessageActions(roomId: string) {
  const [editing, setEditing] = useState<string | null>(null);

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("Message")
      .delete()
      .eq("id", messageId);

    if (error) throw error;
  };

  const editMessage = async (messageId: string, newContent: string) => {
    const { error } = await supabase
      .from("Message")
      .update({ content: newContent, edited: true })
      .eq("id", messageId);

    if (error) throw error;
    setEditing(null);
  };

  return {
    editing,
    setEditing,
    deleteMessage,
    editMessage,
  };
}
