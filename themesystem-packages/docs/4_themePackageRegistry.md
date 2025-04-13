# Theme Package Registry and CSS Application Process

## Theme Registration Process

Themes in the ThemeSystem are registered through a centralized registry pattern. Here's how themes like `theme-glass` are registered and made available throughout the application:

### 1. Theme Registry Architecture

The core of theme registration is the `ThemeRegistry` class in `@themesystem/core`:

```typescript
export class ThemeRegistry {
  private static instance: ThemeRegistry;
  private themes: Map<string, Theme> = new Map();

  // Singleton pattern implementation
  static getInstance(): ThemeRegistry {
    if (!ThemeRegistry.instance) {
      ThemeRegistry.instance = new ThemeRegistry();
    }
    return ThemeRegistry.instance;
  }

  registerTheme(theme: Theme) {
    this.themes.set(theme.id, theme);
  }

  getTheme(id: string): Theme | undefined {
    return this.themes.get(id);
  }

  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }
}
```

This singleton pattern ensures a single, consistent registry is accessible throughout the application.

### 2. Registration of Theme Packages

Themes are registered in `@themesystem/core/src/register-themes.ts`. This module imports theme definitions from individual theme packages and registers them with the registry:

```typescript
import { glassTheme } from "@themesystem/glass";

import { ThemeRegistry } from "./theme-registry";

const registry = ThemeRegistry.getInstance();

// Register themes
registry.registerTheme(glassTheme);

// Log available themes
console.log(
  "ThemeSystem: Available themes:",
  registry.getAllThemes().map((theme) => ({
    id: theme.id,
    name: theme.name,
  })),
);
```

### 3. Theme Definition Structure

Each theme package, like `@themesystem/glass`, exports a theme definition that conforms to the `Theme` interface. For example, in `theme-glass/src/index.ts`:

```typescript
export const glassTheme: Theme = {
  id: "glass",
  name: "Glass Theme",
  description: "A modern glass theme with blur effects",
  cssPath: "./glass.css",  // Path to CSS file
  tokens: {
    colors: { ... },
    effects: { ... },
    typography: { ... }
  },
  // ...
};
```

The key property for CSS application is `cssPath`, which points to the CSS file containing theme styles.

## CSS Application Mechanism

The ThemeSystem applies CSS in multiple ways:

### 1. CSS Variable Declaration

Themes like Glass define CSS variables in their CSS files. For example, in `theme-glass/src/glass.css`:

```css
:root {
  /* Color Tokens */
  --glass-background: rgba(255, 255, 255, 0.8);
  --glass-foreground: rgb(31, 41, 55);
  /* ... other variables ... */
}

/* Dark Mode Overrides */
[data-theme-base="dark"] {
  --glass-background: rgba(31, 41, 55, 0.8);
  /* ... dark mode variables ... */
}
```

### 2. CSS Selectors for Theme Application

The CSS file uses data attribute selectors to apply styles when a theme is active:

```css
/* Glass Theme Styles */
[data-theme="glass"] {
  background: var(--glass-background);
  color: var(--glass-foreground);
  font-family: var(--glass-font-body);
}

[data-theme="glass"] .glass {
  background: var(--glass-background);
  backdrop-filter: blur(var(--glass-blur));
  /* ... other properties ... */
}
```

### 3. Dynamic Stylesheet Loading

The critical mechanism for loading theme CSS is in the `ThemeEngine` class, which manages stylesheets:

```typescript
registerStylesheet(themeId: string, href: string): void {
  // Handle both relative and absolute paths
  const fullHref = href.startsWith("./") ? href.slice(2) : href;
  this.stylesheets.set(themeId, { id: themeId, href: fullHref });
  this.notifySubscribers();
}

getStylesheets(): ThemeStylesheet[] {
  const sheets: ThemeStylesheet[] = [];

  // Include the current style's stylesheet if it exists
  const currentStyleSheet = this.stylesheets.get(this.state.style);
  if (currentStyleSheet) {
    sheets.push(currentStyleSheet);
  }

  return sheets;
}
```

The `ThemeProvider` component in the application then conditionally renders `<link>` elements based on these stylesheets:

