# ThemeSystem v2 Guidelines

## Core Architecture

ThemeSystem v2 should be rebuilt with a focus on modularity, extensibility, and framework agnosticism while maintaining the powerful features of v1. Below are comprehensive guidelines for the v2 implementation.

## Architectural Principles

1. **Module-Based Architecture**

   - Core engine separate from UI components
   - Framework adapters as separate modules
   - Extension system as a standalone module
   - Middleware pattern for extensible theme processing

2. **Framework Agnosticism**

   - Remove Next.js-specific dependencies from core
   - Provide adapters for various frameworks (Next.js, Remix, Vite, etc.)
   - Server components should be framework-specific imports

3. **Enhanced TypeScript Support**

   - Full TypeScript interfaces for all APIs
   - Generic theme types with constraints
   - Utility types for theme manipulation
   - Type-safe theme extension registration

4. **Plugin System**
   - Formalized plugin registration API
   - Plugin lifecycle hooks (init, update, destroy)
   - Plugin composition and dependency management
   - Plugin-specific storage and state management

## Package Structure

```
@themesystem/core         # Core state management, no UI components
@themesystem/react        # React-specific hooks and components
@themesystem/nextjs       # Next.js adapter with SSR support
@themesystem/ui           # UI components (ThemeSwitcher, etc.)
@themesystem/extensions   # Extension system with plugin support
@themesystem/utils        # Utility functions for theme manipulation
```

## Core Features Implementation

### Theme Engine

```typescript
// Example core theme manager implementation
export class ThemeEngine<T extends BaseThemeConfig> {
  private themeState: ThemeState<T>;
  private middleware: ThemeMiddleware<T>[] = [];

  constructor(config: ThemeEngineOptions<T>) {
    // Initialize theme state
  }

  // Register middleware for theme processing
  use(middleware: ThemeMiddleware<T>): void {
    this.middleware.push(middleware);
  }

  // Set theme with middleware processing
  async setTheme(theme: Partial<ThemeState<T>>): Promise<void> {
    let processedTheme = { ...theme };

    // Run through middleware pipeline
    for (const mw of this.middleware) {
      processedTheme = await mw.process(processedTheme, this.themeState);
    }

    this.updateThemeState(processedTheme);
  }

  // Add reactive state management methods
}
```

### Extension System

```typescript
// Example extension registry
export class ExtensionRegistry<E extends Record<string, unknown>> {
  private extensions: Map<keyof E, ExtensionConfig<E[keyof E]>> = new Map();

  // Register an extension
  register<K extends keyof E>(name: K, config: ExtensionConfig<E[K]>): void {
    this.extensions.set(name, config);
  }

  // Get extension data
  getExtension<K extends keyof E>(name: K): ExtensionConfig<E[K]> | undefined {
    return this.extensions.get(name) as ExtensionConfig<E[K]> | undefined;
  }

  // Register plugin that may add multiple extensions
  registerPlugin(plugin: ThemePlugin<E>): void {
    plugin.extensions.forEach((ext, name) => {
      this.register(name as keyof E, ext);
    });
  }
}
```

### Framework Adapters

```typescript
// Next.js adapter example
export function createNextAdapter(engineOptions: ThemeEngineOptions) {
  // Create theme engine instance
  const engine = new ThemeEngine(engineOptions);

  // Return Next.js specific components
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <NextThemeProvider engine={engine}>{children}</NextThemeProvider>
    ),
    ServerThemeScript: ({ engineOptions }: { engineOptions: ThemeEngineOptions }) => (
      <script
        dangerouslySetInnerHTML={{
          __html: generateThemeScript(engineOptions),
        }}
      />
    ),
    // Other Next.js specific exports
  };
}
```

## UI Components

UI components should be completely decoupled from the core logic:

```typescript
// Example UI component
export function ThemeSwitcher({
  position = 'bottom-right',
  showLabels = true,
}: ThemeSwitcherProps) {
  const { themes, currentTheme, setTheme } = useTheme();

  return (
    <div className={`theme-switcher position-${position}`}>
      {themes.map((theme) => (
        <ThemeButton
          key={theme.id}
          theme={theme}
          active={currentTheme === theme.id}
          onClick={() => setTheme(theme.id)}
          showLabel={showLabels}
        />
      ))}
    </div>
  );
}
```

## Persistence Layer

```typescript
// Storage strategies
export interface StorageStrategy {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

// Local storage implementation
export class LocalStorageStrategy implements StorageStrategy {
  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

// Cookie storage implementation for SSR
export class CookieStorageStrategy implements StorageStrategy {
  // Implementation details
}
```

## Plugin System

