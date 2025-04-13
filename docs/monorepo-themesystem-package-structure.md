# Monorepo Package Structure Analysis

## Overview

This document analyzes the package structure of our monorepo, comparing the default Create T3 Turbo packages (@acme/api, @acme/auth, @acme/ui) with our custom ThemeSystem packages (@themesystem/\*), and provides a development gameplan for the ThemeSystem.

## Default T3 Turbo Packages Analysis

The default packages from Create T3 Turbo are designed for internal consumption within the monorepo, not as packages to be published to npm.

### Characteristics of Default Packages

1. **Private Flag**: All have `"private": true` in package.json, preventing npm publication
2. **Workspace Dependencies**: Use `workspace:*` for internal dependencies
3. **Simplified Export Structure**: Basic exports structure focusing on file paths
4. **Development Focus**: Scripts focused on the development workflow (lint, typecheck, format)

### Package-Specific Analysis

#### @acme/api

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./src/index.ts"
    }
  }
}
```

- Direct access to source files (not pre-built)
- No build step required for local development
- Expected to be consumed by Next.js and leverages Next.js's transpilation

#### @acme/auth

```json
{
  "exports": {
    ".": {
      "react-server": "./src/index.rsc.ts",
      "default": "./src/index.ts"
    },
    "./env": "./env.ts"
  }
}
```

- RSC-aware exports (react-server condition)
- No pre-built assets, consumed directly through source
- Multiple entry points (base and env)

#### @acme/ui

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./styles.css": "./src/styles.css",
    "./*": "./src/*.tsx"
  }
}
```

- Granular access to individual components via path import
- CSS exported separately
- Direct source file consumption

## ThemeSystem Packages Analysis

The ThemeSystem packages are set up more like traditional npm packages that could be published, with a focus on clear interfaces between packages.

### Characteristics of ThemeSystem Packages

1. **Build Step Requirement**: Most require a build step before usage
2. **Type Definitions**: Explicit type exports
3. **Clearer Boundaries**: More explicit packaging with main/types/files fields
4. **Distribution Ready**: Configured to prepare distributable files
5. **CSS Handling**: Special handling for CSS files (copy during build)

### Package-Specific Analysis

#### @themesystem/types

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./src/index.js"
    },
    "./core": {
      "types": "./dist/core.d.ts",
      "default": "./src/core.js"
    },
    "./config": {
      "types": "./dist/config.d.ts",
      "default": "./src/config.js"
    },
    "./extensions": {
      "types": "./dist/extensions.d.ts",
      "default": "./src/extensions.js"
    }
  }
}
```

- Multiple subpath exports for granular type access
- Clear separation of types by domain
- JavaScript output for runtime usage

#### @themesystem/glass (Theme Package)

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "style": "dist/glass.css",
  "files": ["dist", "src"]
}
```

- Traditional npm package structure
- Special handling for CSS via "style" field
- Explicit build step with file copying

#### @themesystem/core

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./src/index.js"
    },
    "./types": {
      "types": "./dist/types.d.ts",
      "default": "./src/types.js"
    }
  }
}
```

- Clear interface with types exported
- Multiple entry points
- Requires build step (tsc)

## Key Differences

1. **Development vs. Publication**:

   - Default packages: Optimized for rapid development within the monorepo
   - ThemeSystem packages: Structured for potential publication and clearer boundaries

2. **Source vs. Built Artifacts**:

   - Default packages: Primarily source file references
   - ThemeSystem packages: Built artifacts with type declarations

3. **TypeScript Configuration**:

   - Default packages: Integrated with monorepo TS config
   - ThemeSystem packages: More standalone configurations

4. **CSS Handling**:

   - Default packages: Direct CSS imports
   - ThemeSystem packages: CSS copied to dist folder during build

5. **Export Structure**:
   - Default packages: Simpler exports
   - ThemeSystem packages: More explicit subpath exports

## Development Gameplan for ThemeSystem

For optimal development of the ThemeSystem within this monorepo, here's a recommended approach:

### 1. Package Structure Optimization

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./src/index.ts" // Point to source during development
    }
  }
}
```

- During development, point `default` to source files
- For publication, switch to built artifacts

### 2. TypeScript Project References

- Implement TypeScript project references to optimize build times
- Add a root tsconfig.build.json that includes all packages with project references

### 3. Streamlined Build Process

- Use `turbo` for optimal dependency-aware building
- Add watch modes for hot module reloading

```json
{
  "build": "turbo run build",
  "dev": "turbo run dev --parallel",
  "dev:theme": "turbo run dev --filter=@themesystem/* --parallel"
}
```

### 4. Development Workflow

1. **Initial Setup**:

   - Run `pnpm build` to generate all necessary type definitions
   - This ensures TypeScript is happy across the monorepo

2. **Development Mode**:

   - Run `pnpm dev:theme` to start dev mode for all theme packages
   - This will start all relevant watch processes in parallel

3. **Theme Development**:

   - When working on themes:
     - Work on theme package (e.g., @themesystem/glass)
     - Changes will be automatically picked up by core via HMR
     - Core will register themes automatically

4. **Clean Build**:
   - Before committing: `pnpm build:theme` to ensure clean builds

### 5. Package.json Template for Theme Packages

```json
{
  "name": "@themesystem/theme-name",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./src/index.ts"
    },
    "./styles": {
      "default": "./src/styles.css"
    }
  },
  "scripts": {
    "build": "tsc && npm run copy-files",
    "copy-files": "copyfiles -u 1 src/**/*.css dist/",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@themesystem/types": "workspace:*"
  }
}
```

### 6. Declaration Files Strategy

For proper type resolution across packages, ensure each theme package properly exports its types:

```ts
// In theme package index.ts
import type { Theme, ThemeConfig } from "@themesystem/types";

export const themeConfig: ThemeConfig = {
  /* ... */
};
export const theme: Theme = {
  /* ... */
};

// Re-export types for better discoverability
export type { Theme, ThemeConfig };
```

This helps with type resolution and prevents the need for declaration files in consuming packages.

### 7. TypeScript Configuration for Hot Module Reloading

In tsconfig.json for theme packages:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "composite": true,
    "incremental": true
  }
}
```

The `incremental` and `composite` flags optimize rebuilds during development.

## Conclusion

The default T3 Turbo packages are designed for internal monorepo consumption with minimal overhead, while the ThemeSystem packages are structured more like traditional publishable packages with clear boundaries.

For the best development experience, a hybrid approach is recommended: using source files during development for hot reloading, but maintaining the structure needed for proper type checking and eventual publication.

By implementing the gameplan outlined above, you'll have a streamlined development workflow with hot module reloading while maintaining the separation of concerns needed for a modular theme system.
