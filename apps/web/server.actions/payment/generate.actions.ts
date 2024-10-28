// /app/actions/initiatePaymentAction.ts
"use server";
// import prisma from "@/lib/prismaClient";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();
interface InitiatePaymentInput {
  amount: number;
  firstName: string;
  lastName: string;
  walletId: string;
  email: string;
  orderId: string;
  paymentType: "direct" | "deposit" | "support"; // Type de paiement
}

interface InitiatePaymentResponse {
  payUrl: string;
  paymentRef: string;
}

// Fonction pour initier un paiement et créer une transaction dans la base de données
export async function initiatePaymentAction({
  amount,
  walletId,
  paymentType,
}: InitiatePaymentInput): Promise<InitiatePaymentResponse> {
  try {
    // URL de succès et d'échec selon le type de paiement
    let successUrl = "https://localhost:3000/payment/success";
    let failUrl = "https://localhost:3000/payment/failure";

    switch (paymentType) {
      case "direct":
        successUrl = "https://localhost:3000/payment/success/direct";
        failUrl = "https://localhost:3000/payment/failure/direct";
        break;
      case "deposit":
        successUrl = "https://localhost:3000/payment/success/deposit";
        failUrl = "https://localhost:3000/payment/failure/deposit";
        break;
      case "support":
        successUrl = "https://localhost:3000/payment/success/support";
        failUrl = "https://localhost:3000/payment/failure/support";
        break;
    }

    // Création de la transaction avec un statut `PENDING`
    const transaction = await prisma.transaction.create({
      data: {
        amount: amount,
        type: "PAYMENT", // Ensure this matches the TransactionType enum
        description: "Payment initiation",
        wallet: {
          connect: {
            id: walletId, // ID of the wallet, assuming `walletId` is provided
          },
        },
        payment: {
          create: {
            paymentMethod: "Credit Card",
            transactionStatus: "PENDING", // Matches the PaymentStatus enum
            transactionReference: null, // External reference, if available
          },
        },
      },
    });

    console.log(transaction);
    // Envoi de la requête à l'API de paiement
    // Envoi de la requête à l'API de paiement
    const response = await axios.post<InitiatePaymentResponse>(
      "https://api.preprod.konnect.network/api/v2/payments/init-payment",
      {
        receiverWalletId: process.env.KONNECT_WALLET_ID, // ID du portefeuille receveur
        token: "TND", // Devise (TND pour Dinar tunisien)
        amount, // Montant en millimes
        type: "immediate", // Type de paiement : immédiat ou partiel
        description: "Order Payment", // Description du paiement
        acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR", "flouci"], // Moyens de paiement acceptés
        lifespan: 10, // Durée de validité du paiement en minutes
        checkoutForm: true, // Activer le formulaire de paiement
        addPaymentFeesToAmount: true, // Ajouter les frais de paiement au montant total

        webhook: "https://yourdomain.com/api/payment/webhook", // URL de webhook pour recevoir les notifications de paiement
        silentWebhook: true, // Activer le webhook silencieux (ne pas afficher de notification utilisateur)
        successUrl, // URL de redirection en cas de succès
        failUrl, // URL de redirection en cas d'échec
        theme: "light", // Thème de la page de paiement (clair ou sombre)
      },
      {
        headers: {
          "x-api-key": process.env.KONNECT_API_KEY as string, // Clé API pour authentification
          "Content-Type": "application/json", // Type de contenu de la requête (JSON)
        },
      },
    );

    // Mise à jour de la transaction avec les détails de la réponse
    await prisma.paymentTransaction.update({
      where: { transactionId: transaction.id },
      data: {
        transactionReference: response.data.paymentRef,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw new Error("Failed to initiate payment");
  }
}

// Brand	Output	Number	Exp Date	CVC
// Visa	Successful Payment	4509211111111119	12/26	748
// MasterCard	Successful Payment	5440212711111110	12/26	665
// MasterCard	Failed Payment	5471251111111116	11/23	858
