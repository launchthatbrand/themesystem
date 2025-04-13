import type {
  BaseTheme,
  ThemeConfig,
  ThemeEngineOptions,
  ThemeExtension,
  ThemeState,
} from "./types";

type ThemeStateListener = (state: ThemeState) => void;

interface ThemeStylesheet {
  id: string;
  href: string;
}

export class ThemeEngineImpl {
  private state: ThemeState;
  private subscribers: Set<ThemeStateListener>;
  private extensions: Map<string, ThemeExtension>;
  private extensionThemes: Map<string, string>;
  private stylesheets: Map<string, ThemeStylesheet>;

  constructor(options?: ThemeEngineOptions) {
    console.log("Initializing ThemeEngine with options:", options);
    this.state = {
      theme: options?.defaultTheme || "light",
      style: options?.defaultStyle || "",
      extensions: {},
    };
    this.subscribers = new Set();
    this.extensions = new Map();
    this.extensionThemes = new Map();
    this.stylesheets = new Map();
  }

  getState(): ThemeState {
    return this.state;
  }

  setTheme(theme: BaseTheme): void {
    this.state = { ...this.state, theme };
    this.notifySubscribers();
  }

  setStyle(style: string): void {
    console.log("Setting style:", style);
    this.state = { ...this.state, style };
    this.notifySubscribers();
  }

  loadConfig(config: ThemeConfig): void {
    console.log("Loading theme config:", config);
    if (config.extensions) {
      this.setupExtensions(config.extensions);
    }
  }

  setupExtensions(extensions: ThemeExtension[]): void {
    console.log("Setting up theme extensions:", extensions);
    extensions.forEach((ext) => {
      console.log(`Processing extension "${ext.id}":`, {
        name: ext.name,
        cssPath: ext.cssPath,
        target: ext.target,
      });

      this.extensions.set(ext.id, ext);
      this.extensionThemes.set(ext.id, ext.defaultTheme || "light");

      // Register stylesheet if provided
      if (ext.cssPath) {
        console.log(`Registering CSS for "${ext.id}":`, ext.cssPath);
        this.registerStylesheet(ext.id, ext.cssPath);
      } else {
        console.log(`No CSS path provided for extension "${ext.id}"`);
      }
    });

    console.log("Current registered stylesheets:", this.stylesheets);
  }

  registerStylesheet(themeId: string, href: string): void {
    console.log(`Registering stylesheet for "${themeId}":`, href);
    // Handle both relative and absolute paths
    const fullHref = href.startsWith("./") ? href.slice(2) : href;
    this.stylesheets.set(themeId, { id: themeId, href: fullHref });
    console.log("Updated stylesheets:", this.stylesheets);
    this.notifySubscribers();
  }

  getStylesheets(): ThemeStylesheet[] {
    const sheets: ThemeStylesheet[] = [];

    // Always include the current style's stylesheet if it exists
    const currentStyleSheet = this.stylesheets.get(this.state.style);
    if (currentStyleSheet) {
      console.log(
        `Found stylesheet for current style "${this.state.style}":`,
        currentStyleSheet,
      );
      sheets.push(currentStyleSheet);
    } else {
      console.log(
        `No stylesheet found for current style "${this.state.style}"`,
      );
    }

    console.log("Returning stylesheets:", sheets);
    return sheets;
  }

  setExtensionTheme(extensionId: string, theme: string): void {
    if (this.extensions.has(extensionId)) {
      this.extensionThemes.set(extensionId, theme);
      this.notifySubscribers();
    }
  }

  getExtensionTheme(extensionId: string): string {
    return this.extensionThemes.get(extensionId) || "light";
  }

  subscribe(listener: ThemeStateListener): void {
    this.subscribers.add(listener);
  }

  unsubscribe(listener: ThemeStateListener): void {
    this.subscribers.delete(listener);
  }

  dispose(): void {
    this.subscribers.clear();
    this.stylesheets.clear();
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((listener) => listener(this.state));
  }
}
