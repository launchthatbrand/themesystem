"use client";

import { ThemeToggle } from "@themesystem/nextjs";
import { ThemeSelector } from "@themesystem/ui";

export default function ThemesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Theme Settings</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-6">
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
