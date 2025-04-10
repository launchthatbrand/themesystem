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

export default function TypeScriptPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          TypeScript Support
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fully typed APIs for a smooth development experience
        </p>
      </div>

      <Tabs defaultValue="core" className="w-full max-w-6xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core">Core Types</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Type Definitions</CardTitle>
              <CardDescription>
                Type definitions for the theme system core
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`/**
 * Base theme type
 */
export type BaseTheme = "light" | "dark" | "system";

/**
 * Permission level type
 */
export type PermissionLevel = "user" | "admin" | "none";

/**
 * Theme definition interface
 */
export interface ThemeDefinition {
  /**
   * Unique identifier for the theme
   */
  id: string;

  /**
   * Human-readable name of the theme
   */
  name: string;

  /**
   * Detailed description of the theme's style
   */
  description: string;

  /**
   * Preview configuration
   */
  preview:
    | string
    | {
        /**
         * Preview strategy to use
         */
        strategy: "static" | "dynamic" | "component";

        /**
         * URL to the preview image (for static strategy)
         */
        asset?: string;

        /**
         * Component IDs to include in the preview (for component strategy)
         */
        components?: string[];
      };

  /**
   * CSS variables used by the theme
   */
  variables: Record<string, string>;
  
  /**
   * Optional parent theme IDs to extend
   */
  extends?: string[];
  
  /**
   * Optional theme variants
   */
  variants?: Record<string, Partial<Record<string, string>>>;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /**
   * Available themes
   */
  themes: ThemeDefinition[];
  
  /**
   * Default theme (light/dark/system)
   */
  defaultTheme?: BaseTheme;
  
  /**
   * Default theme style
   */
  defaultStyle?: string;
  
  /**
   * Permission configuration
   */
  permissions?: {
    baseTheme?: PermissionLevel;
    themeLibrary?: PermissionLevel;
    extensions?: PermissionLevel;
  };
  
  /**
   * Extension configuration
   */
  extensions?: Record<string, any>;
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Provider Component Types</CardTitle>
              <CardDescription>
                Type definitions for the provider components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`/**
 * UnifiedThemeProvider props
 */
export interface ThemeProviderProps {
  /**
   * Child components
   */
  children: ReactNode;
  
  /**
   * Theme configuration
   */
  config: ThemeConfig;
  
  /**
   * User role for permission checks
   * @default "user"
   */
  userRole?: string;
  
  /**
   * Initial debug mode state
   * @default false
   */
  initialDebugMode?: boolean;
  
  /**
   * Server-provided values (will be undefined in client components)
   */
  serverBaseTheme?: BaseTheme;
  serverThemeStyle?: string | undefined;
  serverExtensions?: Record<string, unknown> | null;
}

/**
 * ServerThemeProvider props
 */
export interface ServerThemeProviderProps {
  /**
   * Child components
   */
  children: ReactNode;
  
  /**
   * Theme configuration
   */
  config: ThemeConfig;
  
  /**
   * User role for permission checks
   * @default "user"
   */
  userRole?: string;
  
  /**
   * Initial debug mode state
   * @default false
   */
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
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hooks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hook Types</CardTitle>
              <CardDescription>
                Type definitions for the theme hooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`/**
 * useTheme hook return type
 */
export interface ThemeContextType {
  /**
   * Base theme (light/dark)
   */
  baseTheme: BaseTheme;
  
  /**
   * Set the base theme
   */
  setBaseTheme: (theme: BaseTheme) => void;
  
  /**
   * Whether dark mode is currently active
   */
  isDarkMode: boolean;

  /**
   * Current theme style
   */
  themeStyle: string;
  
  /**
   * Set the theme style
   */
  setThemeStyle: (style: string) => void;
  
  /**
   * Available themes
   */
  availableThemes: ThemeDefinition[];

  /**
   * Extensions system
   */
  extensions: Record<string, unknown>;
  
  /**
   * Get an extension value
   */
  getExtension: <T>(extensionId: string) => T | undefined;
  
  /**
   * Set an extension theme
   */
  setExtensionTheme: <T>(extensionId: string, theme: T) => void;

  /**
   * Permission checks
   */
  canChangeBaseTheme: boolean;
  canChangeThemeStyle: boolean;
  canUseExtensions: boolean;

  /**
   * Debug/utility
   */
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  logThemeState: () => void;
}

/**
 * useThemeExtension hook return type
 */
export interface ThemeExtensionHookResult<T> {
  /**
   * Current extension theme value
   */
  theme: T | undefined;
  
  /**
   * Set the extension theme
   */
  setTheme: (value: T) => void;
  
  /**
   * Reset to default
   */
  resetToDefault: () => void;
  
  /**
   * Whether the user has permission to change this extension
   */
  canModify: boolean;
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extensions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Extension Types</CardTitle>
              <CardDescription>
                Type definitions for the theme extension system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`/**
 * Theme extension definition
 */
export interface ThemeExtensionDefinition<T = any> {
  /**
   * Unique identifier for the extension
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * Extension version
   */
  version: string;
  
