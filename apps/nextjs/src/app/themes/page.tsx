"use client";

import { ThemeSelector } from "@themesystem/ui";

export default function ThemesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Available Themes</h1>
      <ThemeSelector />
    </div>
  );
}
