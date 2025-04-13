import type { ThemeSystemConfig } from "@themesystem/types";
import { ReactNode } from "react";
import { ThemeProvider } from "@themesystem/core";
import { ThemeToggle, ThemeSelector } from "@themesystem/ui";

// import { useThemeConfig } from "./provider";
import { generateThemeScript } from "./utils";

// const defaultConfig: ThemeSystemConfig = {
//   baseTheme: "light",
//   styleTheme: "default",
//   themes: {
//     light: {
//       name: "Light",
//       description: "Light theme",
//     },
//     dark: {
//       name: "Dark",
//       description: "Dark theme",
//     },
//   },
//   styles: {
//     default: {
//       name: "Default",
//       description: "Default style",
//     },
//   },
// };

// const ServerThemeScript = ({ config }: { config: ThemeSystemConfig }) => {
//   const script = generateThemeScript({
//     defaultTheme: config.baseTheme || "light",
//     defaultStyle: config.styleTheme || "",
//   });

//   return <script dangerouslySetInnerHTML={{ __html: script }} />;
// };

// const ClientThemeProvider = ({
//   children,
//   config,
// }: {
//   children: ReactNode;
//   config: ThemeSystemConfig;
// }) => {
//   return (
//     <ThemeProvider
//       defaultTheme={config.baseTheme}
//       defaultStyle={config.styleTheme}
//       enableSystem={true}
//       storageKey="theme-system-state"
//     >
//       {children}
//     </ThemeProvider>
//   );
// };

// export function createThemeProvider(config: ThemeSystemConfig = defaultConfig) {
//   return {
//     ThemeScript: () => <ServerThemeScript config={config} />,
//     ThemeProvider: ({ children }: { children: ReactNode }) => (
//       <ClientThemeProvider config={config}>{children}</ClientThemeProvider>
//     ),
//   };
// }

// Re-export types and utils
// export * from "./types";
// export * from "./utils";

// // Re-export core functionality
// export * from "@themesystem/core";

// // Re-export UI components
// export * from "@themesystem/ui";

// Export Next.js specific components
export { ThemeProvider, ThemeToggle, useThemeConfig, ThemeSelector };
