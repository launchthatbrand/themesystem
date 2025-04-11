import { ThemeRegistry } from "./theme-registry";
import { glassTheme } from "@themesystem/glass";

console.log("ThemeSystem: Starting theme registration...");

const registry = ThemeRegistry.getInstance();

// Register themes
console.log("ThemeSystem: Registering glass theme...");
registry.registerTheme(glassTheme);

// Log available themes
console.log(
  "ThemeSystem: Available themes:",
  registry.getAllThemes().map((theme) => ({
    id: theme.id,
    name: theme.name,
  })),
);

export { registry };
