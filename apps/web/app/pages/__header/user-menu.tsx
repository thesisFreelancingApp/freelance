import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Notifications from "./notifications";
import Messages from "./messages";

// import AvatarApi, { genConfig } from "react-nice-avatar";
interface UserData {
  email?: string | null;
  name?: string | null;
  id?: string | null;
}

interface UserMenuProps {
  data: UserData | null; // Ensure that data can be null
}
export default function UserMenu({ data }: UserMenuProps) {
  // Log data for debugging purposes
  // console.log(data);
  const name = data?.name as string;
  const userLetter = name ? name.charAt(0) : "?";
  // const config = genConfig(name);
  // console.log(config);
  // Set the first letter of the user's name or a fallback character

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Notifications />
        <Messages />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-10 h-10 rounded-full p-0"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-black/80 bg-secondary dark:bg-secondary dark:text-white/80">
                {userLetter}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {data?.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {data?.email || "No email available"}
              </p>
            </div>
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
