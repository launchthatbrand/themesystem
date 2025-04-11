"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { useTheme } from "./UnifiedThemeProvider";

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
   * Show only themes with these IDs
   */
  themeIds?: string[];

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
  onThemeSelected?: (themeId: string) => void;

  /**
   * Whether to show a warning when permissions are insufficient
   */
  showPermissionWarning?: boolean;
}

export interface ThemeItemProps {
  id: string;
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

/**
 * A component to select themes from the available options
 */
export function ThemeSelector({
  renderTheme,
  renderContainer,
  showDescriptions = true,
  themeIds,
  showPreviews = true,
  className,
  style,
  onThemeSelected,
  showPermissionWarning = true,
}: ThemeSelectorProps) {
  const {
    themeStyle,
    setThemeStyle,
    availableThemes,
    canChangeThemeStyle,
    debugMode,
  } = useTheme();

  // Filter themes if themeIds is provided
  const displayThemes = useMemo(() => {
    if (!themeIds || themeIds.length === 0) {
      return availableThemes;
    }
    return availableThemes.filter((theme) => themeIds.includes(theme.id));
  }, [availableThemes, themeIds]);

  // Handle theme selection
  const handleSelectTheme = (themeId: string) => {
    if (debugMode) {
      console.log(`[ThemeSystem] User selected theme: ${themeId}`);
    }

    if (canChangeThemeStyle) {
      setThemeStyle(themeId);
      if (onThemeSelected) {
        onThemeSelected(themeId);
      }
    } else if (debugMode) {
      console.log(`[ThemeSystem] Permission denied to change theme`);
    }
  };

  // Default theme item renderer
  const defaultRenderTheme = ({
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
        className={`theme-selector-item ${isActive ? "theme-selector-item-active" : ""} `}
        onClick={onClick}
        onKeyDown={onKeyDown}
        style={{
          cursor: "pointer",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          margin: "0.5rem",
          backgroundColor: isActive ? "#f0f0f0" : "transparent",
          position: "relative",
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
              backgroundColor: "#4a90e2",
            }}
          />
        )}
        <div style={{ fontWeight: "bold" }}>{name}</div>
        {showDescriptions && description && (
          <div style={{ fontSize: "0.875rem", color: "#666" }}>
            {description}
          </div>
        )}
        {showPreviews && preview && (
          <div
            style={{
              marginTop: "0.5rem",
              height: "5rem",
              backgroundColor: "#f7f7f7",
              backgroundImage: `url(${preview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "0.25rem",
            }}
          />
        )}
      </div>
    );
  };

  // Default container renderer
  const defaultRenderContainer = ({
    children,
    className,
    style,
  }: ContainerProps) => {
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
  };

  // Component to show permission warning when user can't change themes
  const PermissionWarning = () => {
    if (!showPermissionWarning || canChangeThemeStyle) {
      return null;
    }

    return (
      <div
        style={{
          padding: "0.75rem",
          marginBottom: "1rem",
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderRadius: "0.25rem",
          border: "1px solid #ffeeba",
        }}
      >
        <strong>Permission Notice:</strong> You are currently in view-only mode.
        Changing theme styles requires additional permissions.
      </div>
    );
  };

  // Use provided renderers or defaults
  const renderThemeItem = renderTheme || defaultRenderTheme;
  const renderContainerElement = renderContainer || defaultRenderContainer;

  return (
    <div>
      <PermissionWarning />
      {renderContainerElement({
        className,
        style,
        children: displayThemes.map((theme) =>
          renderThemeItem({
            id: theme.id,
            name: theme.name,
            description: theme.description,
            preview:
              typeof theme.preview === "string" ? theme.preview : undefined,
            isActive: themeStyle === theme.id,
            onClick: () => handleSelectTheme(theme.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectTheme(theme.id);
              }
            },
          }),
        ),
      })}
    </div>
  );
}
