"use client";

import type { ReactNode } from "react";
import React, { useMemo } from "react";
import { Theme, ThemeRegistry } from "@themesystem/core";

import { Button } from "./button";
import { cn } from "./cn";
import { useTheme } from "./index";

export interface ThemeSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  showDescriptions?: boolean;
  showPreviews?: boolean;
  themeIds?: string[];
  onThemeSelected?: (themeId: string | null) => void;
  renderTheme?: (props: ThemeItemProps) => ReactNode;
  renderContainer?: (props: ContainerProps) => ReactNode;
  showPermissionWarning?: boolean;
  showDefaultOption?: boolean;
}

export interface ThemeItemProps {
  id: string;
  name: string;
  description?: string;
  preview?: string;
  isActive: boolean;
  onClick: () => void;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSelector({
  className,
  style,
  showDescriptions = true,
  showPreviews = false,
  themeIds,
  onThemeSelected,
  renderTheme,
  renderContainer,
  showPermissionWarning = true,
  showDefaultOption = true,
}: ThemeSelectorProps) {
  // Get the current style from the theme provider
  const { style: currentStyle, setStyle } = useTheme();
  const themeRegistry = ThemeRegistry.getInstance();

  // Track mounted state for hydration
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const availableThemes = useMemo(() => {
    return themeRegistry.getAllThemes();
  }, []);

  const displayThemes = useMemo(() => {
    return themeIds
      ? availableThemes.filter((theme) => themeIds.includes(theme.id))
      : availableThemes;
  }, [themeIds, availableThemes]);

  const allThemes = useMemo(() => {
    return [
      ...(showDefaultOption
        ? [
            {
              id: "default",
              name: "Default Theme",
              description:
                "Use the base theme styles without additional styling",
            } as Theme,
          ]
        : []),
      ...displayThemes,
    ];
  }, [showDefaultOption, displayThemes]);

  const handleThemeChange = React.useCallback(
    (themeId: string | null) => {
      // Convert empty string or null to "default"
      const styleValue = !themeId || themeId === "" ? "default" : themeId;
      setStyle(styleValue);
      onThemeSelected?.(themeId);
    },
    [setStyle, onThemeSelected],
  );

  const getIsActive = React.useCallback(
    (themeId: string) => {
      // Only show active state after mount to avoid hydration mismatch
      if (!mounted) return false;

      // Handle default theme case
      if (themeId === "default") {
        return !currentStyle || currentStyle === "default";
      }

      return currentStyle === themeId;
    },
    [mounted, currentStyle],
  );

  const defaultRenderTheme = React.useCallback(
    ({ id, name, description, preview, isActive, onClick }: ThemeItemProps) => (
      <Button
        key={id}
        variant={isActive ? "default" : "outline"}
        onClick={onClick}
        className={cn(
          "flex h-auto w-full flex-col items-start gap-2 p-4",
          isActive &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
      >
        <span className="font-medium">{name}</span>
        {showDescriptions && description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
        {showPreviews && preview && (
          <div
            className="mt-2 h-20 w-full rounded bg-muted bg-cover bg-center"
            style={{ backgroundImage: `url(${preview})` }}
          />
        )}
      </Button>
    ),
    [showDescriptions, showPreviews],
  );

  const defaultRenderContainer = React.useCallback(
    ({ children, className, style }: ContainerProps) => (
      <div>
        <div className={cn("grid grid-cols-2 gap-4", className)} style={style}>
          {children}
        </div>
      </div>
    ),
    [],
  );

  const renderThemeItem = renderTheme || defaultRenderTheme;
  const renderContainerElement = renderContainer || defaultRenderContainer;

  const themeItems = useMemo(() => {
    return allThemes.map((themeItem) => ({
      id: themeItem.id,
      name: themeItem.name,
      description: themeItem.description,
      preview: themeItem.preview,
      isActive: getIsActive(themeItem.id),
      onClick: () => handleThemeChange(themeItem.id || null),
    }));
  }, [allThemes, getIsActive, handleThemeChange]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return renderContainerElement({
    className,
    style,
    children: themeItems.map(renderThemeItem),
  });
}
