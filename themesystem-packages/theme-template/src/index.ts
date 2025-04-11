import type { Theme } from "@themesystem/core";
import { defineConfig } from "@themesystem/config";

export const templateTheme: Theme = {
  id: "template",
  name: "Template",
  description: "A template theme for ThemeSystem",
  tokens: {
    colors: {
      background: "0 0% 100%",
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
      border: "1px solid rgba(0, 0, 0, 0.1)",
      shadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      radius: "0.5rem",
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
    card: {
      background: "var(--template-background)",
      border: "var(--template-border)",
      boxShadow: "var(--template-shadow)",
      borderRadius: "var(--template-radius)",
    },
    button: {
      background: "var(--template-primary)",
      color: "var(--template-primary-foreground)",
      borderRadius: "var(--template-radius)",
    },
  },
};

export const templateConfig = defineConfig({
  baseTheme: "system",
  styleTheme: "template",
  extensions: {
    template: {
      id: "template",
      name: "Template Theme",
      target: {
        dataAttribute: "data-theme-template",
      },
      theme: {
        tokens: {
          colors: templateTheme.tokens.colors,
          shadows: {
            default: templateTheme.tokens.effects?.shadow ?? "",
          },
        },
      },
    },
  },
});

export default templateConfig;
