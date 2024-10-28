"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  checkWallet,
  createWallet,
} from "@/server.actions/wallet/wallet.actions";
import { Loader2, Plus, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

interface WalletDetails {
  balance: number;
  currency: string;
  transactions: Array<{
    type: string;
    amount: number;
    createdAt: string;
  }>;
}

export default function Component() {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWalletStatus = async () => {
      try {
        const wallet = await checkWallet();
        if (wallet) {
          setWalletDetails(wallet);
        }
      } catch (err) {
        setError("Erreur lors de la vérification du wallet.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletStatus();
  }, []);

  const handleCreateWallet = async () => {
    setError(null);
    startTransition(async () => {
      try {
        const wallet = await createWallet();
        setWalletDetails(wallet);
      } catch (err) {
        setError("Erreur lors de la création du wallet.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">
        Gestion du Wallet
      </h1>
      <p className="mb-6 text-gray-600">
        Gérer et surveiller votre compte de manière sécurisée.
      </p>
      <Separator className="my-6" />

      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 className="w-8 h-8 text-gray-700 animate-spin" />
        </div>
      ) : walletDetails ? (
        <div className="p-6 bg-white border border-gray-200 rounded-lg ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Votre Wallet
              </h2>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {walletDetails.balance} {walletDetails.currency}
              </p>
            </div>
            <Wallet className="w-10 h-10 text-gray-500" />
          </div>
          <Separator className="mb-4" />
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Historique des Transactions
          </h3>
          {walletDetails?.transactions &&
          walletDetails.transactions.length > 0 ? (
            <ul className="space-y-2">
              {walletDetails.transactions.map((transaction, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-medium text-gray-700">
                    {transaction.type}
                  </span>
                  <span
                    className={`${
                      transaction.type === "Dépôt"
                        ? "text-green-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {transaction.type === "Dépôt" ? "+" : "-"}
                    {transaction.amount} {walletDetails.currency}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune transaction pour le moment.</p>
          )}
          <div className="flex gap-4 mt-6">
            <Button
              variant="default"
              className="text-gray-800 border border-gray-300"
            >
              Dépôt
            </Button>
            <Button
              variant="outline"
              className="text-gray-800 border border-gray-300"
            >
              Retrait
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Image
            src="/placeholder.svg?height=384&width=384"
            alt="Illustration du Wallet"
            width={384}
            height={384}
            className="mx-auto mb-6"
          />
          <p className="mb-6 text-lg text-gray-600">
            Créez votre wallet WaiaHub pour gérer facilement vos finances, payer
            et encaisser vos prestations en toute sécurité. Notre wallet intégré
            vous offre un moyen simple et sécurisé d'accéder à nos services, de
            recevoir des paiements pour vos missions, ou de rémunérer les
            freelances pour leurs services.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 text-white bg-gray-800">
                <Plus className="w-4 h-4 mr-2" /> Créer maintenant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Termes et Conditions</DialogTitle>
                <DialogDescription>
                  Avant de créer votre wallet, veuillez lire et accepter les
                  termes et conditions ci-dessous.
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 space-y-4 text-sm text-gray-600">
                <p>
                  En rejoignant notre communauté, vous acceptez que nous gérions
                  et protégions vos données selon notre politique de
                  confidentialité.
                </p>
                <p>
                  Vous vous engagez également à respecter les règles de bonne
                  conduite et les conditions générales de notre plateforme.
                </p>
                <Link
                  href="/terms-and-conditions"
                  className="inline-block font-medium text-gray-700 hover:underline"
                >
                  Lire les Termes et Conditions en détail
                </Link>
              </div>
              <Button
                onClick={handleCreateWallet}
                disabled={isPending}
                className="w-full text-white bg-gray-800"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  "Accepter et Créer le Wallet"
                )}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {error && (
        <div
          className="p-4 mt-6 text-red-600 bg-red-100 border border-red-500 rounded-lg"
          role="alert"
        >
          <strong>Erreur :</strong> {error}
        </div>
      )}
    </div>
  );
}
