import "~/global.css";
import { Slot, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { Home, User, MessageSquare, Search, Bell } from "lucide-react-native";
import { useAuth } from "~/lib/hooks/use-auth";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LIGHT_THEME = {
  dark: false,
  colors: {
    primary: "#0ea5e9",
    background: "#ffffff",
    card: "#ffffff",
    text: "#000000",
    border: "#e5e5e5",
    notification: "#0ea5e9",
  },
};
const DARK_THEME = {
  dark: true,
  colors: {
    primary: "#0ea5e9",
    background: "#1a1a1a",
    card: "#1a1a1a",
    text: "#ffffff",
    border: "#333333",
    notification: "#0ea5e9",
  },
};

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (!session && !segments[0]?.startsWith("(auth)")) {
        router.replace("/(auth)");
      } else if (session && segments[0]?.startsWith("(auth)")) {
        router.replace("/");
      }
    }
  }, [session, loading, segments]);

  if (loading) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        {!session ? (
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
          </Stack>
        ) : (
          <Tabs
            screenOptions={{
              tabBarStyle: {
                backgroundColor: isDarkColorScheme ? "#1a1a1a" : "#ffffff",
                borderTopColor: isDarkColorScheme ? "#333333" : "#e5e5e5",
              },
              tabBarActiveTintColor: "#0ea5e9",
              tabBarInactiveTintColor: isDarkColorScheme
                ? "#999999"
                : "#666666",
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: "Explore",
                tabBarIcon: ({ color, size }) => (
                  <Search size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="notifications"
              options={{
                title: "Notifications",
                tabBarIcon: ({ color, size }) => (
                  <Bell size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="messages"
              options={{
                title: "Messages",
                tabBarIcon: ({ color, size }) => (
                  <MessageSquare size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
