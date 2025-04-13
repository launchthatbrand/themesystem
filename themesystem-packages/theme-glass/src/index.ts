import type { Theme } from "@themesystem/types/core";
import { defineConfig } from "@themesystem/config";

export const glassTheme: Theme = {
  id: "glass",
  name: "Glass",
  description:
    "Clean, minimal interface with subtle transparency effects and soft shadows",
  tokens: {
    colors: {
      background: "rgba(255, 255, 255, 0.8)",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      primary: "221.2 83% 53.3%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
    },
    effects: {
      blur: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      radius: "0.75rem",
    },
    typography: {
      fontFamily: {
        sans: '"Inter", sans-serif',
        display: '"Inter", sans-serif',
        body: '"Inter", sans-serif',
      },
    },
  },
  styles: {
    // Apply glass styles when data-theme-style="glass"
    '[data-theme-style="glass"]': {
      // Global styles
      "--glass-blur": "8px",
      "--glass-border": "1px solid rgba(255, 255, 255, 0.2)",
      "--glass-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
      "--glass-radius": "0.75rem",
      "--glass-background": "rgba(255, 255, 255, 0.8)",

      // Dark mode overrides
      '&[data-theme="dark"]': {
        "--glass-background": "rgba(20, 20, 30, 0.7)",
        "--glass-border": "1px solid rgba(255, 255, 255, 0.1)",
        "--glass-shadow": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },

      // Component styles
      ".card": {
        background: "var(--glass-background)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "var(--glass-radius)",
        "&:hover": {
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        },
      },
      ".button": {
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
      },
    },
  },
};

export const glassConfig = defineConfig({
  baseTheme: "system",
  styleTheme: "glass",
  extensions: {
    glass: {
      id: "glass",
      name: "Glass Theme",
      target: {
        dataAttribute: "data-theme-style",
      },
      theme: {
        tokens: {
          colors: glassTheme.tokens.colors,
          shadows: {
            default: glassTheme.tokens.effects?.shadow ?? "",
            hover: "0 10px 40px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});

export default glassConfig;
