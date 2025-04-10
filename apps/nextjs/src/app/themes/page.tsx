"use client";

import * as React from "react";

import { ThemeSelector, ThemeStyle, useTheme } from "@acme/theme-system";

export default function ThemesPage() {
  const { theme, themeStyle, setTheme, setThemeStyle } = useTheme();

  const allThemeStyles: ThemeStyle[] = [
    "default",
    "rose",
    "green",
    "blue",
    "orange",
    "purple",
    "custom",
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Theme System Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the new theme system with various components
          and UI elements.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Current Theme</h2>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Base Theme</div>
              <div className="font-medium">{theme}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Theme Style</div>
              <div className="font-medium">{themeStyle}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm text-muted-foreground">
              Toggle Mode
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`rounded-md px-3 py-1 text-sm ${
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`rounded-md px-3 py-1 text-sm ${
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`rounded-md px-3 py-1 text-sm ${
                  theme === "system"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                System
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-muted-foreground">
              Quick Switch Style
            </div>
            <div className="flex flex-wrap gap-2">
              {allThemeStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => setThemeStyle(style)}
                  className={`rounded-md px-3 py-1 text-sm ${
                    themeStyle === style
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Color Palette</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
              Primary
            </div>
            <div className="flex h-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              Secondary
            </div>
            <div className="flex h-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
              Accent
            </div>
            <div className="flex h-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
              Muted
            </div>
            <div className="flex h-12 items-center justify-center rounded-md bg-destructive text-destructive-foreground">
              Destructive
            </div>
            <div className="flex h-12 items-center justify-center rounded-md border bg-background text-foreground">
              Background
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Theme Selector</h2>
        <p className="mb-6 text-muted-foreground">
          Use the theme selector component to easily switch between themes:
        </p>
        <ThemeSelector showDescriptions={true} showPreviews={true} />
      </div>

      <div className="mb-8 rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">UI Components</h2>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Primary
            </button>
            <button className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground">
              Secondary
            </button>
            <button className="rounded-md bg-accent px-4 py-2 text-accent-foreground">
              Accent
            </button>
            <button className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground">
              Destructive
            </button>
            <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
              Outline
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground opacity-50">
              Disabled
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Form Elements</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Input</label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Select</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="checkbox"
                className="h-4 w-4 rounded border-input bg-background"
              />
              <label htmlFor="checkbox" className="text-sm">
                Checkbox
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="radio"
                name="radio-group"
                className="h-4 w-4 border-input bg-background"
              />
              <label htmlFor="radio" className="text-sm">
                Radio Button
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium">Card & Typography</h3>
          <div className="rounded-md border p-4">
            <h4 className="mb-2 text-base font-semibold">Card Title</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              This is a sample card with some example text to demonstrate how
              typography looks with the current theme.
            </p>
            <div className="flex justify-end">
              <button className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
                Action
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
        <p className="mb-2 text-muted-foreground">
          Try different theme combinations:
        </p>
        <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
          <li>Use the floating theme switcher in the bottom right corner</li>
          <li>Try toggling between light and dark modes</li>
          <li>
            Experiment with different theme styles from the selector above
          </li>
          <li>Notice how all UI elements adapt to the selected theme</li>
        </ol>
      </div>
    </div>
  );
}
