"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  getAllChatRooms,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} from "@/server.actions/message.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ChatRoom {
  id: string;
  otherUser: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  } | null;
  lastMessage: {
    content: string;
    createdAt: Date;
  } | null;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
  chatRoomId: string;
  sender: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
}

const MESSAGES_PER_PAGE = 20;

export default function MessagesLayout() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);

  const setupRealtimeSubscription = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    channelRef.current = supabase.channel("realtime messages", {
      config: {
        broadcast: { self: true },
      },
    });

    channelRef.current
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Message" },
        (payload) => {
          console.log("New message received:", payload);
          handleNewMessage(payload);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscribed to real-time messages");
        }
      });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase]);

  useEffect(() => {
    fetchChatRooms();
    const unsubscribe = setupRealtimeSubscription();

    return () => {
      unsubscribe();
    };
  }, [setupRealtimeSubscription]);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.id);
      markMessagesAsRead(selectedRoom.id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const fetchChatRooms = async () => {
    try {
      const rooms = await getAllChatRooms();
      setChatRooms(rooms);
      if (rooms.length > 0 && !selectedRoom) {
        setSelectedRoom(rooms[0]);
      }
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  const fetchMessages = async (roomId: string, resetPage = true) => {
    try {
      const currentPage = resetPage ? 1 : page;
      const response = await getMessages(
        roomId,
        currentPage,
        MESSAGES_PER_PAGE,
      );

      setMessages((prev) =>
        currentPage === 1 ? response.messages : [...prev, ...response.messages],
      );
      setHasMore(response.hasMore);
      setTotalMessages(response.totalCount);

      if (!resetPage) {
        setPage((prev) => prev + 1);
      } else {
        setPage(1);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleNewMessage = useCallback(
    (payload: any) => {
      console.log("New message received:", payload);
      if (payload.eventType === "INSERT") {
        const newMessage = payload.new as Message;
        if (selectedRoom && newMessage.chatRoomId === selectedRoom.id) {
          setMessages((prev) => [...prev, newMessage]);
          scrollToBottom();
        }
        fetchChatRooms();
      } else if (payload.eventType === "UPDATE" && selectedRoom) {
        fetchMessages(selectedRoom.id);
      }
    },
    [selectedRoom, fetchChatRooms],
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoom || !selectedRoom.otherUser) return;

    try {
      const sentMessage = await sendMessage(
        selectedRoom.otherUser.id,
        newMessage,
      );
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Add intersection observer for infinite scroll
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreMessages();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingMore]);

  const loadMoreMessages = async () => {
    if (!selectedRoom || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      await fetchMessages(selectedRoom.id, false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)] flex gap-4">
      {/* Chat rooms list */}
      <div className="w-1/3 border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-accent transition-colors ${
                selectedRoom?.id === room.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={room.otherUser?.profilePic || undefined} />
                <AvatarFallback className="bg-primary/10">
                  {room.otherUser?.firstName?.[0]}
                  {room.otherUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">
                  {room.otherUser?.firstName} {room.otherUser?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {room.lastMessage
                    ? room.lastMessage.content
                    : "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Messages */}
      <div className="flex-1 border rounded-lg bg-card flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedRoom.otherUser?.profilePic || undefined}
                />
                <AvatarFallback className="bg-primary/10">
                  {selectedRoom.otherUser?.firstName?.[0]}
                  {selectedRoom.otherUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">
                  {selectedRoom.otherUser?.firstName}{" "}
                  {selectedRoom.otherUser?.lastName}
                </h2>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {hasMore && (
                <div ref={loadMoreRef} className="text-center py-2">
                  {isLoadingMore ? (
                    <p className="text-muted-foreground text-sm">Loading...</p>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadMoreMessages()}
                      className="text-muted-foreground"
                    >
                      Load previous messages
                    </Button>
                  )}
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 mb-4 ${
                    msg.senderId === selectedRoom.otherUser?.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {msg.senderId === selectedRoom.otherUser?.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={selectedRoom.otherUser?.profilePic || undefined}
                      />
                      <AvatarFallback className="bg-primary/10">
                        {selectedRoom.otherUser?.firstName?.[0]}
                        {selectedRoom.otherUser?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === selectedRoom.otherUser?.id
                        ? "bg-accent"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
