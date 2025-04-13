# ThemeSystem Type Definitions

This document provides a comprehensive analysis of the type system used in ThemeSystem, identifying areas for improvement to better align with the PayloadCMS-inspired plugin architecture we're implementing.

## PayloadCMS-Inspired Architecture

### Core Configuration Type

The main configuration type should mirror PayloadCMS's approach where plugins are the primary extension mechanism:

```typescript
export type ThemeSystemConfig = {
  // Core configuration
  debug?: boolean;
  defaultTheme?: "light" | "dark" | "system";

  // Storage configuration
  storage?: {
    key?: string;
    type?: "localStorage" | "cookie";
  };

  // Admin/UI configuration (can be extended by plugins)
  admin?: {
    theme?: "all" | "dark" | "light";
    components?: Record<string, any>;
  };

  // Framework integration (can be extended by plugins)
  framework?: {
    nextjs?: Record<string, any>;
  };

  // Plugin system - primary extension mechanism
  plugins?: ThemeSystemPlugin[];

  // Global lifecycle hooks (can be extended by plugins)
  onInit?: (engine: ThemeEngine) => Promise<void> | void;

  // Custom extension point
  custom?: Record<string, any>;
};

// Plugin type matching PayloadCMS pattern
export type ThemeSystemPlugin = (
  config: ThemeSystemConfig,
) => ThemeSystemConfig | Promise<ThemeSystemConfig>;

// Plugin creator with options
export interface PluginCreator<Options = any> {
  (options?: Options): ThemeSystemPlugin;
}
```

### Plugin System

Plugins are the primary way to extend the system. A plugin can:

- Register themes
- Add components
- Extend lifecycle hooks
- Modify configuration
- Add new functionality

Example of a theme plugin:

```typescript
export const glassThemePlugin = (
  options?: GlassThemeOptions,
): ThemeSystemPlugin => {
  return async (config) => {
    // Get the engine instance from the config
    const engine = config.engine;

    // Register the theme
    engine.registerTheme({
      id: "glass",
      name: "Glass Theme",
      tokens: {
        // theme tokens
      },
    });

    // Add UI components
    if (!config.admin) config.admin = {};
    if (!config.admin.components) config.admin.components = {};
    config.admin.components.glassThemeSelector = GlassThemeSelector;

    // Add lifecycle hooks
    const originalOnInit = config.onInit;
    config.onInit = async (engine) => {
      if (originalOnInit) {
        await originalOnInit(engine);
      }
      // Plugin initialization logic
    };

    return config;
  };
};

// Usage example
export default buildConfig({
  debug: process.env.NODE_ENV === "development",
  defaultTheme: "light",
  plugins: [
    glassThemePlugin({
      blur: "10px",
      opacity: 0.5,
    }),
    neonThemePlugin(),
    customPlugin({
      // plugin options
    }),
  ],
});
```

### Plugin Composition

Plugins can be composed and will be applied sequentially:

```typescript
export const composePlugins = (
  ...plugins: ThemeSystemPlugin[]
): ThemeSystemPlugin => {
  return async (config) => {
    return plugins.reduce(
      async (configPromise, plugin) => plugin(await configPromise),
      Promise.resolve(config),
    );
  };
};
```

### Configuration Builder

The configuration builder validates and applies plugins:

```typescript
export function buildConfig(
  config: ThemeSystemConfig,
): Promise<SanitizedConfig> {
  return new Promise(async (resolve) => {
    // 1. Create engine instance
    const engine = new ThemeEngine();
    config.engine = engine;

    // 2. Apply plugins sequentially
    const configWithPlugins = await applyPlugins(config);

    // 3. Validate and sanitize
    const sanitizedConfig = await validateConfig(configWithPlugins);

    resolve(sanitizedConfig);
  });
}
```

### Provider Integration

The ThemeProvider uses the sanitized config:

```typescript
export interface ThemeProviderProps {
  config: SanitizedConfig;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  // Provider implementation using the sanitized config
};
```

## Migration Strategy

