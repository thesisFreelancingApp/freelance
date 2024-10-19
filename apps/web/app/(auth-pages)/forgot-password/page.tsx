import { FormMessage, Message } from "@/components/form-message";
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
import { forgotPasswordAction } from "@/server.actions/auth.actions";
import Link from "next/link";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="mt-2 text-sm text-center text-secondary-foreground">
          Already have an account?{" "}
          <Link
            className="underline text-primary hover:text-primary/80"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <form className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <SubmitButton
            pendingText="Resetting Password..."
            formAction={forgotPasswordAction}
            className="w-full"
          >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </CardContent>
      <CardFooter>
        <div className="relative">
          <Separator className="mt-6" />
          <span className="absolute px-2 text-xs -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-background text-muted-foreground">
            or
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
