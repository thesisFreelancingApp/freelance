"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function GoogleSignInButton({
  children = "Continue with Google",
  pendingText = "Connecting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      aria-disabled={pending}
      className="w-full text-white bg-gray-800 hover:bg-gray-700 hover:text-white dark:bg-gray-200 dark:text-black dark:hover:bg-gray-800 dark:hover:text-white"
      {...props}
    >
      {pending ? (
        <>
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          {pendingText}
        </>
      ) : (
        <>
          <Icons.google className="w-4 h-4 mr-2" />
          {children}
        </>
      )}
    </Button>
  );
}
