import { ClientThemeProvider } from "./client-provider";
import { ServerThemeProvider } from "./server-provider";
import { ThemeEngineOptions } from "@themesystem/core";
import { generateThemeScript } from "./utils";
import { loadConfig } from "@themesystem/config";

export function createNextAdapter(options: {
  config?: ThemeEngineOptions["config"];
}) {
  const config = loadConfig(options.config);

  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <ClientThemeProvider config={config}>{children}</ClientThemeProvider>
    ),
    ServerThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <ServerThemeProvider
        defaultTheme={config.themes.system?.name || "system"}
        defaultStyle={config.styles.default?.name || "default"}
      >
        {children}
      </ServerThemeProvider>
    ),
    ServerThemeScript: () => (
      <script
        dangerouslySetInnerHTML={{
          __html: generateThemeScript({
            defaultTheme: config.themes.system?.name || "system",
            defaultStyle: config.styles.default?.name || "default",
          }),
        }}
      />
    ),
  };
}

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
