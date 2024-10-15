import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

interface MessageProps {
  message: string;
  linkText: string;
  linkUrl: string;
  icon?: React.ElementType; // Optionnel si vous souhaitez changer l'icône
}

export function Message({
  message,
  linkText,
  linkUrl,
  icon: IconComponent = InfoIcon, // Utilisation de InfoIcon par défaut
}: MessageProps) {
  return (
    <div className="flex gap-4 px-5 py-3 border rounded-md bg-muted/50">
      <IconComponent size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong>Note:</strong> {message}
        </small>
        <div>
          <Link
            href={linkUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-primary/50 hover:text-primary"
          >
            {linkText} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <Message
  message="A new version of the app is available. Update now to enjoy the latest features and improvements."
  linkText="Update now"
  linkUrl="https://yourapp.com/update"
/> */
}
