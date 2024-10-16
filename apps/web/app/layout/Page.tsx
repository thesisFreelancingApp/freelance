import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Page({ children }: WrapperProps) {
  return <div className="min-h-[60vh]">{children}</div>;
}
