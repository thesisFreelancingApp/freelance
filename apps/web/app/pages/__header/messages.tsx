"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getRecentMessages } from "@/server.actions/message.actions";
import { MessageSquare, Search, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { cn } from "@/lib/utils-cn";

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

const formatMessageTime = (date: Date) => {
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, "MMM d");
  }
  return format(date, "MM/dd/yy");
};

const MessageItem = ({ message }: { message: RecentMessage }) => {
  const isUnread = !message.isRead;

  return (
    <DropdownMenuItem
      asChild
      className="px-4 py-3 focus:bg-accent cursor-pointer"
    >
      <Link
        href={`/messages?userId=${message.otherUser.id}`}
        className="flex items-start gap-3 w-full"
      >
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={message.otherUser.profilePic || undefined}
              alt={`${message.otherUser.firstName} ${message.otherUser.lastName}`}
            />
            <AvatarFallback className="bg-primary/10">
              {message.otherUser.firstName?.[0]}
              {message.otherUser.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          {isUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          )}
        </div>
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p
              className={cn(
                "text-sm truncate",
                isUnread && "font-semibold text-foreground",
              )}
            >
              {message.otherUser.firstName} {message.otherUser.lastName}
            </p>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {formatMessageTime(new Date(message.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p
              className={cn(
                "text-xs truncate",
                isUnread ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {message.content}
            </p>
          </div>
        </div>
      </Link>
    </DropdownMenuItem>
  );
};

export default function Messages() {
  const [messagesData, setMessagesData] = useState<MessagesData>({
    messages: [],
    unreadCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getRecentMessages();
      setMessagesData(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, []);

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messagesData.messages;

    return messagesData.messages.filter(
      (message) =>
        `${message.otherUser.firstName} ${message.otherUser.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        message.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [messagesData.messages, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [fetchMessages, isOpen]);

  useEffect(() => {
    const messageChannel = supabase
      .channel("message-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Message" },
        () => fetchMessages(),
      )
      .subscribe();

    const chatRoomChannel = supabase
      .channel("chatroom-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ChatRoom" },
        () => fetchMessages(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(chatRoomChannel);
    };
  }, [fetchMessages, supabase]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
          <div>
            <h2 className="text-sm font-semibold">Messages</h2>
            {messagesData.unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {messagesData.unreadCount} unread message
                {messagesData.unreadCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Link
            href="/messages"
            className="text-xs text-primary hover:text-primary/80"
          >
            See all
          </Link>
        </div>

        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(80vh-8rem)]">
          {filteredMessages.length > 0 ? (
            <>
              {filteredMessages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              {searchQuery ? "No messages found" : "No messages yet"}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
