import { z } from "zod";

// Base theme type (always light/dark/system)
export type BaseTheme = "light" | "dark" | "system";

// Theme tokens schema
const themeTokensSchema = z.object({
  colors: z.record(z.string()).optional(),
  typography: z
    .object({
      fontFamily: z.string().optional(),
      fontSize: z.record(z.string()).optional(),
      lineHeight: z.record(z.string()).optional(),
      fontWeight: z.record(z.string()).optional(),
    })
    .optional(),
  spacing: z.record(z.string()).optional(),
  borderRadius: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional(),
  transitions: z.record(z.string()).optional(),
});

// Component variant schema
const componentVariantSchema = z.record(
  z.object({
    base: z.record(z.string()),
    variants: z.record(z.record(z.string())).optional(),
    sizes: z.record(z.record(z.string())).optional(),
  }),
);

// Extension target schema (what the extension applies to)
const extensionTargetSchema = z.object({
  // Data attribute to target
  dataAttribute: z.string(),
  // Optional component name for type safety
  componentName: z.string().optional(),
});

// Extension schema
const extensionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  // What this extension applies to
  target: extensionTargetSchema,
  // Optional theme overrides
  theme: z
    .object({
      tokens: themeTokensSchema.optional(),
      components: componentVariantSchema.optional(),
    })
    .optional(),
  // Optional custom configuration
  config: z.record(z.unknown()).optional(),
});

// Main config schema
export const configSchema = z.object({
  // Base theme (light/dark/system)
  baseTheme: z.enum(["light", "dark", "system"]).default("system"),

  // Style theme (aggressive/brutalist/glass)
  styleTheme: z.string().optional(),

  // Extensions
  extensions: z.record(z.string(), extensionSchema).optional(),

  // Storage configuration
  storage: z
    .object({
      key: z.string(),
      type: z.enum(["localStorage", "cookie"]),
    })
    .optional(),

  // Framework-specific options
  framework: z
    .object({
      nextjs: z
        .object({
          serverSideRendering: z.boolean().optional(),
          cookieOptions: z
            .object({
              path: z.string().optional(),
              sameSite: z.enum(["lax", "strict", "none"]).optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

export type ThemeSystemConfig = z.infer<typeof configSchema>;
export type Extension = z.infer<typeof extensionSchema>;
export type ExtensionTarget = z.infer<typeof extensionTargetSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
export type ComponentVariant = z.infer<typeof componentVariantSchema>;
