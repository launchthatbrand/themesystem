import "~/app/globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider, ThemeToggle } from "@themesystem/ui";

import { Inter } from "next/font/google";
import { Nav } from "@/components/nav";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "@acme/ui/toast";
import { cn } from "@acme/ui";
import config from "../../themesystem.config";
import { createNextAdapter } from "@themesystem/nextjs";
import { env } from "~/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "ThemeSystem Demo",
  description: "A demonstration of ThemeSystem v2",
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

// Create the theme adapter
const {
  ThemeProvider: NextThemeProvider,
  ServerThemeProvider,
  ServerThemeScript,
} = createNextAdapter({ config });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ServerThemeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          inter.className,
        )}
      >
        <ServerThemeProvider>
          <NextThemeProvider>
            <ThemeProvider>
              <Nav />
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <div className="absolute bottom-4 right-4">
                <ThemeToggle />
              </div>
              <Toaster />
            </ThemeProvider>
          </NextThemeProvider>
        </ServerThemeProvider>
      </body>
    </html>
  );
}
