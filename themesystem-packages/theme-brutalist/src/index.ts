import previewImg from './assets/preview.png';
import type { ThemeDefinition } from "@acme/theme-system";

const brutalistTheme: ThemeDefinition = {
  id: "brutalist",
  name: "Brutalist",
  description:
    "Bold, raw design with high contrast, sharp edges, and minimal decoration.",
  preview: {
    strategy: "static",
    asset: "/theme-previews/brutalist.png"
  },
    asset: "/theme-previews/brutalist.png",
  },
  variables: {
    // These would normally be extracted from the CSS
    "--card-bg": "#f5f5f5",
    "--card-border": "2px solid #000",
    "--card-shadow": "none",
    // ...more variables
  },
};

export default brutalistTheme;
 