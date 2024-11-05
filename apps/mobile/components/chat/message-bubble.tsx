import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react-native";
import type { Message } from "~/types/message";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <View
      className={`flex-row items-end mb-4 ${isOwn ? "flex-row-reverse" : ""}`}
    >
      <Avatar alt={message.sender?.firstName || "User"} className="mb-1">
        <AvatarImage source={{ uri: message.sender?.profilePic }} />
        <AvatarFallback>{message.sender?.firstName?.[0] || "?"}</AvatarFallback>
      </Avatar>

      <View
        className={`mx-2 px-4 py-2 rounded-2xl max-w-[80%] ${
          isOwn ? "bg-primary rounded-tr-none" : "bg-secondary rounded-tl-none"
        }`}
      >
        <Text className={`${isOwn ? "text-primary-foreground" : ""}`}>
          {message.content}
        </Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text
            className={`text-xs mr-1 ${
              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {format(new Date(message.createdAt), "HH:mm")}
          </Text>
          {isOwn &&
            (message.isRead ? (
              <CheckCheck size={14} className="text-primary-foreground/70" />
            ) : (
              <Check size={14} className="text-primary-foreground/70" />
            ))}
        </View>
      </View>
    </View>
  );
}
