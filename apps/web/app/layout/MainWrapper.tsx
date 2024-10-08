import { ReactNode } from "react";

interface WrapperProps {
    children: ReactNode;
}

export default function MainWrapper({ children }: WrapperProps) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full h-full max-w-screen-xl p-4 max-h-screen-md">
                {children}
            </div>
        </div>
    );
}
