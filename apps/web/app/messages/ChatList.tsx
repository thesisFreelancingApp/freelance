"use client";
import React, { useState, useEffect } from "react";
import { getRecentMessages } from "@/server.actions/message.actions";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  profilePic: string | null;
}

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  sender: User;
  otherUser: User;
}

export default function ChatList() {
  const [chatRooms, setChatRooms] = useState<Message[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const { messages } = await getRecentMessages();
        setChatRooms(messages);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <div className="space-y-4">
        {chatRooms.map((chat) => (
          <Link key={chat.id} href={`/messages/${chat.id}`}>
            <Card className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage
                  src={chat.otherUser.profilePic || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {chat.otherUser.firstName?.charAt(0)}
                  {chat.otherUser.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardContent className="flex-1">
                <p className="font-semibold">
                  {chat.otherUser.firstName} {chat.otherUser.lastName}
                </p>
                <p className="text-sm text-gray-600 truncate">{chat.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
