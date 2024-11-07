"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import {
  OrderStatus,
  PaymentMethodType,
  PaymentStatus,
  TransactionType,
} from "@prisma/client";
import axios from "axios";

type CreateOrderResponse =
  | { id: string; success: string; payUrl?: string }
  | "Service non trouvé"
  | "Le portefeuille de l'acheteur n'a pas été trouvé."
  | "Solde insuffisant dans le portefeuille."
  | "Méthode de paiement non valide."
  | "Package not found or doesn't belong to this service"
  | null;
interface InitiatePaymentResponse {
  payUrl: string;
  paymentRef: string;
}
export async function createOrder(
  sellerId: string,
  serviceId: string,
  packageId: string,
  totalAmount: number,
  paymentMethod: PaymentMethodType,
): Promise<CreateOrderResponse> {
  try {
    console.log("sellerId", sellerId);
    console.log("serviceId", serviceId);
    console.log("totalAmount", totalAmount);
    console.log("paymentMethod", paymentMethod);
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.id) {
      return null;
    }

    const servicePackage = await prisma.servicePackage.findFirst({
      where: {
        id: packageId,
        serviceId: serviceId,
      },
    });

    if (!servicePackage) {
      return "Package not found or doesn't belong to this service";
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) return "Service non trouvé";

    const buyer = await prisma.personalProfile.findUnique({
      where: { id: user.user.id },
      include: { Wallet: true },
    });
    if (!buyer || !buyer.Wallet)
      return "Le portefeuille de l'acheteur n'a pas été trouvé.";

    const orderDescription = `Commande de service via ${paymentMethod === "WALLET" ? "Wallet" : "Paiement Externe"}`;

    // Wallet Payment Method
    if (paymentMethod === "WALLET") {
      if (Number(buyer.Wallet[0].balance) < totalAmount)
        return "Solde insuffisant dans le portefeuille.";

      await prisma.wallet.update({
        where: { id: buyer.Wallet[0].id },
        data: { balance: { decrement: totalAmount } },
      });

      const walletTransaction = await prisma.walletTransaction.create({
        data: {
          amount: totalAmount,
          type: TransactionType.PAYMENT,
          description: "Paiement de service via Wallet",
          walletId: buyer.Wallet[0].id,
        },
      });

      const order = await prisma.order.create({
        data: {
          buyerId: buyer.id,
          sellerId,
          serviceId,
          packageId,
          totalAmount,
          currency: "TND",
          status: OrderStatus.PENDING,
          paymentMethod: PaymentMethodType.WALLET,
          paymentStatus: PaymentStatus.COMPLETED,
          walletTransactionId: walletTransaction.id,
          description: orderDescription,
        },
        include: {
          service: true,
          servicePackage: true,
        },
      });

      return { ...order, success: "Commande créée avec succès" };
    }

    // External Payment Method
    else if (paymentMethod === "EXTERNAL") {
      const paymentTransaction = await prisma.paymentTransaction.create({
        data: {
          paymentMethod: "KONNECT",
          transactionStatus: PaymentStatus.PENDING,
          transaction: {
            create: {
              amount: totalAmount,
              type: TransactionType.PAYMENT,
              walletId: buyer.Wallet[0].id,
            },
          },
        },
      });

      const response = await axios.post<InitiatePaymentResponse>(
        "https://api.preprod.konnect.network/api/v2/payments/init-payment",
        {
          receiverWalletId: process.env.KONNECT_WALLET_ID,
          token: "TND",
          amount: Number(totalAmount * 1000),
          type: "immediate",
          description: "Order Payment",
          acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR", "flouci"],
          lifespan: 10,
          checkoutForm: true,
          addPaymentFeesToAmount: true,
          webhook: "https://yourdomain.com/api/payment/webhook",
          silentWebhook: true,
          successUrl: "https://localhost:3000/payment/success",
          failUrl: "https://localhost:3000/payment/failure",
          theme: "light",
        },
        {
          headers: {
            "x-api-key": process.env.KONNECT_API_KEY as string,
            "Content-Type": "application/json",
          },
        },
      );

      await prisma.paymentTransaction.update({
        where: { id: paymentTransaction.id },
        data: {
          transactionReference: response.data.paymentRef,
        },
      });

      const order = await prisma.order.create({
        data: {
          buyerId: buyer.id,
          sellerId,
          serviceId,
          packageId,
          totalAmount,
          currency: "TND",
          status: OrderStatus.PENDING,
          paymentMethod: PaymentMethodType.EXTERNAL,
          paymentStatus: PaymentStatus.PENDING,
          payTransactionId: paymentTransaction.transactionId,
          description: orderDescription,
        },
        include: {
          service: true,
          servicePackage: true,
        },
      });

      return {
        ...order,
        success: "Commande créée avec succès",
        payUrl: response.data.payUrl,
      };
    }

    // Invalid Payment Method
    else {
      return "Méthode de paiement non valide.";
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'ordre:", error);
    throw error;
  }
}

type OrderDetailsResponse =
  | {
      id: string;
      buyerId: string;
      sellerId: string;
      serviceId: string | null;
      totalAmount: number; // Ensure this expects number, not Decimal
      currency: string;
      status: OrderStatus;
      paymentMethod: PaymentMethodType;
      paymentStatus: PaymentStatus;
      description: string;
      createdAt: Date;
    }
  | "Commande introuvable";

export async function getOrderById(
  orderId: string,
): Promise<OrderDetailsResponse> {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        buyerId: true,
        sellerId: true,
        serviceId: true,
        totalAmount: true,
        currency: true,
        status: true,
        paymentMethod: true,
        paymentStatus: true,
        description: true,
        createdAt: true,
        service: true,
        servicePackage: true,
      },
    });

    if (!order) return "Commande introuvable";

    return {
      ...order,
      totalAmount: order.totalAmount.toNumber(), // Convert Decimal to number
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    throw error;
  }
}
