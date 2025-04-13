import type {
  Theme,
  ThemeEngine,
  ThemeEngineOptions,
  ThemeExtension,
  ThemeMiddleware,
  ThemePlugin,
  ThemeState,
  ThemeSystemConfig,
} from "@themesystem/types";

export class ThemeEngineImpl implements ThemeEngine {
  private state: ThemeState;
  private middleware: ThemeMiddleware[] = [];
  private config: ThemeSystemConfig;
  private themes: Map<string, Theme> = new Map();

  constructor(options: ThemeEngineOptions = {}) {
    const {
      defaultTheme = "system",
      defaultStyle = "default",
      config = {},
    } = options;

    this.config = {
      theme: defaultTheme,
      style: defaultStyle,
      storage: "local",
      admin: { theme: "system" },
      ...config,
    };

    this.state = {
      theme: this.config.theme || "system",
      style: this.config.style || defaultStyle,
      extensions: {},
      currentTheme: undefined,
    };

    // Initialize extensions if provided in custom
    if (this.config.custom) {
      const extensions = this.config.custom.extensions;
      if (extensions) {
        this.setupExtensions(extensions);
      }
    }
  }

  public loadConfig(config: ThemeSystemConfig) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  public setupExtensions(extensions: Record<string, ThemeExtension>) {
    Object.entries(extensions).forEach(([id, extension]) => {
      this.state.extensions[id] = extension;
    });
  }

  public getState(): ThemeState {
    return { ...this.state };
  }

  public async setState(newState: Partial<ThemeState>): Promise<void> {
    // Process middleware
    let processedState = newState;
    for (const middleware of this.middleware) {
      processedState = await middleware.process(processedState, this.state);
    }

    // Update state
    this.state = {
      ...this.state,
      ...processedState,
    };
  }

  public use(middleware: ThemeMiddleware): void {
    this.middleware.push(middleware);
  }

  public async registerPlugin(plugin: ThemePlugin): Promise<void> {
    // Add plugin middleware
    if (plugin.middleware) {
      this.middleware.push(...plugin.middleware);
    }

    // Call plugin install hook
    if (plugin.onInstall) {
      await plugin.onInstall(this);
    }
  }

  public async unregisterPlugin(pluginId: string): Promise<void> {
    const extension = this.state.extensions[pluginId] as ThemeExtension & {
      onUninstall?: () => Promise<void>;
      middleware?: ThemeMiddleware[];
    };

    // Call uninstall hook if available
    if (extension && typeof extension.onUninstall === "function") {
      await extension.onUninstall();
    }

    // Remove plugin middleware if available
    if (extension && extension.middleware) {
      this.middleware = this.middleware.filter(
        (m) => !extension.middleware?.includes(m),
      );
    }

    // Remove plugin from state
    delete this.state.extensions[pluginId];
  }

  public registerTheme(theme: Theme): void {
    this.themes.set(theme.id, theme);
  }

  public getTheme(id: string): Theme | undefined {
    return this.themes.get(id);
  }

  public getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  // Method for setting the theme
  public setTheme(theme: string): void {
    this.setState({ theme });
  }

  // Method for setting the style
  public setStyle(style: string): void {
    this.setState({ style });
  }

  // Method for setting extension theme
  public setExtensionTheme(extensionId: string, theme: string): void {
    // Implementation would go here
    console.log(`Setting extension ${extensionId} theme to ${theme}`);
  }

  // Method for getting extension theme
  public getExtensionTheme(_extensionId: string): string | undefined {
    // Implementation would go here
    return undefined;
  }

  // Cleanup method
  public dispose(): void {
    // Cleanup resources
  }
}
