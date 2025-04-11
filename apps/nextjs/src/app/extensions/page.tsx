import { Nav } from "@/components/nav";
import { createNextAdapter } from "@themesystem/nextjs";

// Create a custom extension type
interface CustomExtension {
  accentColor: string;
  borderRadius: string;
  fontFamily: string;
}

// Create theme engine options with extensions
const engineOptions = {
  defaultTheme: "light",
  defaultStyle: "default",
  extensions: {
    custom: {
      accentColor: "#0070f3",
      borderRadius: "0.5rem",
      fontFamily: "system-ui",
    },
  } as Record<string, CustomExtension>,
};

// Create the theme adapter
const { ThemeProvider } = createNextAdapter(engineOptions);

export default function ExtensionsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Nav />
        <main className="container mx-auto p-8">
          <h1 className="mb-6 text-3xl font-bold">Theme Extensions</h1>

          <div className="grid gap-6">
            {/* Extension Example 1: Accent Color */}
            <section className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Accent Color Extension
              </h2>
              <p className="mb-4">
                This extension allows you to customize the accent color of your
                theme.
              </p>
              <div className="flex items-center space-x-4">
                <div
                  className="h-12 w-12 rounded"
                  style={{
                    backgroundColor:
                      engineOptions.extensions.custom.accentColor,
                  }}
                />
                <code className="rounded bg-muted p-2 text-sm">
                  accentColor: "{engineOptions.extensions.custom.accentColor}"
                </code>
              </div>
            </section>

            {/* Extension Example 2: Border Radius */}
            <section className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Border Radius Extension
              </h2>
              <p className="mb-4">
                Customize the border radius of elements throughout your
                application.
              </p>
              <div className="flex items-center space-x-4">
                <div
                  className="h-12 w-12 bg-primary"
                  style={{
                    borderRadius: engineOptions.extensions.custom.borderRadius,
                  }}
                />
                <code className="rounded bg-muted p-2 text-sm">
                  borderRadius: "{engineOptions.extensions.custom.borderRadius}"
                </code>
              </div>
            </section>

            {/* Extension Example 3: Font Family */}
            <section className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Font Family Extension
              </h2>
              <p className="mb-4">
                Change the default font family of your application.
              </p>
              <div className="flex items-center space-x-4">
                <p
                  style={{
                    fontFamily: engineOptions.extensions.custom.fontFamily,
                  }}
                >
                  Sample Text
                </p>
                <code className="rounded bg-muted p-2 text-sm">
                  fontFamily: "{engineOptions.extensions.custom.fontFamily}"
                </code>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
