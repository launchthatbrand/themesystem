export const script = `(function(attribute, styleAttribute, storageKey, styleStorageKey, defaultTheme, defaultStyle, forcedTheme, forcedStyle, defaultThemes, value, styleValue, enableSystem, enableColorScheme) {
  let theme;
  let style;
  
  try {
    theme = localStorage.getItem(storageKey) || defaultTheme;
    style = localStorage.getItem(styleStorageKey) || defaultStyle;
  } catch (e) {
    theme = defaultTheme;
    style = defaultStyle;
  }

  const applyTheme = (theme) => {
    let resolved = theme;
    if (!resolved) return;

    if (theme === "system" && enableSystem) {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    const name = value ? value[resolved] : resolved;
    const d = document.documentElement;

    if (attribute === "class") {
      d.classList.remove(...(value ? Object.values(value) : defaultThemes));
      if (name) d.classList.add(name);
    } else if (attribute.startsWith("data-")) {
      if (name) {
        d.setAttribute(attribute, name);
      } else {
        d.removeAttribute(attribute);
      }
    }

    if (enableColorScheme) {
      const fallback = ["light", "dark"].includes(defaultTheme) ? defaultTheme : null;
      const colorScheme = ["light", "dark"].includes(resolved) ? resolved : fallback;
      d.style.colorScheme = colorScheme || "";
    }
  };

  const applyStyle = (style) => {
    if (!style) return;

    const name = styleValue ? styleValue[style] : style;
    const d = document.documentElement;

    if (styleAttribute === "class") {
      d.classList.remove(...(styleValue ? Object.values(styleValue) : []));
      if (name) d.classList.add(name);
    } else if (styleAttribute.startsWith("data-")) {
      if (name) {
        d.setAttribute(styleAttribute, name);
      } else {
        d.removeAttribute(styleAttribute);
      }
    }
  };

  if (forcedTheme) {
    applyTheme(forcedTheme);
  } else {
    applyTheme(theme);
  }

  if (forcedStyle) {
    applyStyle(forcedStyle);
  } else {
    applyStyle(style);
  }
})`;
