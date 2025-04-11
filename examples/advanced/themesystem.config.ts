import { defineConfig } from "@themesystem/config";

export default defineConfig({
  themes: {
    light: {
      name: "Light",
      description: "Default light theme",
    },
    dark: {
      name: "Dark",
      description: "Default dark theme",
    },
    system: {
      name: "System",
      description: "Follows system preferences",
    },
    midnight: {
      name: "Midnight",
      description: "Deep dark theme with blue accents",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Standard theme style",
    },
    glass: {
      name: "Glass",
      description: "Glass morphism style",
    },
    brutalist: {
      name: "Brutalist",
      description: "Brutalist design style",
    },
  },
  extensions: {
    components: {
      button: {
        variants: ["primary", "secondary", "outline", "ghost"],
        sizes: ["sm", "md", "lg", "xl"],
      },
      card: {
        variants: ["default", "bordered", "elevated", "glass"],
      },
      input: {
        variants: ["default", "outline", "filled"],
        sizes: ["sm", "md", "lg"],
      },
    },
    global: {
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
        xl: "2rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "4rem",
      },
      typography: {
        fontFamily: {
          sans: "system-ui, sans-serif",
          mono: "monospace",
        },
        fontSize: {
          sm: "0.875rem",
          md: "1rem",
          lg: "1.25rem",
          xl: "1.5rem",
        },
      },
    },
  },
  storage: {
    key: "theme-system-state",
    type: "localStorage",
  },
  plugins: [
    {
      id: "analytics",
      name: "Theme Analytics",
      description: "Tracks theme usage and preferences",
      version: "1.0.0",
      onThemeChange: async (state) => {
        // Send analytics data
        console.log("Theme changed:", state);
      },
    },
    {
      id: "custom-css",
      name: "Custom CSS",
      description: "Adds custom CSS variables",
      version: "1.0.0",
      extensions: new Map([
        [
          "custom-variables",
          {
            "--custom-primary": "#0070f3",
            "--custom-secondary": "#7928ca",
          },
        ],
      ]),
    },
  ],
  framework: {
    nextjs: {
      serverSideRendering: true,
      cookieOptions: {
        path: "/",
        sameSite: "lax",
      },
    },
  },
});
