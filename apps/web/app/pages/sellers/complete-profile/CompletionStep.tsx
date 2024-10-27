"use client";

import { Button } from "@/components/ui/button";
import { getUserDB } from "@/server.actions/user.actions";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletionStep() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const result = await getUserDB();
      if (result?.username) {
        setUsername(result.username);
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="space-y-4 text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-primary" />
      <h2 className="text-2xl font-bold">Profil Complété !</h2>
      <p className="text-muted-foreground">
        Félicitations ! Votre profil est maintenant complet.
      </p>
      <div className="flex gap-4">
        {username && (
          <Button
            className="w-full"
            onClick={() => router.push(`/${username}`)}
          >
            Voir mon Profile Public
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
