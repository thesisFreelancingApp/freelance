// Imports - UI Components and Layout
import GoogleAuthDirect from "@/app/(auth-pages)/google_onetap";
import Footer from "@/app/pages/__footer";
import Header from "@/app/pages/__header";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

// Imports - Hooks and Utilities
import UseTawkToScript from "@/hooks/use-Tawk-liveChat";
import { ThemeProvider } from "next-themes";

// Imports - Styles and Fonts
import "@/styles/globals.css";
// Font Configuration
import localFont from "next/font/local";

const outfit = localFont({
  src: "./fonts/Outfit.ttf",
});
// Site Configuration
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WaiaHub - The fastest way to Freelance",
  description: "The fastest way to Freelance",
};

// Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={outfit.className}>
      <body className={`bg-background text-foreground  antialiased`}>
        {/* Theme Provider for Light/Dark Modes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Google OneTap Authentication */}
          {/* <GoogleAuthDirect /> */}

          {/* Toaster for Notifications */}
          <Toaster />

          {/* Tooltip and Tailwind Indicator */}
          <TooltipProvider>
            <TailwindIndicator />

            {/* ---Main Page Layout----------------  */}

            {/* Navbar/Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex flex-col items-center  align-top  flex-1 w-full min-h-[80vh] gap-10 md:gap-20">
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* ---Main Page Layout---------------- */}
          </TooltipProvider>
        </ThemeProvider>
        {/* Tawk.to Live Chat Integration */}
        <UseTawkToScript />
      </body>
    </html>
  );
}
