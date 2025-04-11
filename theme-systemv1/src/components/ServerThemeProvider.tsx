"use server";

import {
  APP_EXTENSION_THEMES_KEY,
  BASE_THEME_KEY,
  BaseTheme,
  THEME_STYLE_KEY,
} from "./theme-constants";
import type { ReactElement, ReactNode } from "react";
import { ThemeConfig, UnifiedThemeProvider } from "./UnifiedThemeProvider";

import React from "react";
import Script from "next/script";
import { ThemeSwitcher } from "./FloatingThemeSwitcher";
import { cookies } from "next/headers";

// Helper to parse JSON safely
const parseJson = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
};

// Create a critical CSS string to prevent flash of unstyled content
const criticalCss = `
  /* Block rendering until custom properties are available */
  html.theme-initializing {
    display: none !important;
  }
  
  /* Fallback for browsers that disable JS */
  html.theme-initializing:not(:has(script[data-theme-init-executed])) {
    display: block !important;
  }
`;

// Create the theme initialization script content
function createThemeScript() {
  return `
    (function() {
      // Add initialization class immediately to block rendering
      document.documentElement.classList.add('theme-initializing');
      
      try {
        console.log("[ThemeSystem] Starting theme initialization");
        
        // Mark the script as executed for browsers with JS disabled
        // This line is now redundant since we're adding the attribute directly to the script tag
        // document.currentScript.setAttribute('data-theme-init-executed', 'true');
        
        // Utility functions
        function getCookie(name) {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? match[2] : null;
        }
        
        function getFromStorage(key, defaultValue) {
          try {
            // Try cookie first
            const cookieValue = getCookie(key);
            if (cookieValue) {
              console.log("[ThemeSystem] Found in cookie:", key, cookieValue);
              return cookieValue;
            }
            
            // Then try localStorage
            const localValue = localStorage.getItem(key);
            if (localValue) {
              console.log("[ThemeSystem] Found in localStorage:", key, localValue);
              return localValue;
            }
          } catch (e) {
            console.warn("[ThemeSystem] Error accessing storage:", e);
          }
          
          console.log("[ThemeSystem] Using default for", key, defaultValue);
          return defaultValue;
        }
        
        // Get theme preferences with defaults
        const baseTheme = getFromStorage("${BASE_THEME_KEY}", "system");
        const themeStyle = getFromStorage("${THEME_STYLE_KEY}", "glass");
        
        console.log("[ThemeSystem] Theme values:", { baseTheme, themeStyle });
        
        // Function to apply the theme
        function applyTheme() {
          const root = document.documentElement;
          
          // Apply base theme (light/dark)
          root.classList.remove('light', 'dark');
          
          let effectiveBaseTheme;
          if (baseTheme === "system") {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            effectiveBaseTheme = systemPrefersDark ? 'dark' : 'light';
            root.classList.add(effectiveBaseTheme);
            console.log("[ThemeSystem] Applied system preference:", effectiveBaseTheme);
          } else {
            root.classList.add(baseTheme);
            effectiveBaseTheme = baseTheme;
            console.log("[ThemeSystem] Applied explicit theme:", baseTheme);
          }
          
          // Apply theme style
          // First remove any existing theme classes
          const existingClasses = Array.from(root.classList);
          existingClasses.forEach(cls => {
            if (cls.startsWith("theme-")) {
              root.classList.remove(cls);
            }
          });
          
          // Known theme IDs to remove directly
          const knownThemes = ["glass", "brutalist", "aggressive", "minimal", "modern"];
          knownThemes.forEach(theme => {
            if (root.classList.contains(theme)) {
              root.classList.remove(theme);
            }
          });
          
          // Apply current theme style
          root.classList.add('theme-' + themeStyle);
          root.classList.add(themeStyle);
          console.log("[ThemeSystem] Applied theme style:", themeStyle);
          
          // Add a completed class for potential CSS targeting
          root.classList.add('theme-initialized');
          
          // Remove the initializing class to allow rendering
          // This is done at the very end to ensure the theme is fully applied
          setTimeout(() => {
            root.classList.remove('theme-initializing');
            console.log("[ThemeSystem] Theme initialization complete");
          }, 0);
        }
        
        // Apply the theme synchronously to avoid flash
        applyTheme();
        
        // Set up listener for system theme changes if needed
        if (baseTheme === "system") {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(e.matches ? 'dark' : 'light');
            console.log("[ThemeSystem] System preference changed:", e.matches ? 'dark' : 'light');
          });
        }
      } catch (e) {
        console.error("[ThemeSystem] Error during theme initialization:", e);
        // Remove the initializing class to ensure content is shown even if there's an error
        document.documentElement.classList.remove('theme-initializing');
      }
    })();
  `;
}

