import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "../ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import type { Order } from "~/types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "IN_PROGRESS":
        return "text-blue-500";
      case "PENDING":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/orders/${order.id}`)}
      className="bg-card p-4 rounded-lg mb-4 border border-border"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-semibold text-lg" numberOfLines={1}>
            {order.service?.name}
          </Text>
          <Text className="text-sm text-muted-foreground mt-1">
            Order #{order.id.slice(0, 8)}
          </Text>
        </View>
        <Text className={`font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-row items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage source={{ uri: order.buyer?.profile?.profilePic }} />
            <AvatarFallback>
              {order.buyer?.profile?.firstName?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          <Text className="text-sm">
            {order.buyer?.firstName} {order.buyer?.lastName}
          </Text>
        </View>
        <Text className="font-semibold">
          ${parseFloat(order.totalAmount.toString()).toFixed(2)}
        </Text>
      </View>

      <Text className="text-xs text-muted-foreground mt-2">
        Created {format(new Date(order.createdAt), "MMM d, yyyy")}
      </Text>
    </Pressable>
  );
}
