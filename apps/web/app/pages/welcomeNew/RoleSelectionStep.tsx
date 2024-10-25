"use client ";
interface RoleSelectionStepProps {
  onComplete: () => void;
}
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils-cn";
import { initializeBuyerAndSellerProfile } from "@/server.actions/welcome/sellerOrBuyer.actions";
import * as React from "react";
export default function RoleSelectionStep({
  onComplete,
}: RoleSelectionStepProps) {
  const [isBuyerSelected, setIsBuyerSelected] = React.useState(false);
  const [isSellerSelected, setIsSellerSelected] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSaveRoles = async () => {
    if (!isBuyerSelected && !isSellerSelected) {
      setErrorMessage("Veuillez sélectionner au moins un rôle.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await initializeBuyerAndSellerProfile({
        buyer: isBuyerSelected,
        seller: isSellerSelected,
      });

      if (result.success) {
        onComplete();
      } else {
        setErrorMessage(result.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des rôles:", error);
      setErrorMessage("Une erreur s'est produite lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Sélectionnez votre rôle</h2>
      <p className="text-sm text-muted-foreground">
        Choisissez un ou les deux rôles pour continuer.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Card
          className={cn("cursor-pointer", isBuyerSelected && "border-primary")}
          onClick={() => setIsBuyerSelected((prev) => !prev)}
        >
          <CardHeader>
            <CardTitle>Devenir Client</CardTitle>
            <CardDescription>
              Accédez aux services en tant qu'acheteur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              En tant que Client, vous pouvez parcourir et acheter des services.
            </p>
          </CardContent>
          {isBuyerSelected ? (
            <CardFooter>
              <p className="text-primary">Sélectionné</p>
            </CardFooter>
          ) : (
            <CardFooter>
              <p className="text-transparent ">Sélectionné</p>
            </CardFooter>
          )}
        </Card>
        <Card
          className={cn("cursor-pointer", isSellerSelected && "border-primary")}
          onClick={() => setIsSellerSelected((prev) => !prev)}
        >
          <CardHeader>
            <CardTitle>Devenir Freelanceur</CardTitle>
            <CardDescription>
              Vendez vos services et atteignez plus de clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              En tant que Freelanceur, vous pouvez offrir des services et être
              payé.
            </p>
          </CardContent>
          {isSellerSelected ? (
            <CardFooter>
              <p className="text-primary">Sélectionné</p>
            </CardFooter>
          ) : (
            <CardFooter>
              <p className="text-transparent ">Sélectionné</p>
            </CardFooter>
          )}
        </Card>
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleSaveRoles} disabled={loading}>
        {loading ? "Enregistrement..." : "Sauvegarder"}
      </Button>
    </div>
  );
}
