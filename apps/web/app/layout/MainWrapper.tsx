import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: WrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
