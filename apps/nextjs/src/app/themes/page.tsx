"use client";

import { useTheme } from "@themesystem/core";
import { ThemeSelector, ThemeToggle } from "@themesystem/nextjs";

function DemoCard() {
  const { style } = useTheme();

  return (
    <div className="card relative w-full max-w-md rounded-lg border bg-card p-6 shadow-lg transition-all duration-300">
      <h3 className="mb-3 text-xl font-semibold text-card-foreground">
        Theme Demo Card (Style: {style || "default"})
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        This card demonstrates the current theme styling. Switch between themes
        to see how it changes.
      </p>
      <div className="flex items-center gap-3">
        <button className="button rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Primary Button
        </button>
        <button className="button rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
          Secondary Button
        </button>
      </div>
    </div>
  );
}

export default function ThemesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Theme Settings</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Theme Preview</h2>
          <p className="mb-6 text-muted-foreground">
            This preview shows how the selected theme affects the appearance of
            UI components.
          </p>
          <div className="relative flex justify-center overflow-hidden rounded-xl bg-[url('/grid.svg')] p-8 before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-100/50 before:to-pink-100/50 before:content-[''] dark:before:from-blue-950/30 dark:before:to-pink-950/30">
            <DemoCard />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Available Themes</h2>
          <p className="mb-4 text-muted-foreground">
            Choose a theme style to customize the look and feel of the
            application. The selected theme will adapt to your light/dark mode
            preference.
          </p>
          <ThemeSelector showDescriptions />
        </div>
      </div>
    </div>
  );
}
