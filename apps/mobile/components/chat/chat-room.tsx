import React, { useEffect } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useChat } from "~/lib/hooks/use-chat";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { useAuth } from "~/lib/hooks/use-auth";

interface ChatRoomProps {
  roomId: string;
}

export function ChatRoom({ roomId }: ChatRoomProps) {
  const { user } = useAuth();
  const { messages, sendMessage } = useChat(roomId, user?.id || "");
  const flatListRef = React.useRef<FlatList>(null);

  const handleSend = async (content: string) => {
    if (!user?.id) return;
    await sendMessage(content, user.id);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        className="flex-1 px-4"
        keyExtractor={(item) => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <MessageBubble message={item} isOwn={item.senderId === user?.id} />
        )}
      />
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
