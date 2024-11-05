import React from "react";
import { View, FlatList } from "react-native";
import { Stack } from "expo-router";
import { Text } from "~/components/ui/text";
import { useOrders } from "~/lib/hooks/use-orders";
import { OrderCard } from "~/components/order/order-card";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ActiveOrders() {
  const { orders } = useOrders();
  const activeOrders = orders.filter(
    (order) => !["COMPLETED", "CANCELLED"].includes(order.status)
  );

  return (
    <FlatList
      data={activeOrders}
      renderItem={({ item }) => <OrderCard order={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

function CompletedOrders() {
  const { orders } = useOrders();
  const completedOrders = orders.filter((order) =>
    ["COMPLETED", "CANCELLED"].includes(order.status)
  );

  return (
    <FlatList
      data={completedOrders}
      renderItem={({ item }) => <OrderCard order={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title: "Orders" }} />
      <Tab.Navigator>
        <Tab.Screen name="Active" component={ActiveOrders} />
        <Tab.Screen name="Completed" component={CompletedOrders} />
      </Tab.Navigator>
    </View>
  );
}
