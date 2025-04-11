import {
  ThemeEngine,
  ThemeEngineOptions,
  ThemeMiddleware,
  ThemePlugin,
  ThemeState,
} from "./types";

import { loadConfig } from "@themesystem/config";

export class ThemeEngineImpl implements ThemeEngine {
  private state: ThemeState;
  private middleware: ThemeMiddleware[] = [];
  private plugins: Map<string, ThemePlugin> = new Map();
  private storageKey: string;

  constructor(options: ThemeEngineOptions = {}) {
    // Load configuration
    const config = loadConfig(options.config);

    // Initialize state with config and options
    this.state = {
      theme: options.defaultTheme || config.themes.system?.name || "system",
      style: options.defaultStyle || config.styles.default?.name || "default",
      extensions: this.initializeExtensions(config),
    };

    // Use storage key from config or options
    this.storageKey = options.storageKey || config.storage.key;

    // Initialize plugins from config
    config.plugins?.forEach((plugin) => this.registerPlugin(plugin));

    // Load saved state if available
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(this.storageKey);
      if (savedState) {
        this.state = { ...this.state, ...JSON.parse(savedState) };
      }
    }
  }

  private initializeExtensions(config: any) {
    const extensions: Record<string, unknown> = {};

    // Initialize component extensions
    if (config.extensions?.components) {
      Object.entries(config.extensions.components).forEach(([key, value]) => {
        extensions[key] = value;
      });
    }

    // Initialize global extensions
    if (config.extensions?.global) {
      Object.entries(config.extensions.global).forEach(([key, value]) => {
        extensions[key] = value;
      });
    }

    return extensions;
  }

  public getState(): ThemeState {
    return { ...this.state };
  }

  public async setState(newState: Partial<ThemeState>): Promise<void> {
    let processedState = { ...newState };

    // Run through middleware pipeline
    for (const mw of this.middleware) {
      processedState = await mw.process(processedState, this.state);
    }

    // Update state
    const updatedState = { ...this.state, ...processedState };
    this.state = updatedState;

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(updatedState));
    }

    // Notify plugins of theme change
    await Promise.all(
      Array.from(this.plugins.values()).map(async (plugin) => {
        if (plugin.onThemeChange) {
          await plugin.onThemeChange(updatedState);
        }
      }),
    );
  }

  public use(middleware: ThemeMiddleware): void {
    this.middleware.push(middleware);
  }

  public async registerPlugin(plugin: ThemePlugin): Promise<void> {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin with id ${plugin.id} is already registered`);
    }

    // Register plugin middleware
    plugin.middleware?.forEach((mw) => this.use(mw));

    // Register plugin extensions
    if (plugin.extensions) {
      this.state.extensions = {
        ...this.state.extensions,
        [plugin.id]: Object.fromEntries(plugin.extensions),
      };
    }

    // Add plugin to registry
    this.plugins.set(plugin.id, plugin);

    // Call plugin install hook
    if (plugin.onInstall) {
      await plugin.onInstall(this);
    }
  }

  public async unregisterPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return;

    // Call plugin uninstall hook
    if (plugin.onUninstall) {
      await plugin.onUninstall();
    }

    // Remove plugin middleware
    if (plugin.middleware) {
      this.middleware = this.middleware.filter(
        (mw) => !plugin.middleware?.some((pmw) => pmw.name === mw.name),
      );
    }

    // Remove plugin extensions
    if (this.state.extensions?.[pluginId]) {
      const { [pluginId]: _, ...rest } = this.state.extensions;
      this.state.extensions = rest;
    }

    // Remove plugin from registry
    this.plugins.delete(pluginId);
  }
}
