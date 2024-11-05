import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

interface WalletBalanceProps {
  balance: number;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <View className="p-6 bg-primary m-4 rounded-xl">
      <Text className="text-primary-foreground text-sm mb-2">
        Available Balance
      </Text>
      <Text className="text-primary-foreground text-3xl font-bold">
        ${balance.toFixed(2)}
      </Text>
      <View className="flex-row mt-4">
        <Button
          variant="secondary"
          className="flex-1 mr-2"
          onPress={() => {
            /* TODO: Implement withdraw */
          }}
        >
          Withdraw
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onPress={() => {
            /* TODO: Implement deposit */
          }}
        >
          Deposit
        </Button>
      </View>
    </View>
  );
}
