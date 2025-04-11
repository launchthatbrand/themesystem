import { Nav } from "@/components/nav";
import configImport from "../../../themesystem.config";

// Type assertion for the config
const config = configImport;

export default function ExtensionsPage() {
  // Get extensions with type safety
  const extensions = config.extensions ?? {};

  return (
    // <ServerThemeProvider>
    //   <ClientThemeProvider>
    <div className="min-h-screen">
      <Nav />
      <main className="container mx-auto p-8">
        <h1 className="mb-6 text-3xl font-bold">Theme Extensions</h1>

        <div className="grid gap-6">
          {/* Loop through all extensions */}
          {Object.entries(extensions).map(([key, extension]) => {
            // Type cast for safety
            const ext = extension;
            return (
              <section key={key} className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">{ext.name}</h2>
                <p className="mb-4">{ext.description}</p>

                {/* Display target information */}
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-medium">Target</h3>
                  <p className="text-sm">
                    Data Attribute: <code>{ext.target.dataAttribute}</code>
                  </p>
                  {ext.target.componentName && (
                    <p className="text-sm">
                      Component: <code>{ext.target.componentName}</code>
                    </p>
                  )}
                </div>

                {/* Display theme information */}
                {ext.theme && (
                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-medium">Theme</h3>
                    {ext.theme.tokens && (
                      <div className="mb-4">
                        <h4 className="mb-2 font-medium">Tokens</h4>
                        <pre className="max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(ext.theme.tokens, null, 2)}
                        </pre>
                      </div>
                    )}
                    {ext.theme.components && (
                      <div>
                        <h4 className="mb-2 font-medium">Components</h4>
                        <pre className="max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(ext.theme.components, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
