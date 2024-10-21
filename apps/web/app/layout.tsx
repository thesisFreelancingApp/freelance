// Imports et configuration

import GoogleAuthDirect from "@/app/(auth-pages)/google_onetap";
import HeaderAuth from "@/app/pages/header/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import UseTawkToScript from "@/hooks/use-Tawk-liveChat";
import Logo from "@/public/WaiaHub-LogoIcon.svg";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Link from "next/link";
import React from "react";

// Configuration des polices locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Configuration du site
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WaiaHub - The fastest way to Freelance",
  description: "The fastest way to Freelance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={GeistSans.className} suppressHydrationWarning>
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Intégration Google Auth */}
        <GoogleAuthDirect />
        {/* Toaster pour les notifications */}
        <Toaster />

        {/* Fournisseur de thèmes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <TailwindIndicator />

            {/* Conteneur principal de la page */}
            <div className="flex flex-col min-h-screen">
              {/* En-tête (Navbar) */}
              <header className="w-full border-b border-b-foreground/6">
                <nav className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8">
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-12 h-12 md:w-16 md:h-16"
                        src={Logo.src}
                        alt="WaiaHub Logo"
                      />
                      <p className="text-3xl font-semibold">WaiaHub</p>
                    </div>
                  </Link>
                  <HeaderAuth />
                </nav>
              </header>

              {/* Contenu principal */}
              <main className="flex flex-col items-center justify-center flex-1 w-full gap-10 md:gap-20">
                {children}
              </main>

              {/* Pied de page */}
              <footer className="w-full py-8 text-xs text-center border-t md:py-16 md:text-sm">
                <div className="container flex flex-col justify-center gap-4 mx-auto md:flex-row md:gap-8">
                  <p>
                    Powered by{" "}
                    <a
                      href="https://www.rbktunisia.com/"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      RBK
                    </a>
                  </p>
                  <ThemeSwitcher />
                </div>
              </footer>
            </div>
          </TooltipProvider>
        </ThemeProvider>

        {/* Script pour Tawk.to */}
        <UseTawkToScript />
      </body>
    </html>
  );
}