  /**
   * Default theme value
   */
  defaultTheme?: T;
  
  /**
   * Available themes for this extension
   */
  themes?: Array<{
    id: string;
    name: string;
    description?: string;
    preview?: string;
    value: T;
  }>;
  
  /**
   * Initialization function
   */
  initialize?: (context: ThemeContextType) => void;
  
  /**
   * Cleanup function
   */
  cleanup?: () => void;
}

/**
 * Extension manager API
 */
export interface ThemeExtensionManager {
  /**
   * Register a new extension
   */
  register: <T>(extension: ThemeExtensionDefinition<T>) => void;
  
  /**
   * Get an extension by ID
   */
  getExtension: <T>(extensionId: string) => ThemeExtensionDefinition<T> | undefined;
  
  /**
   * Get the current value of an extension
   */
  getExtensionValue: <T>(extensionId: string) => T | undefined;
  
  /**
   * Set the value of an extension
   */
  setExtensionValue: <T>(extensionId: string, value: T) => void;
  
  /**
   * Get all registered extensions
   */
  getAllExtensions: () => Record<string, ThemeExtensionDefinition>;
}

/**
 * Extension creation result
 */
export interface ThemeExtensionResult<T> {
  /**
   * Extension definition
   */
  extension: ThemeExtensionDefinition<T>;
  
  /**
   * Hook to use this extension in components
   */
  useTheme: () => ThemeExtensionHookResult<T>;
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Type Inference Examples</CardTitle>
          <CardDescription>
            The theme system provides excellent type inference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
            <pre className="text-xs">
              <code>{`import { useTheme, createThemeExtension } from "@acme/theme-system";

// Example of type inference with the theme system
function Example() {
  // All theme properties are fully typed
  const { 
    baseTheme,          // typed as BaseTheme
    themeStyle,         // typed as string
    isDarkMode,         // typed as boolean
    availableThemes,    // typed as ThemeDefinition[]
    setBaseTheme,       // typed as (theme: BaseTheme) => void
    setThemeStyle,      // typed as (style: string) => void
  } = useTheme();
  
  // Auto-completion works for available themes
  const glassTheme = availableThemes.find(theme => theme.id === "glass");
  // Access typed variables
  const glassBackground = glassTheme?.variables["--glass-background"]; // string
  
  // Extension types are also inferred
  type CodeTheme = {
    background: string;
    text: string;
    keywords: string;
  };
  
  // Create a strongly typed extension
  const codeEditorTheme = createThemeExtension<CodeTheme>({
    id: "code-editor",
    name: "Code Editor",
    themes: [
      {
        id: "monokai",
        name: "Monokai",
        value: {
          background: "#272822",
          text: "#f8f8f2",
          keywords: "#f92672",
        },
      },
    ],
  });
  
  // Use the typed extension
  const { theme, setTheme } = codeEditorTheme.useTheme();
  
  // Type safety and auto-completion
  return (
    <div style={{ background: theme?.background }}>
      <p style={{ color: theme?.text }}>
        Theme styles are fully typed!
      </p>
      <button onClick={() => setBaseTheme("dark")}>Dark Mode</button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/docs/typescript">Read TypeScript Documentation</Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
