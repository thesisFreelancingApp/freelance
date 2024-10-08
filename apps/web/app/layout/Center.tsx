import { ReactNode } from "react";

interface WrapperProps {
    children: ReactNode;
}

export default function CenterWrapper({ children }: WrapperProps) {
    return (
        <div className="flex items-center justify-center h-screen">
            {children}
        </div>
    );
}