```tsx
// In ThemeProvider
const activeStylesheets = useMemo(() => {
  return engine.getStylesheets();
}, [engine, state.style]);

// Later in the render function
{
  activeStylesheets.map((sheet) => (
    <ThemeStylesheet key={sheet.id} href={sheet.href} />
  ));
}
```

## ThemeSelector Integration with Registry

The `ThemeSelector` component integrates with the registry to display available themes:

```typescript
export function ThemeSelector(
  {
    /* props */
  },
) {
  // Get the current style from the theme provider
  const { style: currentStyle, setStyle } = useTheme();
  const themeRegistry = ThemeRegistry.getInstance();

  // Get all available themes from registry
  const availableThemes = useMemo(() => {
    return themeRegistry.getAllThemes();
  }, []);

  // Filter themes based on provided IDs (if any)
  const displayThemes = useMemo(() => {
    return themeIds
      ? availableThemes.filter((theme) => themeIds.includes(theme.id))
      : availableThemes;
  }, [themeIds, availableThemes]);

  // Add default theme option if enabled
  const allThemes = useMemo(() => {
    return [
      ...(showDefaultOption
        ? [
            {
              id: "default",
              name: "Default Theme",
              description:
                "Use the base theme styles without additional styling",
            } as Theme,
          ]
        : []),
      ...displayThemes,
    ];
  }, [showDefaultOption, displayThemes]);

  // Handle theme selection
  const handleThemeChange = React.useCallback(
    (themeId: string | null) => {
      const styleValue = !themeId || themeId === "" ? "default" : themeId;
      setStyle(styleValue);
      onThemeSelected?.(themeId);
    },
    [setStyle, onThemeSelected],
  );

  // Render theme options
  // ...
}
```

## Current Issues and Troubleshooting

Based on the described behavior (data attributes changing but styles not being applied), here are potential issues and solutions:

### Potential Issues

1. **CSS Loading Issue**: The stylesheet for the Glass theme may not be properly loaded. When examining the `ThemeEngine.registerStylesheet` and `getStylesheets` methods, there's a potential issue with how stylesheet paths are resolved.

2. **Path Resolution**: The `cssPath` in the theme definition is specified as `"./glass.css"`, but the relative path may not be resolving correctly in the final build.

3. **Stylesheet Integration**: The `ThemeStylesheet` component may not be properly rendering the `<link>` element, or there might be issues with the component's props.

4. **CSS Selector Specificity**: The selectors in the Glass theme CSS file (`[data-theme="glass"]`) may be too generic or not specific enough to override default styles.

5. **Build/Bundling Configuration**: The CSS files might not be correctly included in the build process, especially if they're not explicitly imported.

### Potential Solutions

1. **Check for CSS Loading**: Add logging to confirm that the CSS files are being correctly identified and loaded by the `ThemeEngine`.

2. **Inspect Network Requests**: Use browser devtools to check if the CSS file is being requested and loaded correctly.

3. **Use Absolute Paths**: Consider configuring the theme to use absolute paths for CSS files instead of relative paths.

4. **Verify CSS Application**: Add specific, high-specificity test styles to confirm CSS is being applied:

   ```css
   [data-theme="glass"] .card {
     border: 5px solid red !important;
   }
   ```

5. **Import CSS Directly**: Instead of relying on dynamic loading, consider importing the CSS directly in the main application bundle:

   ```tsx
   // In your main layout or theme provider
   import "@themesystem/glass/src/glass.css";
   ```

6. **Manual Stylesheet Verification**: Add a direct `<link>` element to verify the CSS works when manually included:

   ```html
   <link rel="stylesheet" href="/path/to/glass.css" />
   ```

7. **Console Debug Logging**: Add more console logging in key areas of the theme loading process to identify where the process is breaking down.

8. **Bundle Analysis**: Run a bundle analyzer to ensure the CSS files are actually included in the build output.

The most likely issue is that the CSS file paths aren't being correctly resolved, or the stylesheets aren't being correctly loaded at runtime. By addressing the path resolution and stylesheet loading mechanism, the theme styles should begin to appear correctly.
