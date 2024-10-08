"use client"; // Required for Next.js client-side components

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
interface IconProps {
    className?: string;
    width?: number;
    height?: number;
}
// Component: ThemeToggleButton
function ThemeToggleButton() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Component: Navbar
export default function MainNavbar() {
    return (
        <header className="flex items-center justify-between w-full h-20 px-7 md:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden"
                    >
                        <MenuIcon className="w-6 h-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link
                        href="#"
                        prefetch={false}
                    >
                        <MountainIcon className="w-6 h-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        {[
                            "Home",
                            "About",
                            "Services",
                            "Portfolio",
                            "Contact",
                        ].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="flex items-center w-full py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Link
                href="#"
                className="hidden lg:flex"
                prefetch={false}
            >
                <MountainIcon className="w-6 h-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    {["Home", "About", "Services", "Portfolio", "Contact"].map(
                        (item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md group h-9 w-max hover:bg-accent"
                                        prefetch={false}
                                    >
                                        {item}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ),
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggleButton />
        </header>
    );
}

// Component: MenuIcon
function MenuIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line
                x1="4"
                x2="20"
                y1="12"
                y2="12"
            />
            <line
                x1="4"
                x2="20"
                y1="6"
                y2="6"
            />
            <line
                x1="4"
                x2="20"
                y1="18"
                y2="18"
            />
        </svg>
    );
}

// Component: MountainIcon
function MountainIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
