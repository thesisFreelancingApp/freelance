import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/app/pages/header/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Logo from "@/public/logo.svg";
import "@/styles/globals.css";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Link from "next/link";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  // metadataBase: new URL(defaultUrl),
  title: "WaiaHub",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col items-center min-h-screen">
            <div className="flex flex-col items-center flex-1 w-full gap-20">
              <nav className="flex justify-center w-full h-16 border-b border-b-foreground/6">
                <div className="flex items-center justify-between w-full max-w-5xl text-xl">
                  <Link href={"/"}>
                    {" "}
                    <div className="flex items-center gap-2 font-semibold">
                      <img
                        className="size-16"
                        src={Logo.src}
                        alt="description"
                      />
                      <p> Waiahub</p>
                      {/* <div className="flex items-center gap-2">
                                            <DeployButton />
                                        </div> */}
                    </div>
                  </Link>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col w-full max-w-[84rem] gap-20 p-5">
              {children}
              </div>

              <footer className="flex items-center justify-center w-full gap-8 py-16 mx-auto text-xs text-center border-t">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
