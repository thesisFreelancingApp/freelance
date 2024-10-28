"use client";
import Sidebar from "@/app/pages/profileSettings/Sidebar";
const items = [
  { path: "/profile", title: "Profil" },
  { path: "/settings", title: "Paramètres" },
  { path: "/wallet", title: "Mon portefeuille" },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex flex-col w-screen max-w-screen-lg  mx-auto rounded-lg lg:flex-row  min-h-[60vh]">
      {/* Section Sidebar avec les boutons pour chaque lien */}
      <Sidebar items={items} />

      {/* Section contenu principal */}
      <div className="flex-grow w-full">
        <div className="h-full ">
          {/* Section 1 */}
          <div className="h-full px-8 rounded lg:pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
