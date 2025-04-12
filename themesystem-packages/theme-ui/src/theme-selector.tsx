import type { ReactNode } from "react";
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
  onThemeSelected?: (themeId: string) => void;
  renderTheme?: (props: ThemeItemProps) => ReactNode;
  renderContainer?: (props: ContainerProps) => ReactNode;
  showPermissionWarning?: boolean;
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
}: ThemeSelectorProps) {
  const { style: currentStyle, setStyle } = useTheme();
  const themeRegistry = ThemeRegistry.getInstance();
  const availableThemes = themeRegistry.getAllThemes();

  const displayThemes = themeIds
    ? availableThemes.filter((theme) => themeIds.includes(theme.id))
    : availableThemes;

  const handleThemeChange = (themeId: string) => {
    console.log("handleThemeChange", themeId);
    setStyle(themeId);
    onThemeSelected?.(themeId);
  };

  const defaultRenderTheme = ({
    id,
    name,
    description,
    preview,
    isActive,
    onClick,
  }: ThemeItemProps) => (
    <Button
      key={id}
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
      className="flex h-auto flex-col items-start gap-2 p-4"
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
  );

  const defaultRenderContainer = ({
    children,
    className,
    style,
  }: ContainerProps) => (
    <div className={cn("grid grid-cols-2 gap-4", className)} style={style}>
      {children}
    </div>
  );

  const renderThemeItem = renderTheme || defaultRenderTheme;
  const renderContainerElement = renderContainer || defaultRenderContainer;

  return renderContainerElement({
    className,
    style,
    children: displayThemes.map((themeItem) =>
      renderThemeItem({
        id: themeItem.id,
        name: themeItem.name,
        description: themeItem.description,
        preview: themeItem.preview,
        isActive: currentStyle === themeItem.id,
        onClick: () => handleThemeChange(themeItem.id),
      }),
    ),
  });
}
