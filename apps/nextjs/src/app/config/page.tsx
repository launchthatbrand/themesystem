import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui/components/tabs";

import { Button } from "@acme/ui/components/button";
import Link from "next/link";

export default function ConfigPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Theme Configuration
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Configure your theme system with a powerful TypeScript API
        </p>
      </div>

      <Tabs defaultValue="basic" className="w-full max-w-6xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Config</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>
                Configure the essential theme system options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`import { defineThemeConfig } from "@acme/theme-system";

export default defineThemeConfig({
  // Enable light/dark mode with system preference detection
  baseTheme: {
    default: "system", // "light", "dark", or "system"
    storageKey: "theme-mode", // localStorage key
  },
  
  // Define available themes
  themes: [
    {
      id: "glass",
      name: "Glass",
      description: "Clean, minimal glass-like interface",
      preview: "/previews/glass.png",
      variables: {
        "--glass-background": "rgba(255, 255, 255, 0.8)",
        "--glass-border": "1px solid rgba(255, 255, 255, 0.2)",
        "--glass-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
        "--glass-radius": "12px",
      },
    },
    {
      id: "brutalist",
      name: "Brutalist",
      description: "Bold, raw, and uncompromising",
      preview: "/previews/brutalist.png",
      variables: {
        "--brutalist-background": "#f0f0f0",
        "--brutalist-border": "2px solid #000",
        "--brutalist-shadow": "4px 4px 0px #000",
        "--brutalist-radius": "0px",
      },
    },
  ],
  
  // Default theme settings
  defaultStyle: "glass",
  
  // Permission settings
  permissions: {
    baseTheme: "user", // Who can change the base theme
    themeLibrary: "user", // Who can change the theme style
    extensions: "user", // Who can use extensions
  },
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
              <CardDescription>
                Fine-tune your theme system with advanced options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`import { defineThemeConfig } from "@acme/theme-system";

export default defineThemeConfig({
  // Basic configuration
  baseTheme: {
    default: "system",
    storageKey: "theme-mode",
    cookieOptions: {
      // Cookie options for SSR
      expires: 365, // days
      path: "/",
      sameSite: "lax",
    },
  },
  
  // Theme definitions with hierarchy
  themes: [
    // Base themes that others can extend
    {
      id: "base-light",
      name: "Base Light",
      internal: true, // Not shown in UI
      variables: {
        "--background": "#ffffff",
        "--foreground": "#000000",
        // ... other base variables
      },
    },
    {
      id: "base-dark",
      name: "Base Dark",
      internal: true,
      variables: {
        "--background": "#1a1a1a",
        "--foreground": "#ffffff",
        // ... other base variables
      },
    },
    
    // Actual themes that extend base themes
    {
      id: "glass",
      name: "Glass",
      description: "Clean, minimal glass-like interface",
      preview: {
        strategy: "static",
        asset: "/previews/glass.png",
      },
      extends: ["base-light", "base-dark"], // Extends different base themes depending on mode
      variables: {
        "--card-bg": "rgba(var(--rgb-background), 0.7)",
        "--card-border": "1px solid rgba(var(--rgb-foreground), 0.1)",
        // ... other theme-specific variables
      },
      variants: {
        // Theme variants
        "high-contrast": {
          "--card-bg": "var(--background)",
          "--card-border": "2px solid var(--foreground)",
        },
        "no-blur": {
          "--backdrop-filter": "none",
        },
      },
    },
  ],
  
  // Extension configurations
  extensions: {
    // Register known extensions
    registered: ["code-editor", "dashboard", "form-builder"],
    
    // Default extension themes
    defaults: {
      "code-editor": "monokai",
      "dashboard": "minimal",
    },
    
    // Extension permissions
    permissions: {
      "code-editor": "user",
      "dashboard": "admin",
    },
  },
  
  // Performance optimizations
  performance: {
    injectCriticalStyles: true,
    preloadThemes: ["glass"], // Preload commonly used themes
    dynamicLoading: true, // Load themes on demand
  },
  
  // Debug settings (development only)
  debug: {
    enabled: process.env.NODE_ENV === "development",
    logStateChanges: true,
    visualizeThemeChanges: true,
  },
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Examples</CardTitle>
              <CardDescription>
                Sample configurations for different use cases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold">Enterprise Setup</h3>
                <p className="mb-2 mt-1 text-sm text-muted-foreground">
                  Configuration for enterprise applications with admin controls
                </p>
                <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                  <pre className="text-xs">
                    <code>{`export default defineThemeConfig({
  baseTheme: { default: "light" },
  themes: [...enterpriseThemes],
  defaultStyle: "corporate",
  permissions: {
    baseTheme: "user",      // Users can toggle dark mode
    themeLibrary: "admin",  // Only admins can change theme style
    extensions: "admin",    // Only admins can use extensions
  },
  branding: {
    logoLight: "/logo-light.svg",
    logoDark: "/logo-dark.svg",
    primaryColor: "#0055FF",
  },
});`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Creative Platform</h3>
                <p className="mb-2 mt-1 text-sm text-muted-foreground">
                  Configuration for creative tools with extensive user
                  customization
                </p>
                <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                  <pre className="text-xs">
                    <code>{`export default defineThemeConfig({
  baseTheme: { default: "system" },
  themes: [...creativeThemes],
  defaultStyle: "minimal",
  permissions: {
    baseTheme: "user",     // Full customization
    themeLibrary: "user",  // Full customization
    extensions: "user",    // Full customization
  },
  userCustomThemes: {
    enabled: true,
    maxCustomThemes: 5,
    shareableThemes: true,
  },
});`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Education Platform</h3>
                <p className="mb-2 mt-1 text-sm text-muted-foreground">
                  Configuration for educational platforms with role-based
                  permissions
                </p>
                <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                  <pre className="text-xs">
                    <code>{`export default defineThemeConfig({
  baseTheme: { default: "light" },
  themes: [...educationThemes],
  defaultStyle: "accessible",
  permissions: {
    // Role-based permissions
    baseTheme: {
      student: true,
      teacher: true,
      admin: true,
    },
    themeLibrary: {
      student: ["accessible", "focused", "dyslexia-friendly"],
      teacher: true, // All themes
      admin: true,   // All themes
    },
    extensions: {
      student: ["calculator", "notepad"],
      teacher: true,
      admin: true,
    },
  },
  accessibility: {
    enforceMinimumContrast: true,
    adaptiveTextSize: true,
  },
});`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
