import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { Bell, MessageSquare, Star, Package, Clock } from "lucide-react-native";
import { useState } from "react";
import { AnimatedView } from "~/components/ui/animated-view";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

type Notification = {
  id: string;
  type: "message" | "review" | "order" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Nouveau message",
    description: "John Doe vous a envoyé un message",
    time: "Il y a 5 minutes",
    read: false,
  },
  {
    id: "2",
    type: "review",
    title: "Nouvelle évaluation",
    description: "Vous avez reçu une évaluation 5 étoiles",
    time: "Il y a 2 heures",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Nouvelle commande",
    description: "Votre service a été commandé",
    time: "Il y a 1 jour",
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  switch (type) {
    case "message":
      return <MessageSquare className="text-blue-500" size={24} />;
    case "review":
      return <Star className="text-yellow-500" size={24} />;
    case "order":
      return <Package className="text-green-500" size={24} />;
    default:
      return <Bell className="text-primary" size={24} />;
  }
};

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="p-4 border-b border-border bg-card">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">Notifications</Text>
          <Button variant="ghost" onPress={markAllAsRead}>
            <Text className="text-primary">Tout marquer comme lu</Text>
          </Button>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4 space-y-4">
          {notifications.map((notification, index) => (
            <AnimatedView
              key={notification.id}
              animation="fadeInDown"
              delay={index * 100}
            >
              <Card
                className={`border-l-4 ${
                  notification.read
                    ? "border-l-border"
                    : "border-l-primary bg-primary/5"
                }`}
              >
                <CardContent className="p-4">
                  <View className="flex-row space-x-4">
                    <NotificationIcon type={notification.type} />
                    <View className="flex-1">
                      <Text className="font-semibold">
                        {notification.title}
                      </Text>
                      <Text className="text-muted-foreground mt-1">
                        {notification.description}
                      </Text>
                      <View className="flex-row items-center mt-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <Text className="text-xs text-muted-foreground ml-1">
                          {notification.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </AnimatedView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
