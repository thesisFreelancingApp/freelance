import {
  googleSignUpAction,
  signInAction,
} from "@/server.actions/auth.actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <>
      <form className="flex flex-col flex-1 text-center min-w-64">
        <SubmitButton
          pendingText="Signing In..."
          formAction={googleSignUpAction}
        >
          Sign in with google
        </SubmitButton>
        <p className="text-sm text-foreground text">or</p>
      </form>

      <form className="flex flex-col flex-1 min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="font-medium underline text-foreground"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs underline text-foreground"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
