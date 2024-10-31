"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  cancelRequest,
  searchUserAction,
  sendParticipationRequestAction,
} from "@/server.actions/project/projects.actions";
import { ChevronLeft, ClockArrowUp, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Project {
  id: string;
  title: string;
  description: string;
  minBudget: string | null;
  maxBudget: string | null;
  createdAt: Date;
  updatedAt: Date;
  requirements: { title: string; detail: string }[];
  skills: { value: string }[];
  sprints: { title: string; description: string }[];
  participants: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  participantRequests: {
    id: string;
    requester: { firstName: string; lastName: string; email: string };
    status: string;
  }[];
  medias: MediaItem[];
}

interface User {
  profile: any;
  id: string;
  username: string;
  email: string;
  status: string;
  avatarUrl?: string;
}

export default function ProjectDetailsPage({ project }: { project: Project }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingRequests, setPendingRequests] = useState(
    project.participantRequests.filter(
      (request) => request.status === "PENDING",
    ),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCancelRequest = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId),
      );
      toast({
        title: "Demande annulée",
        description: "La demande de participation a été annulée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande :", error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la demande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleSearchTermChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setUsers([]);
      setSelectedUser(null);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (term) {
          const foundUsers = await searchUserAction({ term });
          setUsers(foundUsers);
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
        projectId: project.id,
      });

      // Ajout de la nouvelle demande à l'état des demandes en attente
      setPendingRequests((prev) => [
        ...prev,
        {
          id: `${Date.now()}`, // Id temporaire unique
          requester: {
            firstName: selectedUser.profile.firstName,
            lastName: selectedUser.profile.lastName,
            email: selectedUser.email,
          },
          status: "PENDING",
        },
      ]);

      toast({
        title: "Demande envoyée",
        description: `Une demande a été envoyée à ${selectedUser.username}.`,
      });
      setSearchTerm("");
      setSelectedUser(null);
      setUsers([]);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la demande de participation :",
        error,
      );
      toast({
        title: "Erreur",
        description: "La demande de participation n'a pas pu être envoyée.",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="container p-6 mx-auto space-y-6">
      <Button
        onClick={() => router.back()}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex justify-between text-sm">
              <span>
                Budget: {project.minBudget || "N/A"} -{" "}
                {project.maxBudget || "N/A"}
              </span>
              <span>
                Créé le: {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>

            {project.sprints.length > 0 && (
              <ProjectSection title="Sprints" items={project.sprints} />
            )}
            {project.requirements.length > 0 && (
              <ProjectSection title="Exigences" items={project.requirements} />
            )}
            {project.skills.length > 0 && (
              <ProjectSection
                title="Compétences Requises"
                items={project.skills.map((skill) => ({ title: skill.value }))}
              />
            )}
            {project.medias.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Médias Associés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {project.medias.map((media, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-md aspect-video"
                      >
                        {media.type === "image" ? (
                          <Image
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <video
                            src={media.url}
                            controls
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inviter des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Rechercher des utilisateurs</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Email ou nom d'utilisateur"
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                      className="pl-8"
                    />
                  </div>
                </div>
                {users.length > 0 && (
                  <ul className="space-y-2">
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
                          src={user.profile.profilePic}
                          alt={user.username}
                          className="w-10 h-10 mr-3 rounded-full "
                        />
                        <div>
                          <p className="font-medium">@ {user.username}</p>
                          <p className="text-sm ">{user.status}</p>
                        </div>
                      </div>
                    ))}
                  </ul>
                )}
                {selectedUser && (
                  <Button
                    onClick={handleSendRequest}
                    disabled={isRequesting}
                    className="w-full"
                  >
                    {isRequesting ? "Envoi en cours..." : "Envoyer une demande"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demandes en Attente</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <ul className="space-y-2">
                  {pendingRequests.map((request) => (
                    <li
                      key={request.id}
                      className="flex items-center justify-between p-2 border rounded-md bg-background "
                    >
                      <div className="flex items-center space-x-2">
                        <ClockArrowUp className="ml-2 size-4 text-primary" />
                        <span className="text-sm font-bold">
                          {request.requester.firstName}{" "}
                          {request.requester.lastName}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCancelRequest(request.id)}
                      >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Annuler la demande</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucune demande en attente.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({
  title,
  items,
}: {
  title: string;
  items: { title: string; description?: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-sm">
                <strong>{item.title}</strong>
                {item.description && `: ${item.description}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun élément défini.</p>
        )}
      </CardContent>
    </Card>
  );
}
