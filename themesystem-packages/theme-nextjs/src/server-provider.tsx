"use server";

import { Theme, ThemeEngineOptions, ThemeProvider } from "@themesystem/core";
import { getStyleFromCookie, getThemeFromCookie } from "./utils";

import { cookies } from "next/headers";

interface ServerThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: Theme;
  defaultStyle: string;
}

export async function ServerThemeProvider({
  children,
  defaultTheme,
  defaultStyle,
}: ServerThemeProviderProps) {
  const cookieStore = await cookies();
  const theme = getThemeFromCookie(cookieStore.toString()) as Theme | null;
  const style = getStyleFromCookie(cookieStore.toString());

  const options: ThemeEngineOptions = {
    defaultTheme: theme || defaultTheme,
    defaultStyle: style || defaultStyle,
  };

  return <ThemeProvider {...options}>{children}</ThemeProvider>;
}
