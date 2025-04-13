/**
 * Base theme options
 */
export type BaseTheme = "light" | "dark" | "system";

/**
 * Theme tokens structure
 */
export interface ThemeTokens {
  colors: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    popover: string;
    "popover-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    [key: string]: string;
  };
  effects: {
    blur: string;
    border: string;
    shadow: string;
    radius: string;
    glow?: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      display: string;
      body: string;
    };
    fontSize?: Record<string, string>;
    fontWeight?: Record<string, string>;
  };
}

/**
 * Theme definition structure
 */
export interface Theme {
  id: string;
  name: string;
  description?: string;
  preview?: string;
  tokens: ThemeTokens;
  variants?: Record<string, Partial<ThemeTokens>>;
  components?: Record<string, any>;
}
