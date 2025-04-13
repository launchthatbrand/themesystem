import { Nav } from "@/components/nav";
import configImport from "../../../themesystem.config";
import { getThemeConfig } from "@themesystem/nextjs/server";

export default async function ExtensionsPage() {
  // Get config at build/request time
  const config = await getThemeConfig(configImport);
  console.log("Imported config:", configImport);
  console.log("Server config:", config);
  console.log("Extensions from config:", config.extensions);

  const extensions = config.extensions ?? {};

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="container mx-auto p-8">
        <h1 className="mb-6 text-3xl font-bold">Theme Extensions</h1>

        <div className="grid gap-6">
          {/* Loop through all extensions */}
          {Object.entries(extensions).map(([key, extension]) => {
            return (
              <section key={key} className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">{extension.name}</h2>
                <p className="mb-4">{extension.description}</p>

                {/* Display target information */}
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-medium">Target</h3>
                  <p className="text-sm">
                    Data Attribute:{" "}
                    <code>{extension.target.dataAttribute}</code>
                  </p>
                  {extension.target.componentName && (
                    <p className="text-sm">
                      Component: <code>{extension.target.componentName}</code>
                    </p>
                  )}
                </div>

                {/* Display theme information */}
                {extension.theme && (
                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-medium">Theme</h3>
                    {extension.theme.tokens && (
                      <div className="mb-4">
                        <h4 className="mb-2 font-medium">Tokens</h4>
                        <pre className="max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(extension.theme.tokens, null, 2)}
                        </pre>
                      </div>
                    )}
                    {extension.theme.components && (
                      <div>
                        <h4 className="mb-2 font-medium">Components</h4>
                        <pre className="max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(extension.theme.components, null, 2)}
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
