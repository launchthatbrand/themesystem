# Theme Integration Guide

This document provides detailed instructions on how to integrate your custom theme into the ACME Theme System.

## Theme Registration Process

### 1. Theme Package Setup

Ensure your theme package is properly structured:

```
theme-mytheme/
├── dist/
│   ├── css/
│   │   └── mytheme.css     # Compiled CSS
│   ├── index.d.ts          # TypeScript definitions
│   └── index.js            # Compiled JS
├── src/
│   ├── assets/
│   │   └── preview.svg     # Theme preview SVG
│   ├── mytheme.css         # Theme CSS file
│   └── index.ts            # Theme definition
├── package.json            # Package metadata
├── README.md               # Documentation
└── tsconfig.json           # TypeScript config
```

### 2. Update Theme Registry

Add your theme to the theme registry in the main application:

1. Install your theme package:

   ```bash
   pnpm add --workspace @acme/theme-mytheme
   ```

2. Import and register in `src/config/theme.config.ts`:

   ```typescript
   import brutalistTheme from "@acme/theme-brutalist";
   import glassTheme from "@acme/theme-glass";
   import myTheme from "@acme/theme-mytheme"; // Import your theme

   export const themeConfig = {
     themes: [glassTheme, brutalistTheme, myTheme], // Add your theme to the list
     defaultTheme: "glass",
     permissions: {
       // Configure who can use your theme
       themeLibrary: "user", // "admin" or "user"
     },
   };
   ```

3. Import CSS in the main application's styles:
   ```css
   /* In src/styles/index.css */
   @import "@acme/theme-mytheme/dist/css/mytheme.css";
   ```

## Theme Development Tips

### CSS Variables Reference

Here are the key CSS variables you should define for compatibility:

| Variable                 | Purpose                    | Example Value       |
| ------------------------ | -------------------------- | ------------------- |
| `--card`                 | Card background color      | `0 0% 100%`         |
| `--card-foreground`      | Card text color            | `222.2 84% 4.9%`    |
| `--primary`              | Primary action color       | `221.2 83% 53.3%`   |
| `--primary-foreground`   | Text on primary color      | `210 40% 98%`       |
| `--secondary`            | Secondary UI elements      | `210 40% 96.1%`     |
| `--secondary-foreground` | Text on secondary elements | `222.2 47.4% 11.2%` |
| `--background`           | Page background            | `0 0% 100%`         |
| `--foreground`           | Main text color            | `222.2 84% 4.9%`    |

### Best Practices

1. **Theme-specific variables**: Define theme-specific variables (e.g., `--mytheme-shadow`) and use them in your component styles

2. **Dark mode support**: Always provide dark mode variants of your colors

3. **Accessibility**: Ensure sufficient contrast between text and background colors

4. **Consistent naming**: Use the same ID for your theme class and theme definition:

   ```css
   .theme-mytheme {
     /* CSS styles */
   }
   ```

   ```typescript
   const myTheme: ThemeDefinition = {
     id: "mytheme",
     // ...
   };
   ```

5. **Preview strategy**: Customize the preview strategy based on your needs:
   ```typescript
   preview: {
     // Options: "static", "dynamic", "component"
     strategy: "static",
     asset: previewUrl,
   }
   ```

## Troubleshooting

### Common Issues

1. **Theme not showing up in selector**

   - Check if your theme is properly imported and added to the theme config
   - Verify the theme ID matches between CSS and theme definition

2. **CSS not applying**

   - Ensure CSS is properly imported in the main application
   - Check CSS class naming (should be `.theme-[your-theme-id]`)

3. **Preview image not generating**
   - Make sure the SVG file exists in the correct location
   - Check if the preview generation script is configured correctly

### Debug Mode

Enable debug mode in the theme provider to log theme-related information:

```tsx
<ThemeProvider
  themes={themes}
  config={{
    defaultTheme: "glass",
    debug: true,
  }}
>
  {children}
</ThemeProvider>
```

## Advanced Customization

### Component-Specific Styles

For more control, you can add component-specific styles:

```css
/* Button customization */
.theme-mytheme button.btn-primary {
  background: var(--mytheme-special-gradient);
  transform: skew(-5deg);
}

/* Card customization */
.theme-mytheme .card {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
}
```

### Animation & Transitions

Add subtle animations to enhance your theme:

```css
.theme-mytheme * {
  transition: all 0.2s ease;
}

.theme-mytheme .card:hover {
  transform: translateY(-5px) rotate(1deg);
}
```

## Publishing Your Theme

When your theme is ready for distribution:

1. Update your `package.json` with correct metadata:

   ```json
   {
     "name": "@acme/theme-mytheme",
     "version": "1.0.0",
     "description": "My custom theme for ACME Theme System",
     "author": "Your Name",
     "license": "MIT"
   }
   ```

2. Build the package:

   ```bash
   pnpm build
   ```

3. Publish to NPM:
   ```bash
   npm publish
   ```
