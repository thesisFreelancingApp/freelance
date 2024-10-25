"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";

interface UsernameStepProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isAvailable: boolean | null;
  loading: boolean;
  errorMessages: string[];
  handleCheckUsername: () => Promise<void>;
  handleUpdateUsername: () => Promise<void>;
}

export default function UsernameStep({
  username,
  setUsername,
  isAvailable,
  loading,
  errorMessages,
  handleCheckUsername,
  handleUpdateUsername,
}: UsernameStepProps) {
  React.useEffect(() => {
    if (username.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        handleCheckUsername();
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [username]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow only lowercase letters and numbers
    if (/^[a-z0-9]*$/.test(newValue)) {
      setUsername(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <Input
          id="username"
          value={username}
          onChange={handleInputChange}
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      {loading && (
        <Alert>
          <AlertDescription>Vérification en cours...</AlertDescription>
        </Alert>
      )}
      {isAvailable && (
        <Alert variant="success">
          <AlertDescription>Nom d'utilisateur disponible</AlertDescription>
        </Alert>
      )}
      {isAvailable === false && !errorMessages.length && (
        <Alert variant="destructive">
          <AlertDescription>
            Ce nom d'utilisateur est déjà pris
          </AlertDescription>
        </Alert>
      )}
      {errorMessages.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessages.join(" ")}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleUpdateUsername} disabled={loading || !isAvailable}>
        Suivant
      </Button>
    </div>
  );
}
