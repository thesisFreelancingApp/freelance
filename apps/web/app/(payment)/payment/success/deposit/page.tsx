"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { completeTransaction } from "@/server.actions/payment/update-transaction.actions";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DepositSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Chargement du paiement...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const processTransaction = async () => {
      const paymentRef = searchParams.get("payment_ref");

      if (!paymentRef) {
        setMessage("Aucune référence de paiement trouvée.");
        setLoading(false);
        setError(true);
        return;
      }

      try {
        await completeTransaction(paymentRef);
        setMessage("Transaction complétée avec succès.");
        setTimeout(() => router.push("/wallet"), 3000); // Redirect after 3 seconds
      } catch (error) {
        setMessage(
          `Erreur : ${error instanceof Error ? error.message : "Erreur inconnue"}`,
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    processTransaction();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center p-4 0">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Résultat du Dépôt
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8" />
              <p className="text-muted-foreground">{message}</p>
            </div>
          ) : (
            <Alert variant={error ? "destructive" : "default"}>
              <AlertTitle className="flex items-center space-x-2">
                {error ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span>{error ? "Erreur" : "Succès"}</span>
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        {error && (
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/")}>
              Retour à l'accueil
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
