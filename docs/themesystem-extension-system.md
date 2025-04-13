# ThemeSystem Extension System

## Current Implementation

Currently, the ThemeSystem has the following architecture for themes and extensions:

1. **Theme Registry**: A singleton pattern that manages theme registration, with methods like `registerTheme`, `getTheme`, and `getAllThemes`.
2. **Config-based Extensions**: Extensions are defined in the config file (`themesystem.config.ts`) and are primarily used to target specific elements with data attributes.
3. **Static Configuration**: The configuration is defined once and loaded at initialization.

## PayloadCMS Plugin System Analysis

PayloadCMS uses a function-based plugin system that allows plugins to:

1. **Modify Configuration**: Plugins receive the main config object and can modify it directly.
2. **Add Collections/Fields**: Plugins can add new collections or extend existing ones.
3. **Add Endpoints**: Plugins can register custom API endpoints.
4. **Add Admin Components**: Plugins can inject custom components into the admin UI.
5. **Add Lifecycle Hooks**: Plugins can hook into initialization and other lifecycle events.
6. **Maintain Disabled State**: Even when disabled, plugins can maintain database schema consistency.

## Proposed ThemeSystem Plugin Architecture

Based on the PayloadCMS plugin model, here's the exact implementation pattern for ThemeSystem plugins:

### 1. Plugin Definition Structure

```typescript
import type { Theme, ThemeSystemConfig } from "@themesystem/types";

export type ThemePluginConfig = {
  /**
   * Optional name for the plugin
   */
  name?: string;

  /**
   * List of themes to enhance with plugin styles
   */
  themes?: string[];

  /**
   * Whether the plugin is disabled
   */
  disabled?: boolean;

  /**
   * Custom options specific to this plugin
   */
  options?: Record<string, any>;
};

/**
 * Example theme plugin that follows the PayloadCMS pattern
 */
export const myThemePlugin =
  (pluginOptions: ThemePluginConfig) =>
  (config: ThemeSystemConfig): ThemeSystemConfig => {
    // Ensure themes array exists
    if (!config.themes) {
      config.themes = {};
    }

    // Add a new theme
    config.themes["plugin-theme"] = {
      name: "Plugin Theme",
      description: "Theme added by plugin",
    };

    // Add extension to target specific elements
    if (!config.extensions) {
      config.extensions = {};
    }

    // Add extension configuration
    config.extensions["plugin-extension"] = {
      id: "plugin-extension",
      name: pluginOptions.name || "Plugin Extension",
      target: {
        dataAttribute: "data-plugin-extension",
      },
      theme: {
        tokens: {
          colors: {
            primary: "#0070f3",
            secondary: "#ff4081",
          },
        },
      },
    };

    // Apply plugin to specific themes if specified
    if (pluginOptions.themes) {
      for (const themeName of pluginOptions.themes) {
        if (config.themes[themeName]) {
          // Enhance the existing theme
          const existingTheme = config.themes[themeName];
          existingTheme.enhancedByPlugin = true;
        }
      }
    }

    /**
     * If the plugin is disabled, we still maintain the schema consistency
     * but don't add dynamic features
     */
    if (pluginOptions.disabled) {
      return config;
    }

    // Add UI components if system supports them
    if (!config.ui) {
      config.ui = {};
    }

    if (!config.ui.components) {
      config.ui.components = {};
    }

    if (!config.ui.components.themeSelector) {
      config.ui.components.themeSelector = [];
    }

    // Add custom theme selector component
    config.ui.components.themeSelector.push(
      `@themesystem/plugin-name/components#CustomThemeSelector`,
    );

    // Lifecycle hooks handling
    const incomingOnInit = config.onInit;

    config.onInit = async (themeEngine) => {
      // Ensure we execute any existing onInit functions before running our own
      if (incomingOnInit) {
        await incomingOnInit(themeEngine);
      }

      // Register dynamic theme
      themeEngine.registerTheme({
        id: "dynamic-plugin-theme",
        name: "Dynamic Plugin Theme",
        tokens: {
          colors: {
            primary: "#3498db",
            secondary: "#2ecc71",
          },
          typography: {
            fontFamily: "system-ui, sans-serif",
            fontSize: {
              base: "16px",
              lg: "18px",
            },
          },
        },
      });

      // Load additional resources
      await themeEngine.loadStylesheet("/themes/plugin-theme.css");

      console.log("Theme plugin initialized successfully");
    };

    return config;
  };
```

### 2. Using the Plugin in Configuration

```typescript
import { anotherPlugin } from "@themesystem/another-plugin";
import { defineConfig } from "@themesystem/core";
import { myThemePlugin } from "@themesystem/my-plugin";

export default defineConfig({
  baseTheme: "light",
  styleTheme: "default",

  // Apply plugins directly to config
  plugins: [
    myThemePlugin({
      name: "Custom Theme Plugin",
      themes: ["light", "dark"],
    }),
    anotherPlugin({
      disabled: process.env.NODE_ENV === "development",
    }),
  ],

  // Other config options remain the same
  themes: {
    light: {
      name: "Light",
      description: "Light theme",
    },
    dark: {
      name: "Dark",
      description: "Dark theme",
    },
  },

  storage: {
    key: "theme-system-state",
    type: "localStorage",
  },
});
```

### 3. Plugin Application Process

The plugin system will work exactly like PayloadCMS, with the following steps:

1. **Plugin Application**: Each plugin function receives the config and returns a modified version
2. **Order Matters**: Plugins are applied in the order they are defined
3. **Direct Modification**: Plugins can directly modify any part of the config object
4. **Lifecycle Integration**: Plugins can chain lifecycle hooks by preserving existing handlers

```typescript
// Inside the ThemeEngine initialization
function applyPlugins(config: ThemeSystemConfig): ThemeSystemConfig {
  if (!config.plugins || !Array.isArray(config.plugins)) {
    return config;
  }

  // Apply each plugin in sequence
  return config.plugins.reduce(
    (currentConfig, pluginFn) => pluginFn(currentConfig),
    config,
  );
}
```

## Plugin Capabilities

Following the PayloadCMS pattern, ThemeSystem plugins can:

1. **Modify Theme Configuration**:
   - Add new themes
   - Enhance existing themes
   - Configure theme properties
2. **Add Extensions**:
   - Create new extensions that target specific elements
   - Define how themes apply to different components
3. **Add UI Components**:
   - Inject custom UI components into various parts of the theme system
   - Create custom theme controls and selectors
4. **Handle Lifecycle Events**:

   - Hook into initialization
   - React to theme changes
   - Modify the runtime behavior

5. **Load External Resources**:
   - Load stylesheets dynamically
   - Inject scripts or assets
   - Connect to external services

## Implementation Plan

1. **Update Core Interfaces**:
   - Add plugins array to `ThemeSystemConfig`
   - Create plugin application mechanism
2. **Enhance Theme Engine**:
   - Add plugin application logic
   - Support lifecycle hooks chaining
   - Provide plugin context
3. **Create Plugin Development Kit**:
   - Develop utilities for plugin authors
   - Create testing helpers
   - Document plugin development process
4. **Provide Migration Path**:
   - Support both current and new plugin formats
   - Offer conversion utilities
   - Document upgrade process

## Migration Steps

1. Update core packages to support the plugin pattern
2. Create plugin utilities and helpers
3. Document the new approach for plugin developers
4. Provide examples for common use cases
5. Support existing extensions during transition period

## Next Steps

1. Define exact plugin interface types
2. Implement plugin application mechanism
3. Update theme engine to support the plugin approach
4. Create example plugins for testing
5. Document the new plugin system for developers
