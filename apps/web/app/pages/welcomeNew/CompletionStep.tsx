"use client ";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompletionStep() {
  const router = useRouter();

  return (
    <div className="space-y-4 text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-primary" />
      <h2 className="text-2xl font-bold">Profil Complété !</h2>
      <p className="text-muted-foreground">
        Félicitations ! Votre profil est maintenant complet.
      </p>
      <Button onClick={() => router.push("/dashboard")}>
        Accéder au Tableau de Bord
      </Button>
    </div>
  );
}
