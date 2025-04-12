"use client";

import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  BaseTheme,
  ThemeConfig,
  ThemeEngineOptions,
  ThemeExtension,
  ThemeState,
} from "./types";
import { script } from "./script";
import { ThemeEngineImpl } from "./theme-engine";

// Constants
const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";
const defaultThemes = ["light", "dark"];

// Helpers
const saveToLS = (storageKey: string, value: string) => {
  try {
    localStorage.setItem(storageKey, value);
  } catch (e) {
    // Unsupported
  }
};

const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA);
  return e.matches ? "dark" : "light";
};

const disableAnimation = (nonce?: string) => {
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: BaseTheme) => void;
  setStyle: (style: string) => void;
  setExtensionTheme: (extensionId: string, theme: string) => void;
  getExtensionTheme: (extensionId: string) => string;
  // Next-themes compatibility
  theme: string;
  forcedTheme?: string;
  resolvedTheme: string;
  systemTheme?: "light" | "dark";
  themes: string[];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  options?: ThemeEngineOptions;
  defaultTheme?: BaseTheme;
  attribute?: "class" | "data-theme";
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  // Next-themes compatibility
  forcedTheme?: string;
  disableTransitionOnChange?: boolean;
  value?: Record<string, string>;
  nonce?: string;
  // Theme extensions
  config?: ThemeConfig;
  extensions?: ThemeExtension[];
  target?: string | HTMLElement;
  onThemeChange?: (theme: string, target: HTMLElement) => void;
}

const ThemeScript = React.memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    nonce,
  }: Omit<ThemeProviderProps, "children"> & { defaultTheme: string }) => {
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      defaultThemes,
      value,
      enableSystem,
      enableColorScheme,
    ]).slice(1, -1);

    return (
      <script
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${scriptArgs})`,
        }}
      />
    );
  },
);

export function ThemeProvider({
  children,
  options,
  defaultTheme = "system",
  attribute = "class",
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  forcedTheme,
  disableTransitionOnChange = false,
  value,
  nonce,
  config,
  extensions,
  target,
  onThemeChange,
}: ThemeProviderProps) {
  const [engine] = useState(() => new ThemeEngineImpl(options));
  const [state, setState] = useState<ThemeState>(engine.getState());
  const [theme, setThemeState] = useState(
    () => getTheme(storageKey, defaultTheme) || "light",
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );

  // Load config and setup extensions
  useEffect(() => {
    if (config) {
      engine.loadConfig(config);
    }
    if (extensions) {
      engine.setupExtensions(extensions);
    }
  }, [config, extensions, engine]);

  const applyTheme = useCallback(
    (theme: string) => {
      let resolved = theme;
      if (!resolved) return;

      if (theme === "system" && enableSystem) {
        resolved = getSystemTheme();
      }

      const name = value ? value[resolved] : resolved;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      if (attribute === "class") {
        d.classList.remove(...(value ? Object.values(value) : defaultThemes));
        if (name) d.classList.add(name);
      } else if (attribute.startsWith("data-")) {
        if (name) {
          d.setAttribute(attribute, name);
        } else {
          d.removeAttribute(attribute);
        }
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme)
          ? defaultTheme
          : null;
        const colorScheme = colorSchemes.includes(resolved)
          ? resolved
          : fallback;
        d.style.colorScheme = colorScheme || "";
      }

      enable?.();
    },
    [
      attribute,
      defaultTheme,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      nonce,
      value,
    ],
  );

  const setTheme = useCallback(
    (value: string | ((prev: string) => string)) => {
      if (typeof value === "function") {
        setThemeState((prevTheme) => {
          const newTheme = value(prevTheme);
          saveToLS(storageKey, newTheme);
          return newTheme;
        });
      } else {
        setThemeState(value);
        saveToLS(storageKey, value);
      }
    },
    [storageKey],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, forcedTheme, applyTheme, enableSystem],
  );

  // System preference listener
  useEffect(() => {
    const media = window.matchMedia(MEDIA);
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);
    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // LocalStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      if (!e.newValue) {
        setTheme(defaultTheme);
      } else {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setTheme, storageKey, defaultTheme]);

  // Theme change effect
  useEffect(() => {
    if (theme) {
      applyTheme(forcedTheme ?? theme);
      if (onThemeChange && target) {
        onThemeChange(
          theme,
          document.querySelector(target as string) as HTMLElement,
        );
      }
    }
  }, [forcedTheme, theme, applyTheme, onThemeChange, target]);

  // Engine subscription
  useEffect(() => {
    engine.subscribe((newState: ThemeState) => {
      setState(newState);
    });

    if (defaultTheme) {
      engine.setTheme(defaultTheme);
    }

    return () => {
      engine.dispose();
    };
  }, [engine, defaultTheme]);

  const providerValue = useMemo(
    () => ({
      state,
      setTheme: (theme: BaseTheme) => {
        engine.setTheme(theme);
        setTheme(theme);
      },
      setStyle: (style: string) => engine.setStyle(style),
      setExtensionTheme: (extensionId: string, theme: string) =>
        engine.setExtensionTheme(extensionId, theme),
      getExtensionTheme: (extensionId: string) =>
        engine.getExtensionTheme(extensionId),
      // Next-themes compatibility
      theme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...defaultThemes, "system"] : defaultThemes,
      systemTheme: enableSystem
        ? (resolvedTheme as "light" | "dark")
        : undefined,
    }),
    [state, engine, theme, forcedTheme, resolvedTheme, enableSystem, setTheme],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          nonce,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}
