import { configSchema } from "./types";
import { z } from "zod";

/**
 * Define and validate a theme system configuration
 *
 * This function validates the configuration against the schema and returns
 * a type-safe configuration object. It does not apply plugins yet - that
 * happens during initialization.
 *
 * @param config The theme system configuration
 * @returns Validated configuration object
 */
export function defineConfig(config: z.infer<typeof configSchema>) {
  return configSchema.parse(config);
}

/**
 * Load a configuration with defaults
 *
 * This function loads a configuration, applying defaults if needed.
 *
 * @param config Optional configuration to use instead of defaults
 * @returns Complete configuration with defaults applied
 */
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
