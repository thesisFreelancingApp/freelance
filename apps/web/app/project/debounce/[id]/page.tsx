"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  searchUserAction,
  sendParticipationRequestAction,
} from "@/server.actions/project/projects.actions";
import { ChangeEvent, useCallback, useRef, useState } from "react";

// Interface pour l'utilisateur
interface User {
  id: string;
  username: string;
  email: string;
}

// Interface pour les props de la page
interface AssignUserPageProps {
  params: {
    id: string;
  };
}

// Composant pour demander la participation à un projet
export default function AssignUserPage({ params }: AssignUserPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectId = params.id;

  // Fonction de recherche d'utilisateur avec debounce
  const handleSearchTermChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);

      // Réinitialiser le timeout pour le debounce
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Définir un nouveau timeout pour le debounce
      debounceTimeout.current = setTimeout(async () => {
        if (term) {
          const foundUser = await searchUserAction({ term });
          setUser(foundUser[0] || null);
        } else {
          setUser(null);
        }
      }, 500); // Délai de debounce de 500 ms
    },
    [],
  );

  const handleSendRequest = async () => {
    if (!user) return;

    setIsRequesting(true);
    try {
      await sendParticipationRequestAction({ userId: user.id, projectId });
      console.log("Participation request sent for user:", user);
    } catch (error) {
      console.error("Error sending participation request:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Demander la Participation</h2>
      <div className="space-y-4">
        <Label htmlFor="search">Rechercher par Email ou Username</Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Entrer email ou username"
        />
        {user ? (
          <div className="mt-4">
            <p>
              Utilisateur trouvé : <strong>{user.username}</strong> (
              {user.email})
            </p>
            <Button
              onClick={handleSendRequest}
              disabled={isRequesting}
              className="mt-2"
            >
              {isRequesting ? "Demande en cours..." : "Demander à participer"}
            </Button>
          </div>
        ) : (
          searchTerm && (
            <p className="text-gray-500">Aucun utilisateur trouvé.</p>
          )
        )}
      </div>
    </div>
  );
}
