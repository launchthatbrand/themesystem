import type {
  PluginCreator,
  Theme,
  ThemeEngine,
  ThemeSystemConfig,
  ThemeTokens,
} from "@themesystem/types";

interface ThemeKitPluginOptions {
  themes?: {
    light?: ThemeTokens;
    dark?: ThemeTokens;
  };
  components?: {
    themeSelector?: any[];
  };
}

/**
 * Plugin for adding theme management capabilities
 */
export const themeKitPlugin: PluginCreator<ThemeKitPluginOptions> = (
  options: ThemeKitPluginOptions = {},
) => {
  return (config: ThemeSystemConfig): ThemeSystemConfig => {
    const newConfig = { ...config };

    // Merge admin components
    newConfig.admin = {
      ...newConfig.admin,
      components: {
        ...(newConfig.admin?.components || {}),
        themeSelector: [
          ...(newConfig.admin?.components?.themeSelector || []),
          // Add theme selector components
        ],
      },
    };

    // Register themes if provided
    if (options.themes) {
      const { light, dark } = options.themes;

      if (light) {
        const lightTheme: Theme = {
          id: "light",
          name: "Light",
          tokens: {
            ...light,
            effects: light.effects || {
              blur: "4px",
              border: "1px",
              shadow: "0 1px 3px rgba(0,0,0,0.12)",
              radius: "0.5rem",
            },
            typography: light.typography || {
              fontFamily: {
                sans: "system-ui, sans-serif",
                display: "system-ui, sans-serif",
                body: "system-ui, sans-serif",
              },
            },
          },
        };

        // Register light theme
        newConfig.custom = {
          ...newConfig.custom,
          themes: {
            ...(newConfig.custom?.themes || {}),
            light: lightTheme,
          },
        };
      }

      if (dark) {
        const darkTheme: Theme = {
          id: "dark",
          name: "Dark",
          tokens: {
            ...dark,
            effects: dark.effects || {
              blur: "4px",
              border: "1px",
              shadow: "0 1px 3px rgba(255,255,255,0.12)",
              radius: "0.5rem",
            },
            typography: dark.typography || {
              fontFamily: {
                sans: "system-ui, sans-serif",
                display: "system-ui, sans-serif",
                body: "system-ui, sans-serif",
              },
            },
          },
        };

        // Register dark theme
        newConfig.custom = {
          ...newConfig.custom,
          themes: {
            ...(newConfig.custom?.themes || {}),
            dark: darkTheme,
          },
        };
      }
    }

    // Add initialization hook
    const originalOnInit = newConfig.onInit;
    newConfig.onInit = async (engine: ThemeEngine) => {
      if (originalOnInit) {
        await originalOnInit(engine);
      }

      console.log("🎨 Theme Kit plugin initialized");
    };

    return newConfig;
  };
};
