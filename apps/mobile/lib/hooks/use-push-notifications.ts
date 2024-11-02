import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { supabase } from "../supabase";

export function usePushNotifications(userId: string) {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    // Save token to user's profile
    await supabase
      .from("PersonalProfile")
      .update({ pushToken: token })
      .eq("id", userId);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }
  };
}
