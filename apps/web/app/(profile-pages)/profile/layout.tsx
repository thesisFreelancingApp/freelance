import { SidebarNav } from "@/app/pages/profile/Sidebar";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  { title: "Profile", href: "/profile" },
  { title: "Account", href: "/examples/forms/account" },
  { title: "Appearance", href: "/examples/forms/appearance" },
  { title: "Notifications", href: "/examples/forms/notifications" },
  { title: "Display", href: "/examples/forms/display" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

// Optimized SettingsLayout to take full width
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </header>
      <Separator className="my-6" />
      <div className="flex flex-col w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Sidebar navigation */}
        <aside className="w-full lg:w-1/4">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {/* Content area takes remaining space */}
        <main className="flex-1 w-full lg:w-3/4">{children}</main>
      </div>
    </div>
  );
}
