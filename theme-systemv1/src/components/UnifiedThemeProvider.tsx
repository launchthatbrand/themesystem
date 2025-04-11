"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useInsertionEffect,
  useMemo,
  useState,
} from "react";
import { cookies } from "next/headers";
import { useTheme as useNextTheme } from "next-themes";

import type { ThemeDefinition } from "../types";
import {
  APP_EXTENSION_THEMES_KEY,
  BASE_THEME_KEY,
  BaseTheme,
  PermissionLevel,
  THEME_STYLE_KEY,
} from "./theme-constants";

// Cookie options
const COOKIE_EXPIRES_DAYS = 365;

// Cookie utilities
const setCookie = (name: string, value: string, days = COOKIE_EXPIRES_DAYS) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Helper to store JSON values in cookies
const setJSONCookie = (
  name: string,
  value: unknown,
  days = COOKIE_EXPIRES_DAYS,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    setCookie(name, jsonValue, days);
  } catch (error) {
    console.error(
      `[ThemeSystem] Failed to stringify value for cookie ${name}:`,
      error,
    );
  }
};

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Context type
interface ThemeContextType {
  // Base theme (light/dark)
  baseTheme: BaseTheme;
  setBaseTheme: (theme: BaseTheme) => void;
  isDarkMode: boolean;

  // Theme style
  themeStyle: string;
  setThemeStyle: (style: string) => void;
  availableThemes: ThemeDefinition[];

  // Extensions system
  extensions: Record<string, unknown>;
  getExtension: <T>(extensionId: string) => T | undefined;
  setExtensionTheme: <T>(extensionId: string, theme: T) => void;

  // Permissions
  canChangeBaseTheme: boolean;
  canChangeThemeStyle: boolean;
  canUseExtensions: boolean;

  // Debug/utility
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  logThemeState: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default config values
export interface ThemeConfig {
  themes: ThemeDefinition[];
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  permissions?: {
    baseTheme?: PermissionLevel;
    themeLibrary?: PermissionLevel;
    extensions?: PermissionLevel;
  };
  extensions?: Record<string, any>;
}

export interface ThemeProviderProps {
  children: ReactNode;
  config: ThemeConfig;
  userRole?: string;
  initialDebugMode?: boolean;
  // Server values (will be undefined in client components)
  serverBaseTheme?: BaseTheme;
  serverThemeStyle?: string | undefined;
  serverExtensions?: Record<string, unknown> | null;
}

/**
 * ThemeScriptInjector - Injects a script that applies theme before hydration
 * to prevent theme flashing
 */
function ThemeScriptInjector({
  defaultStyle,
  defaultTheme,
  debug,
}: {
  defaultStyle: string;
  defaultTheme: BaseTheme;
  debug: boolean;
}) {
  useInsertionEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("theme-script-initializer")) return;

    const script = document.createElement("script");
    script.id = "theme-script-initializer";

    // Script content that immediately applies theme classes
    const scriptContent = `
      (function() {
        try {
          const debug = ${debug};
          
          function log(...args) {
            if (debug) console.log("[ThemeSystem]", ...args);
          }

          function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
          }
          
          function getFromStorage(key) {
            // Try cookie first, then localStorage
            const cookieValue = getCookie(key);
            if (cookieValue) {
              log("Found theme value in cookie:", key, cookieValue);
              return cookieValue;
            }
            
            try {
              const localValue = localStorage.getItem(key);
              if (localValue) {
                log("Found theme value in localStorage:", key, localValue);
                return localValue;
              }
            } catch (e) {
              // localStorage might be unavailable
            }
            
            log("No stored value found for:", key);
            return null;
          }

          // Get theme preferences from storage
          const themeStyle = getFromStorage('${THEME_STYLE_KEY}') || '${defaultStyle}';
          const baseTheme = getFromStorage('${BASE_THEME_KEY}') || '${defaultTheme}';
          
          log("Initializing theme:", { baseTheme, themeStyle });
          
          // Apply the base theme (light/dark)
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (baseTheme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.add(systemPrefersDark ? 'dark' : 'light');
            log("System preference detected:", systemPrefersDark ? "dark" : "light");
          } else {
            root.classList.add(baseTheme);
            log("Applied base theme:", baseTheme);
          }
          
          // Get a fixed list of all known theme IDs
          const allThemeIds = [
            "glass",
            "brutalist",
            "aggressive",
            "minimal",
            "modern",
            "template",
            "system",
          ];

          // First, check for any theme-* classes
          Array.from(root.classList).forEach(cls => {
            if (cls.startsWith("theme-")) {
              root.classList.remove(cls);
            }
          });

          // Then remove any direct theme classes (glass, brutalist, etc.)
          allThemeIds.forEach(themeId => {
            if (root.classList.contains(themeId)) {
              root.classList.remove(themeId);
            }
          });
          
          // Apply the theme style
          root.classList.add('theme-' + themeStyle);
          root.classList.add(themeStyle);
          log("Applied theme style:", themeStyle);
          
          log("Theme initialization complete");
        } catch (e) {
          console.error('[ThemeSystem] Theme initialization error:', e);
        }
      })();
    `;

