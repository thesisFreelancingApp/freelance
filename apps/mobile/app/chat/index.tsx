import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { ChatRoomList } from "~/components/chat/chat-room-list";
import { useChatRooms } from "~/lib/hooks/use-chat-rooms";
import { useAuth } from "~/lib/hooks/use-auth";

export default function ChatListScreen() {
  const { user } = useAuth();
  const { rooms, loading } = useChatRooms(user?.id || "");

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "Messages",
        }}
      />
      <ChatRoomList rooms={rooms} userId={user?.id || ""} loading={loading} />
    </View>
  );
}
