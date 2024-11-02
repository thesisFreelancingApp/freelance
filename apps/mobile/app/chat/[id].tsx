import { View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ChatRoom } from "~/components/chat/chat-room";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "Chat",
        }}
      />
      <ChatRoom roomId={id} />
    </View>
  );
}
