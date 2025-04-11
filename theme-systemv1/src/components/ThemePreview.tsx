"use client";

import { useEffect, useRef, useState } from "react";

import type { ThemeDefinition } from "../types";
import { useTheme } from "./UnifiedThemeProvider";

export interface ThemePreviewProps {
  /**
   * ID of the theme to preview
   */
  themeId?: string;

  /**
   * Theme definition object (alternative to themeId)
   */
  theme?: ThemeDefinition;

  /**
   * Width of the preview
   */
  width?: number | string;

  /**
   * Height of the preview
   */
  height?: number | string;

  /**
   * Whether to apply the theme to the preview iframe
   */
  applyTheme?: boolean;

  /**
   * Whether to show a fallback when preview is not available
   */
  showFallback?: boolean;

  /**
   * CSS class for the preview container
   */
  className?: string;

  /**
   * Custom style for the preview container
   */
  style?: React.CSSProperties;

  /**
   * URL of the preview page
   * Default is "/theme-preview"
   */
  previewUrl?: string;

  /**
   * Callback fired when the preview is loaded
   */
  onLoad?: () => void;

  /**
   * Callback fired when the preview fails to load
   */
  onError?: (error: Error) => void;
}

/**
 * Component for previewing a theme
 */
export function ThemePreview({
  themeId,
  theme,
  width = 300,
  height = 200,
  applyTheme = true,
  showFallback = true,
  className,
  style,
  previewUrl = "/theme-preview",
  onLoad,
  onError,
}: ThemePreviewProps) {
  const { availableThemes, themeStyle, debugMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Determine the theme to preview
  const previewTheme =
    theme ||
    (themeId ? availableThemes.find((t) => t.id === themeId) : null) ||
    (themeId
      ? {
          id: themeId,
          name: themeId,
          description: "",
          preview: "",
          variables: {},
        }
      : null);

  // Get preview source
  const getPreviewSource = () => {
    if (!previewTheme) return null;

    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      // Server-side rendering, return null or a placeholder
      return null;
    }

    const targetTheme = applyTheme ? previewTheme.id : themeStyle;
    const url = new URL(previewUrl, window.location.origin);
    url.searchParams.set("theme", targetTheme);

    return url.toString();
  };

  // Use useEffect to set the preview source client-side only
  useEffect(() => {
    setPreviewSrc(getPreviewSource());
  }, [previewTheme, themeStyle, previewUrl, applyTheme]);

  useEffect(() => {
    if (!previewTheme) {
      if (debugMode) {
        console.warn(`[ThemeSystem] No theme found for preview: ${themeId}`);
      }
      const err = new Error(`No theme found for preview: ${themeId}`);
      setError(err);
      onError?.(err);
      return;
    }

    setIsLoading(true);
    setError(null);

    if (debugMode) {
      console.log(
        `[ThemeSystem] Loading preview for theme: ${previewTheme.id}`,
      );
    }
  }, [previewTheme, themeId, debugMode, onError]);

  // Handle iframe load events
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();

    if (debugMode) {
      console.log(
        `[ThemeSystem] Preview loaded for theme: ${previewTheme?.id}`,
      );
    }
  };

  const handleError = () => {
    const err = new Error(
      `Failed to load preview for theme: ${previewTheme?.id}`,
    );
    setError(err);
    setIsLoading(false);
    onError?.(err);

    if (debugMode) {
      console.error(
        `[ThemeSystem] Preview load error for theme: ${previewTheme?.id}`,
      );
    }
  };

  // Generate a fallback preview when needed
  const renderFallback = () => {
    if (!showFallback || !previewTheme) return null;

    // Extract primary color from theme variables or use a default
    const primaryColor = previewTheme.variables?.["--primary"] || "#4a90e2";
    const secondaryColor = previewTheme.variables?.["--secondary"] || "#f5f5f5";

    return (
      <div
        className={`theme-preview-fallback ${className || ""}`}
        style={{
          width,
          height,
          backgroundColor: secondaryColor,
          borderRadius: "0.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          color: primaryColor,
          border: `1px solid ${primaryColor}`,
          textAlign: "center",
          ...style,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          {previewTheme.name}
        </div>
        {previewTheme.description && (
          <div style={{ fontSize: "0.875rem" }}>{previewTheme.description}</div>
        )}
      </div>
    );
  };

  // Show fallback in case of errors or during server-side rendering
  if (error || !previewSrc) {
    return renderFallback();
  }

  return (
    <div
      className={`theme-preview-container ${className || ""}`}
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        borderRadius: "0.25rem",
        border: "1px solid #e0e0e0",
        ...style,
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
          }}
        >
          Loading preview...
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={previewSrc}
        title={`Theme preview: ${previewTheme?.name}`}
        width="100%"
        height="100%"
        style={{
          border: "none",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
