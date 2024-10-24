"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getRecentMessages,
  getMessages,
  sendMessage,
} from "@/server.actions/message.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Send, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";

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

export default function MessagesPage() {
  const [chatRooms, setChatRooms] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      setIsLoading(true);
      try {
        const { messages } = await getRecentMessages();
        setChatRooms(messages);
        if (messages.length > 0) {
          setSelectedChat(messages[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
        setError("Failed to load chat rooms. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        setIsLoading(true);
        try {
          const fetchedMessages = await getMessages(selectedChat);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
          setError("Failed to load messages. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("new_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        (payload) => {
          const newMessage = payload.new as Message;
          if (newMessage.chatRoomId === selectedChat) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const { message } = await sendMessage(selectedChat, newMessage);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const ChatList = () => (
    <ScrollArea className="h-[calc(100vh-120px)]">
      {chatRooms.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center p-4 cursor-pointer hover:bg-accent transition-colors duration-200 ${
            selectedChat === chat.id ? "bg-accent" : ""
          }`}
          onClick={() => {
            setSelectedChat(chat.id);
            setIsMobileMenuOpen(false);
          }}
        >
          <Avatar className="w-10 h-10 mr-4">
            <AvatarImage
              src={chat.otherUser.profilePic || "/placeholder.svg"}
            />
            <AvatarFallback>
              {chat.otherUser.firstName?.[0]}
              {chat.otherUser.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">
              {chat.otherUser.firstName} {chat.otherUser.lastName}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {chat.content}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-2">Messages</h2>
              <ChatList />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Chat list (hidden on mobile) */}
      <div className="hidden lg:block w-1/3 border-r border-border">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search messages"
              className="pl-10"
            />
          </div>
        </div>
        <ChatList />
      </div>

      {/* Chat room */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold">
                {
                  chatRooms.find((chat) => chat.id === selectedChat)?.otherUser
                    .firstName
                }{" "}
                {
                  chatRooms.find((chat) => chat.id === selectedChat)?.otherUser
                    .lastName
                }
              </h2>
              {isTyping && (
                <p className="text-sm text-muted-foreground">Typing...</p>
              )}
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender.id ===
                      chatRooms.find((chat) => chat.id === selectedChat)
                        ?.otherUser.id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <Card
                      className={`max-w-[70%] ${
                        msg.sender.id ===
                        chatRooms.find((chat) => chat.id === selectedChat)
                          ?.otherUser.id
                          ? "bg-accent"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <CardContent className="p-3">
                        <p>{msg.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex items-center">
                <Input
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Type a message"
                  className="flex-1 mr-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
