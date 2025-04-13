declare module "@themesystem/glass" {
  import type { BaseTheme } from "@themesystem/types/core";

  export interface Theme {
    id: string;
    name: string;
    description: string;
    preview?: string;
    baseTheme?: BaseTheme;
    cssPath?: string;
    tokens: {
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
        fontSize?: {
          base?: string;
          lg?: string;
          xl?: string;
          "2xl"?: string;
        };
        fontWeight?: {
          normal?: string;
          medium?: string;
          bold?: string;
        };
      };
    };
    styles?: {
      glass?: Record<string, any>;
      card?: Record<string, any>;
      button?: Record<string, any>;
      [key: string]: Record<string, any> | undefined;
    };
    dark?: {
      colors?: Partial<Theme["tokens"]["colors"]>;
      effects?: Partial<Theme["tokens"]["effects"]>;
    };
  }

  export const glassTheme: Theme;
  export const glassConfig: any;
  export default glassConfig;
}
