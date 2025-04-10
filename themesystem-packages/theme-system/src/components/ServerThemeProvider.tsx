import type { Theme, ThemeConfig, ThemeStyle } from "../types";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { cookies } from "next/headers";

// Constants for storage keys
const DEFAULT_THEME_KEY = "ui-theme";
const DEFAULT_STYLE_KEY = "ui-theme-style";

export interface ServerThemeProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Default theme when no preference is found
   * @default "system"
   */
  defaultTheme?: Theme;

  /**
   * Default theme style when no preference is found
   * @default "default"
   */
  defaultStyle?: ThemeStyle;

  /**
   * Cookie and localStorage key for theme preference
   * @default "ui-theme"
   */
  storageKey?: string;

  /**
   * Cookie and localStorage key for theme style preference
   * @default "ui-theme-style"
   */
  styleStorageKey?: string;

  /**
   * Whether to disable transitions when the theme changes
   * @default false
   */
  disableTransitionOnChange?: boolean;

  /**
   * Whether to enable system theme preference detection
   * @default true
   */
  enableSystem?: boolean;

  /**
   * Whether to enable style system for matching system preference
   * @default true
   */
  enableStyleSystem?: boolean;

  /**
   * Available themes to show in the UI
   * @default ["light", "dark", "system"]
   */
  themes?: Theme[];

  /**
   * Available theme styles to show in the UI
   * @default ["default", "rose", "green", "blue", "orange", "purple", "custom"]
   */
  themeStyles?: ThemeStyle[];

  /**
   * Full theme configuration object (overrides individual props)
   */
  config?: ThemeConfig;

  /**
   * Enable debug mode initially
   * @default false
   */
  initialDebugMode?: boolean;
}

/**
 * Client-side script to initialize theme before hydration
 * This prevents flashing during initial load
 */
const ThemeScript = ({
  storageKey = DEFAULT_THEME_KEY,
  styleStorageKey = DEFAULT_STYLE_KEY,
  defaultTheme = "system",
  defaultStyle = "default",
}: {
  storageKey?: string;
  styleStorageKey?: string;
  defaultTheme?: Theme;
  defaultStyle?: ThemeStyle;
}) => {
  const clientCode = `
(function() {
  try {
    const getThemeValue = () => {
      const themeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('${storageKey}='));
      
      if (themeCookie) {
        return themeCookie.split('=')[1];
      }
      
      try {
        const storedTheme = localStorage.getItem('${storageKey}');
        if (storedTheme) return storedTheme;
      } catch (e) {}
      
      return '${defaultTheme}';
    };

    const getStyleValue = () => {
      const styleCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('${styleStorageKey}='));
      
      if (styleCookie) {
        return styleCookie.split('=')[1];
      }
      
      try {
        const storedStyle = localStorage.getItem('${styleStorageKey}');
        if (storedStyle) return storedStyle;
      } catch (e) {}
      
      return '${defaultStyle}';
    };

    const theme = getThemeValue();
    const style = getStyleValue();
    
    const root = document.documentElement;

    // Apply base theme (light or dark)
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Apply theme style
    const allStyles = ['default', 'rose', 'green', 'blue', 'orange', 'purple', 'custom'];
    allStyles.forEach(s => root.classList.remove('theme-' + s));
    root.classList.add('theme-' + style);
  } catch (e) {
    console.error('Theme initialization error:', e);
  }
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: clientCode,
      }}
    />
  );
};

/**
 * Helper function to get the theme value from cookies
 */
export async function getServerTheme(
  key = DEFAULT_THEME_KEY,
): Promise<Theme | undefined> {
  try {
    const cookieStore = cookies();
    const value = (await cookieStore.get(key)?.value) as Theme;
    return value;
  } catch (error) {
    console.error("Error reading theme cookie:", error);
    return undefined;
  }
}

/**
 * Helper function to get the theme style value from cookies
 */
export async function getServerThemeStyle(
  key = DEFAULT_STYLE_KEY,
): Promise<ThemeStyle | undefined> {
  try {
    const cookieStore = cookies();
    const value = (await cookieStore.get(key)?.value) as ThemeStyle;
    return value;
  } catch (error) {
    console.error("Error reading theme style cookie:", error);
    return undefined;
  }
}

/**
 * Server-side theme provider for Next.js App Router
 * This component reads theme and style preferences from cookies
 * and passes them to the client-side ThemeProvider
 */
export async function ServerThemeProvider({
  children,
  defaultTheme = "system",
  defaultStyle = "default",
  storageKey = DEFAULT_THEME_KEY,
  styleStorageKey = DEFAULT_STYLE_KEY,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableStyleSystem = true,
  themes = ["light", "dark", "system"],
  themeStyles = [
    "default",
    "rose",
    "green",
    "blue",
    "orange",
    "purple",
    "custom",
  ],
  config,
  initialDebugMode = false,
}: ServerThemeProviderProps) {
  let theme = defaultTheme;
  let themeStyle = defaultStyle;

  try {
    const cookieStore = cookies();
    const themeCookie = await cookieStore.get(storageKey);
    const styleCookie = await cookieStore.get(styleStorageKey);

    // Use cookie values or defaults
    theme = (themeCookie?.value as Theme) || defaultTheme;
    themeStyle = (styleCookie?.value as ThemeStyle) || defaultStyle;
  } catch (error) {
    console.error("Error reading theme cookies:", error);
  }

  // Override with config if provided
  if (config) {
    theme = config.defaultTheme || theme;
    themeStyle = config.defaultStyle || themeStyle;
    storageKey = config.storageKey || storageKey;
    styleStorageKey = config.styleStorageKey || styleStorageKey;
    disableTransitionOnChange =
      config.disableTransitionOnChange || disableTransitionOnChange;
    enableSystem = config.enableSystem || enableSystem;
    enableStyleSystem = config.enableStyleSystem || enableStyleSystem;
  }

  return (
    <>
      <ThemeScript
        storageKey={storageKey}
        styleStorageKey={styleStorageKey}
        defaultTheme={defaultTheme}
        defaultStyle={defaultStyle}
      />
      <ThemeProvider
        defaultTheme={theme}
        defaultStyle={themeStyle}
        storageKey={storageKey}
        styleStorageKey={styleStorageKey}
        disableTransitionOnChange={disableTransitionOnChange}
        enableSystem={enableSystem}
        enableStyleSystem={enableStyleSystem}
        themes={themes}
        themeStyles={themeStyles}
      >
        {children}
      </ThemeProvider>
    </>
  );
}
