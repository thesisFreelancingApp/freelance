"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Ajoutez un paramètre maxDepth avec une valeur par défaut
export default function LimitedBreadcrumb({ maxDepth = 2 }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  // Prendre uniquement les deux derniers éléments (ou selon maxDepth)
  const limitedPaths = paths.slice(-maxDepth);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Boucle sur les deux derniers éléments */}
        {limitedPaths.map((path, index) => {
          const href = `/${paths.slice(0, paths.length - (limitedPaths.length - index)).join("/")}`;
          const isLast = index === limitedPaths.length - 1; // Dernier élément est la page actuelle

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage>{decodeURIComponent(path)}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={href} className="capitalize">
                    {decodeURIComponent(path)}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
