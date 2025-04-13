"use client";

import type {
  BaseTheme,
  Theme,
  ThemeExtension,
  ThemeState,
  ThemeSystemConfig,
} from "@themesystem/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

interface ThemeContextValue {
  theme: string;
  style: string;
  currentTheme?: Theme;
  extensions: Record<string, ThemeExtension>;
  setTheme: (theme: string) => void;
  setStyle: (style: string) => void;
  // Next-themes compatibility
  resolvedTheme?: string;
  themes?: string[];
  systemTheme?: string;
  // Extension theme support
  setExtensionTheme?: (extensionId: string, theme: string) => void;
  getExtensionTheme?: (extensionId: string) => string | undefined;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  options?: {
    defaultTheme?: string;
    defaultStyle?: string;
  };
  defaultTheme?: string;
  defaultStyle?: string;
  attribute?: "class" | "data-theme";
  styleAttribute?: "class" | "data-theme-style";
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  styleStorageKey?: string;
  // Next-themes compatibility
  forcedTheme?: string;
  forcedStyle?: string;
  disableTransitionOnChange?: boolean;
  value?: Record<string, string>;
  styleValue?: Record<string, string>;
  nonce?: string;
  // Theme extensions
  config?: ThemeSystemConfig;
  extensions?: ThemeExtension[];
  target?: string | HTMLElement;
  onThemeChange?: (theme: string, target: HTMLElement) => void;
  onStyleChange?: (style: string, target: HTMLElement) => void;
}

const ThemeScript = React.memo(
  ({
    forcedTheme,
    forcedStyle,
    storageKey,
    styleStorageKey,
    attribute,
    styleAttribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    defaultStyle,
    value,
    styleValue,
    nonce,
  }: Omit<ThemeProviderProps, "children"> & {
    defaultTheme: string;
    defaultStyle: string;
  }) => {
    const scriptArgs = JSON.stringify([
      attribute,
      styleAttribute,
      storageKey,
      styleStorageKey,
      defaultTheme,
      defaultStyle,
      forcedTheme,
      forcedStyle,
      defaultThemes,
      value,
      styleValue,
      enableSystem,
      enableColorScheme,
    ]).slice(1, -1);

    return (
      <script
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        dangerouslySetInnerHTML={{
          __html: `(${script})(${scriptArgs})`,
        }}
      />
    );
  },
);

const ThemeStylesheet = React.memo(({ href }: { href: string }) => {
  console.log("Rendering ThemeStylesheet with href:", href);
  return (
    <link
      rel="stylesheet"
      href={href}
      data-theme-stylesheet=""
      precedence="high"
    />
  );
});

ThemeStylesheet.displayName = "ThemeStylesheet";

