"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function completeTransaction(transactionReference: string) {
  try {
    // Retrieve the transaction by `transactionReference`
    const transaction = await prisma.paymentTransaction.findFirst({
      where: { transactionReference: transactionReference },
      include: { transaction: true },
    });

    console.log(transaction);
    if (!transaction) {
      throw new Error(
        `Transaction with reference ${transactionReference} not found`,
      );
    }

    // Ensure `transaction.transaction.amount` is a number, defaulting to 0 if undefined
    const amount =
      (transaction.transaction?.amount as unknown as number | undefined) ?? 0;
    const scaledAmount = amount / 1000;

    // Update the transaction status to COMPLETED
    const newTr = await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: { transactionStatus: "COMPLETED" },
    });

    // Update the wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: transaction.transaction?.walletId },
      data: {
        balance: {
          increment: scaledAmount,
        },
      },
    });

    return updatedWallet;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la transaction:", error);
  } finally {
    await prisma.$disconnect();
  }
}
