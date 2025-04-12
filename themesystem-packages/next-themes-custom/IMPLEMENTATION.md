# Next-Themes Custom Implementation Plan

## Overview

This document outlines the plan to fork and customize next-themes to create a more powerful theme system that maintains all existing next-themes functionality while adding our custom features.

## Package Structure Decision

After analysis, we recommend keeping this as a separate package (`@themesystem/next-themes-custom`) rather than merging into theme-core for several reasons:

1. **Clear Separation of Concerns**

   - theme-core: Core theme engine and utilities
   - next-themes-custom: Next.js-specific theme provider with enhanced capabilities

2. **Migration Path**

   - Users can gradually migrate from next-themes to our custom version
   - Maintains familiar API while adding new features

3. **Dependency Management**
   - Keeps theme-core focused on core functionality
   - Allows independent versioning and updates

## Implementation Steps

### 1. Initial Setup

1. Clone next-themes repository into `/themesystem-packages/next-themes-custom`
2. Update package.json:
   - Change name to `@themesystem/next-themes-custom`
   - Update dependencies to use our workspace packages
   - Add necessary peer dependencies

### 2. Configuration System

#### A. Config File Structure

```typescript
// themesystem.config.ts
import { ThemeConfig } from "@themesystem/next-themes-custom";

const config: ThemeConfig = {
  // Base theme configuration (defaults to next-themes behavior)
  base: {
    target: "html", // defaults to 'html' if not specified
    attribute: "data-theme",
    defaultTheme: "system",
    enableSystem: true,
    enableColorScheme: true,
    storageKey: "theme",
    themes: ["light", "dark", "system"],
  },

  // Optional extensions for advanced theming
  extensions: [
    {
      id: "header",
      target: "[data-theme-header]",
      themes: ["light", "dark", "glass"],
      defaultTheme: "light",
      storageKey: "header-theme",
      inheritFrom: "base", // or 'parent' or specific extension ID
    },
    {
      id: "sidebar",
      target: "[data-theme-sidebar]",
      themes: ["light", "dark", "brutalist"],
      inheritFrom: "base",
    },
  ],

  // Optional theme value mapping
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

#### B. Config Resolution Logic

1. Check for `themesystem.config.ts` in project root
2. If config exists, use it as base configuration
3. Override config values with any props passed to ThemeProvider
4. Default to next-themes behavior if no config or props provided

### 3. Core Modifications

#### A. ThemeProvider Component

```typescript
interface ThemeProviderProps {
  // Existing next-themes props (optional if config file exists)
  attribute?: string | string[];
  defaultTheme?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  themes?: string[];
  value?: ValueObject;
  nonce?: string;

  // New props (optional if config file exists)
  extensions?: ThemeExtension[];
  target?: string | HTMLElement;
  onThemeChange?: (theme: string, target: HTMLElement) => void;

  // Config file override
  config?: ThemeConfig;
}

interface ThemeExtension {
  id: string;
  target: string;
  themes: string[];
  defaultTheme?: string;
  storageKey?: string;
  inheritFrom?: string;
}
```

### 4. Migration Paths

#### A. Direct Replacement (Zero Config)

```typescript
// Before
import { ThemeProvider } from 'next-themes'

// After (no changes needed)
import { ThemeProvider } from '@themesystem/next-themes-custom'

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

### 5. Implementation Details

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

### 6. Testing Strategy

1. **Unit Tests**

   - Test config loading and resolution
   - Test prop vs config precedence
   - Test default behavior matches next-themes

2. **Integration Tests**

   - Test with Next.js
   - Verify SSR behavior
   - Test config file loading

3. **Migration Tests**
   - Verify existing next-themes code works
   - Test gradual migration path

### 7. Documentation

1. **API Documentation**

   - Document config file structure
   - Document prop vs config precedence
   - Include migration guide

2. **Examples**
   - Basic usage (direct replacement)
   - Config file usage
   - Advanced scenarios

## Timeline

1. **Week 1**: Initial setup and config system
2. **Week 2**: Core modifications and testing
3. **Week 3**: Documentation and examples
4. **Week 4**: Review and refinement

## Dependencies

- Next.js
- React
- TypeScript
- Our theme-core package

## Notes

- Maintain 100% backward compatibility with next-themes
- Config file should be optional
- Props should always override config values
- Default to next-themes behavior when no config or props provided
- Ensure proper TypeScript support
- Consider performance implications of multiple targets
- Document all breaking changes
- Provide clear migration path for existing users
