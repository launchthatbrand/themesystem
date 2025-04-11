import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export { ThemeProvider, useTheme } from "@themesystem/core";
export { ThemeToggle } from "./theme-toggle";
export { Button } from "./button";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };
