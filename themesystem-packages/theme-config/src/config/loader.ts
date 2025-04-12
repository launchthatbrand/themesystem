import { z } from "zod";

import { configSchema } from "../types";
import { findConfig } from "./find";

export async function loadConfig(cwd = process.cwd()) {
  const configPath = await findConfig(cwd);
  if (!configPath) {
    throw new Error("No themesystem.config.ts found");
  }

  // Dynamic import the config file
  const config = await import(configPath);

  // Validate the config against our schema
  const validatedConfig = configSchema.parse(config.default);

  return validatedConfig;
}
