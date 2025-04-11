import { defineConfig } from "@themesystem/core";

export default defineConfig({
  themes: {
    light: {
      name: "Light",
      description: "Default light theme",
    },
    dark: {
      name: "Dark",
      description: "Default dark theme",
    },
    system: {
      name: "System",
      description: "Follows system preferences",
    },
  },
  styles: {
    default: {
      name: "Default",
      description: "Standard theme style",
    },
  },
  extensions: {
    components: {},
    global: {},
  },
  storage: {
    key: "theme-system-state",
    type: "localStorage",
  },
});
