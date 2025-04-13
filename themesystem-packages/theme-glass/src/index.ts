import "./glass.css";

import type { Theme, ThemeConfig } from "@themesystem/types";

export const glassTheme: Theme = {
  id: "glass",
  name: "Glass Theme",
  description: "A modern glass theme with blur effects",
  cssPath: "./glass.css",
  tokens: {
    colors: {
      background: "var(--glass-background)",
      foreground: "var(--glass-foreground)",
      card: "var(--glass-card)",
      "card-foreground": "var(--glass-card-foreground)",
      popover: "var(--glass-popover)",
      "popover-foreground": "var(--glass-popover-foreground)",
      primary: "var(--glass-primary)",
      "primary-foreground": "var(--glass-primary-foreground)",
      secondary: "var(--glass-secondary)",
      "secondary-foreground": "var(--glass-secondary-foreground)",
    },
    effects: {
      blur: "var(--glass-blur)",
      border: "var(--glass-border)",
      shadow: "var(--glass-shadow)",
      radius: "var(--glass-radius)",
    },
    typography: {
      fontFamily: {
        sans: "var(--glass-font-sans)",
        display: "var(--glass-font-display)",
        body: "var(--glass-font-body)",
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
    },
  },
  dark: {
    colors: {
      background: "var(--glass-background)",
      foreground: "var(--glass-foreground)",
      card: "var(--glass-card)",
      "card-foreground": "var(--glass-card-foreground)",
      popover: "var(--glass-popover)",
      "popover-foreground": "var(--glass-popover-foreground)",
    },
  },
  styles: {
    glass: {
      background: "var(--glass-background)",
      backdropFilter: "blur(var(--glass-blur))",
      border: "var(--glass-border)",
      boxShadow: "var(--glass-shadow)",
      borderRadius: "var(--glass-radius)",
    },
  },
};

export const glassConfig: ThemeConfig = {
  base: {
    target: "html",
    attribute: "data-theme-base",
    defaultTheme: "light",
    enableSystem: true,
    enableColorScheme: true,
    storageKey: "theme-base",
    themes: ["light", "dark"],
  },
  extensions: [
    {
      id: "glass",
      name: "Glass Theme",
      description: "A modern glass theme with blur effects",
      cssPath: "./glass.css",
      target: {
        dataAttribute: "data-theme",
      },
      themes: ["glass"],
      defaultTheme: "glass",
      storageKey: "theme-style",
    },
  ],
};

export default glassConfig;
