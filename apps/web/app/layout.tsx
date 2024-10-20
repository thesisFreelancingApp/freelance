import GoogleAuthDirect from "@/app/(auth-pages)/google_onetap";
import HeaderAuth from "@/app/pages/header/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Logo from "@/public/WaiaHub-LogoIcon.svg";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WaiaHub - The fastest way to Freelance",
  description: "The fastest way to Freelance",
};

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
        <GoogleAuthDirect />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="flex flex-col items-center min-h-screen">
              <div className="flex flex-col items-center flex-1 w-full gap-10 md:gap-20">
                {/* Navbar */}
                <nav className="flex justify-center w-full h-16 border-b border-b-foreground/6">
                  <div className="flex items-center justify-between w-full px-4 text-lg max-w-7xl md:px-8 md:text-xl">
                    <Link href={"/"}>
                      <div className="flex items-center gap-2 font-semibold">
                        <img
                          className="w-12 h-12 md:w-16 md:h-16"
                          src={Logo.src}
                          alt="WaiaHub Logo"
                        />
                        <p className="text-3xl">Waiahub</p>
                      </div>
                    </Link>
                    <HeaderAuth />
                  </div>
                </nav>

                {/* Main content */}
                {/* <div className="flex flex-col gap-10 p-4 max-w-7xl md:gap-20 md:p-8"> */}
                <div className="flex flex-col w-full max-w-[84rem] gap-20 p-5">
                  {children}
                </div>

                {/* Footer */}
                <footer className="flex flex-col items-center justify-center w-full gap-4 py-8 mx-auto text-xs text-center border-t md:flex-row md:gap-8 md:py-16 md:text-sm">
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
                </footer>
              </div>
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
