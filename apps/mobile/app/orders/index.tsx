import React from "react";
import { View, FlatList } from "react-native";
import { Stack, Tabs } from "expo-router";
import { Text } from "~/components/ui/text";
import { useOrders } from "~/lib/hooks/use-orders";
import { OrderCard } from "~/components/order/order-card";

export default function OrdersScreen() {
  const { activeOrders, completedOrders } = useOrders();

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title: "Orders" }} />

      <Tabs.Navigator>
        <Tabs.Screen
          name="active"
          options={{ title: "Active" }}
          component={() => (
            <FlatList
              data={activeOrders}
              renderItem={({ item }) => <OrderCard order={item} />}
              contentContainerStyle={{ padding: 16 }}
            />
          )}
        />
        <Tabs.Screen
          name="completed"
          options={{ title: "Completed" }}
          component={() => (
            <FlatList
              data={completedOrders}
              renderItem={({ item }) => <OrderCard order={item} />}
              contentContainerStyle={{ padding: 16 }}
            />
          )}
        />
      </Tabs.Navigator>
    </View>
  );
}
