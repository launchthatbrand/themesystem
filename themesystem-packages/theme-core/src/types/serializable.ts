import type { ThemeSystemConfig } from "@themesystem/types";

/**
 * SerializableConfig represents a version of the ThemeSystemConfig
 * that can be safely serialized and sent to the client.
 *
 * This type removes non-serializable elements like functions.
 */
export interface SerializableConfig extends Omit<ThemeSystemConfig, "plugins"> {
  /**
   * A safe version of plugins without functions
   */
  plugins: Array<{
    name: string;
    options?: Record<string, any>;
  }>;
}
