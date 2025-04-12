import { z } from "zod";

import { configSchema } from "../types";

// Default config that can be overridden by user config
const defaultConfig = {
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
};

export async function loadConfig() {
  try {
    // In Next.js, we'll look for the config in the app directory
    const configPath = "./themesystem.config";

    // Try to import the config file
    const config = await import(configPath).catch(() => null);

    // If no config file is found, use the default config
    if (!config) {
      return defaultConfig;
    }

    // Validate the config against our schema
    const validatedConfig = configSchema.parse(config.default || defaultConfig);
    return validatedConfig;
  } catch (error) {
    console.warn("Failed to load theme config, using defaults:", error);
    return defaultConfig;
  }
}
