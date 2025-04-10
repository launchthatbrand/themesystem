"use client";

import {
  getExtension,
  setExtension,
  toggleExtension,
} from "../utils/extensions";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ThemeExtension } from "../types";
import type { UseThemeExtensionResult } from "../utils/extensions";

/**
 * React hook to use a theme extension
 *
 * @param extensionId The ID of the extension to use
 * @returns Object with extension state and functions to manipulate it
 */
export function useThemeExtension<T = Record<string, unknown>>(
  extensionId: string,
): UseThemeExtensionResult<T> {
  // Get current extension data
  const [extension, setExtensionState] = useState<ThemeExtension | undefined>(
    typeof window !== "undefined" ? getExtension(extensionId) : undefined,
  );

  // Update the state when the extension changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial state
    setExtensionState(getExtension(extensionId));

    // Listen for storage events
    const handleStorageChange = () => {
      setExtensionState(getExtension(extensionId));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [extensionId]);

  // Create a memoized object with the extension state and functions
  const extensionValue = useMemo(() => {
    const isActive = !!extension?.active;
    const variables = extension?.variables || {};

    // Return the extension API
    return {
      isActive,
      activate: () => toggleExtension(extensionId, true),
      deactivate: () => toggleExtension(extensionId, false),
      toggle: () => toggleExtension(extensionId, !isActive),
      extension,
      variables,
    };
  }, [extension, extensionId]);

  return extensionValue;
}

/**
 * Create and register a new theme extension
 *
 * @param extensionId Unique ID for the extension
 * @param name Human-readable name
 * @param variables CSS variables to apply
 * @param description Optional description
 * @returns The created extension
 */
export function createThemeExtension(
  extensionId: string,
  name: string,
  variables: Record<string, string>,
  description?: string,
): ThemeExtension {
  const extension: ThemeExtension = {
    id: extensionId,
    name,
    description,
    variables,
    active: false,
  };

  // Register the extension
  setExtension(extension);

  return extension;
}

/**
 * Register a theme extension with initial values and activation state
 *
 * @param extension The extension to register
 * @returns The registered extension
 */
export function registerThemeExtension(
  extension: ThemeExtension,
): ThemeExtension {
  setExtension(extension);
  return extension;
}
