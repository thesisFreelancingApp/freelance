"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  searchUserAction,
  sendParticipationRequestAction,
} from "@/server.actions/project/projects.actions";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";

// Interface pour l'utilisateur
interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  avatarUrl?: string;
}

interface AssignUserPageProps {
  params: {
    id: string;
  };
}

export default function AssignUserPage({ params }: AssignUserPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const projectId = params.id;

  const handleSearchTermChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsers([]);
      setSelectedUser(null);
      const term = e.target.value;

      setSearchTerm(term);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (term) {
          const foundUsers = await searchUserAction({ term });

          const transformedUsers = foundUsers.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            status: user.profile.seller ? "Vendeur" : "Acheteur",
            avatarUrl: user.profile.profilePic,
          }));

          setUsers(transformedUsers);
          setSelectedUser(null); // Reset selected user on new search
        } else {
          setUsers([]);
          setSelectedUser(null);
        }
      }, 500);
    },
    [],
  );

  const handleSendRequest = async () => {
    if (!selectedUser) return;

    setIsRequesting(true);
    try {
      await sendParticipationRequestAction({
        userId: selectedUser.id,
        projectId,
      });
      toast({
        title: "Demande de participation envoyée",
        description: `Une demande a été envoyée à ${selectedUser.username}.`,
      });
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la demande de participation :",
        error,
      );
      toast({
        title: "Erreur",
        description: "La demande de participation n'a pas pu être envoyée.",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="container max-w-lg p-6 mx-auto space-y-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold ">Demander la Participation</h2>
        <Button
          variant="link"
          onClick={() => setSearchTerm("")}
          className="text-sm "
        >
          Clear
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="relative w-full">
        <Label htmlFor="search" className="sr-only">
          Rechercher par Email ou Username
        </Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Rechercher par Email ou Username"
          className="w-full pl-10 py-2.5 border rounded-lg "
        />
        <span className="absolute  top-2.5 left-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
      </div>

      {/* Section d'aperçu de l'utilisateur sélectionné */}
      {selectedUser && (
        <div className="w-full p-5 border rounded-lg shadow">
          <h3 className="mb-3 text-lg font-semibold ">
            Aperçu de l'utilisateur
          </h3>
          {selectedUser ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatarUrl || "/default-avatar.png"}
                  alt={selectedUser.username}
                  className="rounded-full shadow-md w-14 h-14"
                />
                <div>
                  <p className="text-lg font-semibold ">
                    {selectedUser.username}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              <Button
                onClick={handleSendRequest}
                disabled={isRequesting}
                className="w-full py-2.5 mt-4  rounded-lg transition duration-200"
              >
                {isRequesting ? "Demande en cours..." : "Envoyer une demande"}
              </Button>
            </div>
          ) : (
            <p className="text-sm italic text-gray-500">
              Sélectionnez un utilisateur pour afficher son aperçu.
            </p>
          )}
        </div>
      )}
      {/* Liste des utilisateurs trouvés */}
      {users.length > 0 && (
        <div className="p-3 space-y-3 overflow-y-auto border rounded-lg shadow max-h-64">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-200 ${
                selectedUser?.id === user.id
                  ? "bg-foreground/10 border"
                  : "hover:bg-foreground/5"
              }`}
            >
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-10 h-10 mr-3 rounded-full "
              />
              <div>
                <p className="font-medium">@ {user.username}</p>
                <p className="text-sm ">{user.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
