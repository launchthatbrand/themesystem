"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeRegistry = exports.ThemeRegistry = void 0;
var ThemeRegistry = /** @class */ (function () {
    function ThemeRegistry() {
        this.themes = new Map();
    }
    ThemeRegistry.getInstance = function () {
        if (!ThemeRegistry.instance) {
            ThemeRegistry.instance = new ThemeRegistry();
        }
        return ThemeRegistry.instance;
    };
    ThemeRegistry.prototype.registerTheme = function (theme) {
        this.themes.set(theme.id, theme);
    };
    ThemeRegistry.prototype.getTheme = function (id) {
        return this.themes.get(id);
    };
    ThemeRegistry.prototype.getAllThemes = function () {
        return Array.from(this.themes.values());
    };
    return ThemeRegistry;
}());
exports.ThemeRegistry = ThemeRegistry;
exports.themeRegistry = ThemeRegistry.getInstance();
