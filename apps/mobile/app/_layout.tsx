import "~/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { useAuth } from "~/lib/hooks/use-auth";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === "(auth)";
      if (session && inAuthGroup) {
        router.replace("/(tabs)");
      } else if (!session && !inAuthGroup) {
        router.replace("/(auth)");
      }
    }
  }, [session, loading, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="service/[id]"
          options={{
            headerShown: true,
            title: "Service Details",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="service/create"
          options={{
            headerShown: true,
            title: "Create Service",
            presentation: "modal",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
