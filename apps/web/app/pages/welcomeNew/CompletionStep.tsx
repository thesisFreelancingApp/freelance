"use client";

import { Button } from "@/components/ui/button";
import { checkUserType } from "@/server.actions/welcome/checkType.action";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletionStep() {
  const router = useRouter();
  const [userType, setUserType] = useState<{
    isBuyer: boolean;
    isSeller: boolean;
  } | null>(null);

  useEffect(() => {
    async function fetchUserType() {
      const result = await checkUserType();
      if (result) {
        setUserType({
          isBuyer: Boolean(result.isBuyer),
          isSeller: Boolean(result.isSeller),
        });
      }
    }
    fetchUserType();
  }, []);

  return (
    <div className="space-y-4 text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-primary" />
      <h2 className="text-2xl font-bold">Profil Complété !</h2>
      <p className="text-muted-foreground">
        Félicitations ! Votre profil est maintenant complet.
      </p>
      <div className="flex gap-4 ">
        {userType?.isSeller && (
          <Button
            className="w-full"
            onClick={() => router.push("/seller/complete-profile")}
          >
            Completer votre profil professionnel
          </Button>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.push("/")}
        >
          Revenir à l'accueil
        </Button>
      </div>
    </div>
  );
}
