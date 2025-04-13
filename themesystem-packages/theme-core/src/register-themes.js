"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = void 0;
var theme_registry_1 = require("./theme-registry");
var glass_1 = require("@themesystem/glass");
console.log("ThemeSystem: Starting theme registration...");
var registry = theme_registry_1.ThemeRegistry.getInstance();
exports.registry = registry;
// Register themes
console.log("ThemeSystem: Registering glass theme...");
registry.registerTheme(glass_1.glassTheme);
// Log available themes
console.log("ThemeSystem: Available themes:", registry.getAllThemes().map(function (theme) { return ({
    id: theme.id,
    name: theme.name,
}); }));
