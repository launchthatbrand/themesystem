Analysis of the current types situation:
Duplicate Types:
The Theme interface is defined in both theme-types and theme-core
The ThemeSystemConfig interface exists in both packages
These duplicates have slightly different structures, which could lead to type conflicts
Current Structure Issues:
theme-types package seems to be the intended central location for types
However, theme-core has its own extensive type definitions
theme-nextjs correctly imports types from theme-core
The type definitions in theme-core are more complete and include Zod schemas
Package-Specific vs. Shared Types:
Package-specific types (like NextThemeProviderProps in theme-nextjs) are correctly placed in their respective packages
Core types (like Theme, ThemeConfig) are duplicated
Some types are tightly coupled with implementation (like Zod schemas in theme-core)
Recommendations:
Centralize Core Types:
Move all shared types to @themesystem/types:
Base types like Theme, ThemeConfig, BaseTheme
Common interfaces used across packages
Remove these from theme-core
Keep Implementation-Specific Types:
Each package should maintain:
Component props interfaces
Package-specific utility types
Implementation details (like internal state types)
Separate Validation:
Move Zod schemas to a separate package (e.g., @themesystem/validation)
This separates runtime validation from TypeScript types
Type Organization:
@themesystem/types/
├── core.ts # Core types (Theme, BaseTheme)
├── config.ts # Configuration types
├── extensions.ts # Extension system types
└── index.ts # Re-exports

@themesystem/validation/
├── schemas/ # Zod schemas
└── index.ts # Re-exports
Dependencies:
Make @themesystem/types a dependency of all packages
Ensure no circular dependencies
Keep validation optional for packages that don't need it
This approach would:
Reduce duplication
Improve type consistency
Make the system more maintainable
Allow for better versioning of types
Separate runtime validation from type definitions
Would you like me to help implement any of these recommendations?
