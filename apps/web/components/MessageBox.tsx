"use client";

import { useEffect, useState } from "react";
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
import {
  sendMessage,
  getMessages,
  getOrCreateChatRoom,
} from "@/server.actions/message.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";

interface MessageBoxProps {
  receiverId: string;
  receiverName: string;
  receiverProfilePic: string;
}

interface Message {
  id: number;
  senderId: string;
  content: string;
  createdAt: string | Date;
}

export function MessageBox({
  receiverId,
  receiverName,
  receiverProfilePic,
}: MessageBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchChatRoomAndMessages = async () => {
        try {
          const roomId = await getOrCreateChatRoom(receiverId);
          setChatRoomId(roomId);
          const fetchedMessages = await getMessages(roomId);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch chat room and messages:", error);
        }
      };

      fetchChatRoomAndMessages();
    }
  }, [isOpen, receiverId]);

  useEffect(() => {
    if (isOpen && chatRoomId) {
      const supabase = createClient();
      const channel = supabase
        .channel(`chat_${chatRoomId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `chatRoomId=eq.${chatRoomId}`,
          },
          (payload) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              payload.new as Message,
            ]);
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen, chatRoomId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);
    try {
      const { message: sentMessage, chatRoomId: newChatRoomId } =
        await sendMessage(receiverId, message);
      setChatRoomId(newChatRoomId);
      setMessage("");
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
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
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-lg border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={receiverProfilePic} />
                  <AvatarFallback>{receiverName[0]}</AvatarFallback>
                </Avatar>
                {receiverName}
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === receiverId
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === receiverId
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
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
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isSending}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