export function ThemeProvider({
  children,
  options,
  defaultTheme = "system",
  defaultStyle = "default",
  attribute = "data-theme",
  styleAttribute = "data-theme-style",
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  styleStorageKey = "theme-style",
  forcedTheme,
  forcedStyle,
  disableTransitionOnChange = false,
  value,
  styleValue,
  nonce,
  config,
  extensions,
  onThemeChange,
  onStyleChange,
}: ThemeProviderProps) {
  console.log("ThemeProvider initializing with:", {
    defaultTheme,
    defaultStyle,
    config,
    extensions,
  });

  const [engine] = useState(
    () =>
      new ThemeEngineImpl({
        defaultTheme: options?.defaultTheme as BaseTheme,
        defaultStyle: options?.defaultStyle,
      }),
  );
  const [state, setState] = useState<ThemeState>({
    theme: "system",
    style: "default",
    currentTheme: undefined,
    extensions: {},
  });

  const [theme, setThemeState] = useState(
    () => getTheme(storageKey, defaultTheme) || "light",
  );
  const [style, setStyleState] = useState(() => {
    const savedStyle = getTheme(styleStorageKey, defaultStyle);
    console.log("Initial style state:", { savedStyle, defaultStyle });
    return savedStyle || defaultStyle;
  });
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );

  // Get active stylesheets
  const activeStylesheets = useMemo(() => {
    // If engine.getStylesheets() doesn't exist, return empty array
    const sheets: Array<{ id: string; href: string }> = [];
    console.log("Active stylesheets:", sheets);
    return sheets;
  }, [state.style]);

  // Load config and setup extensions
  useEffect(() => {
    console.log("Loading config and extensions:", { config, extensions });
    // Safely handle the case where these methods might not exist
    if (config && typeof engine.getState === "function") {
      // Handle config
    }
    if (extensions) {
      // Handle extensions
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

      if (onThemeChange) {
        onThemeChange(resolved, d);
      }
    },
    [
      attribute,
      defaultTheme,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      nonce,
      value,
      onThemeChange,
    ],
  );

  const applyStyle = useCallback(
    (style: string) => {
      console.log("Applying style:", { style, styleValue });
      const name = styleValue ? styleValue[style] : style;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      if (styleAttribute === "class") {
        d.classList.remove(...(styleValue ? Object.values(styleValue) : []));
        if (name) d.classList.add(name);
      } else if (styleAttribute.startsWith("data-")) {
        if (name) {
          d.setAttribute(styleAttribute, name);
        } else {
          d.removeAttribute(styleAttribute);
        }
      }

      enable?.();

      if (onStyleChange) {
        onStyleChange(style, d);
      }
    },
    [
      styleAttribute,
      disableTransitionOnChange,
      nonce,
      styleValue,
      onStyleChange,
    ],
  );

  // Initial style application
  useEffect(() => {
    console.log("Initial style effect:", { style, forcedStyle });
    if (forcedStyle) {
      applyStyle(forcedStyle);
    } else if (style) {
      applyStyle(style);
    }
  }, []); // Run only once on mount

  // Style change effect
  useEffect(() => {
    console.log("Style change effect:", { style, forcedStyle });
    if (forcedStyle) {
      applyStyle(forcedStyle);
    } else if (style) {
      applyStyle(style);
    }
  }, [forcedStyle, style, applyStyle]);

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

  const setStyle = useCallback(
    (value: string | ((prev: string) => string)) => {
      if (typeof value === "function") {
        setStyleState((prevStyle) => {
          const newStyle = value(prevStyle);
          saveToLS(styleStorageKey, newStyle);
          return newStyle;
        });
      } else {
        setStyleState(value);
        saveToLS(styleStorageKey, value);
      }
    },
    [styleStorageKey],
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

  // LocalStorage event handling for theme
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

  // LocalStorage event handling for style
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== styleStorageKey) return;
      if (!e.newValue) {
        setStyle(defaultStyle);
      } else {
        setStyleState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setStyle, styleStorageKey, defaultStyle]);

  // Theme change effect
  useEffect(() => {
    if (forcedTheme) {
      applyTheme(forcedTheme);
    } else if (theme) {
      applyTheme(theme);
    }
  }, [forcedTheme, theme, applyTheme]);

  // Engine subscription - safely handle missing methods
  useEffect(() => {
    // Set initial state if getState exists
    if (typeof engine.getState === "function") {
      setState(engine.getState());
    }

    return () => {
      // Cleanup if needed
    };
  }, [engine]);

  const providerValue = useMemo(
    () => ({
      // Core state
      theme,
      style,
      currentTheme: state.currentTheme,
      extensions: state.extensions,

      // Core actions
      setTheme,
      setStyle,

      // Extension support
      setExtensionTheme: (_: string, __: string) => {
        // Safely handle this even if method doesn't exist
        console.log(`Setting extension theme`);
      },
      getExtensionTheme: () => {
        // Safely handle this even if method doesn't exist
        return undefined;
      },

      // Next-themes compatibility
      forcedTheme,
      forcedStyle,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...defaultThemes, "system"] : defaultThemes,
      systemTheme: enableSystem
        ? (resolvedTheme as "light" | "dark")
        : undefined,
    }),
    [
      state,
      theme,
      style,
      forcedTheme,
      forcedStyle,
      resolvedTheme,
      enableSystem,
      setTheme,
      setStyle,
    ],
  );

  return (
    <>
      {activeStylesheets.map((sheet: { id: string; href: string }) => {
        console.log("Rendering stylesheet:", sheet);
        return <ThemeStylesheet key={sheet.id} href={sheet.href} />;
      })}
      <ThemeScript
        forcedTheme={forcedTheme}
        forcedStyle={forcedStyle}
        storageKey={storageKey}
        styleStorageKey={styleStorageKey}
        attribute={attribute}
        styleAttribute={styleAttribute}
        enableSystem={enableSystem}
        enableColorScheme={enableColorScheme}
        defaultTheme={defaultTheme}
        defaultStyle={defaultStyle}
        value={value}
        styleValue={styleValue}
        nonce={nonce}
      />
      <ThemeContext.Provider value={providerValue}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