/**
 * Internal component that injects theme initialization scripts and styles
 */
function ThemeInitScripts() {
  return (
    <>
      {/* Critical CSS to prevent flash */}
      <style
        id="theme-critical-css"
        dangerouslySetInnerHTML={{ __html: criticalCss }}
      />

      {/* Main script for immediate theme application */}
      <script
        id="theme-init-script"
        data-theme-init-executed="true"
        dangerouslySetInnerHTML={{
          __html: createThemeScript(),
        }}
      />

      {/* Fallback script for reliability */}
      <Script
        id="theme-fallback-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!document.documentElement.classList.contains('theme-initialized')) {
              console.log("[ThemeSystem] Fallback script running");
              ${createThemeScript()}
            }
          `,
        }}
      />
    </>
  );
}

// ServerThemeProvider props
export interface ServerThemeProviderProps {
  children: ReactNode;
  config: ThemeConfig;
  userRole?: string;
  initialDebugMode?: boolean;

  /**
   * Whether to show the theme switcher
   * @default true
   */
  showThemeSwitcher?: boolean;

  /**
   * Position of the theme switcher
   * @default "bottom-right"
   */
  themeSwitcherPosition?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left";

  /**
   * Additional CSS class for the theme switcher
   */
  themeSwitcherClassName?: string;
}

/**
 * ServerThemeProvider - A comprehensive server component that:
 * 1. Reads cookies server-side for theme preferences
 * 2. Injects theme initialization scripts to prevent flashing
 * 3. Can wrap the entire HTML document to provide theme context
 * 4. Optionally includes a ThemeSwitcher component
 *
 * This component should be used in app/ directory layouts to wrap the
 * HTML element, enabling server-side cookie reading and proper theme
 * initialization.
 *
 * Example:
 * ```tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <ServerThemeProvider
 *       config={{ themes, defaultTheme: "system" }}
 *       showThemeSwitcher={true}
 *       themeSwitcherPosition="bottom-right"
 *     >
 *       <html lang="en">
 *         <body>{children}</body>
 *       </html>
 *     </ServerThemeProvider>
 *   );
 * }
 * ```
 */
export async function ServerThemeProvider({
  children,
  config,
  userRole = "user",
  initialDebugMode = false,
  showThemeSwitcher = true,
  themeSwitcherPosition = "bottom-right",
  themeSwitcherClassName,
}: ServerThemeProviderProps) {
  // Read cookies on the server side
  const cookieStore = cookies();

  // Get initial values from cookies
  const initialBaseTheme = cookieStore.get(BASE_THEME_KEY)?.value as
    | BaseTheme
    | undefined;
  const initialThemeStyle =
    cookieStore.get(THEME_STYLE_KEY)?.value || undefined;

  // Parse extensions from cookie if it exists
  const extensionsRaw =
    cookieStore.get(APP_EXTENSION_THEMES_KEY)?.value || null;
  const initialExtensions = parseJson(extensionsRaw);

  // Process the children to inject scripts and ThemeSwitcher properly
  let processedChildren: ReactNode = children;

  // Check if children is a valid React element (the html element)
  if (React.isValidElement(children) && children.type === "html") {
    const htmlElement = children as ReactElement;
    const htmlChildren = React.Children.toArray(htmlElement.props.children);

    let headElement: ReactElement | null = null;
    let bodyElement: ReactElement | null = null;
    const otherElements: ReactNode[] = [];

    // Find and process the head and body elements
    htmlChildren.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === "head") {
          // Add our scripts to the head
          headElement = React.cloneElement(
            child,
            {},
            <>
              <ThemeInitScripts />
              {child.props.children}
            </>,
          );
        } else if (child.type === "body") {
          // Add ThemeSwitcher to the body if enabled
          if (showThemeSwitcher) {
            bodyElement = React.cloneElement(
              child,
              {},
              <>
                {child.props.children}
                <ThemeSwitcher
                  position={themeSwitcherPosition}
                  className={themeSwitcherClassName}
                />
              </>,
            );
          } else {
            bodyElement = child;
          }
        } else {
          otherElements.push(child);
        }
      } else {
        otherElements.push(child);
      }
    });

    // Recreate the HTML structure
    const newHtmlChildren = [headElement, bodyElement, ...otherElements].filter(
      Boolean,
    );

    processedChildren = React.cloneElement(
      htmlElement,
      htmlElement.props,
      newHtmlChildren,
    );
  }

  // Provide the theme context to the entire document
  return (
    <UnifiedThemeProvider
      children={processedChildren}
      config={config}
      userRole={userRole}
      initialDebugMode={initialDebugMode}
      serverBaseTheme={initialBaseTheme}
      serverThemeStyle={initialThemeStyle}
      serverExtensions={initialExtensions}
    />
  );
}
