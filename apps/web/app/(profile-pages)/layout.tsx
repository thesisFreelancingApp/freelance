"use client";
import Sidebar from "../pages/profile/Sidebar";
const items = [
  { path: "/profile", title: "Profile" },
  { path: "/settings", title: "Settings" },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen max-w-screen-lg mx-auto lg:flex-row">
      {/* Section Sidebar avec les boutons pour chaque lien */}
      <Sidebar items={items} />

      {/* Section contenu principal */}
      <div className="flex-grow w-full">
        <div className="h-full overflow-auto">
          {/* Section 1 */}
          <div className="h-full px-8 rounded shadow-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
