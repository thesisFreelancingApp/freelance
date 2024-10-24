"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getMessages, sendMessage } from "@/server.actions/message.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  senderId: string;
}

export default function ChatRoom() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await getMessages(Number(id));
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { message } = await sendMessage(id as string, newMessage);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <Card key={msg.id} className="p-4">
            <CardContent>
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
