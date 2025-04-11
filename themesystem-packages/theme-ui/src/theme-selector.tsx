import { Button } from "./button";
import { useTheme } from "@themesystem/core";

interface ThemeSelectorProps {
  themes: Array<{ id: "light" | "dark" | "system"; name: string }>;
}

export function ThemeSelector({ themes }: ThemeSelectorProps) {
  const { state, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => (
        <Button
          key={theme.id}
          variant={state.theme === theme.id ? "default" : "outline"}
          onClick={() => setTheme(theme.id)}
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
