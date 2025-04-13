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

### 2. Core Modifications

#### A. ThemeProvider Component

```typescript
interface ThemeProviderProps {
  // Existing next-themes props
  attribute?: string | string[];
  defaultTheme?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  themes?: string[];
  value?: ValueObject;
  nonce?: string;

  // New props
  extensions?: ThemeExtension[];
  target?: string | HTMLElement;
  onThemeChange?: (theme: string, target: HTMLElement) => void;
}

interface ThemeExtension {
  id: string;
  target: string;
  themes: string[];
  defaultTheme?: string;
  storageKey?: string;
}
```

#### B. Theme State Management

1. Extend the theme state to handle multiple targets
2. Add extension state tracking
3. Implement theme inheritance and cascading

#### C. DOM Update Logic

1. Modify script.ts to support multiple targets
2. Add extension-specific DOM updates
3. Implement proper cleanup for all targets

### 3. New Features Implementation

#### A. Target-Based Theming

```typescript
// Example usage
<ThemeProvider
  target="[data-theme-container]"
  extensions={[
    {
      id: 'header',
      target: '[data-theme-header]',
      themes: ['light', 'dark', 'glass']
    },
    {
      id: 'sidebar',
      target: '[data-theme-sidebar]',
      themes: ['light', 'dark', 'brutalist']
    }
  ]}
>
```

#### B. Theme Inheritance

```typescript
// Example configuration
{
  baseTheme: 'light',
  extensions: [
    {
      id: 'component',
      target: '[data-theme-component]',
      themes: ['glass', 'brutalist'],
      inheritFrom: 'parent' // or 'root' or specific extension ID
    }
  ]
}
```

#### C. Theme Events

```typescript
// New event system
const { theme, setTheme, onThemeChange } = useTheme();

onThemeChange((newTheme, target) => {
  // Handle theme changes for specific targets
});
```

### 4. Migration Guide

#### From next-themes

```typescript
// Before
import { ThemeProvider } from "next-themes";

// After
import { ThemeProvider } from "@themesystem/next-themes-custom";
```

#### New Features

```typescript
// Example of new features
<ThemeProvider
  target="[data-theme-container]"
  extensions={[
    {
      id: 'header',
      target: '[data-theme-header]',
      themes: ['light', 'dark', 'glass']
    }
  ]}
  onThemeChange={(theme, target) => {
    console.log(`Theme changed to ${theme} on ${target}`)
  }}
>
  <App />
</ThemeProvider>
```

### 5. Testing Strategy

1. **Unit Tests**

   - Test all new features
   - Ensure backward compatibility
   - Verify theme inheritance

2. **Integration Tests**

   - Test with Next.js
   - Verify SSR behavior
   - Check extension functionality

3. **Migration Tests**
   - Verify existing next-themes code works
   - Test gradual migration path

### 6. Documentation

1. **API Documentation**

   - Document all new props and features
   - Provide usage examples
   - Include migration guide

2. **Examples**
   - Basic usage
   - Extension usage
   - Advanced scenarios

## Timeline

1. **Week 1**: Initial setup and core modifications
2. **Week 2**: New features implementation
3. **Week 3**: Testing and documentation
4. **Week 4**: Review and refinement

## Dependencies

- Next.js
- React
- TypeScript
- Our theme-core package

## Notes

- Maintain backward compatibility with next-themes
- Ensure proper TypeScript support
- Consider performance implications of multiple targets
- Document all breaking changes
- Provide clear migration path for existing users
