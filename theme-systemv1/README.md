# ACME Theme System

A modern, unified theming system for Next.js applications with support for:

- Light/dark mode with system preference detection
- Multiple theme styles (brutalist, glass, etc.)
- Server-side rendering with cookie support
- Extension system for app-specific themes
- Zero theme flashing on initial load

## Core Architecture

The theme system has been simplified to use just two main components:

1. **UnifiedThemeProvider** - The core client component that manages all theme state
2. **ServerThemeProvider** - A server component wrapper for Next.js App Router

## Installation

```bash
pnpm add @acme/theme-system
```

## Basic Usage

In your app's root layout:

```tsx
// app/layout.tsx
import { ServerThemeProvider, ThemeSwitcher } from "@acme/theme-system";

// Define your themes
const themes = [
  {
    id: "glass",
    name: "Glass",
    description: "Clean, minimal glass-like interface",
    preview: "/previews/static/glass.png",
    variables: {
      "--glass-background": "rgba(255, 255, 255, 0.8)",
      // ... other CSS variables
    },
  },
  // ... other themes
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServerThemeProvider
          config={{
            themes,
            defaultTheme: "system", // 'light', 'dark', or 'system'
            defaultStyle: "glass", // default theme style
            permissions: {
              baseTheme: "user", // who can change the base theme
              themeLibrary: "user", // who can change the theme style
              extensions: "user", // who can use extensions
            },
          }}
          initialDebugMode={false}
        >
          <div>
            {children}
            <ThemeSwitcher position="bottom-right" />
          </div>
        </ServerThemeProvider>
      </body>
    </html>
  );
}
```

## Using in Components

To access theme values and functions in your components:

```tsx
"use client";

import { useTheme } from "@acme/theme-system";

export function MyComponent() {
  const { themeStyle, setThemeStyle, baseTheme, setBaseTheme, isDarkMode } =
    useTheme();

  return (
    <div>
      <p>Current theme: {themeStyle}</p>
      <p>Base theme: {baseTheme}</p>
      <p>Is dark mode: {isDarkMode ? "Yes" : "No"}</p>

      <button onClick={() => setBaseTheme("dark")}>Switch to Dark Mode</button>

      <button onClick={() => setThemeStyle("brutalist")}>
        Switch to Brutalist
      </button>
    </div>
  );
}
```

## Zero Theme Flashing

The theme system uses a script injector that applies theme classes before React hydration to prevent any theme flashing. This works by:

1. Injecting a script into the document head that runs synchronously
2. Reading theme preferences from cookies or localStorage
3. Applying the appropriate CSS classes to the document root element

## Extension System

For app-specific themes, you can use the extension system:

```tsx
"use client";

import { useThemeExtension } from "@acme/theme-system";

function EditorTheme() {
  const { currentTheme, setTheme } = useThemeExtension<string>("editor");

  return (
    <div>
      <select
        value={currentTheme || "default"}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="monokai">Monokai</option>
        <option value="github">GitHub</option>
      </select>
    </div>
  );
}
```

## Theme Style Components

The package includes several components for changing themes:

- `ThemeSwitcher` - A floating theme switcher UI
- `ThemeSelector` - A component to select from available themes
- `ThemeToggle` - A simple light/dark mode toggle
- `ThemeDrawer` - A drawer with theme selection UI
- `ThemeCarousel` - A carousel of theme previews

## Permissions System

The theme system includes a permissions system to control who can change themes:

- `baseTheme` - Controls who can change light/dark mode
- `themeLibrary` - Controls who can change theme styles
- `extensions` - Controls who can use extension themes

Permission levels:

- `"user"` - All users
- `"admin"` - Only admin users
- `"none"` - No one

## Debug Mode

You can enable debug mode to log theme changes to the console:

```tsx
const { setDebugMode, logThemeState } = useTheme();

// Enable debug mode
setDebugMode(true);

// Log current theme state
logThemeState();
```

## Browser Storage

Theme preferences are stored in both cookies and localStorage, with cookies taking precedence to ensure server-side rendering works correctly.

## License

MIT
