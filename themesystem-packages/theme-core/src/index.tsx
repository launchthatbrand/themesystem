import "./register-themes"; // This will run the registration

import { Theme } from "@themesystem/types";
import { ThemeRegistry } from "./theme-registry";

export type { Theme };
export { ThemeRegistry };
export const themeRegistry = ThemeRegistry.getInstance();

export { ThemeProvider, useTheme } from "./theme-provider";
export { ThemeEngineImpl as ThemeEngine } from "./theme-engine";
export { defineConfig, loadConfig } from "@themesystem/config";
