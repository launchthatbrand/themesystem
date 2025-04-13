"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { ThemeSelector, ThemeToggle } from "@themesystem/nextjs";

import { Checkbox } from "@acme/ui/checkbox";
import { useTheme } from "@themesystem/core";

function DemoCard() {
  const { style } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Demo Card (Style: {style || "default"})</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          This card demonstrates the current theme styling. Switch between
          themes to see how it changes.
        </p>
      </CardContent>
    </Card>
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
            <Checkbox />
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
