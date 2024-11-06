import { FormMessage, Message } from "@/components/form-message";
import { GoogleSignInButton } from "@/components/google-submit-button";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  googleSignUpAction,
  signInAction,
} from "@/server.actions/auth/auth.actions";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">Connexion</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <form>
          <GoogleSignInButton
            pendingText="Connexion en cours..."
            formAction={googleSignUpAction}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:text-white hover:text-white dark:hover:bg-blue-700"
          >
            Continuer avec Google
          </GoogleSignInButton>
        </form>
        <div className="relative">
          <Separator className="mt-6" />
          <span className="absolute px-2 text-xs -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-background text-muted-foreground">
            ou
          </span>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vous@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <Link
              className="text-xs underline text-muted-foreground hover:text-primary"
              href="/forgot-password"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <SubmitButton
            pendingText="Connexion en cours..."
            formAction={signInAction}
            className="w-full"
          >
            Connexion
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Link
            className="font-medium underline text-primary hover:text-primary/80"
            href="/sign-up"
          >
            S'inscrire
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
