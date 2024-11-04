import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
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
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (content: string) => {
    if (!user?.id) return;
    setError(null);
    const result = await sendMessage(content, user.id);
    if (!result) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      {error && (
        <View className="bg-destructive/10 p-2">
          <Text className="text-destructive text-center">{error}</Text>
        </View>
      )}
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
