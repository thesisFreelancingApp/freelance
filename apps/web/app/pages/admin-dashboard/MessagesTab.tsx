"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";
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
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardContent className="p-0">
        <div className="flex h-[700px]">
          <div className="w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search conversations..." />
              </div>
            </div>
            <ScrollArea className="flex-grow">
              {messagesData?.map((room) => (
                <div
                  key={room.id}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                    selectedRoom?.id === room.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${room.title}`} />
                      <AvatarFallback>{room.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold truncate">{room.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {room.lastMessage}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(room.messages[room.messages.length - 1]?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 flex flex-col bg-accent/5">
            {selectedRoom ? (
              <>
                <div className="p-4 border-b bg-background">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedRoom.title}`} />
                      <AvatarFallback>{selectedRoom.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-lg">{selectedRoom.title}</h2>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>
                <ScrollArea className="flex-grow p-4">
                  {selectedRoom.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 mb-4 ${
                        message.sender?.firstName === "You" ? "justify-end" : ""
                      }`}
                    >
                      {message.sender?.firstName !== "You" && (
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender?.firstName}`} />
                          <AvatarFallback>
                            {message.sender?.firstName?.charAt(0) ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`space-y-1 ${
                        message.sender?.firstName === "You" ? "items-end" : "items-start"
                      }`}>
                        <p className="text-sm font-medium">
                          {message.sender?.firstName ?? "Unknown sender"}
                        </p>
                        <div className={`p-3 rounded-lg ${
                          message.sender?.firstName === "You"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.sender?.firstName === "You" && (
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=You`} />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </ScrollArea>

              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}