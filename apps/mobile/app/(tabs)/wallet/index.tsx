import React from "react";
import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Text } from "~/components/ui/text";
import { useWallet } from "~/lib/hooks/use-wallet";
import { TransactionList } from "~/components/wallet/transaction-list";
import { WalletBalance } from "~/components/wallet/wallet-balance";

export default function WalletScreen() {
  const { balance, transactions, withdraw } = useWallet();

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen options={{ title: "Wallet" }} />

      <WalletBalance balance={balance} />

      <View className="p-4">
        <Text className="text-lg font-semibold mb-4">Transaction History</Text>
        <TransactionList transactions={transactions} />
      </View>
    </ScrollView>
  );
}
