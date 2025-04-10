"use client";

import * as React from "react";

import { useCallback, useMemo } from "react";

import type { ReactNode } from "react";
import { ThemeStyle } from "../types";
import { useTheme } from "./ThemeProvider";

export interface ThemeSelectorProps {
  /**
   * Custom renderer for each theme item
   */
  renderTheme?: (props: ThemeItemProps) => ReactNode;

  /**
   * Custom renderer for the container
   */
  renderContainer?: (props: ContainerProps) => ReactNode;

  /**
   * Show theme descriptions
   */
  showDescriptions?: boolean;

  /**
   * Theme styles to display
   * If not provided, all available theme styles will be shown
   */
  themeStyles?: ThemeStyle[];

  /**
   * Show theme previews
   */
  showPreviews?: boolean;

  /**
   * CSS class for the container
   */
  className?: string;

  /**
   * Custom styles for the container
   */
  style?: React.CSSProperties;

  /**
   * Callback when a theme is selected
   */
  onThemeSelected?: (themeStyle: ThemeStyle) => void;
}

export interface ThemeItemProps {
  id: ThemeStyle;
  name: string;
  description?: string;
  preview?: string;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Theme metadata with display names and descriptions
const themeMetadata: Record<
  ThemeStyle,
  { name: string; description: string; preview?: string }
> = {
  default: {
    name: "Default",
    description: "Clean, minimal interface with neutral tones",
    preview: "/previews/default.png",
  },
  rose: {
    name: "Rose",
    description: "Soft pink accents with warm undertones",
    preview: "/previews/rose.png",
  },
  green: {
    name: "Green",
    description: "Natural, earthy green palette",
    preview: "/previews/green.png",
  },
  blue: {
    name: "Blue",
    description: "Cool blue tones for a calming experience",
    preview: "/previews/blue.png",
  },
  orange: {
    name: "Orange",
    description: "Energetic and warm orange accents",
    preview: "/previews/orange.png",
  },
  purple: {
    name: "Purple",
    description: "Rich purple hues for a creative feel",
    preview: "/previews/purple.png",
  },
  custom: {
    name: "Custom",
    description: "Your personalized theme settings",
    preview: "/previews/custom.png",
  },
};

/**
 * A component to select theme styles from the available options
 */
export function ThemeSelector({
  renderTheme,
  renderContainer,
  showDescriptions = true,
  themeStyles,
  showPreviews = true,
  className,
  style,
  onThemeSelected,
}: ThemeSelectorProps) {
  const { themeStyle, setThemeStyle } = useTheme();

  // Filter themes if themeStyles is provided
  const displayThemeStyles = useMemo(() => {
    if (!themeStyles || themeStyles.length === 0) {
      return Object.keys(themeMetadata) as ThemeStyle[];
    }
    return themeStyles;
  }, [themeStyles]);

  // Handle theme selection
  const handleSelectTheme = useCallback(
    (styleId: ThemeStyle) => {
      setThemeStyle(styleId);
      onThemeSelected?.(styleId);
    },
    [setThemeStyle, onThemeSelected],
  );

  // Default theme item renderer
  const defaultRenderTheme = useCallback(
    ({
      id,
      name,
      description,
      preview,
      isActive,
      onClick,
      onKeyDown,
    }: ThemeItemProps) => {
      return (
        <div
          key={id}
          role="button"
          tabIndex={0}
          aria-pressed={isActive}
          className={`theme-selector-item ${isActive ? "theme-selector-item-active" : ""}`}
          onClick={onClick}
          onKeyDown={onKeyDown}
          style={{
            cursor: "pointer",
            padding: "1rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            margin: "0.5rem",
            backgroundColor: isActive
              ? "var(--accent-muted)"
              : "var(--background)",
            position: "relative",
            transition: "all 0.2s ease",
          }}
        >
          {isActive && (
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                width: "1rem",
                height: "1rem",
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
              }}
            />
          )}
          <div style={{ fontWeight: "bold" }}>{name}</div>
          {showDescriptions && description && (
            <div
              style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}
            >
              {description}
            </div>
          )}
          {showPreviews && preview && (
            <div
              style={{
                marginTop: "0.5rem",
                height: "5rem",
                backgroundColor: "var(--muted)",
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.25rem",
              }}
            />
          )}
        </div>
      );
    },
    [showDescriptions, showPreviews],
  );

  // Default container renderer
  const defaultRenderContainer = useCallback(
    ({ children, className, style }: ContainerProps) => {
      return (
        <div
          className={className}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            ...style,
          }}
        >
          {children}
        </div>
      );
    },
    [],
  );

  // Use provided renderers or defaults
  const renderThemeItem = renderTheme || defaultRenderTheme;
  const renderContainerElement = renderContainer || defaultRenderContainer;

  return renderContainerElement({
    className,
    style,
    children: displayThemeStyles.map((styleId) => {
      const metadata = themeMetadata[styleId];

      return renderThemeItem({
        id: styleId,
        name: metadata.name,
        description: metadata.description,
        preview: showPreviews ? metadata.preview : undefined,
        isActive: themeStyle === styleId,
        onClick: () => handleSelectTheme(styleId),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelectTheme(styleId);
          }
        },
      });
    }),
  });
}
