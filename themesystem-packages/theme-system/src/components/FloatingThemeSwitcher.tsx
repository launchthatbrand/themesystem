"use client";

import * as React from "react";

import { ThemeSelector } from "./ThemeSelector";
import { ThemeStyle } from "../types";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

// Component imports for UI elements
// Note: These should be replaced with your actual UI components
// Example using shadcn/ui components
const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    size?: string;
  },
) => (
  <button
    {...props}
    className={`rounded-md bg-primary px-4 py-2 text-primary-foreground ${props.className || ""}`}
  />
);

const Drawer = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <div className={`fixed inset-x-0 bottom-0 z-50 ${open ? "block" : "hidden"}`}>
    <div className="rounded-t-xl bg-background p-4 shadow-lg">
      {children}
      <div
        className="fixed inset-0 -z-10 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
    </div>
  </div>
);

const Tabs = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Clone children and add activeTab prop
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    if (React.isValidElement(child) && child.type === TabsContent) {
      return React.cloneElement(child, { activeTab });
    }
    return child;
  });

  return <div className="w-full">{enhancedChildren}</div>;
};

const TabsList = ({
  children,
  activeTab,
  setActiveTab,
}: {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}) => (
  <div className="mb-4 flex gap-2 overflow-x-auto">
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === TabsTrigger) {
        return React.cloneElement(child, { activeTab, setActiveTab });
      }
      return child;
    })}
  </div>
);

const TabsTrigger = ({
  children,
  value,
  activeTab,
  setActiveTab,
  disabled,
}: {
  children: React.ReactNode;
  value: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    className={`flex-1 rounded-md px-4 py-2 ${
      activeTab === value
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground"
    } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
);

const TabsContent = ({
  children,
  value,
  activeTab,
}: {
  children: React.ReactNode;
  value: string;
  activeTab?: string;
}) => (
  <div className={activeTab === value ? "block" : "hidden"}>{children}</div>
);

export interface FloatingThemeSwitcherProps {
  /**
   * Additional class name for the container
   */
  className?: string;

  /**
   * Class name for the button
   */
  buttonClassName?: string;

  /**
   * Initial tab to display when opened
   */
  initialTab?: "base" | "themes";

  /**
   * Custom trigger element instead of the default button
   */
  triggerElement?: React.ReactNode;

  /**
   * Position of the switcher on the screen
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";

  /**
   * Available theme styles to show in the selector
   */
  themeStyles?: ThemeStyle[];
}

/**
 * A floating button that opens a drawer with theme settings
 */
export function FloatingThemeSwitcher({
  className,
  buttonClassName,
  initialTab = "base",
  triggerElement,
  position = "bottom-right",
  themeStyles,
}: FloatingThemeSwitcherProps) {
  const { theme, themeStyle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Position styles
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]} ${className || ""}`}
    >
      <div className="flex flex-col items-end gap-2">
        {/* Main toggle button */}
        {triggerElement || (
          <Button
            className={`rounded-full p-3 shadow-md ${buttonClassName || ""}`}
            onClick={() => setDrawerOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </Button>
        )}

        {/* Drawer with theme settings */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <div className="pb-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Appearance Settings</h2>
              <Button onClick={() => setDrawerOpen(false)}>Close</Button>
            </div>

            <Tabs defaultValue={initialTab}>
              <TabsList>
                <TabsTrigger value="base">Light/Dark Mode</TabsTrigger>
                <TabsTrigger value="themes">Theme Library</TabsTrigger>
              </TabsList>

              {/* Base theme selection */}
              <TabsContent value="base">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred appearance mode
                  </p>
                  <ThemeToggle />
                </div>
              </TabsContent>

              {/* Theme library */}
              <TabsContent value="themes">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Choose a visual theme for the application
                  </p>
                  <ThemeSelector
                    themeStyles={themeStyles}
                    showDescriptions={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
