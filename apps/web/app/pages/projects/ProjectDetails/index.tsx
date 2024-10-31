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
import { useCallback, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  minBudget: string | null;
  maxBudget: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
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
  medias: { url: string; type: "image" | "video" }[];
}

interface User {
  profile: {
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
    seller?: any;
    buyer?: any;
  } | null;
  id: string;
  username: string;
  email: string;
  status?: string;
  avatarUrl?: string;
}

interface State {
  searchTerm: string;
  users: User[];
  selectedUser: User | null;
  isRequesting: boolean;
}

export default function ProjectDetailsPage({
  project,
  currentUserId,
}: {
  project: Project;
  currentUserId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState<State>({
    searchTerm: "",
    users: [],
    selectedUser: null,
    isRequesting: false,
  });
  const [pendingRequests, setPendingRequests] = useState(
    project.participantRequests.filter(
      (request) => request.status === "PENDING",
    ),
  );
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const isCreator = project.createdBy === currentUserId;

  const handleCancelRequest = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId),
      );
      toast({ title: "Demande annulée", description: "Annulation réussie." });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'annuler.",
        variant: "destructive",
      });
    }
  };

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setState((prev) => ({
        ...prev,
        searchTerm: term,
        users: [],
        selectedUser: null,
      }));

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(async () => {
        if (term) {
          const foundUsers = await searchUserAction({ term });
          const usersWithStatus = foundUsers.map((user) => ({
            ...user,
            status: user.status || "active",
          }));
          setState((prev) => ({ ...prev, users: usersWithStatus }));
        }
      }, 500);
    },
    [],
  );

  const handleSendRequest = async () => {
    if (!state.selectedUser) return;

    setState((prev) => ({ ...prev, isRequesting: true }));
    try {
      await sendParticipationRequestAction({
        userId: state.selectedUser.id,
        projectId: project.id,
      });
      setPendingRequests((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          requester: {
            firstName: state.selectedUser?.profile?.firstName || "",
            lastName: state.selectedUser?.profile?.lastName || "",
            email: state.selectedUser?.email || "",
          },
          status: "PENDING",
        },
      ]);

      toast({
        title: "Demande envoyée",
        description: `Envoyée à ${state.selectedUser.username}.`,
      });
      setState((prev) => ({
        ...prev,
        searchTerm: "",
        selectedUser: null,
        users: [],
      }));
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de l'envoi.",
        variant: "destructive",
      });
    } finally {
      setState((prev) => ({ ...prev, isRequesting: false }));
    }
  };

  return (
    <div className="container p-6 mx-auto space-y-6">
      <Button
        onClick={() => router.push(`/projects/myprojects`)}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Détails du projet */}
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

        {/* Section d'invitation si créateur, liste des participants sinon */}
        <div className="space-y-6">
          {isCreator ? (
            <CreatorSection
              state={state}
              pendingRequests={pendingRequests}
              onSearchChange={handleSearchTermChange}
              onSelectUser={(user: User) =>
                setState((prev) => ({ ...prev, selectedUser: user }))
              }
              onCancelRequest={handleCancelRequest}
              onSendRequest={handleSendRequest}
            />
          ) : (
            <ParticipantList participants={project.participants} />
          )}
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

function ParticipantList({
  participants,
}: {
  participants: Project["participants"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>
      <CardContent>
        {participants.length > 0 ? (
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center p-2 space-x-3 rounded-md bg-foreground/5"
              >
                <Image
                  src="/default-avatar.png"
                  alt={participant.firstName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">
                    {participant.firstName} {participant.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {participant.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucun participant inscrit.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function CreatorSection({
  state,
  pendingRequests,
  onSearchChange,
  onSelectUser,
  onCancelRequest,
  onSendRequest,
}: {
  state: State;
  pendingRequests: Project["participantRequests"];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectUser: (user: User) => void;
  onCancelRequest: (requestId: string) => void;
  onSendRequest: () => void;
}) {
  const { searchTerm, users, selectedUser, isRequesting } = state;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Inviter des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="search">Rechercher des utilisateurs</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Email ou nom d'utilisateur"
                value={searchTerm}
                onChange={onSearchChange}
                className="pl-8"
              />
            </div>
            {users.length > 0 && (
              <ul className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-200 ${selectedUser?.id === user.id ? "bg-foreground/10 border" : "hover:bg-foreground/5"}`}
                  >
                    <img
                      src={user.profile?.profilePic || "/default-avatar.png"}
                      alt={user.username}
                      className="w-10 h-10 mr-3 rounded-full"
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
                onClick={onSendRequest}
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
                  className="flex items-center justify-between p-2 border rounded-md bg-background"
                >
                  <div className="flex items-center space-x-2">
                    <ClockArrowUp className="ml-2 size-4 text-primary" />
                    <span className="text-sm font-bold">
                      {request.requester.firstName} {request.requester.lastName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCancelRequest(request.id)}
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
    </>
  );
}
