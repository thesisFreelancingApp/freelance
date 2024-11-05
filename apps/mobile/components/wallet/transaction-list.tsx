import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "../ui/text";
import { format } from "date-fns";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description?: string;
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-border">
      <View>
        <Text className="font-medium">{item.type}</Text>
        <Text className="text-sm text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d, yyyy")}
        </Text>
      </View>
      <Text
        className={`font-semibold ${
          item.type === "DEPOSIT" ? "text-green-500" : "text-red-500"
        }`}
      >
        {item.type === "DEPOSIT" ? "+" : "-"}${Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text className="text-center text-muted-foreground py-4">
          No transactions yet
        </Text>
      }
    />
  );
}
