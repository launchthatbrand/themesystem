import type { ThemeSystemConfig } from "@themesystem/types/config";

import { ThemeProvider } from "../provider";

// Default config that can be overridden by user config
const defaultConfig: ThemeSystemConfig = {
  baseTheme: "light",
  styleTheme: "default",
  themes: {
    light: {
      name: "Light",
      description: "Light theme",
    },
    dark: {
      name: "Dark",
      description: "Dark theme",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Default style",
    },
  },
  extensions: {},
};

/**
 * Get the current theme configuration
 * @param overrideConfig Optional configuration to override default values
 * @returns ThemeSystemConfig
 */
export async function getThemeConfig(
  overrideConfig?: Partial<ThemeSystemConfig>,
): Promise<ThemeSystemConfig> {
  // Merge default config with any overrides
  return {
    ...defaultConfig,
    ...overrideConfig,
    // Deep merge for nested objects
    themes: {
      ...defaultConfig.themes,
      ...(overrideConfig?.themes || {}),
    },
    styles: {
      ...defaultConfig.styles,
      ...(overrideConfig?.styles || {}),
    },
    extensions: {
      ...defaultConfig.extensions,
      ...(overrideConfig?.extensions || {}),
    },
  };
}

export async function ThemeConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider {...defaultConfig}>{children}</ThemeProvider>;
}
