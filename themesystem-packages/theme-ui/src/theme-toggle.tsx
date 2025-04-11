"use client";

import * as React from "react";

import { Monitor, Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@acme/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";

import { Button } from "@acme/ui/button";
import { cn } from "@acme/ui";
import { useTheme } from "@themesystem/core";

const THEME_STYLES = [
  {
    id: "default",
    name: "Default",
    preview: "bg-primary",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    preview: "bg-zinc-950 dark:bg-zinc-50",
  },
  {
    id: "gradient",
    name: "Gradient",
    preview: "bg-gradient-to-br from-indigo-500 to-purple-500",
  },
  {
    id: "retro",
    name: "Retro",
    preview: "bg-[#FF69B4] dark:bg-[#FF1493]",
  },
];

export function ThemeToggle() {
  const { state, setTheme, setStyle } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          {state.theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : state.theme === "system" ? (
            <Monitor className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader>
          <SheetTitle>Appearance</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="theme" className="mt-4">
          <TabsList className="flex w-full justify-between border-b">
            <TabsTrigger value="theme" className="flex-1">
              Theme
            </TabsTrigger>
            <TabsTrigger value="styles" className="flex-1">
              Styles
            </TabsTrigger>
            <TabsTrigger value="extensions" className="flex-1">
              Extensions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="theme" className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={state.theme === "light" ? "primary" : "outline"}
                onClick={() => setTheme("light")}
                className="w-full"
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={state.theme === "dark" ? "primary" : "outline"}
                onClick={() => setTheme("dark")}
                className="w-full"
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={state.theme === "system" ? "primary" : "outline"}
                onClick={() => setTheme("system")}
                className="w-full"
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="styles" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {THEME_STYLES.map((style) => (
                <Button
                  key={style.id}
                  variant={state.style === style.id ? "primary" : "outline"}
                  className="flex h-24 flex-col items-center justify-center gap-2"
                  onClick={() => setStyle(style.id)}
                >
                  <div className={cn("h-12 w-12 rounded-md", style.preview)} />
                  {style.name}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="extensions" className="mt-4">
            <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
              Theme extensions are not supported in this version
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
