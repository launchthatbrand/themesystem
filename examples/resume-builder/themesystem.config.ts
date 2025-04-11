import { defineConfig } from "@themesystem/config";

export default defineConfig({
  // Global themes that affect the entire app
  themes: {
    light: {
      name: "Light",
      description: "Default light theme",
      styles: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
      },
    },
    dark: {
      name: "Dark",
      description: "Default dark theme",
      styles: {
        backgroundColor: "#000000",
        textColor: "#ffffff",
      },
    },
    system: {
      name: "System",
      description: "Follows system preferences",
    },
  },
  defaultTheme: "system",

  // Global styles that can be applied to any component
  styles: {
    default: {
      name: "Default",
      description: "Standard theme style",
      variables: {
        borderRadius: "0.5rem",
        spacing: "1rem",
      },
    },
    glass: {
      name: "Glass",
      description: "Glass morphism style",
      variables: {
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
  },

  // Resume builder extension with its own themes
  extensions: {
    resume: {
      id: "resume",
      name: "Resume Builder",
      description: "Resume template styles",
      themes: {
        modern: {
          name: "Modern",
          description: "Clean and contemporary design",
          styles: {
            fontFamily: "Inter, sans-serif",
            sectionSpacing: "2rem",
            headerColor: "#2563eb",
          },
        },
        classic: {
          name: "Classic",
          description: "Traditional resume layout",
          styles: {
            fontFamily: "Times New Roman, serif",
            sectionSpacing: "1.5rem",
            headerColor: "#000000",
          },
        },
        creative: {
          name: "Creative",
          description: "Unique and artistic design",
          styles: {
            fontFamily: "Poppins, sans-serif",
            sectionSpacing: "2.5rem",
            headerColor: "#7c3aed",
          },
        },
      },
      defaultTheme: "modern",
    },
    components: {
      id: "components",
      name: "Component Library",
      description: "Component-specific themes",
      themes: {
        button: {
          name: "Button",
          description: "Button component styles",
          styles: {
            primary: {
              backgroundColor: "#2563eb",
              color: "#ffffff",
            },
            secondary: {
              backgroundColor: "#e2e8f0",
              color: "#1e293b",
            },
          },
        },
      },
    },
    global: {
      id: "global",
      name: "Global Styles",
      description: "Global theme variables",
      themes: {
        default: {
          name: "Default",
          description: "Default global styles",
          styles: {
            borderRadius: {
              sm: "0.25rem",
              md: "0.5rem",
              lg: "1rem",
            },
            spacing: {
              sm: "0.5rem",
              md: "1rem",
              lg: "2rem",
            },
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
});
