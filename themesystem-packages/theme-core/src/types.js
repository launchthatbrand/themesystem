"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
// Theme tokens schema
var themeTokensSchema = zod_1.z.object({
    colors: zod_1.z.record(zod_1.z.string()).optional(),
    typography: zod_1.z
        .object({
        fontFamily: zod_1.z.string().optional(),
        fontSize: zod_1.z.record(zod_1.z.string()).optional(),
        lineHeight: zod_1.z.record(zod_1.z.string()).optional(),
        fontWeight: zod_1.z.record(zod_1.z.string()).optional(),
    })
        .optional(),
    spacing: zod_1.z.record(zod_1.z.string()).optional(),
    borderRadius: zod_1.z.record(zod_1.z.string()).optional(),
    shadows: zod_1.z.record(zod_1.z.string()).optional(),
    transitions: zod_1.z.record(zod_1.z.string()).optional(),
});
// Component variant schema
var componentVariantSchema = zod_1.z.record(zod_1.z.object({
    base: zod_1.z.record(zod_1.z.string()),
    variants: zod_1.z.record(zod_1.z.record(zod_1.z.string())).optional(),
    sizes: zod_1.z.record(zod_1.z.record(zod_1.z.string())).optional(),
}));
// Extension target schema
var extensionTargetSchema = zod_1.z.object({
    dataAttribute: zod_1.z.string(),
    componentName: zod_1.z.string().optional(),
});
// Extension schema
var extensionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    target: extensionTargetSchema,
    cssPath: zod_1.z.string().optional(),
    theme: zod_1.z
        .object({
        tokens: themeTokensSchema.optional(),
        components: componentVariantSchema.optional(),
    })
        .optional(),
    config: zod_1.z.record(zod_1.z.unknown()).optional(),
});
// Config schema
var configSchema = zod_1.z.object({
    baseTheme: zod_1.z.enum(["light", "dark", "system"]).default("system"),
    styleTheme: zod_1.z.string().optional(),
    extensions: zod_1.z.record(zod_1.z.string(), extensionSchema).optional(),
    storage: zod_1.z
        .object({
        key: zod_1.z.string(),
        type: zod_1.z.enum(["localStorage", "cookie"]),
    })
        .optional(),
    framework: zod_1.z
        .object({
        nextjs: zod_1.z
            .object({
            serverSideRendering: zod_1.z.boolean().optional(),
            cookieOptions: zod_1.z
                .object({
                path: zod_1.z.string().optional(),
                sameSite: zod_1.z.enum(["lax", "strict", "none"]).optional(),
            })
                .optional(),
        })
            .optional(),
    })
        .optional(),
});