1. **Convert Themes to Plugins**:

   - Move all theme definitions into plugins
   - Each theme becomes a self-contained plugin
   - Plugins can register multiple themes

2. **Update Core APIs**:

   - Remove theme registration from config
   - Make engine methods plugin-accessible
   - Update provider to work with plugin system

3. **Plugin Guidelines**:
   - Plugins should be self-contained
   - Plugins can extend multiple aspects
   - Follow PayloadCMS patterns for consistency

## Core Types

### `BaseTheme`

A string union type representing the base themes.

```typescript
type BaseTheme = "light" | "dark" | "system";
```

**Usage**: Used to define the foundational theme choices that all other themes build upon.

### `Theme`

The main interface for defining a theme.

```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  preview?: string;
  baseTheme?: BaseTheme;
  cssPath?: string;
  tokens: {
    colors: {
      background: string;
      foreground: string;
      card: string;
      "card-foreground": string;
      popover: string;
      "popover-foreground": string;
      primary: string;
      "primary-foreground": string;
      secondary: string;
      "secondary-foreground": string;
    };
    effects: {
      blur: string;
      border: string;
      shadow: string;
      radius: string;
      glow?: string;
    };
    typography: {
      fontFamily: {
        sans: string;
        display: string;
        body: string;
      };
      fontSize?: {...};
      fontWeight?: {...};
    };
  };
  styles?: {...};
  dark?: {...};
}
```

**Usage**: The fundamental building block for all themes. Defines the visual tokens and styles that can be applied.

## Configuration Types

### `ThemeConfig`

Configuration for the base theme behavior.

```typescript
interface ThemeConfig {
  base: {
    target?: string;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    enableColorScheme?: boolean;
    storageKey?: string;
    themes?: string[];
  };
  extensions?: ThemeExtension[];
  value?: Record<string, Record<string, string>>;
}
```

**Usage**: Used to configure the basic theme behavior.

### `ThemeEngineOptions`

Options for initializing the theme engine.

```typescript
interface ThemeEngineOptions {
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  config?: ThemeSystemConfig;
  storageKey?: string;
}
```

**Usage**: Passed when creating a new ThemeEngine instance.

### `ThemeSystemConfig`

The main configuration type for the entire theme system.

```typescript
interface ThemeSystemConfig {
  baseTheme: string;
  styleTheme: string;
  themes: Record<string, { name: string; description: string; }>;
  extensions?: Record<string, ThemeExtension>;
  styles: Record<string, { name: string; description: string; }>;
  storage?: { key: string; type: "localStorage" | "cookie"; };
  framework?: { nextjs?: {...}; };
  plugins?: ThemeSystemPlugin[];
  onInit?: (engine: ThemeEngine) => Promise<void> | void;
  ui?: { components?: {...}; };
}
```

**Usage**: The primary configuration object for setting up the ThemeSystem.

## Extension Types

### `ThemeExtension`

Defines an extension to the ThemeSystem.

```typescript
interface ThemeExtension {
  id: string;
  name: string;
  description?: string;
  cssPath?: string;
  target: {
    dataAttribute: string;
    componentName?: string;
  };
  theme?: {
    tokens?: Theme["tokens"];
    components?: Record<string, any>;
  };
  config?: Record<string, any>;
  themes: string[];
  defaultTheme?: string;
  storageKey?: string;
  inheritFrom?: string;
}
```

**Usage**: Used to extend the core theme functionality with additional themes and styles.

### `ThemeState`

Represents the current state of the theme system.

```typescript
interface ThemeState {
  theme: string;
  style: string;
  currentTheme?: Theme;
  extensions: Record<string, ThemeExtension>;
}
```

**Usage**: Used to track and manage the current theme state.

### `ThemeMiddleware`

Middleware for processing theme state changes.

```typescript
interface ThemeMiddleware {
  process: (
    state: Partial<ThemeState>,
    currentState: ThemeState,
  ) => Promise<Partial<ThemeState>>;
}
```

**Usage**: Used to intercept and modify theme state changes.

