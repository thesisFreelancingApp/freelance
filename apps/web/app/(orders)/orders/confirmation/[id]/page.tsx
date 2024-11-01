"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderById } from "@/server.actions/service orders/orders.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
interface ConfirmationPageProps {
  params: {
    id: string;
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = params;
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<{
    id: string;
    totalAmount: number;
    currency: string;
    paymentMethod: string;
    status: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await getOrderById(id);

        if (typeof response === "string") {
          console.error("Order not found.");
          setOrderDetails(null);
        } else {
          setOrderDetails({
            id: response.id,
            totalAmount: response.totalAmount,
            currency: response.currency,
            paymentMethod: response.paymentMethod,
            status: response.status,
          });
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [id]);
  if (loading) return <p>Loading confirmation details...</p>;
  if (!orderDetails) return <p>Order not found.</p>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Merci pour votre paiement !</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Votre paiement a été effectué avec succès via le portefeuille.
            </p>
            <p className="mt-4">
              <strong>Détails de la commande :</strong>
            </p>
            <ul className="mt-2">
              <li>
                <strong>Numéro de commande :</strong> {orderDetails.id}
              </li>
              <li>
                <strong>Montant total :</strong> {orderDetails.totalAmount}{" "}
                {orderDetails.currency}
              </li>
              <li>
                <strong>Méthode de paiement :</strong>{" "}
                {orderDetails.paymentMethod}
              </li>
              <li>
                <strong>Status de commande :</strong> {orderDetails.status}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Button
          onClick={() => router.push("/")}
          className="w-full px-4 py-2 mt-8"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
