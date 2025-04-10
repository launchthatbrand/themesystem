import previewImg from './assets/preview.png';
import type { ThemeDefinition } from "@acme/theme-system";

const templateTheme: ThemeDefinition = {
  id: "template",
  name: "Template",
  description:
    "A starter template for creating custom themes for the ACME Theme System.",
  preview: {
    strategy: "static",
    asset: "/theme-previews/template.png"
  },
    asset: "/theme-previews/template.png",
  },
  variables: {
    // Define your CSS variables here
    "--card-bg": "#ffffff",
    "--card-border": "1px solid #e5e5e5",
    "--card-shadow": "0 1px 3px rgba(0,0,0,0.12)",
    // ...add more variables
  },
};

export default templateTheme;
