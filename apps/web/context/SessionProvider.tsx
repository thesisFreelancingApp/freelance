import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function SessionAuthProvider({ children }: WrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
