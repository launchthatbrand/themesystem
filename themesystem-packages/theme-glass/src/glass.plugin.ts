import type { ThemeSystemConfig } from "@themesystem/types";
import { createPlugin } from "@themesystem/core";

/**
 * Options for the Glass theme plugin
 */
export interface GlassThemePluginOptions {
  /**
   * Enable system color scheme support
   * @default true
   */
  enableSystem?: boolean;

  /**
   * Custom tokens to override default glass theme tokens
   */
  tokens?: {
    colors?: Record<string, string>;
    effects?: {
      blur?: string;
      border?: string;
      shadow?: string;
      radius?: string;
    };
    typography?: {
      fontFamily?: Record<string, string>;
      fontSize?: Record<string, string>;
    };
  };
}

/**
 * Glass Theme Plugin
 *
 * Adds the glass theme to your ThemeSystem configuration.
 * Includes a modern glass theme with blur effects and customizable tokens.
 */
export const glassThemePlugin = createPlugin<GlassThemePluginOptions>({
  name: "glass-theme",
  apply: (config, options = {}) => {
    // Default options
    const { enableSystem = true, tokens = {} } = options;

    // Create a new config by extending the original
    return {
      ...config,
      extensions: {
        ...config.extensions,
        glass: {
          id: "glass",
          name: "Glass Theme",
          description: "A modern glass theme with blur effects",
          target: {
            dataAttribute: "data-theme",
          },
          theme: {
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
                ...tokens.colors,
              },
              effects: {
                blur: tokens.effects?.blur || "var(--glass-blur)",
                border: tokens.effects?.border || "var(--glass-border)",
                shadow: tokens.effects?.shadow || "var(--glass-shadow)",
                radius: tokens.effects?.radius || "var(--glass-radius)",
              },
              typography: {
                fontFamily: {
                  sans: "var(--glass-font-sans)",
                  display: "var(--glass-font-display)",
                  body: "var(--glass-font-body)",
                  ...tokens.typography?.fontFamily,
                },
                fontSize: {
                  base: "16px",
                  lg: "18px",
                  xl: "20px",
                  "2xl": "24px",
                  ...tokens.typography?.fontSize,
                },
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
          },
        },
      },
      // Add system theme support if enabled
      framework: {
        ...config.framework,
        system: enableSystem
          ? {
              enabled: true,
              storageKey: "theme-system",
            }
          : undefined,
      },
    };
  },
});
