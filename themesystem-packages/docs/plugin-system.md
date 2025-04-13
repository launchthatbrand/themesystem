# ThemeSystem Plugin System

## Overview

The ThemeSystem plugin system is a powerful way to extend the functionality of the ThemeSystem. It follows the same pattern as the PayloadCMS plugin system, providing a consistent, powerful approach to customizing and extending your theme configuration.

## How It Works

Plugins are functions that receive a configuration object and return a modified version. They can:

1. Add or modify themes
2. Register extensions
3. Add UI components
4. Hook into lifecycle events
5. Dynamically register resources

## Creating a Plugin

### Basic Structure

A plugin is a function that takes a configuration object and returns a modified configuration:

```typescript
// Simple plugin definition
const myPlugin = (config: ThemeSystemConfig): ThemeSystemConfig => {
  // Modify config
  return {
    ...config,
    // Your modifications here
  };
};
```

### With Options

Most plugins will want to accept options. The recommended pattern is to create a curried function:

```typescript
// Plugin with options
const myPlugin =
  (options = {}) =>
  (config: ThemeSystemConfig): ThemeSystemConfig => {
    // Use options to customize behavior
    return {
      ...config,
      // Your modifications here based on options
    };
  };

// Usage
defineConfig({
  // ...
  plugins: [
    myPlugin({
      customOption1: true,
      customOption2: "value",
    }),
  ],
});
```

### Using the Helper Function

We provide a helper function to make creating plugins easier:

```typescript
import { createPlugin } from "@themesystem/core";

// Define options interface
interface MyPluginOptions {
  feature: string;
  enabled: boolean;
}

// Create plugin
const myPlugin = createPlugin<MyPluginOptions>({
  name: "my-plugin",
  apply: (config, options) => {
    // Modify config based on options
    return {
      ...config,
      // Your modifications here
    };
  },
});

// Usage
defineConfig({
  // ...
  plugins: [myPlugin({ feature: "awesome-feature", enabled: true })],
});
```

## Common Plugin Operations

### Adding Extensions

```typescript
const myPlugin =
  (options = {}) =>
  (config) => {
    return {
      ...config,
      extensions: {
        ...config.extensions,
        myExtension: {
          id: "my-extension",
          name: "My Extension",
          target: {
            dataAttribute: "data-my-extension",
          },
          theme: {
            tokens: {
              colors: {
                primary: "#4a90e2",
              },
            },
          },
        },
      },
    };
  };
```

### Adding UI Components

```typescript
const myPlugin =
  (options = {}) =>
  (config) => {
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
  };
```

### Chaining Lifecycle Hooks

```typescript
const myPlugin =
  (options = {}) =>
  (config) => {
    // Preserve the original onInit function if it exists
    const originalOnInit = config.onInit;

    return {
      ...config,
      onInit: async (engine) => {
        // Call original onInit if it exists
        if (originalOnInit) {
          await originalOnInit(engine);
        }

        // Plugin initialization logic
        console.log("My plugin initialized!");

        // Register a dynamic theme
        engine.registerTheme({
          id: "dynamic-theme",
          name: "Dynamic Theme",
          tokens: {
            colors: {
              primary: "#4a90e2",
            },
          },
        });
      },
    };
  };
```

## Plugin Application Order

Plugins are applied in the order they are defined. This means that plugins defined later in the array can override or modify values set by earlier plugins.

```typescript
defineConfig({
  // ...
  plugins: [
    pluginA(), // Applied first
    pluginB(), // Applied second, can override changes from pluginA
    pluginC(), // Applied third, can override changes from pluginA and pluginB
  ],
});
```

## Building Configuration with Plugins

When initializing your theme system, use the `buildConfig` function to apply all plugins:

```typescript
import { buildConfig, defineConfig } from "@themesystem/core";

async function initialize() {
  // Define initial config with plugins
  const baseConfig = defineConfig({
    // ...
    plugins: [myPlugin(), anotherPlugin()],
  });

  // Build the final config (applies all plugins)
  const finalConfig = await buildConfig(baseConfig);

  // Initialize theme engine with the final config
  const engine = new ThemeEngine({ config: finalConfig });

  return engine;
}
```

## Built-in Plugins

ThemeSystem comes with some built-in plugins:

### ThemeKit Plugin

```typescript
import { themeKitPlugin } from "@themesystem/core";

defineConfig({
  // ...
  plugins: [
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
});
```

## Best Practices

1. **Make plugins composable**: Ensure your plugin works well with other plugins.
2. **Chain lifecycle hooks**: Always preserve and call existing lifecycle hooks.
3. **Use type-safe options**: Define an interface for your plugin options.
4. **Document your plugin**: Provide clear documentation on what your plugin does and its options.
5. **Handle missing properties**: Check if properties exist before accessing them.

## Plugin Development Checklist

- [ ] Define your plugin's purpose and scope
- [ ] Create a TypeScript interface for plugin options
- [ ] Implement the plugin function using `createPlugin`
- [ ] Handle missing properties gracefully
- [ ] Chain lifecycle hooks properly
- [ ] Test your plugin with different configurations
- [ ] Document your plugin and its options
