export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col w-full max-w-md gap-2 text-sm">
      {"success" in message && (
        <div className="px-4 border-l-2 text-foreground border-foreground">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="px-4 border-l-2 text-destructive-foreground border-destructive-foreground">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="px-4 border-l-2 text-foreground">{message.message}</div>
      )}
    </div>
  );
}
