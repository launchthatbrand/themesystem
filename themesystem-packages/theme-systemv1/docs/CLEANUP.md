# Theme System Cleanup Plan

This document outlines the cleanup plan after implementing the unified theme system.

## Files to Remove

Once the new unified theme system is fully tested and deployed, the following files can be safely removed:

1. `ThemeProvider.tsx` - Replaced by UnifiedThemeProvider
2. `ThemeProvider.client.tsx` - Logic merged into UnifiedThemeProvider
3. `ThemeScriptInjector.tsx` - Now integrated into UnifiedThemeProvider
4. `ThemeInitializer.tsx` - No longer needed with the script injector

## Migration Steps for Projects

1. Update imports to use `UnifiedThemeProvider` or `ServerThemeProvider` directly
2. Remove any `ThemeInitializer` components from your layouts
3. Update your theme config to match the new format

## Testing Recommendations

1. Test server-side rendering with cookie persistence
2. Verify theme flashing prevention works on initial page load
3. Test theme switching in both light and dark modes
4. Verify permissions system is working correctly
5. Test browser reload and navigation to ensure persistence

## Updated Architecture

```
Theme System Architecture
├── UnifiedThemeProvider.tsx    # Core provider with all functionality
├── ServerThemeProvider.tsx     # Server wrapper for cookie access
├── ThemeSelector.tsx           # UI for selecting themes
├── ThemeToggle.tsx             # Light/dark theme toggle
├── ThemeSwitcher.tsx           # Floating theme picker
└── theme-constants.ts          # Shared constants and types
```
