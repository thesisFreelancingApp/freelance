"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { getMessages } from "@/server.actions/dashboard/messages.action";
import type { FormattedMessagesType } from "@/server.actions/dashboard/messages.action";

export default function MessagesTab() {
  const [selectedRoom, setSelectedRoom] = useState<
    FormattedMessagesType[number] | null
  >(null);
  const [messagesData, setMessagesData] = useState<FormattedMessagesType>([]);

  useEffect(() => {
    async function fetchMessagesData() {
      const data = await getMessages();
      setMessagesData(data);
    }
    fetchMessagesData();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-0">
        <div className="flex h-[600px]">
          <div className="w-1/3 border-r">
            <ScrollArea className="h-full">
              {messagesData?.map((room) => (
                <div
                  key={room.id}
                  className={`p-4 cursor-pointer hover:bg-accent ${selectedRoom?.id === room.id ? "bg-accent" : ""}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <h3 className="font-semibold">{room.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {room.lastMessage}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">
                {selectedRoom?.title ?? "Select a room"}
              </h2>
            </div>
            <ScrollArea className="flex-grow p-4">
              {selectedRoom?.messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-4 mb-4"
                >
                  <Avatar>
                    <AvatarFallback>
                      {message.sender?.firstName?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {message.sender?.firstName ?? "Unknown sender"}
                    </p>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <form className="flex space-x-2">
                <Input
                  className="flex-grow"
                  placeholder="Type your message..."
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
