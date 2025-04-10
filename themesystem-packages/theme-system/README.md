# ACME Theme System

A modern, streamlined theming system for Next.js applications with support for:

- Light/dark mode with system preference detection
- Multiple theme styles (default, rose, green, blue, etc.)
- Server-side rendering with cookie support
- Extension system for app-specific themes
- Zero theme flashing on initial load

## Installation

```bash
pnpm add @acme/theme-system
```

## Basic Usage

In your app's root layout:

```tsx
// app/layout.tsx
import { FloatingThemeSwitcher, ServerThemeProvider } from "@acme/theme-system";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServerThemeProvider
          defaultTheme="system" // 'light', 'dark', or 'system'
          defaultStyle="default" // Default theme style
        >
          <div>
            {children}
            <FloatingThemeSwitcher position="bottom-right" />
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
  const { theme, setTheme, themeStyle, setThemeStyle } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Theme style: {themeStyle}</p>

      <button onClick={() => setTheme("dark")}>Switch to Dark Mode</button>
      <button onClick={() => setThemeStyle("blue")}>
        Switch to Blue Theme
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

import { createThemeExtension, useThemeExtension } from "@acme/theme-system";

// Create and register an extension once (e.g., in a separate file)
createThemeExtension(
  "code-editor",
  "Code Editor Theme",
  {
    "--editor-background": "#1e1e1e",
    "--editor-foreground": "#d4d4d4",
    "--editor-line-highlight": "#2a2d2e",
  },
  "Theme settings for the code editor",
);

// Then use it in your components
function EditorTheme() {
  const { isActive, activate, deactivate, toggle, variables } =
    useThemeExtension("code-editor");

  return (
    <div>
      <label>
        <input type="checkbox" checked={isActive} onChange={toggle} />
        Enable Custom Editor Theme
      </label>

      {isActive && (
        <div
          style={{
            backgroundColor: variables["--editor-background"],
            color: variables["--editor-foreground"],
          }}
        >
          This area uses the custom editor theme
        </div>
      )}
    </div>
  );
}
```

## Theme Components

The package includes several components for changing themes:

- `FloatingThemeSwitcher` - A floating theme switcher UI
- `ThemeSelector` - A component to select from available theme styles
- `ThemeToggle` - A simple light/dark mode toggle
- `ThemePreview` - A component to preview themes

## Available Theme Styles

The default theme styles are:

- `default` - Clean, minimal interface with neutral tones
- `rose` - Soft pink accents with warm undertones
- `green` - Natural, earthy green palette
- `blue` - Cool blue tones for a calming experience
- `orange` - Energetic and warm orange accents
- `purple` - Rich purple hues for a creative feel
- `custom` - User-defined custom theme

## Server-Side Rendering

For server-side rendering, use the `ServerThemeProvider` component:

```tsx
// app/layout.tsx
import { ServerThemeProvider } from "@acme/theme-system";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServerThemeProvider>{children}</ServerThemeProvider>
      </body>
    </html>
  );
}
```

You can also access theme values in server components:

```tsx
// app/page.tsx
import { getServerTheme, getServerThemeStyle } from "@acme/theme-system";

export default function Page() {
  const theme = getServerTheme();
  const style = getServerThemeStyle();

  return (
    <div>
      <p>Server-side theme: {theme}</p>
      <p>Server-side style: {style}</p>
    </div>
  );
}
```

## Browser Storage

Theme preferences are stored in both cookies and localStorage, with cookies taking precedence to ensure server-side rendering works correctly.

## License

MIT
