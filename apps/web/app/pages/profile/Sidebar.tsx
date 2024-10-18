import { Button } from "@/components/ui/button";
import { Bell, Heart, Settings, Shield, Star, User } from "lucide-react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const tabs: Tab[] = [
  {
    id: "user-info",
    label: "User Info",
    icon: <User className="w-4 h-4" />,
    href: "/profile",
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: <Heart className="w-4 h-4" />,
    href: "/profile/favorites",
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: <Star className="w-4 h-4" />,
    href: "/profile/watchlist",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
    href: "/profile/settings",
  },
  {
    id: "securite",
    label: "Securite",
    icon: <Shield className="w-4 h-4" />,
    href: "/profile/securite",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
    href: "/profile/notification",
  },
];

export default function Sidebar({ activeTab }: { activeTab: string }) {
  return (
    <aside className="w-full space-y-4 lg:w-1/4">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <Button
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className="justify-start w-full"
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
