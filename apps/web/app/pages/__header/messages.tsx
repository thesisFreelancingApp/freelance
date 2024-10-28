"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRecentMessages } from "@/server.actions/message.actions";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentMessage {
  id: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
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

interface MessagesData {
  messages: RecentMessage[];
  unreadCount: number;
}

export default function Messages() {
  const [messagesData, setMessagesData] = useState<MessagesData>({
    messages: [],
    unreadCount: 0,
  });
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getRecentMessages();
      setMessagesData(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();

    // Subscribe to all message changes
    const messageChannel = supabase
      .channel("message-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Message",
        },
        (payload) => {
          console.log("Message change received:", payload);
          fetchMessages();
        },
      )
      .subscribe();

    // Subscribe to chat room changes
    const chatRoomChannel = supabase
      .channel("chatroom-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatRoom",
        },
        (payload) => {
          console.log("ChatRoom change received:", payload);
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(chatRoomChannel);
    };
  }, [fetchMessages, supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {messagesData.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {messagesData.unreadCount > 99 ? "99+" : messagesData.unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Messages</h2>
          <Link
            href="/messages"
            className="text-xs text-primary hover:text-primary/80"
          >
            See all
          </Link>
        </div>
        <ScrollArea className="h-[calc(80vh-8rem)] py-2">
          {messagesData.messages.length > 0 ? (
            messagesData.messages.map((message) => (
              <DropdownMenuItem
                key={message.id}
                asChild
                className="px-4 py-3 focus:bg-accent"
              >
                <Link href="/messages" className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={message.otherUser.profilePic || undefined}
                      alt={`${message.otherUser.firstName} ${message.otherUser.lastName}`}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {message.otherUser.firstName?.[0]}
                      {message.otherUser.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden space-y-1">
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-sm ${
                          !message.isRead
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.otherUser.firstName}{" "}
                        {message.otherUser.lastName}
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate ${
                        !message.isRead
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              No messages yet
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
