import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/server.actions/auth/auth.actions";
import {
  BriefcaseBusiness,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Messages from "./messages";
import Notifications from "./notifications";
interface UserProfile {
  profilePic?: string | null;
}
interface UserData {
  email?: string | null;
  name?: string | null;
  id?: string | null;
  username?: string | null;
  profile?: UserProfile | null;
}

interface UserMenuProps {
  data: UserData | null;
  isSeller: any;
}

export default function UserMenu({ data, isSeller }: UserMenuProps) {
  const name = data?.name ?? "Invité";
  const userLettre = name ? name.charAt(0) : "?";
  const username = data?.username;
  // console.log("iiiiii", isSeller);
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Notifications />
        <Messages />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Avatar className="w-10 h-10">
                {data?.profile?.profilePic ? (
                  <AvatarImage
                    src={data.profile.profilePic}
                    alt="Photo de profil"
                  />
                ) : (
                  <AvatarFallback className="text-black/80 bg-secondary dark:bg-secondary dark:text-white/80">
                    {userLettre}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <p className="text-xs leading-none">
              <span>ID : </span>
              <span>{data?.id || "N/A"}</span>
            </p>
            <p className="text-[12] mt-2 font-bold leading-none">
              {data?.email || "Aucun e-mail disponible"}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/seller/dashboard" className="flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              <span>Tableau de bord vendeur</span>
            </Link>
          </DropdownMenuItem>
          {isSeller.isSeller && isSeller.isSeller.professionalProfile ? (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/${username}`} className="flex items-center">
                  <BriefcaseBusiness className="w-4 h-4 mr-2" />
                  <span>Détails Professionnels</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/seller/complete-profile"
                  className="flex items-center"
                >
                  <BriefcaseBusiness className="w-5 h-5 mr-2" />
                  <span>Détails Professionnels</span>
                  <Badge className="ml-2" variant={"destructive"}>
                    compléter
                  </Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem asChild>
            <Link href="/projects/myprojects" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              <span>Gestion des projets</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              <span>Paramètres</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <UserCog className="w-4 h-4 mr-2" />
              <span>Modifier le profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              <span>Accueil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/help" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>Obtenir de l'aide</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <form action={signOutAction}>
            <DropdownMenuItem asChild>
              <button type="submit" className="flex items-center w-full">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Se déconnecter</span>
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
