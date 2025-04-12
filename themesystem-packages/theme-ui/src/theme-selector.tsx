import { useTheme } from "next-themes";

import { Button } from "./button";
import { cn } from "./cn";

interface ThemeSelectorProps {
  themes: Array<{ id: string; name: string }>;
  className?: string;
}

export function ThemeSelector({ themes, className }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {themes.map((themeItem) => (
        <Button
          key={themeItem.id}
          variant={theme === themeItem.id ? "default" : "outline"}
          onClick={() => setTheme(themeItem.id)}
          className="w-full"
        >
          {themeItem.name}
        </Button>
      ))}
    </div>
  );
}
