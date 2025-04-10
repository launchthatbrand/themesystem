# Theme Development Cheat Sheet

## Quick Start

```bash
# Copy the template
cp -r packages/theme-template packages/theme-mytheme

# Rename core files
cd packages/theme-mytheme
mv src/template.css src/mytheme.css

# Edit core files
# 1. package.json - Update name, description, and build scripts
# 2. src/index.ts - Update theme ID, name, and description
# 3. src/mytheme.css - Update CSS class and variables
# 4. src/assets/preview.svg - Update colors

# Build theme
pnpm build

# Generate theme preview
pnpm generate-png-preview:mytheme
```

## CSS Class Structure

```css
/* Base theme class */
.theme-mytheme {
  /* Theme-specific variables */
  --mytheme-background: rgba(250, 250, 255, 0.9);
  --mytheme-border: 1px solid rgba(200, 200, 255, 0.3);

  /* System UI variables */
  --card: 215 20% 97%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 210 100% 50%;
  /* ... more system variables */
}

/* Component overrides */
.theme-mytheme [class*="bg-card"] {
  background: var(--mytheme-background);
  /* ... other styles */
}

/* Dark mode variant */
.dark.theme-mytheme {
  --mytheme-background: rgba(25, 25, 35, 0.8);
  --card: 222.2 84% 4.9%;
  /* ... more dark mode overrides */
}
```

## Required CSS Variables

| Variable                   | Purpose                      |
| -------------------------- | ---------------------------- |
| `--background`             | Page background              |
| `--foreground`             | Main text color              |
| `--card`                   | Card background              |
| `--card-foreground`        | Card text color              |
| `--popover`                | Popover background           |
| `--popover-foreground`     | Popover text                 |
| `--primary`                | Primary action color         |
| `--primary-foreground`     | Text on primary elements     |
| `--secondary`              | Secondary UI elements        |
| `--secondary-foreground`   | Text on secondary elements   |
| `--muted`                  | Muted background             |
| `--muted-foreground`       | Muted text color             |
| `--accent`                 | Accent elements              |
| `--accent-foreground`      | Text on accent elements      |
| `--destructive`            | Error/delete actions         |
| `--destructive-foreground` | Text on destructive elements |
| `--border`                 | Border color                 |
| `--input`                  | Input field background       |
| `--ring`                   | Focus ring color             |
| `--radius`                 | Border radius                |

## Theme Definition

```typescript
import type { ThemeDefinition } from "@acme/theme-system";

// Import preview image
import previewUrl from "./assets/preview.png";

const myTheme: ThemeDefinition = {
  id: "mytheme", // Must match CSS class name
  name: "My Theme", // Display name
  description: "Description...", // Short description
  preview: {
    strategy: "static", // Preview strategy
    asset: previewUrl, // Preview image path
  },
  variables: {
    // Key CSS variables
    "--mytheme-background": "rgba(250, 250, 255, 0.9)",
    "--mytheme-border": "1px solid rgba(200, 200, 255, 0.3)",
    // Add your key variables here
  },
};

export default myTheme;
```

## Preview Generation

```bash
# Using SVG-to-PNG conversion
pnpm generate-png-preview:mytheme

# Using component preview page
# 1. Start dev server
pnpm dev

# 2. Visit URL
# http://localhost:3000/theme-preview?theme=mytheme
```

## Integration

```typescript
// In src/config/theme.config.ts
import myTheme from "@acme/theme-mytheme";

export const themeConfig = {
  themes: [
    // Existing themes
    myTheme, // Your theme
  ],
  // ... other config
};
```

```css
/* In src/styles/index.css */
@import "@acme/theme-mytheme/dist/css/mytheme.css";
```

## Testing Your Theme

```bash
# Start the app
pnpm dev

# Visit the themes page
# http://localhost:3000/themes
```

## Common Tasks

| Task             | Command                                                |
| ---------------- | ------------------------------------------------------ |
| Create new theme | `cp -r packages/theme-template packages/theme-mytheme` |
| Build theme      | `cd packages/theme-mytheme && pnpm build`              |
| Generate preview | `pnpm generate-png-preview:mytheme`                    |
| Test theme       | `pnpm dev` then visit `/themes`                        |
| Publish theme    | `npm publish`                                          |

## Color Format Reference

System variables use HSL format: `H S% L%`

Examples:

- Blue: `210 100% 50%`
- Red: `0 100% 50%`
- Green: `120 100% 50%`
- Gray: `0 0% 50%`
- White: `0 0% 100%`
- Black: `0 0% 0%`

## Debug Tips

1. Enable debug mode in provider:

   ```tsx
   <ThemeProvider config={{ debug: true }}>
   ```

2. Add CSS debugging outline:

   ```css
   .theme-mytheme * {
     outline: 1px solid rgba(255, 0, 0, 0.1);
   }
   ```

3. Console log theme class application:
   ```typescript
   console.log("Applied theme:", document.documentElement.classList);
   ```
