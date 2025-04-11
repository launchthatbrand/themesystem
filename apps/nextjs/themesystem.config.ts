import { defineConfig } from "@themesystem/core";

export default defineConfig({
  // Use the aggressive style theme
  styleTheme: "aggressive",

  // Set base theme to system
  baseTheme: "system",

  // Define extensions
  extensions: {
    // Resume builder extension
    resume: {
      id: "resume",
      name: "Resume Builder",
      description: "Custom styles for resume components",
      target: {
        dataAttribute: "data-resume",
        componentName: "ResumeBuilder",
      },
      theme: {
        tokens: {
          colors: {
            primary: "var(--color-primary)",
            secondary: "var(--color-secondary)",
          },
          typography: {
            fontFamily: "var(--font-sans)",
            fontSize: {
              sm: "0.875rem",
              md: "1rem",
              lg: "1.125rem",
            },
          },
        },
        components: {
          section: {
            base: {
              padding: "var(--spacing-4)",
              marginBottom: "var(--spacing-8)",
            },
            variants: {
              header: {
                backgroundColor: "var(--color-primary)",
                color: "var(--color-white)",
              },
            },
          },
        },
      },
    },

    // Custom theme extension
    customTheme: {
      id: "custom-theme",
      name: "Custom Theme",
      description: "A custom theme for specific components",
      target: {
        dataAttribute: "data-custom-theme",
      },
      theme: {
        tokens: {
          colors: {
            accent: "#ff0000",
            background: "#ffffff",
          },
        },
      },
    },
  },

  // Storage configuration
  storage: {
    key: "theme-system-state",
    type: "localStorage",
  },

  // Next.js specific options
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
