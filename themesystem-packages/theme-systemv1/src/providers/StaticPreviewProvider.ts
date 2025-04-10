import type { ThemeDefinition, ThemePreviewProvider } from "../types";

/**
 * Provides static previews for themes
 * Simply returns the pre-generated static preview image
 */
export class StaticPreviewProvider implements ThemePreviewProvider {
  /**
   * Returns the static preview URL for a theme
   * @param theme Theme definition
   * @returns Promise resolving to the URL of the preview image
   */
  async generatePreview(theme: ThemeDefinition): Promise<string> {
    // Check if we have a static preview asset
    if (typeof theme.preview === "string") {
      return theme.preview;
    }

    if (
      typeof theme.preview === "object" &&
      theme.preview.strategy === "static" &&
      theme.preview.asset
    ) {
      return theme.preview.asset;
    }

    // Fallback to a gradient preview
    return this.generateGradientPreview(theme.id);
  }

  /**
   * Generates a fallback gradient preview for themes without a static preview
   * @param themeId Theme identifier
   * @returns URL to a generated gradient preview
   */
  private generateGradientPreview(themeId: string): string {
    // In a real implementation, this would generate an actual image
    // For now, we just return a placeholder URL
    return `/previews/generated/${themeId}-gradient.png`;
  }
}
