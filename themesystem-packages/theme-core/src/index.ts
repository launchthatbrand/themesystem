export type { Theme } from "./types";
export { ThemeProvider, useTheme } from "./theme-provider";
export { ThemeRegistry } from "./theme-registry";
export { ThemeEngineImpl as ThemeEngine } from "./theme-engine";
export { defineConfig, loadConfig } from "@themesystem/config";

// Re-export UI components
export { ThemeToggle, ThemeSelector, Button } from "@themesystem/ui";

// Themes are imported by the consuming application
// export { glassTheme } from "@themesystem/glass";
// export { brutalistTheme } from "@themesystem/brutalist";
// export { aggressiveTheme } from "@themesystem/aggressive";
// export { templateTheme } from "@themesystem/template";
