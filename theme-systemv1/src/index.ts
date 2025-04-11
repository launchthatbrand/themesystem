// Export ThemeSystemConfig with alias to avoid conflicts
import { ThemeSystemConfig as OriginalThemeSystemConfig } from "./types";

// Export basic types
export type { ThemeDefinition, ThemePreviewProvider } from "./types";

// Just export the legacy type for backwards compatibility
export type { OriginalThemeSystemConfig as ThemeSystemConfig };

// Export providers
export * from "./providers/StaticPreviewProvider";

// Export all components (including UnifiedThemeProvider and ServerThemeProvider)
export * from "./components";

// Export types from theme-constants
export type { BaseTheme, PermissionLevel } from "./components/theme-constants";

// Export types from UnifiedThemeProvider
export type {
  ThemeConfig,
  ThemeProviderProps,
} from "./components/UnifiedThemeProvider";

// Export UI component types
export type { ThemePreviewProps } from "./components/ThemePreview";
export type {
  ThemeSelectorProps,
  ThemeItemProps,
  ContainerProps,
} from "./components/ThemeSelector";
export type { ThemeSwitcherProps } from "./components/FloatingThemeSwitcher";
export type { ThemeToggleProps } from "./components/ThemeToggle";

// Export constants
export * from "./components/theme-constants";

// Utilities
export { generateGradientFromColor } from "./utils/gradient";
export { getThemeClasses } from "./utils/dom";
