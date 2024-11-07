"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/server.actions/uploadMedias.actions";
import { Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";

interface ProfilePicProps {
  initialAvatarUrl?: string;
  onFileChange: (file: File) => void;
  onSave: () => void; // Nouvelle propriété pour déclencher la sauvegarde du profil
}

export default function ProfilePic({
  initialAvatarUrl = "",
  onFileChange,
  onSave,
}: ProfilePicProps) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [isPending, startTransition] = useTransition();
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);

      // Afficher un aperçu immédiat
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Télécharger l'image sur le serveur
      startTransition(async () => {
        try {
          const result = (await uploadImage(file)) as unknown as {
            url: string;
          };
          if (result && result.url) {
            setAvatarUrl(result.url);
            setIsUploaded(true); // Indiquer la fin du téléchargement
            console.log("Résultat du téléchargement :", result);
          } else {
            console.error("Échec du téléchargement de l'avatar");
          }
        } catch (error) {
          console.error("Erreur lors du téléchargement :", error);
        }
      });
    } else {
      console.error("Seuls les fichiers image sont autorisés.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveClick = () => {
    onSave(); // Déclencher la fonction de sauvegarde
    setIsUploaded(false); // Réinitialiser l'état de téléchargement
  };

  return (
    <div className="flex items-center my-4 space-x-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatarUrl} alt="Photo de profil" />
        <AvatarFallback>{avatarUrl ? "PP" : "Pas de photo"}</AvatarFallback>
      </Avatar>
      <div>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          ref={fileInputRef}
          aria-label="Télécharger une nouvelle photo de profil"
          disabled={isPending}
        />
        {isUploaded ? (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleSaveClick}
          >
            Sauvegarder
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isPending}
            onClick={handleButtonClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isPending ? "Téléchargement..." : "Changer la photo"}
          </Button>
        )}
      </div>
    </div>
  );
}
