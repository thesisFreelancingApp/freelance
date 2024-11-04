import { View, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChatRoom } from "~/components/chat/chat-room";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MoreVertical, ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useChatRoom } from "~/lib/hooks/use-chat-room";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { room, loading, error } = useChatRoom(id);

  if (!id) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Invalid chat room</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-destructive">Error loading chat</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary rounded-full"
        >
          <Text className="text-primary-foreground">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const otherParticipant = room?.participants[0]?.profile;

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center"
            >
              <ArrowLeft size={24} className="text-foreground mr-2" />
              <Avatar
                className="w-8 h-8"
                alt={`${otherParticipant?.firstName || "User"}'s avatar`}
              >
                <AvatarImage source={{ uri: otherParticipant?.profilePic }} />
                <AvatarFallback>
                  {otherParticipant?.firstName?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <Text className="ml-2 font-medium">
                {otherParticipant?.firstName} {otherParticipant?.lastName}
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <MoreVertical size={24} className="text-foreground" />
            </TouchableOpacity>
          ),
        }}
      />
      <ChatRoom roomId={id} />
    </View>
  );
}
