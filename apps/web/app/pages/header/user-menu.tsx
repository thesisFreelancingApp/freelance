import { signOutAction } from "@/server.actions/auth.actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronRight,
  Home,
  Languages,
  LogOut,
  Settings,
  Sun,
} from "lucide-react";

export default function UserMenu() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Avatar className="w-8 h-8 bg-zinc-800">
                <AvatarFallback className="text-white">A</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 text-white bg-zinc-900 border-zinc-800"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium leading-none">
              azyz.kabada@gmail.com
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />

          {/* Lien vers les paramètres */}
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <span className="flex items-center focus:bg-zinc-800">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Changer de thème */}
          <DropdownMenuItem className="focus:bg-zinc-800">
            <Sun className="w-4 h-4 mr-2" />
            <span>Theme</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-zinc-800" />

          {/* Lien vers la page d'accueil */}
          <DropdownMenuItem asChild>
            <Link href="/">
              <span className="flex items-center focus:bg-zinc-800">
                <Home className="w-4 h-4 mr-2" />
                <span>Home</span>
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Lien vers la page d'aide */}
          <DropdownMenuItem asChild>
            <Link href="/help">
              <span className="flex items-center focus:bg-zinc-800">
                <Bell className="w-4 h-4 mr-2" />
                <span>Get help</span>
              </span>
            </Link>
          </DropdownMenuItem>

          {/* Formulaire pour la déconnexion */}
          <DropdownMenuSeparator className="bg-zinc-800" />
          <form action={signOutAction}>
            <DropdownMenuItem className="focus:bg-zinc-800" asChild>
              <button type="submit" className="flex items-center w-full">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign out</span>
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
