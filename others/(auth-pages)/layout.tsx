import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Page({ children }: WrapperProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center sm:justify-start sm:items-start p-4">
      {children}
    </div>
  );
}
