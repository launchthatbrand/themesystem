import {
  ThemeEngineOptions,
  ThemeProvider,
  defineConfig,
  loadConfig,
} from "@themesystem/core";

import { ReactNode } from "react";
import { ThemeSystemConfig } from "@themesystem/config";
import { generateThemeScript } from "./utils";

export { defineConfig };

// Server-side script to prevent flash of unstyled content
const ServerThemeScript = ({ config }: { config: ThemeSystemConfig }) => {
  const generateThemeScript = ({
    defaultTheme,
    defaultStyle,
  }: {
    defaultTheme: string;
    defaultStyle: string;
  }) => {
    return `
      (function() {
        try {
          const savedTheme = localStorage.getItem('theme-system-state');
          const savedState = savedTheme ? JSON.parse(savedTheme) : null;
          const theme = savedState?.theme || '${defaultTheme}';
          const style = savedState?.style || '${defaultStyle}';
          
          document.documentElement.setAttribute('data-theme', theme);
          document.documentElement.setAttribute('data-style', style);
        } catch (e) {
          console.error('Error setting initial theme:', e);
        }
      })();
    `;
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: generateThemeScript({
          defaultTheme: config.baseTheme || "system",
          defaultStyle: config.styleTheme || "aggressive",
        }),
      }}
    />
  );
};

// Server-side provider
const ServerThemeProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: ThemeSystemConfig;
}) => {
  return (
    <>
      <ServerThemeScript config={config} />
      {children}
    </>
  );
};

// Client-side provider
const ClientThemeProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: ThemeSystemConfig;
}) => {
  const options: ThemeEngineOptions = {
    defaultTheme: config.baseTheme,
    defaultStyle: config.styleTheme,
    config,
  };

  return <ThemeProvider {...options}>{children}</ThemeProvider>;
};

// Create Next.js adapter
export const createNextAdapter = (config: ThemeSystemConfig) => {
  return {
    ServerThemeProvider: ({ children }: { children: ReactNode }) => (
      <ServerThemeProvider config={config}>{children}</ServerThemeProvider>
    ),
    ClientThemeProvider: ({ children }: { children: ReactNode }) => (
      <ClientThemeProvider config={config}>{children}</ClientThemeProvider>
    ),
  };
};

// Re-export types and utilities
export * from "./types";
export * from "./utils";

// Re-export core functionality
export * from "@themesystem/core";

// Re-export UI components
export * from "@themesystem/ui";

// Export Next.js specific components
export * from "./server-provider";
export * from "./client-provider";
