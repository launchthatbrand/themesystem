import "~/app/globals.css";
import "../../../../themesystem-packages/theme-glass/src/glass.css";

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ThemeProvider, ThemeToggle } from "@themesystem/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { Toaster } from "@acme/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="data-theme"
          styleAttribute="data-theme-style"
          defaultTheme="system"
          enableSystem={true}
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center">
              <nav className="flex flex-1 items-center space-x-4 text-sm font-medium">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
                <Link href="/themes" className="hover:text-primary">
                  Themes
                </Link>
                <Link href="/demo" className="hover:text-primary">
                  Demo
                </Link>
                <Link href="/extensions" className="hover:text-primary">
                  Extensions
                </Link>
              </nav>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="container py-6">
            <TRPCReactProvider>{props.children}</TRPCReactProvider>
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
