import { Theme } from "@themesystem/types";

export class ThemeRegistry {
  private static instance: ThemeRegistry;
  private themes: Map<string, Theme> = new Map();

  private constructor() {}

  static getInstance(): ThemeRegistry {
    if (!ThemeRegistry.instance) {
      ThemeRegistry.instance = new ThemeRegistry();
    }
    return ThemeRegistry.instance;
  }

  registerTheme(theme: Theme) {
    this.themes.set(theme.id, theme);
  }

  getTheme(id: string): Theme | undefined {
    return this.themes.get(id);
  }

  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }
}

export const themeRegistry = ThemeRegistry.getInstance();
