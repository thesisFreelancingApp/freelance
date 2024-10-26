"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getRecentMessages } from "@/server.actions/message.actions";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
  otherUser: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        const { messages, unreadCount } = await getRecentMessages();
        console.log("messages ----------------------------", messages);
        setMessages(messages);
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Failed to fetch recent messages:", error);
      }
    };

    fetchRecentMessages();

    const channel = supabase
      .channel("new_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
        },
        async () => {
          await fetchRecentMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Messages</span>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {messages.length === 0 ? (
            <DropdownMenuItem>No recent messages</DropdownMenuItem>
          ) : (
            messages.map((message) => (
              <DropdownMenuItem
                key={message.id}
                className="flex items-start py-2 px-4"
              >
                <img
                  src={message.otherUser.profilePic || "/placeholder.svg"}
                  alt={`${message.otherUser.firstName} ${message.otherUser.lastName}`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-sm truncate">
                    {message.otherUser.firstName} {message.otherUser.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {message.sender.id === message.otherUser.id ? "" : "You: "}
                    {message.content}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-center">
          <Link href="/messages" className="w-full text-sm font-medium">
            View all messages
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
