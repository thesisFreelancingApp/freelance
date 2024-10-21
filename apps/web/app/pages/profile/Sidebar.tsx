"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils-cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarProps {
  items: { path: string; title: string }[];
}
export default function SidebarProfile({ items }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap justify-center w-full px-6 space-x-1 lg:mt-5 lg:justify-start sm:px-6 sm:space-x-2 md:space-x-6 lg:px8 lg:flex-col lg:w-2/5 lg:space-x-0 lg:space-y-1">
      {items.map((item, index) => (
        <Link
          key={index + 1}
          href={item.path}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.path
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
