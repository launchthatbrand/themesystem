import { z } from "zod";

import { configSchema } from "../types";
import { findConfig } from "./find";

export async function loadConfig() {
  try {
    const configPath = findConfig();
    // Use require for better compatibility
    const config = require(configPath);
    return configSchema.parse(config.default || config);
  } catch (error) {
    console.warn("Failed to load theme config:", error);
    return null;
  }
}
