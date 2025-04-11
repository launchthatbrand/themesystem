import type { BaseTheme, ThemeEngineOptions, ThemeState } from "./types";

export class ThemeEngineImpl {
  private state: ThemeState;
  private subscribers: ((state: ThemeState) => void)[] = [];

  constructor(options?: ThemeEngineOptions) {
    this.state = {
      theme: "system",
      style: "default",
      extensions: {},
    };

    if (options?.defaultTheme) {
      this.setTheme(options.defaultTheme);
    }
  }

  public getState(): ThemeState {
    return { ...this.state };
  }

  public setTheme(theme: BaseTheme): void {
    this.state = {
      ...this.state,
      theme,
    };
    this.notifySubscribers();
  }

  public setStyle(style: string): void {
    this.state = {
      ...this.state,
      style,
    };
    this.notifySubscribers();
  }

  public subscribe(callback: (state: ThemeState) => void): void {
    this.subscribers.push(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback(this.state));
  }

  public dispose(): void {
    this.subscribers = [];
  }
}
