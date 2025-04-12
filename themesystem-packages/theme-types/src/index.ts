export interface Theme {
  id: string;
  name: string;
  description: string;
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
    };
    typography: {
      fontFamily: {
        sans: string;
        display: string;
        body: string;
      };
    };
  };
  styles: {
    card: Record<string, any>;
    button: Record<string, any>;
  };
  dark?: {
    colors?: Partial<Theme["tokens"]["colors"]>;
    effects?: Partial<Theme["tokens"]["effects"]>;
  };
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
}
