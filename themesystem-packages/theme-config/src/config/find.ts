import { findUp } from "./findUp";

export const CONFIG_FILE_NAMES = [
  "themesystem.config.js",
  "themesystem.config.ts",
];

export async function findConfig(cwd = process.cwd()): Promise<string | null> {
  const configPath = await findUp(CONFIG_FILE_NAMES, { cwd });
  return configPath;
}
