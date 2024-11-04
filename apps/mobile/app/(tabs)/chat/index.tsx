import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Stack } from "expo-router";
import { ChatRoomList } from "~/components/chat/chat-room-list";
import { useChatRooms } from "~/lib/hooks/use-chat-rooms";
import { useAuth } from "~/lib/hooks/use-auth";
import { Search } from "lucide-react-native";

export default function ChatListScreen() {
  const { user } = useAuth();
  const { rooms, loading, refreshRooms } = useChatRooms(user?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const otherParticipant = room.participants.find(
      (p) => p.participantId !== user?.id
    )?.profile;
    const fullName = `${otherParticipant?.firstName || ""} ${
      otherParticipant?.lastName || ""
    }`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "Messages",
          headerLargeTitle: true,
        }}
      />

      {/* Search Bar */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-secondary rounded-full px-4 py-2">
          <Search size={20} className="text-muted-foreground mr-2" />
          <TextInput
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1"
          />
        </View>
      </View>

      <ChatRoomList
        rooms={filteredRooms}
        userId={user?.id || ""}
        loading={loading}
        onRefresh={refreshRooms}
      />
    </View>
  );
}
