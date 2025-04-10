/**
 * Represents a theme in the ACME Theme System
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
}

/**
 * Preview provider interface
 */
export interface ThemePreviewProvider {
  /**
   * Generate a preview image for a theme
   */
  generatePreview(theme: ThemeDefinition): Promise<string>;
}

/**
 * Theme configuration options
 */
export interface ThemeSystemConfig {
  /**
   * Default theme to use
   */
  defaultTheme: string;

  /**
   * Strategy for previewing themes
   */
  previewStrategy: "static" | "dynamic" | "hybrid" | "iframe" | "component";

  /**
   * Whether to generate previews for themes that don't have them
   */
  generateMissingPreviews: boolean;

  /**
   * Components to include in component-based previews
   */
  previewComponents?: string[];

  /**
   * Time in milliseconds to wait before applying a preview on hover
   */
  dynamicPreviewTimeout?: number;
}
