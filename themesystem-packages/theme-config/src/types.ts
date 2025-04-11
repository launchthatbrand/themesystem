import { z } from "zod";

// Theme configuration
export const themeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type ThemeConfig = z.infer<typeof themeSchema>;

// Style configuration
export const styleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type StyleConfig = z.infer<typeof styleSchema>;

// Component extension configuration
export const componentExtensionSchema = z.object({
  variants: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
});

export type ComponentExtensionConfig = z.infer<typeof componentExtensionSchema>;

// Global extension configuration
export const globalExtensionSchema = z.record(z.string(), z.any());

export type GlobalExtensionConfig = z.infer<typeof globalExtensionSchema>;

// Storage configuration
export const storageSchema = z.object({
  key: z.string().default("theme-system-state"),
  type: z.enum(["localStorage", "cookie"]).default("localStorage"),
});

export type StorageConfig = z.infer<typeof storageSchema>;

// Framework configuration
export const frameworkSchema = z.object({
  nextjs: z
    .object({
      serverSideRendering: z.boolean().default(true),
      cookieOptions: z
        .object({
          path: z.string().default("/"),
          sameSite: z.enum(["strict", "lax", "none"]).default("lax"),
        })
        .optional(),
    })
    .optional(),
});

export type FrameworkConfig = z.infer<typeof frameworkSchema>;

// Plugin configuration
export const pluginSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  version: z.string(),
  extensions: z.record(z.string(), z.any()).optional(),
  middleware: z.array(z.any()).optional(),
});

export type PluginConfig = z.infer<typeof pluginSchema>;

// Main configuration schema
export const configSchema = z.object({
  themes: z.record(z.string(), themeSchema),
  styles: z.record(z.string(), styleSchema),
  extensions: z.object({
    components: z.record(z.string(), componentExtensionSchema),
    global: z.record(z.string(), globalExtensionSchema),
  }),
  storage: storageSchema,
  plugins: z.array(pluginSchema).optional(),
  framework: frameworkSchema.optional(),
});

export type ThemeSystemConfig = z.infer<typeof configSchema>;
