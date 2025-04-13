import type {
  PluginCreator,
  Theme,
  ThemeEngine,
  ThemeSystemConfig,
  ThemeTokens,
} from "@themesystem/types";

interface UIComponentsPluginOptions {
  components?: Record<string, any>;
  styles?: Partial<ThemeTokens>;
  darkMode?: Partial<ThemeTokens>;
}

/**
 * Plugin for adding UI components and custom styles to the theme system
 */
export const uiComponentsPlugin: PluginCreator<UIComponentsPluginOptions> = (
  options: UIComponentsPluginOptions = {},
) => {
  return (incomingConfig: ThemeSystemConfig): ThemeSystemConfig => {
    // Merge components into admin UI
    const adminComponents = {
      ...incomingConfig.admin?.components,
      ...(options?.components || {}),
    };

    // Create base theme styles
    const baseStyles: Partial<Theme> = {
      id: "ui-components",
      name: "UI Components",
      tokens: {
        ...incomingConfig.custom?.baseTokens,
        ...(options?.styles || {}),
      } as ThemeTokens,
    };

    // Create dark mode variant if provided
    const darkStyles = options?.darkMode
      ? {
          variants: {
            dark: {
              ...options.darkMode,
            },
          },
        }
      : {};

    return {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
        components: adminComponents,
      },
      custom: {
        ...incomingConfig.custom,
        baseStyles: {
          ...baseStyles,
          ...darkStyles,
        },
      },
      // Add initialization hook
      onInit: async (engine: ThemeEngine) => {
        // Call original onInit if it exists
        if (incomingConfig.onInit) {
          await incomingConfig.onInit(engine);
        }

        console.log("🎨 UI Components plugin initialized");
      },
    };
  };
};
