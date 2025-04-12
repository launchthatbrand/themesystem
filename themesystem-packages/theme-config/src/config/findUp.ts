import { existsSync } from "fs";
import { join, resolve } from "path";

interface FindUpOptions {
  cwd?: string;
}

export async function findUp(
  fileNames: string[],
  options: FindUpOptions = {},
): Promise<string | null> {
  const { cwd = process.cwd() } = options;
  let dir = resolve(cwd);

  do {
    for (const fileName of fileNames) {
      const filePath = join(dir, fileName);
      if (existsSync(filePath)) {
        return filePath;
      }
    }
    dir = resolve(dir, "..");
  } while (dir !== resolve(dir, ".."));

  return null;
}
