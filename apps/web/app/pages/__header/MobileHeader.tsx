"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils-cn";
import Link from "next/link";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import HeaderAuth from "./header-auth";
import CategoryBar from "./MobileCategoryBar";

export default function MobileHeader({
  userData,
  categories,
  user,
}: {
  userData: any;
  user: any;
  categories: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showCategoryBar, setShowCategoryBar] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openCategoryBar = () => setShowCategoryBar(true);
  const closeCategoryBar = () => setShowCategoryBar(false);

  return (
    <header className="flex flex-col w-full border-b border-b-foreground/6 md:hidden">
      <nav className="container flex items-center h-16 mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link
          href="/"
          className="flex flex-row items-center justify-center flex-1"
        >
          <img
            className="w-12 h-12 mr-2"
            src="/WaiaHub-LogoIcon.svg"
            alt="WaiaHub Logo"
          />
          <p className="flex flex-col items-start text-xl font-bold text-left">
            Waiahub
          </p>
        </Link>

        <HeaderAuth user={user} userData={userData} />
      </nav>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 h-full shadow-xl w-[70vw] bg-background">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex items-center" onClick={toggleMenu}>
                <img
                  className="w-12 h-12 mr-2"
                  src="/WaiaHub-LogoIcon.svg"
                  alt="WaiaHub Logo"
                />
                <p className="text-xl font-bold">Waiahub</p>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <AiOutlineClose className="w-6 h-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {!showCategoryBar ? (
              // Affiche le menu principal si CategoryBar n'est pas activé
              <nav className="flex flex-col space-y-4">
                {!user && (
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "text-lg font-medium w-80",
                    )}
                    onClick={toggleMenu}
                  >
                    Rejoinez-Nous
                  </Link>
                )}
                <button
                  className="text-lg font-medium text-left"
                  onClick={openCategoryBar}
                >
                  Catégories
                </button>
                <Separator />
                <Link
                  href="/discover"
                  className="text-lg font-medium "
                  onClick={toggleMenu}
                >
                  Découvrir
                </Link>
                <Separator />

                <Link
                  href="/pro"
                  className="text-lg font-semibold"
                  onClick={toggleMenu}
                >
                  Fiverr Pro
                </Link>
              </nav>
            ) : (
              // Affiche CategoryBar à la place du menu
              <div className="flex flex-col h-full">
                <Button
                  variant="ghost"
                  onClick={closeCategoryBar}
                  className="mb-4"
                >
                  Retour
                </Button>
                <CategoryBar allCategories={categories} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
