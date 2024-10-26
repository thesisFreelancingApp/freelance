import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">loading...</h2>
      </div>
    </div>
  );
}
