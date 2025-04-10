# Migration Guide: Local Implementation to @acme/theme-system Package

This guide helps you migrate from the local ThemeProvider to the `@acme/theme-system` package.

## Step 1: Install the Package

```bash
cd apps/themesystem/packages/theme-system
pnpm build

# Update your app's package.json
# "dependencies": {
#   "@acme/theme-system": "workspace:*"
# }
```

## Step 2: Update Imports

```diff
- import { ThemeProvider, useTheme } from "~/providers/ThemeProvider";
+ import { ThemeProvider, useTheme } from "@acme/theme-system";
```

## Step 3: Update ThemeProvider Config

```tsx
// In your layout or providers file
import type { ThemeDefinition } from "@acme/theme-system";
import { ThemeProvider } from "@acme/theme-system";

const themes: ThemeDefinition[] = [
  {
    id: "glass",
    name: "Glass",
    description: "Clean, minimal interface",
    preview: "/themes/glass-preview.png",
    variables: {
      "--glass-background": "rgba(255, 255, 255, 0.8)",
      "--glass-blur": "8px",
    },
  },
  // Other themes...
];

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          config={{
            themes, // Note: themes array instead of themeLibrary
            defaultTheme: "system",
            defaultStyle: "glass",
            permissions: {
              baseTheme: "user",
              themeLibrary: "user",
              extensions: "user",
            },
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Step 4: Import Theme CSS Files

```tsx
// In your global CSS file
import "@acme/ui/styles/themes/index.css";

// Or in your layout
<head>
  <link rel="stylesheet" href="/styles/themes/index.css" />
</head>;
```

## Step 5: Replace Theme UI Components

```diff
- import { ThemeStyleToggle } from "~/components/ThemeStyleToggle";
+ import { ThemeSelector } from "@acme/theme-system";

// In your component:
- <ThemeStyleToggle />
+ <ThemeSelector showDescriptions={true} showPreviews={true} />
```

## Key API Differences

1. The `useTheme` hook provides similar functionality with some additions:

```tsx
const {
  themeStyle,
  setThemeStyle,
  baseTheme,
  setBaseTheme,
  isDarkMode,
  availableThemes, // New! Array of all available themes
  debugMode,
  setDebugMode,
  logThemeState,
} = useTheme();
```

2. The package includes two main components not in local implementation:

   - `ThemeSelector`: UI for selecting themes
   - `ThemePreview`: Visual preview of a theme

3. Configuration differences:
   - `themes` instead of `themeLibrary`
   - More explicit type structure with `ThemeDefinition`

## Debugging Tips

- Enable debug mode: `<ThemeProvider initialDebugMode={true}>`
- Use `logThemeState()` to print current theme state
- Check console for `[ThemeSystem]` prefixed logs

## Example Migration

### Before (Local)

```tsx
// app/layout.tsx
import themeConfig from "~/config/theme.config";
import { ThemeProvider } from "~/providers/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider config={themeConfig}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### After (Package)

```tsx
// app/layout.tsx
import type { ThemeDefinition } from "@acme/theme-system";
import { ThemeProvider } from "@acme/theme-system";

const themes: ThemeDefinition[] = [
  {
    id: "glass",
    name: "Glass",
    description: "Clean, minimal interface",
    preview: "/themes/glass-preview.png",
    variables: {
      "--glass-background": "rgba(255, 255, 255, 0.8)",
    },
  },
  // Other themes...
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/styles/themes/index.css" />
      </head>
      <body>
        <ThemeProvider
          config={{
            themes,
            defaultTheme: "system",
            defaultStyle: "glass",
            permissions: {
              baseTheme: "user",
              themeLibrary: "user",
              extensions: "user",
            },
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```
