import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function MessagesScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-semibold">Messages</Text>
      {/* Add your messages UI here */}
    </View>
  );
}
