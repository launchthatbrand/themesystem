import { join, resolve } from "path";
import { getTsconfig } from "get-tsconfig";

export const themeConfigFileNames = [
  "themesystem.config.js",
  "themesystem.config.ts",
];

/**
 * Returns the source and output paths from the nearest tsconfig.json file.
 * If no tsconfig.json file is found, returns the current working directory.
 */
const getTSConfigPaths = (): {
  configPath?: string;
  outPath?: string;
  rootPath?: string;
  srcPath?: string;
  tsConfigPath?: string;
} => {
  const tsConfigResult = getTsconfig();
  if (!tsConfigResult) {
    return { rootPath: process.cwd() };
  }

  const tsConfig = tsConfigResult.config;
  const tsConfigDir = resolve(tsConfigResult.path, "..");

  try {
    const rootConfigDir = resolve(
      tsConfigDir,
      tsConfig?.compilerOptions?.baseUrl || "",
    );
    const srcPath =
      tsConfig?.compilerOptions?.rootDir || resolve(process.cwd(), "src");
    const outPath =
      tsConfig?.compilerOptions?.outDir || resolve(process.cwd(), "dist");
    let configPath =
      tsConfig?.compilerOptions?.paths?.["@themesystem/config"]?.[0];

    if (configPath) {
      configPath = resolve(rootConfigDir, configPath);
    }

    return {
      configPath,
      outPath,
      rootPath: rootConfigDir,
      srcPath,
      tsConfigPath: tsConfigResult.path,
    };
  } catch (error) {
    console.error(`Error parsing tsconfig.json: ${error}`);
    return {
      rootPath: process.cwd(),
    };
  }
};

/**
 * Searches for a theme system configuration file.
 * @returns The absolute path to the theme system configuration file.
 * @throws An error if no configuration file is found.
 */
export const findConfig = (): string => {
  // Check environment variable first
  if (process.env.THEMESYSTEM_CONFIG_PATH) {
    return process.env.THEMESYSTEM_CONFIG_PATH.startsWith("/")
      ? process.env.THEMESYSTEM_CONFIG_PATH
      : resolve(process.cwd(), process.env.THEMESYSTEM_CONFIG_PATH);
  }

  const { configPath, outPath, rootPath, srcPath } = getTSConfigPaths();

  // Check if configPath is a direct file path
  if (
    configPath &&
    (configPath.endsWith(".js") || configPath.endsWith(".ts"))
  ) {
    return configPath;
  }

  // Search in multiple locations
  const searchPaths =
    process.env.NODE_ENV === "production"
      ? [configPath, outPath, srcPath, rootPath]
      : [configPath, srcPath, rootPath];

  for (const searchPath of searchPaths) {
    if (!searchPath) continue;

    for (const fileName of themeConfigFileNames) {
      const filePath = join(searchPath, fileName);
      return filePath;
    }
  }

  // Try src and dist as fallback
  if (process.env.NODE_ENV === "production") {
    const distConfigPath = join(process.cwd(), "dist", "themesystem.config.js");
    return distConfigPath;
  } else {
    const srcConfigPath = join(process.cwd(), "src", "themesystem.config.ts");
    return srcConfigPath;
  }
};
