import { ThemeEngineOptions } from "@themesystem/core";

export function generateThemeScript(options: ThemeEngineOptions): string {
  const defaultTheme = options.defaultTheme || "system";
  const defaultStyle = options.defaultStyle || "default";

  return `
    (function() {
      function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      function getStoredTheme() {
        try {
          return localStorage.getItem('theme-system-theme') || '${defaultTheme}';
        } catch (e) {
          return '${defaultTheme}';
        }
      }
      
      function getStoredStyle() {
        try {
          return localStorage.getItem('theme-system-style') || '${defaultStyle}';
        } catch (e) {
          return '${defaultStyle}';
        }
      }
      
      const theme = getStoredTheme();
      const style = getStoredStyle();
      const systemTheme = getSystemTheme();
      
      if (theme === 'system') {
        document.documentElement.setAttribute('data-theme', systemTheme);
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      
      document.documentElement.setAttribute('data-style', style);
    })();
  `;
}

export function getThemeFromCookie(cookie: string): string | null {
  const match = cookie.match(/theme-system-theme=([^;]+)/);
  return match ? match[1] : null;
}

export function getStyleFromCookie(cookie: string): string | null {
  const match = cookie.match(/theme-system-style=([^;]+)/);
  return match ? match[1] : null;
}
