"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/server.actions/service orders/orders.actions";
import { getPackageById } from "@/server.actions/service orders/package.actions";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PurchasePageProps {
  params: {
    packageId: string;
  };
}

export default function PurchasePage({ params }: PurchasePageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [orderDescription, setOrderDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { packageId } = params;

  const [servicePackage, setServicePackage] = useState<{
    id: string;
    name: string | null;
    price: Prisma.Decimal | null;
    deliveryTime: number | null;
    revisions: number | null;
    serviceId: string;
    features: string[];
    sellerId: string;
  } | null>(null);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const pkg = await getPackageById(packageId);
        setServicePackage({
          id: pkg.id,
          serviceId: pkg.service.id,
          name: pkg.name ?? null,
          price: pkg.price ?? null,
          deliveryTime: pkg.deliveryTime,
          revisions: pkg.revisions ?? null,
          features: pkg.features ?? [],
          sellerId: pkg.service.creatorId,
        });
      } catch (error) {
        console.error("Error fetching package:", error);
        setError("Failed to load package details.");
      }
    }
    fetchPackage();
  }, [packageId]);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!servicePackage) {
        setError("Service package not loaded.");
        return;
      }

      const payMethod = paymentMethod === "wallet" ? "WALLET" : "EXTERNAL";
      const order = await createOrder(
        servicePackage.sellerId,
        servicePackage.serviceId,
        servicePackage.id,
        Number(servicePackage.price),
        payMethod,
      );

      if (typeof order === "string") {
        setError(order); // Display any specific error returned from createOrder
      } else if (order && typeof order === "object") {
        if (order.payUrl) {
          window.location.href = order.payUrl; // Redirect to external payment URL
        } else if (order.id) {
          setSuccessMessage("Commande créée avec succès !");
          router.push(`/orders/confirmation/${order.id}`);
        }
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } catch (error) {
      setError("Erreur lors de la création de la commande.");
    } finally {
      setLoading(false);
    }
  };

  if (!servicePackage) return <p>Loading package details...</p>;

  return (
    <div className="container w-full px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Achat de {servicePackage.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">
              Prix : {Number(servicePackage.price)} TND
            </p>
            <p>Délai de livraison : {servicePackage.deliveryTime} jours</p>
            <p>Révisions : {servicePackage.revisions}</p>
            <ul className="mt-4">
              {servicePackage.features.length ? (
                servicePackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    - {feature}
                  </li>
                ))
              ) : (
                <li>Pas de fonctionnalités disponibles</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Tabs
            defaultValue="wallet"
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <TabsList>
              <TabsTrigger value="wallet">
                Payer avec le portefeuille
              </TabsTrigger>
              <TabsTrigger value="direct">Payer directement</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet">
              <p className="mt-4">
                Utiliser votre solde de portefeuille pour ce paiement.
              </p>
            </TabsContent>
            <TabsContent value="direct">
              <p className="mt-4">
                Payer directement avec votre carte ou un autre moyen de
                paiement.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8">
          <label
            htmlFor="orderDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description pour la commande (optionnel)
          </label>
          <Textarea
            id="orderDescription"
            value={orderDescription}
            onChange={(e) => setOrderDescription(e.target.value)}
            rows={4}
            placeholder="Ajoutez une description pour le vendeur..."
          />
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}

        <div className="mt-8">
          <Button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Processing..."
              : `Confirmer l'achat (${servicePackage.price} TND)`}
          </Button>
        </div>
      </div>
    </div>
  );
}
