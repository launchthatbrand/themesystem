"use client";

import { themeRegistry } from "@themesystem/core";
import { ThemeSelector } from "@themesystem/ui";

export default function ThemesPage() {
  const themes = themeRegistry.getAllThemes();

  console.log("ThemesPage: themes", themes);
  console.log("ThemesPage: registry", themeRegistry);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold">Available Themes</h1>
      <div className="mb-8">
        <ThemeSelector themes={themes} />
      </div>
      {themes.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">No themes found in registry</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h2 className="mb-2 text-2xl font-semibold">{theme.name}</h2>
              <p className="mb-4 text-muted-foreground">{theme.description}</p>
              <div className="space-y-2">
                <h3 className="font-medium">Colors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(theme.tokens.colors).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          backgroundColor: value,
                        }}
                      />
                      <span className="text-sm">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
