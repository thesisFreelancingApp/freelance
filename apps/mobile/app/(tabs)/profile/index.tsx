import { View, ScrollView, Alert } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/hooks/use-auth";
import { Button } from "~/components/ui/button";
import { Image } from "expo-image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Settings,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Clock,
  ChevronRight,
  Bell,
  Shield,
  Palette,
  HelpCircle,
} from "lucide-react-native";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const menuItems = [
  {
    title: "Account",
    items: [
      {
        icon: User,
        label: "Personal Information",
        route: "/settings/personal",
      },
      { icon: Mail, label: "Email Settings", route: "/settings/email" },
      { icon: Phone, label: "Phone Number", route: "/settings/phone" },
      { icon: MapPin, label: "Address", route: "/settings/address" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", route: "/settings/notifications" },
      { icon: Shield, label: "Privacy & Security", route: "/settings/privacy" },
      { icon: Palette, label: "Appearance", route: "/settings/appearance" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", route: "/help" },
      { icon: Mail, label: "Contact Us", route: "/contact" },
    ],
  },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              console.error("Error signing out:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Profile Header */}
      <View className="bg-primary pt-12 pb-24 px-4">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-primary-foreground text-2xl font-bold">
              Profile
            </Text>
          </View>
          <Button
            variant="ghost"
            size="icon"
            className="bg-primary-foreground/10"
            onPress={() => router.push("/settings")}
          >
            <Settings className="text-primary-foreground" size={24} />
          </Button>
        </View>

        <View className="flex-row items-center">
          <Image
            source={{ uri: user?.user_metadata?.avatar_url || "/profile.webp" }}
            className="w-20 h-20 rounded-full border-4 border-primary-foreground/20"
            contentFit="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="text-primary-foreground text-lg font-semibold">
              {user?.user_metadata?.name || "User"}
            </Text>
            <Text className="text-primary-foreground/80">{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-4 -mt-12 mb-6 flex-row gap-4">
        <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
          <Card>
            <CardContent className="p-4">
              <Star className="text-yellow-500 mb-2" />
              <Text className="text-2xl font-bold">4.9</Text>
              <Text className="text-sm text-muted-foreground">
                Average Rating
              </Text>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)} className="flex-1">
          <Card>
            <CardContent className="p-4">
              <Clock className="text-primary mb-2" />
              <Text className="text-2xl font-bold">12</Text>
              <Text className="text-sm text-muted-foreground">
                Active Orders
              </Text>
            </CardContent>
          </Card>
        </Animated.View>
      </View>

      {/* Menu Items */}
      <View className="px-4 space-y-6 mb-8">
        {menuItems.map((section, index) => (
          <Animated.View
            key={section.title}
            entering={FadeInDown.delay(400 + index * 100)}
          >
            <Text className="text-lg font-semibold mb-2">{section.title}</Text>
            <Card>
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => (
                  <View key={item.label}>
                    <Button
                      variant="ghost"
                      className="flex-row items-center justify-between p-4"
                      onPress={() => router.push(item.route)}
                    >
                      <View className="flex-row items-center">
                        <item.icon
                          size={20}
                          className="text-muted-foreground mr-3"
                        />
                        <Text className="text-foreground">{item.label}</Text>
                      </View>
                      <ChevronRight
                        size={20}
                        className="text-muted-foreground"
                      />
                    </Button>
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="mx-4" />
                    )}
                  </View>
                ))}
              </CardContent>
            </Card>
          </Animated.View>
        ))}
      </View>

      {/* Sign Out Button */}
      <View className="px-4 mb-8">
        <Button variant="destructive" className="h-12" onPress={handleSignOut}>
          <LogOut className="mr-2" size={20} />
          <Text className="text-destructive-foreground font-semibold">
            Sign Out
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
