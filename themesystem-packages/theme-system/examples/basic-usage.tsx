// Example: Basic usage of the theme system

// app/layout.tsx
import {
  FloatingThemeSwitcher,
  ServerThemeProvider,
  ThemeSelector,
  useTheme,
} from "@acme/theme-system";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServerThemeProvider defaultTheme="system" defaultStyle="default">
          <div className="min-h-screen bg-background text-foreground">
            {children}
            <FloatingThemeSwitcher position="bottom-right" />
          </div>
        </ServerThemeProvider>
      </body>
    </html>
  );
}

// app/page.tsx
export default function HomePage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Theme System Example</h1>
      <p className="mb-4">
        This example demonstrates the basic usage of the theme system. Use the
        floating theme switcher in the bottom right to change themes.
      </p>
      <ThemeDemo />
    </main>
  );
}

// app/components/theme-demo.tsx
("use client");

export function ThemeDemo() {
  const { theme, themeStyle, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Current Theme Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Base Theme</p>
            <p className="font-medium">{theme}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Theme Style</p>
            <p className="font-medium">{themeStyle}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Theme Selector</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Choose a theme style from the options below:
        </p>
        <ThemeSelector showDescriptions={true} showPreviews={true} />
      </div>

      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Theme Mode</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Toggle between light and dark mode:
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setTheme("light")}
            className={`rounded-md px-4 py-2 ${
              theme === "light"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`rounded-md px-4 py-2 ${
              theme === "dark"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`rounded-md px-4 py-2 ${
              theme === "system"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            System
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">UI Elements Preview</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          See how different UI elements look with the current theme:
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md bg-primary p-4 text-primary-foreground">
              Primary
            </div>
            <div className="rounded-md bg-secondary p-4 text-secondary-foreground">
              Secondary
            </div>
            <div className="rounded-md bg-accent p-4 text-accent-foreground">
              Accent
            </div>
            <div className="rounded-md bg-muted p-4 text-muted-foreground">
              Muted
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Primary Button
            </button>
            <button className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground">
              Secondary Button
            </button>
            <button className="rounded-md bg-accent px-4 py-2 text-accent-foreground">
              Accent Button
            </button>
            <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
              Outline Button
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Input Example</label>
            <input
              type="text"
              placeholder="Enter some text..."
              className="rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
