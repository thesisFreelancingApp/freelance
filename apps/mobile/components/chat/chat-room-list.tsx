import React, { useState } from "react";
import { View, FlatList, Pressable, RefreshControl } from "react-native";
import { Text } from "../ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import type { ChatRoom } from "~/types/message";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  userId: string;
  loading?: boolean;
  onRefresh?: () => Promise<void>;
}

export function ChatRoomList({
  rooms,
  userId,
  loading,
  onRefresh,
}: ChatRoomListProps) {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const getOtherParticipant = (room: ChatRoom) => {
    return room.participants.find((p) => p.participantId !== userId)?.profile;
  };

  const renderItem = ({ item: room }: { item: ChatRoom }) => {
    const otherUser = getOtherParticipant(room);
    const lastMessage = room.lastMessage;

    return (
      <Pressable
        onPress={() => router.push(`/chat/${room.id}`)}
        className="flex-row items-center p-4 border-b border-border"
      >
        <Avatar
          className="h-12 w-12 mr-3"
          alt={`${otherUser?.firstName || "User"}'s avatar`}
        >
          <AvatarImage source={{ uri: otherUser?.profilePic }} />
          <AvatarFallback>{otherUser?.firstName?.[0] || "?"}</AvatarFallback>
        </Avatar>

        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold">
              {otherUser?.firstName} {otherUser?.lastName}
            </Text>
            {lastMessage && (
              <Text className="text-xs text-muted-foreground">
                {format(new Date(lastMessage.createdAt), "HH:mm")}
              </Text>
            )}
          </View>

          {lastMessage && (
            <Text
              numberOfLines={1}
              className={`text-sm mt-1 ${
                !lastMessage.isRead && lastMessage.senderId !== userId
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {lastMessage.content}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-muted-foreground text-center">
            No conversations yet
          </Text>
        </View>
      }
    />
  );
}
