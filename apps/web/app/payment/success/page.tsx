"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeTransaction } from "@/server.actions/payment/update-transaction.actions";

interface TransactionResult {
  success: boolean;
  orderId: string;
  transactionId: string;
}

export default function PaymentSuccessPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentRef = searchParams.get("payment_ref");

  useEffect(() => {
    async function handlePaymentSuccess() {
      try {
        if (!paymentRef) {
          console.error("No payment reference found");
          router.push("/");
          return;
        }

        // Complete the transaction and get the order ID
        const result = (await completeTransaction(
          paymentRef,
        )) as TransactionResult;

        if (result?.success && result?.orderId) {
          // Redirect to order confirmation with payment reference
          router.push(
            `/orders/confirmation/${result.orderId}?ref=${paymentRef}`,
          );
        } else {
          console.error("No order found for payment");
          router.push("/");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        router.push("/");
      }
    }

    handlePaymentSuccess();
  }, [paymentRef, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Processing your payment...</p>
        <p className="text-sm text-muted-foreground">
          Please do not close this window
        </p>
      </div>
    </div>
  );
}
