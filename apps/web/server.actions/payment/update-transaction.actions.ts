"use server";
import prisma from "@/lib/prismaClient";
import { PaymentStatus } from "@prisma/client";

export async function completeTransaction(transactionReference: string) {
  try {
    const transaction = await prisma.paymentTransaction.findFirst({
      where: { transactionReference },
      include: {
        transaction: true,
        Order: true,
      },
    });

    if (!transaction) {
      throw new Error(`Transaction ${transactionReference} not found`);
    }

    // Update transaction status
    const updatedTransaction = await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: {
        transactionStatus: PaymentStatus.COMPLETED,
        Order: {
          update: {
            where: { id: transaction.Order[0].id },
            data: { paymentStatus: PaymentStatus.COMPLETED },
          },
        },
      },
      include: { Order: true },
    });

    // Update wallet if needed
    if (transaction.transaction?.walletId) {
      const amount = Number(transaction.transaction.amount) / 1000;
      await prisma.wallet.update({
        where: { id: transaction.transaction.walletId },
        data: {
          balance: { increment: amount },
        },
      });
    }

    // Return the correct type matching TransactionResult
    return {
      success: true,
      orderId: updatedTransaction.Order[0].id,
      transactionId: updatedTransaction.id,
    };
  } catch (error) {
    console.error("Error completing transaction:", error);
    return {
      success: false,
      orderId: "",
      transactionId: "",
    };
  }
}
