import { configSchema } from "./types";
import { z } from "zod";

export function defineConfig(config: z.infer<typeof configSchema>) {
  return configSchema.parse(config);
}

export function loadConfig(config?: z.infer<typeof configSchema>) {
  if (config) {
    return defineConfig(config);
  }

  // Default configuration
  return defineConfig({
    themes: {
      light: {
        name: "Light",
        description: "Default light theme",
      },
      dark: {
        name: "Dark",
        description: "Default dark theme",
      },
      system: {
        name: "System",
        description: "Follows system preferences",
      },
    },
    styles: {
      default: {
        name: "Default",
        description: "Standard theme style",
      },
    },
    extensions: {
      components: {},
      global: {},
    },
    storage: {
      key: "theme-system-state",
      type: "localStorage",
    },
  });
}

// Export types
export * from "./types";
