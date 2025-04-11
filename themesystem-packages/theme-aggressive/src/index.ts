import { Theme } from "@themesystem/core";
import { defineConfig } from "@themesystem/config";

export const aggressiveTheme: Theme = {
  id: "aggressive",
  name: "Aggressive",
  description:
    "Bold, high-contrast design with intense colors and dynamic effects",
  tokens: {
    colors: {
      background: "#000000",
      foreground: "#FF0000",
      card: "#000000",
      "card-foreground": "#FF0000",
      popover: "#000000",
      "popover-foreground": "#FF0000",
      primary: "#FF0000",
      "primary-foreground": "#000000",
      secondary: "#FF3333",
      "secondary-foreground": "#000000",
      accent: "#00FF00",
      "accent-foreground": "#000000",
      destructive: "#FF0000",
      "destructive-foreground": "#000000",
    },
    effects: {
      border: "2px solid #FF0000",
      shadow: "0 0 20px rgba(255, 0, 0, 0.5)",
      radius: "0",
      glow: "0 0 10px #FF0000",
    },
    typography: {
      fontFamily: {
        sans: '"Impact", "Arial Black", sans-serif',
        display: '"Impact", "Arial Black", sans-serif',
        body: '"Impact", "Arial Black", sans-serif',
      },
      fontSize: {
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  styles: {
    card: {
      padding: "1.5rem",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "var(--aggressive-glow)",
      },
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontWeight: "var(--aggressive-font-weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "var(--aggressive-glow)",
      },
      "&::before": {
        content: "''",
        position: "absolute",
        top: "0",
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        transition: "0.5s",
      },
      "&:hover::before": {
        left: "100%",
      },
    },
  },
  dark: {
    colors: {
      background: "#000000",
      foreground: "#FF0000",
      card: "#000000",
      "card-foreground": "#FF0000",
      popover: "#000000",
      "popover-foreground": "#FF0000",
      primary: "#FF0000",
      "primary-foreground": "#000000",
      secondary: "#FF3333",
      "secondary-foreground": "#000000",
      accent: "#00FF00",
      "accent-foreground": "#000000",
      destructive: "#FF0000",
      "destructive-foreground": "#000000",
    },
    effects: {
      border: "2px solid #FF0000",
      shadow: "0 0 20px rgba(255, 0, 0, 0.5)",
      glow: "0 0 10px #FF0000",
    },
  },
};

export const aggressiveConfig = defineConfig({
  baseTheme: "system",
  styleTheme: "aggressive",
  extensions: {
    aggressive: {
      id: "aggressive",
      name: "Aggressive Theme",
      target: {
        dataAttribute: "data-theme-aggressive",
      },
      theme: {
        tokens: {
          colors: aggressiveTheme.tokens.colors,
          shadows: {
            default: aggressiveTheme.tokens.effects?.shadow ?? "",
          },
        },
      },
    },
  },
});

export default aggressiveTheme;
