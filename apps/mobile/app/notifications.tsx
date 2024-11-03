import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-semibold">Notifications</Text>
      {/* Add your notifications UI here */}
    </View>
  );
}
