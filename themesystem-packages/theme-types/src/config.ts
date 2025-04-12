import type { BaseTheme } from "./core.js";
import type { ThemeExtension } from "./extensions.js";

export interface ThemeConfig {
  base: {
    target?: string;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    enableColorScheme?: boolean;
    storageKey?: string;
    themes?: string[];
  };
  extensions?: ThemeExtension[];
  value?: Record<string, Record<string, string>>;
}

export interface ThemeEngineOptions {
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  config?: ThemeSystemConfig;
  storageKey?: string;
}

export interface ThemeSystemConfig {
  baseTheme: string;
  styleTheme: string;
  themes: Record<
    string,
    {
      name: string;
      description: string;
    }
  >;
  styles: Record<
    string,
    {
      name: string;
      description: string;
    }
  >;
  storage?: {
    key: string;
    type: "localStorage" | "cookie";
  };
  framework?: {
    nextjs?: {
      serverSideRendering?: boolean;
      cookieOptions?: {
        path?: string;
        sameSite?: "lax" | "strict" | "none";
      };
    };
  };
}
