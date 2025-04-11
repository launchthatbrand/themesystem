/**
 * Utility functions for generating gradients from colors
 */

/**
 * Generates a CSS gradient string from a base color
 * @param color Base color in hex format (e.g. #ff0000)
 * @param direction Direction of the gradient (default: 135deg)
 * @param lightVariant Whether to generate a lighter variant (default: false)
 * @returns CSS gradient string
 */
export function generateGradientFromColor(
  color: string,
  direction: string = "135deg",
  lightVariant: boolean = false,
): string {
  // Ensure color is in hex format
  if (!color.startsWith("#")) {
    return `linear-gradient(${direction}, #4dabf7, #228be6)`;
  }

  try {
    // Parse the hex color
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Create a lighter or darker variant
    let secondColor: string;

    if (lightVariant) {
      // Lighter variant
      const r2 = Math.min(255, r + 40);
      const g2 = Math.min(255, g + 40);
      const b2 = Math.min(255, b + 40);
      secondColor = `#${r2.toString(16).padStart(2, "0")}${g2.toString(16).padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;
    } else {
      // Darker variant
      const r2 = Math.max(0, r - 40);
      const g2 = Math.max(0, g - 40);
      const b2 = Math.max(0, b - 40);
      secondColor = `#${r2.toString(16).padStart(2, "0")}${g2.toString(16).padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;
    }

    return `linear-gradient(${direction}, ${color}, ${secondColor})`;
  } catch (err) {
    // Fallback to default blue gradient
    return `linear-gradient(${direction}, #4dabf7, #228be6)`;
  }
}