```typescript
export interface ThemePlugin<E extends Record<string, unknown>> {
  id: string;
  name: string;
  description: string;
  version: string;
  extensions: Map<string, ExtensionConfig<unknown>>;

  // Lifecycle hooks
  onInstall?(engine: ThemeEngine<any>): void | Promise<void>;
  onUninstall?(): void | Promise<void>;
  onThemeChange?(newTheme: string): void | Promise<void>;
}

// Plugin registration example
export function registerPlugin<E extends Record<string, unknown>>(
  engine: ThemeEngine<any>,
  plugin: ThemePlugin<E>,
): void {
  // Register plugin with the engine
  engine.plugins.add(plugin);

  // Initialize plugin
  if (plugin.onInstall) {
    plugin.onInstall(engine);
  }

  // Register plugin extensions
  plugin.extensions.forEach((config, name) => {
    engine.extensions.register(name, config);
  });
}
```

## Testing Infrastructure

```typescript
// Test utilities
export function createTestThemeEngine(initialTheme?: Partial<ThemeState>): ThemeEngine {
  return new ThemeEngine({
    themes: [
      { id: 'light', name: 'Light' },
      { id: 'dark', name: 'Dark' },
    ],
    defaultTheme: 'light',
    defaultStyle: 'default',
    ...initialTheme,
  });
}

// Component testing utilities
export function renderWithTheme(
  ui: React.ReactElement,
  engineOptions?: Partial<ThemeEngineOptions>
) {
  const engine = createTestThemeEngine(engineOptions);

  return render(
    <ThemeProvider engine={engine}>
      {ui}
    </ThemeProvider>
  );
}
```

## Documentation Strategy

1. **Core API Documentation**

   - Complete TypeScript interfaces with JSDoc comments
   - Method signatures with parameter and return type documentation
   - Configuration options documentation

2. **Tutorial and Guides**

   - Getting started guides for each framework
   - Step-by-step tutorials for common use cases
   - Advanced configuration examples

3. **Example Projects**

   - Minimal example for basic usage
   - Advanced example with custom extensions
   - Framework-specific examples

4. **Plugin Development Guide**
   - Plugin API documentation
   - Plugin development best practices
   - Plugin testing guidelines

## Migration Strategy

Provide a clear migration path from v1 to v2:

```typescript
// Migration utility
export function migrateFromV1(v1Config: V1ThemeConfig): ThemeEngineOptions {
  // Convert v1 config to v2 format
  return {
    themes: v1Config.themes.map(convertV1ThemeToV2),
    defaultTheme: v1Config.defaultTheme,
    defaultStyle: v1Config.defaultStyle,
    permissions: convertV1PermissionsToV2(v1Config.permissions),
  };
}

// Backward compatibility layer
export function createV1CompatLayer(engine: ThemeEngine): V1ThemeApi {
  // Return v1-compatible API using v2 engine
  return {
    useTheme: () => {
      const v2Theme = engine.useThemeState();

      // Map v2 theme state to v1 compatible API
      return {
        themeStyle: v2Theme.currentStyle,
        setThemeStyle: (style) => engine.setTheme({ currentStyle: style }),
        baseTheme: v2Theme.baseTheme,
        setBaseTheme: (theme) => engine.setTheme({ baseTheme: theme }),
        isDarkMode: v2Theme.isDarkMode,
        // Other v1 API methods
      };
    },
    // Other v1 compatible methods
  };
}
```

## Performance Considerations

1. **Memoization Strategies**

   - Memoize theme state selectors
   - Prevent unnecessary re-renders with React.memo
   - Use useMemo and useCallback for event handlers

2. **Code Splitting**

   - Make UI components lazy-loadable
   - Support tree-shaking for unused components
   - Separate core logic from UI components

3. **CSS Optimization**
   - Use CSS variables efficiently
   - Minimize theme switch flashing
   - Optimize CSS transitions for theme changes

## Implementation Roadmap

1. **Phase 1: Core Architecture**

   - Implement core theme engine
   - Build framework-agnostic APIs
   - Develop storage strategies

2. **Phase 2: Framework Adapters**

   - Implement React adapter
   - Build Next.js integration
   - Add support for other frameworks

3. **Phase 3: Plugin System**

   - Design and implement plugin API
   - Create example plugins
   - Build plugin marketplace infrastructure

4. **Phase 4: UI Components**

   - Rebuild UI components on top of core
   - Improve accessibility and responsiveness
   - Add new components based on user feedback

5. **Phase 5: Documentation and Examples**
   - Write comprehensive documentation
   - Create examples for different use cases
   - Publish migration guides

## Conclusion

ThemeSystem v2 should build upon the solid foundation of v1 while addressing its limitations through improved modularity, a robust plugin system, and enhanced developer experience. By following these guidelines, the new version will be more flexible, performant, and easier to use, while still providing the powerful theming capabilities that made v1 successful.
