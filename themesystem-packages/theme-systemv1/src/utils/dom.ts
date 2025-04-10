/**
 * Utility functions for DOM operations related to themes
 */

/**
 * Gets all theme-related classes from an HTML element
 * @param element HTML element to get classes from (defaults to document.documentElement)
 * @returns Array of theme-related class names
 */
export function getThemeClasses(
  element: HTMLElement = document.documentElement,
): string[] {
  if (!element) {
    return [];
  }

  const classes = Array.from(element.classList);
  return classes.filter(
    (cls) =>
      cls.startsWith("theme-") || ["light", "dark", "system"].includes(cls),
  );
}

/**
 * Removes all theme-related classes from an HTML element
 * @param element HTML element to remove classes from (defaults to document.documentElement)
 * @param themeIds Optional array of specific theme IDs to check for
 */
export function removeThemeClasses(
  element: HTMLElement = document.documentElement,
  themeIds: string[] = [],
): void {
  if (!element) {
    return;
  }

  // Get all current classes as a static array (to avoid live collection issues)
  const currentClasses = Array.from(element.classList);

  // Remove theme-related classes
  currentClasses.forEach((cls) => {
    // Remove classes that start with theme-
    if (cls.startsWith("theme-")) {
      element.classList.remove(cls);
    }

    // Remove specific theme IDs if provided
    if (themeIds.length > 0 && themeIds.includes(cls)) {
      element.classList.remove(cls);
    }
  });
}
