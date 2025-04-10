# ACME Theme Template

This package serves as a starting point for creating new themes for the ACME Theme System. Use this template to quickly build and customize your own themes.

## Getting Started

1. **Copy this template**

   Start by copying this template directory and renaming it to your theme name:

   ```bash
   # Replace 'mytheme' with your theme name
   cp -r packages/theme-template packages/theme-mytheme
   ```

2. **Update package information**

   Edit `package.json` to reflect your theme details:

   ```json
   {
     "name": "@acme/theme-mytheme",
     "description": "My custom theme for the ACME Theme System",
     // ... other fields
     "style": "dist/css/mytheme.css",
     "scripts": {
       // Update these to use your theme name
       "build:css": "mkdir -p dist/css && cp src/mytheme.css dist/css/",
       "build:preview": "node ../../scripts/generate-theme-preview.js --theme=mytheme"
     }
   }
   ```

3. **Rename files**

   Rename the template files to match your theme:

   ```bash
   mv src/template.css src/mytheme.css
   ```

4. **Update theme definition**

   Edit `src/index.ts` to define your theme:

   ```typescript
   const myTheme: ThemeDefinition = {
     id: "mytheme", // Theme identifier (must match CSS class)
     name: "My Theme", // Display name
     description: "Your theme description here",
     // ... other fields
   };
   ```

## Customizing Your Theme

### CSS Variables

The theme system uses CSS variables to define the visual properties. Start by editing the CSS file:

1. Rename the CSS class:

   ```css
   /* Change from .theme-template to your theme name */
   .theme-mytheme {
     /* Your theme variables here */
   }
   ```

2. Update your variables:

   ```css
   .theme-mytheme {
     /* Primary theme-specific variables */
     --mytheme-background: rgba(250, 250, 255, 0.9);
     --mytheme-border: 1px solid rgba(200, 200, 255, 0.3);

     /* System variables that control the UI */
     --card: 215 20% 97%;
     --primary: 210 100% 50%;
     /* ... more variables */
   }
   ```

3. Be sure to update dark mode variables:
   ```css
   .dark.theme-mytheme {
     /* Dark mode overrides */
     --mytheme-background: rgba(25, 25, 35, 0.8);
     /* ... other dark mode variables */
   }
   ```

### Theme Preview

Each theme needs a preview image that will be shown in the theme selector.

#### Option 1: Using the SVG Generator

1. Edit the SVG file in `src/assets/preview.svg` to reflect your theme's color scheme.

2. Generate PNG from SVG:
   ```bash
   pnpm generate-png-preview:mytheme
   ```

#### Option 2: Using the Component Approach

For more realistic previews that show actual UI components with your theme:

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Navigate to `/theme-preview?theme=mytheme` in your browser

3. Use the built-in tools to generate and download a preview image

### Theme Definition

Update your theme definition in `src/index.ts` to reflect your theme's appearance:

```typescript
const myTheme: ThemeDefinition = {
  id: "mytheme",
  name: "My Theme",
  description: "A beautiful custom theme with unique styling",
  preview: {
    strategy: "static", // Can be "static", "dynamic", or "component"
    asset: previewUrl, // Path to preview image
  },
  variables: {
    "--mytheme-background": "rgba(250, 250, 255, 0.9)",
    "--mytheme-border": "1px solid rgba(200, 200, 255, 0.3)",
    // Add your key variables here (should match CSS)
  },
};
```

## Building Your Theme

Once your theme is configured, build it with:

```bash
cd packages/theme-mytheme
pnpm build
```

This will:

1. Compile TypeScript files
2. Copy CSS to the distribution folder
3. Generate theme preview images

## Integrating With The Theme System

To make your theme available to the application:

1. Add your theme to the system in `src/config/theme.config.ts`:

   ```typescript
   import myTheme from "@acme/theme-mytheme";

   export const themeConfig = {
     themes: [
       // ... existing themes
       myTheme,
     ],
   };
   ```

2. Import your theme's CSS in `src/styles/index.css`:

   ```css
   /* Theme imports */
   @import "@acme/theme-mytheme/dist/css/mytheme.css";
   ```

## Testing Your Theme

To see your theme in action:

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Navigate to the Themes page to select your theme

## Publishing Your Theme

If you want to publish your theme as a standalone package:

1. Ensure the package.json is configured correctly
2. Build the package: `pnpm build`
3. Publish to npm: `npm publish`

## Need Help?

Refer to the Theme System documentation for more details on creating and customizing themes.
