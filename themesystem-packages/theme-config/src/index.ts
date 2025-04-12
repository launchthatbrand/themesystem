import { z } from "zod";

import { configSchema } from "./types";

export function defineConfig(config: z.infer<typeof configSchema>) {
  return configSchema.parse(config);
}

export function loadConfig(config?: z.infer<typeof configSchema>) {
  if (config) {
    return defineConfig(config);
  }

  // Default configuration
  return defineConfig({
    baseTheme: "system",
    styleTheme: "aggressive",
    extensions: {},
    storage: {
      key: "theme-system-state",
      type: "localStorage",
    },
  });
}

// Export types
export * from "./types";
