import { Theme } from "@themesystem/core";
import { defineConfig } from "@themesystem/config";

export const brutalistTheme: Theme = {
  id: "brutalist",
  name: "Brutalist",
  description: "Bold, raw aesthetic with strong typography and stark contrasts",
  tokens: {
    colors: {
      background: "#FFFFFF",
      foreground: "#000000",
      card: "#FFFFFF",
      "card-foreground": "#000000",
      popover: "#FFFFFF",
      "popover-foreground": "#000000",
      primary: "#000000",
      "primary-foreground": "#FFFFFF",
      secondary: "#F5F5F5",
      "secondary-foreground": "#000000",
    },
    effects: {
      border: "2px solid #000000",
      shadow: "4px 4px 0px #000000",
      radius: "0",
    },
    typography: {
      fontFamily: {
        sans: '"Helvetica Neue", Arial, sans-serif',
        display: '"Helvetica Neue", Arial, sans-serif',
        body: '"Helvetica Neue", Arial, sans-serif',
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
      },
    },
  },
  styles: {
    card: {
      background: "var(--brutalist-card)",
      border: "var(--brutalist-border)",
      boxShadow: "var(--brutalist-shadow)",
      borderRadius: "var(--brutalist-radius)",
      "&:hover": {
        transform: "translate(-2px, -2px)",
        boxShadow: "6px 6px 0px #000000",
      },
    },
    button: {
      background: "var(--brutalist-primary)",
      color: "var(--brutalist-primary-foreground)",
      border: "var(--brutalist-border)",
      boxShadow: "var(--brutalist-shadow)",
      borderRadius: "var(--brutalist-radius)",
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "translate(-2px, -2px)",
        boxShadow: "6px 6px 0px #000000",
      },
    },
  },
  dark: {
    colors: {
      background: "#000000",
      foreground: "#FFFFFF",
      card: "#000000",
      "card-foreground": "#FFFFFF",
      popover: "#000000",
      "popover-foreground": "#FFFFFF",
      primary: "#FFFFFF",
      "primary-foreground": "#000000",
      secondary: "#1A1A1A",
      "secondary-foreground": "#FFFFFF",
    },
    effects: {
      border: "2px solid #FFFFFF",
      shadow: "4px 4px 0px #FFFFFF",
    },
  },
};

export const brutalistConfig = defineConfig({
  baseTheme: "system",
  styleTheme: "brutalist",
  extensions: {
    brutalist: {
      id: "brutalist",
      name: "Brutalist Theme",
      target: {
        dataAttribute: "data-theme-brutalist",
      },
      theme: {
        tokens: {
          colors: brutalistTheme.tokens.colors,
          shadows: {
            default: brutalistTheme.tokens.effects?.shadow ?? "",
          },
        },
      },
    },
  },
});

export default brutalistConfig;
