import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./use-auth";

interface WalletTransaction {
  id: string;
  amount: number;
  type: string;
  description?: string;
  createdAt: string;
}

export function useWallet() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWallet();
      subscribeToTransactions();
    }
  }, [user]);

  const fetchWallet = async () => {
    try {
      const { data: wallet, error } = await supabase
        .from("Wallet")
        .select("*")
        .eq("ownerId", user?.id)
        .single();

      if (error) throw error;
      setBalance(parseFloat(wallet.balance));

      const { data: txns, error: txnError } = await supabase
        .from("WalletTransaction")
        .select("*")
        .eq("walletId", wallet.id)
        .order("createdAt", { ascending: false });

      if (txnError) throw txnError;
      setTransactions(txns);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToTransactions = () => {
    const subscription = supabase
      .channel("wallet_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "WalletTransaction",
        },
        () => {
          fetchWallet();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  return {
    balance,
    transactions,
    loading,
    refreshWallet: fetchWallet,
  };
}
