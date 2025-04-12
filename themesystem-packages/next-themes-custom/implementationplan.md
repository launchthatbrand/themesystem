# Next-Themes Integration into Theme-Core Implementation Plan

## Overview

This document outlines the plan to integrate next-themes functionality directly into theme-core, creating a unified theme system that maintains all existing next-themes capabilities while adding our custom features.

## Package Structure Decision

After analysis, we recommend integrating next-themes functionality directly into theme-core for several reasons:

1. **Unified Theme System**

   - Single source of truth for theme management
   - Reduced complexity by eliminating separate package
   - Better integration between core and Next.js functionality
   - Simplified dependency management

2. **Enhanced Core Capabilities**

   - theme-core becomes the central theme management system
   - Next.js-specific functionality becomes an adapter layer
   - All theme-related features are available through a single package

3. **Simplified Maintenance**
   - Single package to maintain and version
   - Consistent API surface
   - Easier dependency management
   - Unified documentation

## Implementation Steps

### 1. Core Integration

#### A. ThemeProvider Component Updates

```typescript
// theme-core/src/theme-provider.tsx
interface ThemeProviderProps {
  // Existing theme-core props
  children: React.ReactNode;
  options?: ThemeEngineOptions;
  defaultTheme?: BaseTheme;
  attribute?: "class" | "data-theme";
  enableSystem?: boolean;
  storageKey?: string;

  // Integrated next-themes functionality
  config?: ThemeConfig;
  extensions?: ThemeExtension[];
  target?: string | HTMLElement;
  onThemeChange?: (theme: string, target: HTMLElement) => void;
}

interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: BaseTheme) => void;
  setStyle: (style: string) => void;
  setExtensionTheme: (extensionId: string, theme: string) => void;
  getExtensionTheme: (extensionId: string) => string;
}
```

#### B. Theme Engine Updates

```typescript
// theme-core/src/theme-engine.ts
class ThemeEngineImpl {
  // Existing functionality
  private state: ThemeState;
  private subscribers: Set<ThemeStateListener>;

  // New functionality
  private config?: ThemeConfig;
  private extensions: Map<string, ThemeExtension>;
  private extensionThemes: Map<string, string>;

  loadConfig(config: ThemeConfig): void {
    this.config = config;
    this.setupExtensions(config.extensions || []);
  }

  setupExtensions(extensions: ThemeExtension[]): void {
    extensions.forEach((ext) => {
      this.extensions.set(ext.id, ext);
      this.extensionThemes.set(ext.id, ext.defaultTheme || "light");
    });
  }

  setExtensionTheme(extensionId: string, theme: string): void {
    if (this.extensions.has(extensionId)) {
      this.extensionThemes.set(extensionId, theme);
      this.notifySubscribers();
    }
  }

  getExtensionTheme(extensionId: string): string {
    return this.extensionThemes.get(extensionId) || "light";
  }
}
```

### 2. Configuration System

#### A. Config File Structure

```typescript
// themesystem.config.ts
import { ThemeConfig } from "@themesystem/core";

const config: ThemeConfig = {
  // Base theme configuration
  base: {
    target: "html",
    attribute: "data-theme",
    defaultTheme: "system",
    enableSystem: true,
    enableColorScheme: true,
    storageKey: "theme",
    themes: ["light", "dark", "system"],
  },

  // Theme extensions
  extensions: [
    {
      id: "header",
      target: "[data-theme-header]",
      themes: ["light", "dark", "glass"],
      defaultTheme: "light",
      storageKey: "header-theme",
      inheritFrom: "base",
    },
    {
      id: "sidebar",
      target: "[data-theme-sidebar]",
      themes: ["light", "dark", "brutalist"],
      inheritFrom: "base",
    },
  ],

  // Theme value mapping
  value: {
    light: {
      "--background": "#ffffff",
      "--foreground": "#000000",
    },
    dark: {
      "--background": "#000000",
      "--foreground": "#ffffff",
    },
  },
};

export default config;
```

### 3. Migration Paths

#### A. Direct Replacement (Zero Config)

```typescript
// Before
import { ThemeProvider } from 'next-themes'

// After
import { ThemeProvider } from '@themesystem/core'

// Usage remains exactly the same
<ThemeProvider>
  <App />
</ThemeProvider>
```

#### B. Basic Configuration

```typescript
// Option 1: Through props
<ThemeProvider
  target="[data-theme-container]"
  themes={['light', 'dark', 'glass']}
>
  <App />
</ThemeProvider>

// Option 2: Through config file
// themesystem.config.ts
export default {
  base: {
    target: '[data-theme-container]',
    themes: ['light', 'dark', 'glass']
  }
}
```

#### C. Advanced Configuration

```typescript
// themesystem.config.ts
export default {
  base: {
    target: '[data-theme-container]',
    themes: ['light', 'dark', 'glass']
  },
  extensions: [
    {
      id: 'header',
      target: '[data-theme-header]',
      themes: ['light', 'dark', 'glass']
    }
  ]
}

// App.tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### 4. Implementation Details

#### A. Config Loading

1. Use Next.js's built-in config loading
2. Support both `.ts` and `.js` config files
3. Cache config to avoid repeated file system access

#### B. Theme Resolution

1. Base theme always defaults to 'html' if no target specified
2. Extension themes inherit from base unless specified otherwise
3. Props always override config values

#### C. DOM Updates

1. Support multiple targets simultaneously
2. Handle theme inheritance properly
3. Maintain SSR compatibility

### 5. Testing Strategy

1. **Unit Tests**

   - Test config loading and resolution
   - Test prop vs config precedence
   - Test extension theme management
   - Test theme inheritance

2. **Integration Tests**

   - Test with Next.js
   - Verify SSR behavior
   - Test config file loading
   - Test multiple targets

3. **Migration Tests**
   - Verify existing next-themes code works
   - Test gradual migration path
   - Test backward compatibility

### 6. Documentation

1. **API Documentation**

   - Document config file structure
   - Document prop vs config precedence
   - Document extension system
   - Include migration guide

2. **Examples**
   - Basic usage (direct replacement)
   - Config file usage
   - Extension usage
   - Advanced scenarios

## Timeline

1. **Week 1**: Core integration and basic functionality
2. **Week 2**: Extension system and config loading
3. **Week 3**: Testing and documentation
4. **Week 4**: Review and refinement

## Dependencies

- Next.js
- React
- TypeScript

## Notes

- Maintain backward compatibility with next-themes
- Config file should be optional
- Props should always override config values
- Default to next-themes behavior when no config or props provided
- Ensure proper TypeScript support
- Consider performance implications of multiple targets
- Document all breaking changes
- Provide clear migration path for existing users
