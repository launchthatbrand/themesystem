import { ThemeProvider } from "../provider";

// Default config that can be overridden by user config
const defaultConfig = {
  baseTheme: "light",
  styleTheme: "default",
  themes: {
    light: {
      name: "Light",
      description: "Light theme",
    },
    dark: {
      name: "Dark",
      description: "Dark theme",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Default style",
    },
  },
};

export async function ThemeConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider {...defaultConfig}>{children}</ThemeProvider>;
}
