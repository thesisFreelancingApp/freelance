"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/server.actions/message.actions";

interface MessageInterfaceProps {
  receiverId: string;
}

export function MessageInterface({ receiverId }: MessageInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendMessage(receiverId, message);
      setMessage("");
      // You can add a success message here
    } catch (error) {
      console.error("Failed to send message:", error);
      // You can add an error message here
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-64">
      <div className="flex-1 overflow-y-auto mb-4">
        {/* Message history would go here */}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isSending}>
          {isSending ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  );
}
