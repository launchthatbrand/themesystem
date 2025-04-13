"use client";

import { useEffect, useState } from "react";

import { themeRegistry } from "@themesystem/core";

function PluginsPage() {
  const [themesCount, setThemesCount] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Get all registered themes using the global themeRegistry
      const registeredThemes = themeRegistry.getAllThemes();
      setThemesCount(registeredThemes.length);

      console.log("Registered Themes:", registeredThemes);
      setInitialized(true);
    } catch (error) {
      console.error("Error accessing theme registry:", error);
      setInitialized(true);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Theme System Status</h1>
      {initialized ? (
        <div>
          <p className="mb-4 text-gray-600">
            Theme Registry accessed successfully!
          </p>
          <p className="mb-4">
            Found <strong>{themesCount}</strong> registered themes.
          </p>
          <p className="text-sm text-gray-500">
            Check the console to see registered themes.
          </p>
        </div>
      ) : (
        <p className="mb-4 text-gray-600">Accessing theme registry...</p>
      )}
    </div>
  );
}

export default PluginsPage;
