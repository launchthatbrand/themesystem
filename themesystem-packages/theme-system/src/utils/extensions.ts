import { ThemeExtension } from "../types";

/**
 * Theme extension storage key in localStorage/cookies
 */
export const EXTENSION_STORAGE_KEY = "ui-theme-extensions";

/**
 * Get all registered theme extensions
 */
export function getExtensions(): ThemeExtension[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const extensionsJson = localStorage.getItem(EXTENSION_STORAGE_KEY) || "[]";
    return JSON.parse(extensionsJson);
  } catch (error) {
    console.error("[ThemeSystem] Failed to parse theme extensions:", error);
    return [];
  }
}

/**
 * Get a specific theme extension by ID
 */
export function getExtension(extensionId: string): ThemeExtension | undefined {
  const extensions = getExtensions();
  return extensions.find((ext) => ext.id === extensionId);
}

/**
 * Create or update a theme extension
 */
export function setExtension(extension: ThemeExtension): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Get existing extensions
    const extensions = getExtensions();

    // Find if the extension already exists
    const existingIndex = extensions.findIndex(
      (ext) => ext.id === extension.id,
    );

    if (existingIndex >= 0) {
      // Update existing extension
      extensions[existingIndex] = extension;
    } else {
      // Add new extension
      extensions.push(extension);
    }

    // Save back to storage
    localStorage.setItem(EXTENSION_STORAGE_KEY, JSON.stringify(extensions));

    // Also save to cookie for SSR
    document.cookie = `${EXTENSION_STORAGE_KEY}=${encodeURIComponent(
      JSON.stringify(extensions),
    )}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (error) {
    console.error("[ThemeSystem] Failed to save theme extension:", error);
  }
}

/**
 * Activate or deactivate a theme extension
 */
export function toggleExtension(extensionId: string, active: boolean): void {
  const extension = getExtension(extensionId);

  if (extension) {
    setExtension({
      ...extension,
      active,
    });
  }
}

/**
 * Remove a theme extension
 */
export function removeExtension(extensionId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Get existing extensions
    const extensions = getExtensions();

    // Filter out the extension to remove
    const filteredExtensions = extensions.filter(
      (ext) => ext.id !== extensionId,
    );

    // Save back to storage
    localStorage.setItem(
      EXTENSION_STORAGE_KEY,
      JSON.stringify(filteredExtensions),
    );

    // Also save to cookie for SSR
    document.cookie = `${EXTENSION_STORAGE_KEY}=${encodeURIComponent(
      JSON.stringify(filteredExtensions),
    )}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (error) {
    console.error("[ThemeSystem] Failed to remove theme extension:", error);
  }
}

/**
 * Apply theme extensions to the DOM
 */
export function applyExtensions(): void {
  if (typeof window === "undefined") {
    return;
  }

  const extensions = getExtensions();
  const activeExtensions = extensions.filter((ext) => ext.active);
  const root = document.documentElement;

  // Apply CSS variables from active extensions
  activeExtensions.forEach((extension) => {
    Object.entries(extension.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  });
}

/**
 * Register event listeners for theme extensions
 */
export function initializeExtensions(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Apply extensions on load
  applyExtensions();

  // Update when storage changes
  window.addEventListener("storage", (event) => {
    if (event.key === EXTENSION_STORAGE_KEY) {
      applyExtensions();
    }
  });
}

/**
 * Hook to use a theme extension in a component
 * Note: This is just a type definition - the actual hook will be implemented in a React-specific file
 */
export interface UseThemeExtensionResult<T = Record<string, unknown>> {
  isActive: boolean;
  activate: () => void;
  deactivate: () => void;
  toggle: () => void;
  extension: ThemeExtension | undefined;
  variables: Record<string, string>;
}
