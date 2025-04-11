# @themesystem/config

## Purpose

The `@themesystem/config` package is a separate package for several important reasons:

1. **Separation of Concerns**

   - Configuration logic is isolated from core functionality
   - Makes the core package lighter and more focused
   - Allows for independent versioning of configuration features

2. **Framework Agnosticism**

   - Configuration can be used by any framework adapter
   - Each framework can extend the base config with its own options
   - Prevents framework-specific code from polluting the core

3. **Type Safety and Validation**

   - Provides robust TypeScript types for configuration
   - Runtime validation using Zod
   - Better developer experience with autocompletion

4. **Extensibility**
   - Easy to add new configuration options
   - Plugins can extend the config schema
   - Framework adapters can add their own config sections

## NPM Release Strategy

The config package will be released to npm in two ways:

1. **Bundled Release**

   - Included as a dependency in `@themesystem/core`
   - Most users won't need to install it separately
   - Version will match the core package

2. **Standalone Release**
   - Available as `@themesystem/config` for advanced users
   - Useful for creating custom framework adapters
   - Can be used independently for configuration management

## Usage

```typescript
// themesystem.config.ts
import { defineConfig } from "@themesystem/config";

export default defineConfig({
  themes: {
    light: { name: "Light" },
    dark: { name: "Dark" },
  },
  // ... other config options
});
```

## Development

When making changes to the config package:

1. Update types in `src/types.ts`
2. Add validation in the schema
3. Update documentation
4. Test with example configs
5. Consider backward compatibility
