# Theme System v2 Refactoring Guidelines

## Core Objectives

The v2 refactoring of the Theme System should focus on:

1. Complete framework agnosticism
2. A formalized plugin architecture
3. Improved modularity and tree-shaking
4. Enhanced developer experience
5. Better performance and smaller bundle size

## Recommended Improvements

### 1. Framework Separation

The current system has Next.js dependencies embedded in core components. For v2:

- **Create a Core Package**: Develop a framework-agnostic core (`@acme/theme-core`)

  - Remove all Next.js imports from core components
  - Create pure React implementations that don't depend on any framework
  - Use dependency injection for storage mechanisms instead of hardcoding cookies/localStorage

- **Create Framework Adapters**: Build separate packages for framework integration

  - `@acme/theme-nextjs` - Next.js specific integration
  - Consider other framework adapters (React Native, Vue, etc.)

- **Clean API Boundaries**:

  ```tsx
  // Example core provider
  import { ThemeCoreProvider } from '@acme/theme-core';

  // Example adapter usage
  import { NextThemeAdapter } from '@acme/theme-nextjs';

  function App({ children }) {
    return (
      <ThemeCoreProvider
        adapter={NextThemeAdapter}
        config={...}
      >
        {children}
      </ThemeCoreProvider>
    );
  }
  ```

### 2. Plugin Architecture Formalization

The current extension system works but could be more structured:

- **Plugin Registry System**:

  - Create a formal plugin registration API
  - Support lifecycle hooks for plugins (init, update, destroy)
  - Add versioning for plugins

- **Standardized Plugin Interface**:

  ```typescript
  interface ThemePlugin<T = any> {
    id: string;
    name: string;
    version: string;
    initialize: (context: ThemeContext) => void;
    getState: () => T;
    setState: (state: T) => void;
    cleanup?: () => void;
  }
  ```

- **Plugin Discovery**:

  - Implement a discovery mechanism for automatically finding and loading plugins
  - Support for async plugin loading

- **Plugin Communication**:
  - Event system for plugins to communicate with each other
  - Dependency management between plugins

### 3. Enhanced Modularity

The current system could be more modular for better tree-shaking:

- **Package Structure**:

  ```
  @acme/theme-system/
  ├── core/ (essential functionality only)
  ├── react/ (React-specific hooks and components)
  ├── ui/ (optional UI components)
  ├── plugins/ (optional plugins)
  └── adapters/ (framework adapters)
  ```

- **Separate UI from Logic**:

  - Core package should have zero UI components
  - UI components should be in a separate package that depends on core

- **Pure Utility Functions**:

  - Extract all utility functions into separate files
  - Ensure utilities are pure functions with no side effects

- **Tree-Shakable Exports**:

  ```typescript
  // Good
  export { ThemeProvider } from "./ThemeProvider";
  export { useTheme } from "./useTheme";

  // Instead of
  export * from "./components";
  ```

### 4. Theme Definition Improvements

The current theme definition could be more flexible:

- **Hierarchical Themes**:

  - Support for theme inheritance and composition
  - Base themes that can be extended

- **Theme Variants**:

  - Support for theme variants within a single theme
  - Ability to combine variants

- **Dynamic Theming**:

  - Support for runtime generation of themes
  - Tools for creating themes programmatically

- **CSS-in-JS Integration**:

  - Better support for CSS-in-JS libraries
  - Emotion, styled-components integration

- **Example Structure**:
  ```typescript
  interface ThemeDefinition {
    id: string;
    name: string;
    description?: string;
    extends?: string; // Parent theme ID
    variants?: Record<string, Partial<ThemeVariables>>;
    variables: ThemeVariables;
    presets?: Record<string, any>; // For predefined combinations
  }
  ```

### 5. Developer Experience

Improve the developer experience significantly:

- **Comprehensive TypeScript Support**:

  - Full type safety for themes and extensions
  - Type inference for theme variables

- **Theme Editor**:

  - Visual editor for creating and editing themes
  - Live preview of theme changes

- **Developer Tools**:

  - Browser extension for inspecting and modifying themes
  - Integration with React DevTools

- **Better Documentation**:
  - Interactive examples
  - Comprehensive API reference
  - Plugin development guide

### 6. Performance Optimizations

Optimize performance for both initial load and runtime:

- **Script Size Reduction**:

  - Minimize the size of injected scripts
  - Use faster selectors for theme application

- **CSS Variables Strategy**:

  - Optimize how CSS variables are applied
  - Consider using CSS Modules or compiled CSS for static parts

- **Caching Improvements**:

  - Better caching of theme resources
  - Optimistic updates for theme changes

- **Lazy Loading**:
  - Support for lazy loading theme resources
  - Only load what's needed when it's needed

### 7. Testing Infrastructure

Improve testing capabilities:

- **Testing Utilities**:

  - Provide testing utilities for theme plugins
  - Theme mocking for component tests

- **Visual Regression Testing**:
  - Tools for visual regression testing with different themes
  - Storybook integration

## Implementation Priorities

1. **Phase 1**: Core refactoring and framework separation
2. **Phase 2**: Plugin system formalization
3. **Phase 3**: Theme definition improvements
4. **Phase 4**: Developer tools and documentation
5. **Phase 5**: Performance optimizations and testing infrastructure

## Migration Strategy

To ease migration from v1 to v2:

- Provide a compatibility layer for v1 API
- Create migration scripts for converting v1 themes to v2
- Document breaking changes clearly
- Consider a gradual migration path where both can coexist