### `ThemePlugin`

Legacy plugin interface, different from the new function-based plugins.

```typescript
interface ThemePlugin {
  id: string;
  middleware?: ThemeMiddleware[];
  onInstall?: (engine: ThemeEngine) => Promise<void>;
  onUninstall?: () => Promise<void>;
  onThemeChange?: (state: ThemeState) => Promise<void>;
}
```

**Usage**: Used to extend the functionality of the theme engine.

### `ThemeEngine`

Interface for the theme engine.

```typescript
interface ThemeEngine {
  getState: () => ThemeState;
  setState: (state: Partial<ThemeState>) => Promise<void>;
  use: (middleware: ThemeMiddleware) => void;
  registerPlugin: (plugin: ThemePlugin) => Promise<void>;
  unregisterPlugin: (pluginId: string) => Promise<void>;
  registerTheme: (theme: Theme) => void;
  getTheme: (id: string) => Theme | undefined;
  getAllThemes: () => Theme[];
}
```

**Usage**: The main engine that powers the theme system.

## Plugin System Types

### `ThemeSystemPlugin`

The new function-based plugin interface.

```typescript
interface ThemeSystemPlugin {
  (config: ThemeSystemConfig): ThemeSystemConfig | Promise<ThemeSystemConfig>;
}
```

**Usage**: Used to modify the theme system configuration in a functional, composable way.

### `ThemeSystemLifecycleHooks`

Lifecycle hooks for theme system plugins.

```typescript
interface ThemeSystemLifecycleHooks {
  onInit?: (engine: ThemeEngine) => Promise<void> | void;
  onThemeChange?: (theme: string, prevTheme: string) => Promise<void> | void;
  onStyleChange?: (style: string, prevStyle: string) => Promise<void> | void;
  onBeforeSSR?: () => Promise<void> | void;
}
```

**Usage**: Hooks that plugins can utilize to respond to theme system events.

## Issues and Improvements

### 1. Rigid Color Token Structure

**Issue**: The `Theme.tokens.colors` interface is too rigid, leading to errors when trying to add custom color tokens like 'accent'.

**Improvement**:

```typescript
interface ColorTokens {
  // Required tokens
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;

  // Allow additional custom tokens
  [key: string]: string;
}
```

### 2. Plugin System Transition

**Issue**: Having both `ThemePlugin` and `ThemeSystemPlugin` can cause confusion.

**Improvement**: Deprecate `ThemePlugin` and update documentation to guide users toward the new function-based `ThemeSystemPlugin`.

### 3. Type Inconsistencies

**Issue**: Some types reference each other in inconsistent ways or have redundant properties.

**Improvement**: Standardize cross-references between types and remove redundant properties.

### 4. Plugin Configuration Options

**Issue**: No standard way to type plugin configuration options.

**Improvement**: Add a generic type for plugin options:

```typescript
export interface PluginCreator<Options = any> {
  (options?: Options): ThemeSystemPlugin;
}
```

### 5. Theme Extension Structure

**Issue**: The `theme?` property in `ThemeExtension` references `Theme["tokens"]` directly, which ties extensions to the rigid token structure.

**Improvement**: Make the token structure in extensions more flexible:

```typescript
theme?: {
  tokens?: Partial<Theme["tokens"]> & Record<string, any>;
  components?: Record<string, any>;
};
```

## Recommended Changes for Plugin System

To better align with the PayloadCMS-style plugin system, we should:

1. Update the `Theme.tokens.colors` interface to allow additional properties using index signatures.
2. Create a helper type for creating plugins with options.
3. Enhance the lifecycle hooks to better integrate with the plugin system.
4. Standardize the relationship between plugins and extensions.
5. Add validation types to ensure type safety during configuration building.

## Migration Path

1. Update the Theme interface to allow for more flexible token structures
2. Document the transition from object-based extensions to function-based plugins
3. Deprecate the old plugin system in favor of the new function-based approach
4. Provide examples of how to migrate existing themes and extensions to the new system
