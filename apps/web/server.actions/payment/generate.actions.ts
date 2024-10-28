// /app/actions/initiatePaymentAction.ts
"use server";
import axios from "axios";

interface InitiatePaymentInput {
  amount: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  orderId: string;
}

interface InitiatePaymentResponse {
  payUrl: string;
  paymentRef: string;
}

export async function initiatePaymentAction({
  amount,
  firstName,
  lastName,
  phoneNumber,
  email,
  orderId,
}: InitiatePaymentInput): Promise<InitiatePaymentResponse> {
  try {
    const response = await axios.post<InitiatePaymentResponse>(
      "https://api.preprod.konnect.network/api/v2/payments/init-payment",
      {
        receiverWalletId: process.env.KONNECT_WALLET_ID, // Your wallet ID
        token: "TND", // Currency (e.g., TND for Tunisian Dinar)
        amount, // Amount in millimes
        type: "immediate", // "immediate" or "partial"
        description: "Order Payment",
        acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR", "flouci"], // Specify accepted methods
        lifespan: 10, // Payment expiration time in minutes
        checkoutForm: true,
        addPaymentFeesToAmount: true,
        firstName,
        lastName,
        phoneNumber,
        email,
        orderId,
        webhook: "https://yourdomain.com/api/payment/webhook", // Your webhook URL
        silentWebhook: true,
        successUrl: "https://localhost:3000/payment/success",
        failUrl: "https://localhost:3000/payment/failure",
        theme: "light", // Theme for payment page
      },
      {
        headers: {
          "x-api-key": process.env.KONNECT_API_KEY as string,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw new Error("Failed to initiate payment");
  }
}
