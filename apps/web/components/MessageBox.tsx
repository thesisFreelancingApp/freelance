"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import {
  getMessages,
  getOrCreateChatRoom,
  sendMessage,
} from "@/server.actions/message.actions";
import { uploadFile } from "@/server.actions/upload.actions";
import {
  Image as ImageIcon,
  MessageSquare,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !filePreview) return;
    setIsSending(true);
    try {
      let fileUrl = "";
      if (filePreview && fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        fileUrl = (await uploadFile(
          filePreview,
          file.name,
          file.type,
        )) as string;
      }
      const content = fileUrl ? `${message}\n${fileUrl}` : message;
      const { message: sentMessage, chatRoomId: newChatRoomId } =
        await sendMessage(receiverId, content);
      setChatRoomId(newChatRoomId);
      setMessage("");
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const base64 = await fileToBase64(file);
        setFilePreview(base64);
      } else {
        setFilePreview(`File: ${file.name}`);
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full"
        variant="outline"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Send Message
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={receiverProfilePic} />
                <AvatarFallback>{receiverName[0]}</AvatarFallback>
              </Avatar>
              <span>{receiverName}</span>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[50vh] pr-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === receiverId ? "justify-start" : "justify-end"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.senderId === receiverId
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.content.split("\n").map((line, index) =>
                    line.startsWith("http") &&
                    line.includes("res.cloudinary.com") ? (
                      <img
                        key={index}
                        src={line}
                        alt="Attached image"
                        className="h-auto max-w-full my-2 rounded-lg"
                      />
                    ) : line.startsWith("http") ? (
                      <a
                        key={index}
                        href={line}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline break-all"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={index}>{line}</p>
                    ),
                  )}
                  <p className="mt-1 text-xs opacity-70">
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
          <form onSubmit={handleSubmit} className="mt-4">
            {filePreview && (
              <div className="flex items-center justify-between p-2 mb-2 rounded-md bg-secondary">
                <div className="flex items-center space-x-2">
                  {filePreview.startsWith("data:image") ? (
                    <ImageIcon className="w-5 h-5 text-primary" />
                  ) : (
                    <Paperclip className="w-5 h-5 text-primary" />
                  )}
                  <span className="text-sm truncate max-w-[150px]">
                    {fileInputRef.current?.files?.[0].name}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilePreview(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSending}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" size="icon" disabled={isSending}>
                    <Send className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