    script.innerHTML = scriptContent;
    document.head.appendChild(script);
  }, [defaultStyle, defaultTheme, debug]);

  return null;
}

/**
 * UnifiedThemeProvider - A single component that handles all theme functionality
 */
export function UnifiedThemeProvider({
  children,
  config,
  userRole = "user",
  initialDebugMode = false,
  serverBaseTheme,
  serverThemeStyle,
  serverExtensions,
}: ThemeProviderProps) {
  // Use defaults if not provided
  const defaultStyle = config.defaultStyle || "glass";
  const defaultTheme = config.defaultTheme || "system";
  const permissions = {
    baseTheme: config.permissions?.baseTheme || "user",
    themeLibrary: config.permissions?.themeLibrary || "user",
    extensions: config.permissions?.extensions || "user",
  };

  // Use next-themes for system theme detection
  const { theme, setTheme } = useNextTheme();

  // Get initial theme style - prioritize server value, then cookies, then localStorage
  const initialThemeStyle = useMemo(() => {
    // If server provided a value, use it
    if (serverThemeStyle) {
      return serverThemeStyle;
    }

    if (typeof window !== "undefined") {
      // Try cookie first, then localStorage
      const cookieTheme = getCookie(THEME_STYLE_KEY);
      const localTheme = localStorage.getItem(THEME_STYLE_KEY);
      const stored = cookieTheme || localTheme || null;

      if (stored) {
        // Check if the stored theme is valid
        const isValid = config.themes.some((t) => t.id === stored);
        if (isValid) {
          return stored;
        }
      }
    }
    return defaultStyle;
  }, [config.themes, defaultStyle, serverThemeStyle]);

  // Get initial base theme - prioritize server value, then cookies, then localStorage
  const initialBaseTheme = useMemo(() => {
    // If server provided a value, use it
    if (serverBaseTheme) {
      return serverBaseTheme;
    }

    if (typeof window !== "undefined") {
      const cookieTheme = getCookie(BASE_THEME_KEY);
      const localTheme = localStorage.getItem(BASE_THEME_KEY);
      const stored = cookieTheme || localTheme || null;

      if (stored && ["light", "dark", "system"].includes(stored)) {
        return stored as BaseTheme;
      }
    }
    return (theme as BaseTheme) || defaultTheme;
  }, [defaultTheme, theme, serverBaseTheme]);

  // State management
  const [themeStyle, setThemeStyleState] = useState<string>(initialThemeStyle);
  const [baseTheme, setBaseThemeState] = useState<BaseTheme>(initialBaseTheme);
  const [debugMode, setDebugMode] = useState(initialDebugMode);

  // Extensions state
  const [extensions, setExtensions] = useState<Record<string, unknown>>(() => {
    if (serverExtensions) {
      return serverExtensions;
    }

    if (typeof window !== "undefined") {
      try {
        const cookieValue = getCookie(APP_EXTENSION_THEMES_KEY);
        const localValue = localStorage.getItem(APP_EXTENSION_THEMES_KEY);
        const stored = cookieValue !== null ? cookieValue : localValue || null;

        if (stored) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.error("Failed to parse stored extension themes:", error);
      }
    }
    return config.extensions || {};
  });

  // Permission checks
  const canChangeBaseTheme =
    permissions.baseTheme === "user" ||
    (permissions.baseTheme === "admin" && userRole === "admin");
  const canChangeThemeStyle =
    permissions.themeLibrary === "user" ||
    (permissions.themeLibrary === "admin" && userRole === "admin");
  const canUseExtensions =
    permissions.extensions === "user" ||
    (permissions.extensions === "admin" && userRole === "admin");

  // Is dark mode
  const isDarkMode =
    baseTheme === "dark" ||
    (baseTheme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Apply theme style classes to document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // Skip if empty
    if (!themeStyle) return;

    // Known theme IDs
    const allThemeIds = [
      "glass",
      "brutalist",
      "aggressive",
      "minimal",
      "modern",
      "template",
      "system",
    ];

    // Remove existing theme classes
    const currentClasses = Array.from(root.classList);

    // Remove theme-* classes
    for (const cls of currentClasses) {
      if (cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    }

    // Remove direct theme classes
    for (const themeId of allThemeIds) {
      if (root.classList.contains(themeId)) {
        root.classList.remove(themeId);
      }
    }

    // Add the new theme classes
    root.classList.add(`theme-${themeStyle}`);
    root.classList.add(themeStyle);

    // Save to storage
    localStorage.setItem(THEME_STYLE_KEY, themeStyle);
    setCookie(THEME_STYLE_KEY, themeStyle);
  }, [themeStyle]);

  // Apply base theme (light/dark)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // Remove existing classes
    ["light", "dark"].forEach((cls) => {
      root.classList.remove(cls);
    });

    // Apply the appropriate class
    if (baseTheme === "light") {
      root.classList.add("light");
    } else if (baseTheme === "dark") {
      root.classList.add("dark");
    } else if (baseTheme === "system") {
      // For system theme, check the system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");

      // Add listener for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Store the base theme
    localStorage.setItem(BASE_THEME_KEY, baseTheme);
    setCookie(BASE_THEME_KEY, baseTheme);
  }, [baseTheme]);

  // Base theme setter
  const handleSetBaseTheme = useCallback(
    (newTheme: BaseTheme) => {
      if (!canChangeBaseTheme) return;

      setTheme(newTheme);
      setBaseThemeState(newTheme);

      localStorage.setItem(BASE_THEME_KEY, newTheme);
      setCookie(BASE_THEME_KEY, newTheme);
    },
    [canChangeBaseTheme, setTheme],
  );

  // Theme style setter
  const handleSetThemeStyle = useCallback(
    (style: string) => {
      if (!canChangeThemeStyle) return;

      // Validate the theme exists
      const isValidTheme = config.themes.some((t) => t.id === style);
      if (!isValidTheme) {
        console.warn(`[ThemeSystem] Invalid theme style: ${style}`);
        return;
      }

      setThemeStyleState(style);

      localStorage.setItem(THEME_STYLE_KEY, style);
      setCookie(THEME_STYLE_KEY, style);
    },
    [canChangeThemeStyle, config.themes],
  );

  // Extension theme getters and setters
  const getExtension = useCallback(
    <T,>(extensionId: string): T | undefined => {
      if (!canUseExtensions) return undefined;
      const extension = extensions[extensionId];
      return extension ? (extension as T) : undefined;
    },
    [extensions, canUseExtensions],
  );

  const setExtensionTheme = useCallback(
    <T,>(extensionId: string, theme: T) => {
      if (!canUseExtensions) return;

      setExtensions((prev) => {
        const newExtensions = {
          ...prev,
          [extensionId]: theme,
        };

        // Store in both storages
        try {
          const extensionsJSON = JSON.stringify(newExtensions);
          localStorage.setItem(APP_EXTENSION_THEMES_KEY, extensionsJSON);
          setJSONCookie(APP_EXTENSION_THEMES_KEY, newExtensions);
        } catch (error) {
          console.error("Failed to store extension themes:", error);
        }

        return newExtensions;
      });
    },
    [canUseExtensions],
  );

  // Debug logging
  const logThemeState = useCallback(() => {
    console.group("[ThemeSystem] Current State");
    console.log("Base theme:", baseTheme);
    console.log("Theme style:", themeStyle);
    console.log("Extensions:", { ...extensions });
    console.log("Storage:", {
      cookies: {
        themeStyle: getCookie(THEME_STYLE_KEY),
        baseTheme: getCookie(BASE_THEME_KEY),
        extensions: getCookie(APP_EXTENSION_THEMES_KEY),
      },
      localStorage: {
        themeStyle: localStorage.getItem(THEME_STYLE_KEY),
        baseTheme: localStorage.getItem(BASE_THEME_KEY),
        extensions: localStorage.getItem(APP_EXTENSION_THEMES_KEY),
      },
      serverProvided: {
        themeStyle: serverThemeStyle,
        baseTheme: serverBaseTheme,
        extensions: serverExtensions,
      },
    });
    console.groupEnd();
  }, [
    baseTheme,
    themeStyle,
    extensions,
    serverBaseTheme,
    serverThemeStyle,
    serverExtensions,
  ]);

  // Context value
  const contextValue: ThemeContextType = {
    baseTheme,
    setBaseTheme: handleSetBaseTheme,
    isDarkMode,
    themeStyle,
    setThemeStyle: handleSetThemeStyle,
    availableThemes: config.themes,
    extensions,
    getExtension,
    setExtensionTheme,
    canChangeBaseTheme,
    canChangeThemeStyle,
    canUseExtensions,
    debugMode,
    setDebugMode,
    logThemeState,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeScriptInjector
        defaultStyle={defaultStyle}
        defaultTheme={defaultTheme}
        debug={debugMode}
      />
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for accessing theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a UnifiedThemeProvider");
  }
  return context;
}

// Custom hook for accessing extension themes
export function useThemeExtension<T>(extensionId: string) {
  const { getExtension, setExtensionTheme, canUseExtensions } = useTheme();

  const currentTheme = getExtension<T>(extensionId);

  const setTheme = useCallback(
    (theme: T) => {
      if (canUseExtensions) {
        setExtensionTheme(extensionId, theme);
      }
    },
    [canUseExtensions, extensionId, setExtensionTheme],
  );

  return {
    currentTheme,
    setTheme,
    canUseExtensions,
  };
}
