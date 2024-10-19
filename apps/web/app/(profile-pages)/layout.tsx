import { SidebarNav } from "@/app/pages/profile/Sidebar";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  { title: "Profile", href: "/profile" },
  { title: "Settings", href: "/settings" },
];

interface NewLayoutProps {
  children: React.ReactNode;
}

export default function NewLayout({ children }: NewLayoutProps) {
  return (
    <div className="w-full mx-auto space-y-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-2 ">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </header>
      <Separator className="my-6" />

      {/* Layout for sidebar and content */}
      <div className="flex flex-col w-full lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Sidebar navigation */}
        <aside className="w-full lg:w-1/4">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        {/* Main content */}
        <main className="flex-1 py-8">{children}</main>
      </div>
    </div>
  );
}
