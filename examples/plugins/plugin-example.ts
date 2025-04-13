import type { ThemeSystemConfig, ThemeSystemPlugin } from "@themesystem/types";
import {
  buildConfig,
  createPlugin,
  defineConfig,
  themeKitPlugin,
} from "@themesystem/core";

/**
 * Example 1: Using a built-in plugin
 */
const configWithBuiltInPlugin = defineConfig({
  baseTheme: "system",
  styleTheme: "default",
  plugins: [
    // Use the built-in ThemeKit plugin with custom options
    themeKitPlugin({
      variant: "neon",
      tokens: {
        colors: {
          primary: "#ff00ff",
          secondary: "#00ffff",
        },
      },
    }),
  ],
  themes: {
    light: {
      name: "Light",
      description: "Default light theme",
    },
    dark: {
      name: "Dark",
      description: "Default dark theme",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Default style",
    },
  },
});

/**
 * Example 2: Creating a custom plugin
 */
// Define plugin options interface
interface CustomPluginOptions {
  featureName: string;
  enabled: boolean;
}

// Create a custom plugin using the helper function
const customPlugin = createPlugin<CustomPluginOptions>({
  name: "custom-plugin",
  apply: (config, options) => {
    console.log(`Initializing custom plugin with options:`, options);

    // Create a new config by modifying the original
    return {
      ...config,
      // Add a custom extension
      extensions: {
        ...config.extensions,
        customFeature: {
          id: "custom-feature",
          name: options.featureName || "Custom Feature",
          target: {
            dataAttribute: "data-custom-feature",
          },
          theme: {
            tokens: {
              colors: {
                primary: "#4a90e2",
                secondary: "#50e3c2",
              },
            },
          },
        },
      },
      // Add lifecycle hook
      onInit: async (engine) => {
        // Call original onInit if exists
        if (config.onInit) {
          await config.onInit(engine);
        }

        console.log(
          `Custom plugin initialized with feature: ${options.featureName}`,
        );

        if (options.enabled) {
          // Register a dynamic theme
          engine.registerTheme({
            id: "custom-dynamic-theme",
            name: "Custom Dynamic Theme",
            tokens: {
              colors: {
                primary: "#4a90e2",
                secondary: "#50e3c2",
              },
            },
          });
        }
      },
    };
  },
});

/**
 * Example 3: Using multiple plugins together
 */
const configWithMultiplePlugins = defineConfig({
  baseTheme: "system",
  styleTheme: "default",
  plugins: [
    // Use the built-in ThemeKit plugin
    themeKitPlugin({
      variant: "modern",
    }),
    // Use our custom plugin
    customPlugin({
      featureName: "Advanced Theming",
      enabled: true,
    }),
    // Inline plugin definition
    ((config: ThemeSystemConfig): ThemeSystemConfig => {
      // Add custom UI components
      return {
        ...config,
        ui: {
          ...config.ui,
          components: {
            ...config.ui?.components,
            themeSelector: [
              ...(config.ui?.components?.themeSelector || []),
              "@myapp/components#CustomThemeSelector",
            ],
          },
        },
      };
    }) as ThemeSystemPlugin,
  ],
  themes: {
    light: {
      name: "Light",
      description: "Default light theme",
    },
    dark: {
      name: "Dark",
      description: "Default dark theme",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Default style",
    },
  },
});

/**
 * Example 4: Using buildConfig to apply plugins
 */
async function initializeWithPlugins() {
  // Define base config
  const baseConfig = defineConfig({
    baseTheme: "light",
    styleTheme: "default",
    themes: {
      light: { name: "Light", description: "Light theme" },
      dark: { name: "Dark", description: "Dark theme" },
    },
    styles: {
      default: { name: "Default", description: "Default style" },
    },
    plugins: [themeKitPlugin({ variant: "minimal" })],
  });

  // Build config (this applies all plugins)
  const finalConfig = await buildConfig(baseConfig);

  console.log("Final config after applying plugins:", finalConfig);

  // Continue with initialization...
  return finalConfig;
}

// Example usage in an async context
async function main() {
  const config = await initializeWithPlugins();

  // Initialize theme engine with the final config
  // const engine = new ThemeEngine({ config });

  console.log("Theme system initialized with plugins!");
}

// Run the example
main().catch(console.error);
