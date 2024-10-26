import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Bell,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";
import Link from "next/link";
interface UserProfile {
  profilePic?: string | null;
}

interface UserData {
  email?: string | null;
  name?: string | null;
  id?: string | null;
  profile?: UserProfile | null; // Add profile as an optional property
}

interface UserMenuProps {
  data: UserData | null; // Ensure that data can be null
}

export default function UserMenu({ data }: UserMenuProps) {
  const name = data?.name ?? "Guest";
  const userLettre = name ? name.charAt(0) : "?";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Avatar className="w-10 h-10">
                {data?.profile?.profilePic ? (
                  <AvatarImage src={data.profile.profilePic} alt="@shadcn" />
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
              <span>ID: </span>
              <span>{data?.id || "N/A"}</span>
            </p>
            <p className="text-[12] mt-2 font-bold leading-none">
              {data?.email || "No email available"}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <UserCog className="w-4 h-4 mr-2" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/seller-dashboard" className="flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              <span>Seller Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>Get help</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={signOutAction}>
            <DropdownMenuItem asChild>
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
