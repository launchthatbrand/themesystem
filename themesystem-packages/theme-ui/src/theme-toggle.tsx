"use client";

import { Theme, ThemeRegistry, useTheme } from "@themesystem/core";

import { Button } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const themeRegistry = ThemeRegistry.getInstance();

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const availableThemes = themeRegistry.getAllThemes();

  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[300px]">
        <DrawerHeader>
          <DrawerTitle>ThemeSystem</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Tabs defaultValue="base" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="base">Base</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="extensions">Extensions</TabsTrigger>
            </TabsList>
            <TabsContent value="base" className="mt-4">
              <Tabs defaultValue={theme} onValueChange={setTheme}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="light">Light</TabsTrigger>
                  <TabsTrigger value="dark">Dark</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
              </Tabs>
            </TabsContent>
            <TabsContent value="themes" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {availableThemes.map((theme: Theme) => (
                  <Button
                    key={theme.id}
                    variant="outline"
                    className="flex h-auto flex-col items-start gap-2 p-4"
                    onClick={() => {
                      // TODO: Implement theme switching
                      console.log("Switching to theme:", theme.id);
                    }}
                  >
                    <span className="font-medium">{theme.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {theme.description}
                    </span>
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="extensions" className="mt-4">
              <div className="text-sm text-muted-foreground">
                Extensions coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
