import previewImg from './assets/preview.png';
import type { ThemeDefinition } from "@acme/theme-system";

const glassTheme: ThemeDefinition = {
  id: "glass",
  name: "Glass",
  description:
    "Clean, minimal interface with subtle transparency effects and soft shadows.",
  preview: {
    strategy: "static",
    asset: "/theme-previews/glass.png"
  },
    asset: "/theme-previews/glass.png",
  },
  variables: {
    // These would normally be extracted from the CSS
    "--card-bg": "hsla(0, 0%, 100%, 0.8)",
    "--card-border": "1px solid hsla(0, 0%, 100%, 0.5)",
    "--card-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    // ...more variables
  },
};

export default glassTheme;
 