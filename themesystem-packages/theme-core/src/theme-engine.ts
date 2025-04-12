import type {
  BaseTheme,
  ThemeConfig,
  ThemeEngineOptions,
  ThemeExtension,
  ThemeState,
} from "./types";

type ThemeStateListener = (state: ThemeState) => void;

export class ThemeEngineImpl {
  private state: ThemeState;
  private subscribers: Set<ThemeStateListener>;
  private extensions: Map<string, ThemeExtension>;
  private extensionThemes: Map<string, string>;

  constructor(options?: ThemeEngineOptions) {
    this.state = {
      theme: options?.defaultTheme || "light",
      style: options?.defaultStyle || "",
      extensions: {},
    };
    this.subscribers = new Set();
    this.extensions = new Map();
    this.extensionThemes = new Map();
  }

  getState(): ThemeState {
    return this.state;
  }

  setTheme(theme: BaseTheme): void {
    this.state = { ...this.state, theme };
    this.notifySubscribers();
  }

  setStyle(style: string): void {
    this.state = { ...this.state, style };
    this.notifySubscribers();
  }

  loadConfig(config: ThemeConfig): void {
    if (config.extensions) {
      this.setupExtensions(config.extensions);
    }
  }

  setupExtensions(extensions: ThemeExtension[]): void {
    extensions.forEach((ext) => {
      this.extensions.set(ext.id, ext);
      this.extensionThemes.set(ext.id, ext.defaultTheme || "light");
    });
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
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((listener) => listener(this.state));
  }
}
