"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getAllChatRooms,
  getMessages,
  sendMessage,
} from "@/server.actions/message.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ChatRoom {
  id: number;
  otherUser: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
  lastMessage: {
    content: string;
    createdAt: Date;
  } | null;
}

interface Message {
  id: number;
  senderId: string;
  content: string;
  createdAt: Date;
}

export default function MessagesLayout() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchChatRooms();
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
        },
        handleNewMessage,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.id);
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

  const fetchMessages = async (roomId: number) => {
    try {
      const fetchedMessages = await getMessages(roomId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleNewMessage = (payload: any) => {
    const newMessage = payload.new as Message & { chatRoomId: number };
    if (selectedRoom && newMessage.chatRoomId === selectedRoom.id) {
      setMessages((prev) => [...prev, newMessage]);
    }
    fetchChatRooms(); // Update chat room list to show latest message
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      await sendMessage(selectedRoom.otherUser.id, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)] flex">
      {/* Chat rooms list */}
      <div className="w-1/3 pr-4 border-r">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <ScrollArea className="h-full">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 rounded-lg ${
                selectedRoom?.id === room.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage
                  src={room.otherUser.profilePic || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {room.otherUser.firstName?.[0]}
                  {room.otherUser.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">
                  {room.otherUser.firstName} {room.otherUser.lastName}
                </p>
                <p className="text-sm text-gray-600 truncate">
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
      <div className="w-2/3 pl-4 flex flex-col">
        {selectedRoom ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Chat with {selectedRoom.otherUser.firstName}{" "}
              {selectedRoom.otherUser.lastName}
            </h2>
            <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.senderId === selectedRoom.otherUser.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === selectedRoom.otherUser.id
                        ? "bg-gray-200"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
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
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
