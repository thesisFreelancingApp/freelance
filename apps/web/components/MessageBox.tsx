"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendMessage } from "@/server.actions/message.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBoxProps {
  receiverId: string;
  receiverName: string;
  receiverProfilePic: string;
}

interface Message {
  id: number;
  sender: "user" | "receiver";
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "receiver",
    content: "Hello! How can I help you today?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "user",
    content:
      "Hi! I'm interested in your service. Can you tell me more about it?",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    sender: "receiver",
    content: "Of course! My service includes...",
    timestamp: "10:10 AM",
  },
];

export function MessageBox({
  receiverId,
  receiverName,
  receiverProfilePic,
}: MessageBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendMessage(receiverId, message);
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center"
        variant="outline"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Send Message
      </Button>
      {isOpen && (
        <div className="fixed bottom-4 left-4 z-50">
          <Card className="w-80 shadow-lg border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={receiverProfilePic} />
                  <AvatarFallback>{receiverName[0]}</AvatarFallback>
                </Avatar>
                {receiverName}
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-y-auto mb-4 p-2 bg-muted rounded-md">
                {/* Message history would go here this is temporary data of old messages */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                    >
                      {msg.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {msg.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" size="sm" disabled={isSending}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
