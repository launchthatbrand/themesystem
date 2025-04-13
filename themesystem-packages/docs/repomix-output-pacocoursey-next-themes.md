This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.github/
  ISSUE_TEMPLATE/
    1-bug-report.yaml
    2-feature-request.yaml
  workflows/
    e2e.yml
    test.yml
  FUNDING.yml
examples/
  example/
    pages/
      _app.js
      dark.js
      index.js
      light.js
    .gitignore
    package.json
    styles.css
  multi-theme/
    src/
      app/
        globals.css
        layout.tsx
        page.tsx
      components/
        ThemeProvider.tsx
        ThemeToggles.tsx
    .gitignore
    next.config.js
    package.json
    postcss.config.js
    README.md
    tailwind.config.ts
    tsconfig.json
  tailwind/
    pages/
      _app.js
      _document.js
      index.js
    .gitignore
    package.json
    postcss.config.js
    styles.css
    tailwind.config.js
  with-app-dir/
    src/
      app/
        globals.css
        layout.tsx
        page.tsx
        ThemeToggle.tsx
    .gitignore
    package.json
    postcss.config.js
    README.md
    tailwind.config.ts
    tsconfig.json
next-themes/
  __tests__/
    index.test.tsx
  src/
    index.tsx
    script.ts
    types.ts
  license.md
  package.json
  README.md
  tsconfig.json
  tsup.config.ts
test/
  forced-theme.test.ts
  storage-event.test.ts
  switch-theme.test.ts
  system-theme.test.ts
  util.ts
.gitignore
.prettierignore
.prettierrc
license.md
package.json
playwright.config.ts
pnpm-workspace.yaml
turbo.json
```

# Files

## File: .github/ISSUE_TEMPLATE/1-bug-report.yaml
````yaml
name: Bug Report
description: File a bug report.
title: "[Bug]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: Version
      description: What version of next-themes are you using?
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
        - other (please specify in the description)
````

## File: .github/ISSUE_TEMPLATE/2-feature-request.yaml
````yaml
name: Feature request
description: Feature request for next-themes.
title: "[Feature request]: "
labels: ["request"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this feature request!
  - type: textarea
    id: functionality
    attributes:
      label: What feature would you like to see?
      description: Specify the feature you would like to see and perhaps what problem it would solve for you.
      placeholder: "I would like to be able to..."
    validations:
      required: true
````

## File: .github/workflows/e2e.yml
````yaml
name: E2E - Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Run Playwright tests
    timeout-minutes: 5
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.x

      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'

      - run: pnpm install
        env:
          CI: true

      - name: Setup Playwright
        run: npx playwright install --with-deps

      - name: Run tests
        run: pnpm test:e2e
````

## File: .github/workflows/test.yml
````yaml
name: Unit - Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.x

      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'

      - run: pnpm install
        env:
          CI: true

      - name: Run tests
        run: pnpm test
````

## File: .github/FUNDING.yml
````yaml
github: pacocoursey
````

## File: examples/example/pages/_app.js
````javascript
import { ThemeProvider } from 'next-themes'
import '../styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
````

## File: examples/example/pages/dark.js
````javascript
import Link from 'next/link'

const Page = () => {
  return <Link href="/">Go back home</Link>
}

Page.theme = 'dark'
export default Page
````

## File: examples/example/pages/index.js
````javascript
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Index = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div>
      <h1>next-themes Example</h1>
      <select value={theme} onChange={e => setTheme(e.target.value)} data-test-id="theme-selector">
        <option value="system">System</option>
        {mounted && (
          <>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </>
        )}
      </select>

      <br />
      <br />

      <div>
        <Link href="/dark">Forced Dark Page</Link> • <Link href="/light">Forced Light Page</Link>
      </div>
    </div>
  )
}

export default Index
````

## File: examples/example/pages/light.js
````javascript
import Link from 'next/link'

const Page = () => {
  return <Link href="/">Go back home</Link>
}

Page.theme = 'light'
export default Page
````

## File: examples/example/.gitignore
````
.vercel
````

## File: examples/example/package.json
````json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.21",
    "next-themes": "workspace:*",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
````

## File: examples/example/styles.css
````css
* {
  box-sizing: border-box;
}

:root {
  --fg: #000;
  --bg: #fff;
}

[data-theme='dark'] {
  --fg: #fff;
  --bg: #000;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  min-height: 100vh;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  background: var(--bg);
  color: var(--fg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

select {
  font-size: 24px;
}

a {
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--fg);
}
````

## File: examples/multi-theme/src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: #1e293b;
    --primary-foreground: #f8fafc;
  }
  html[data-theme='dark-classic'] {
    --primary: #cbd5e1;
    --primary-foreground: #0f172a;
  }
  html[data-theme='tangerine'] {
    --primary: #fcd34d;
    --primary-foreground: #0f172a;
  }
  html[data-theme='dark-tangerine'] {
    --primary: #d97706;
    --primary-foreground: #0f172a;
  }
  html[data-theme='mint'] {
    --primary: #6ee7b7;
    --primary-foreground: #0f172a;
  }
  html[data-theme='dark-mint'] {
    --primary: #047857;
    --primary-foreground: #f8fafc;
  }
}
````

## File: examples/multi-theme/src/app/layout.tsx
````typescript
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black min-h-[100dvh]">
        <ThemeProvider
          defaultTheme="light"
          enableColorScheme
          themes={['light', 'dark-classic', 'tangerine', 'dark-tangerine', 'mint', 'dark-mint']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
````

## File: examples/multi-theme/src/app/page.tsx
````typescript
import ThemeToggles from '../components/ThemeToggles'

export default function Home() {
  return (
    <div className="w-full container p-4 mx-auto">
      <div className="py-20 flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
        <h1 className="text-5xl text-center  font-bold">
          Next Themes + Tailwind +{' '}
          <span className="text-primary-foreground bg-primary py-2 px-4 rounded">Multi</span> Themes
        </h1>
        <p className="italic text-2xl">with app-dir</p>
        <ThemeToggles />
      </div>
    </div>
  )
}
````

## File: examples/multi-theme/src/components/ThemeProvider.tsx
````typescript
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

/**
 * Your app's theme provider component.
 * 'use client' is essential for next-themes to work with app-dir.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
````

## File: examples/multi-theme/src/components/ThemeToggles.tsx
````typescript
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeToggles() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // The active theme is not available on the server.
  // If you have styling that is conditionally applied based on the active-theme,
  // you have to await the mounted state before rendering the active theme.
  useEffect(() => setMounted(true), [])

  const themeMapping: Record<string, string> = {
    light: 'Default',
    'dark-classic': 'Dark',
    tangerine: 'Tangerine',
    'dark-tangerine': 'Tangerine (dark)',
    mint: 'Mint',
    'dark-mint': 'Mint (dark)'
  }

  return (
    <div>
      <div className="mt-16 grid grid-cols-3 grid-rows-2 grid-flow-col gap-4">
        {Object.entries(themeMapping).map(([key, value]) => (
          <button
            key={key}
            className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${
              // The theme is only available after the component is mounted.
              mounted && theme == key
                ? 'border border-primary bg-primary-foreground text-primary'
                : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => {
              setTheme(key)
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeToggles
````

## File: examples/multi-theme/.gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## File: examples/multi-theme/next.config.js
````javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
````

## File: examples/multi-theme/package.json
````json
{
  "name": "multi-theme",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "20.5.7",
    "@types/react": "^18.2.21",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "next": "^14.2.21",
    "next-themes": "workspace:*",
    "postcss": "8.4.31",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3",
    "typescript": "^5.2.2"
  }
}
````

## File: examples/multi-theme/postcss.config.js
````javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
````

## File: examples/multi-theme/README.md
````markdown
# multi-theme example

> An example on how to handle multiple-themes with `next-themes` using `next.js` app directory.
````

## File: examples/multi-theme/tailwind.config.ts
````typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme^="dark-"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        }
      }
    }
  },
  plugins: []
}
export default config
````

## File: examples/multi-theme/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## File: examples/tailwind/pages/_app.js
````javascript
import { ThemeProvider } from 'next-themes'
import '../styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
````

## File: examples/tailwind/pages/_document.js
````javascript
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white dark:bg-black text-white dark:text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
````

## File: examples/tailwind/pages/index.js
````javascript
import { useTheme } from 'next-themes'

export default function IndexPage() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="bg-white dark:bg-black">
      <div className="py-20 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-center text-gray-800 dark:text-gray-100 font-bold">
          Next Themes + Tailwind Dark Mode
        </h1>

        <button
          className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          Change Theme
        </button>
      </div>
    </div>
  )
}
````

## File: examples/tailwind/.gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel
````

## File: examples/tailwind/package.json
````json
{
  "name": "tailwind",
  "version": "1.0.0",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.21",
    "next-themes": "workspace:*",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "10.4.15",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.3"
  }
}
````

## File: examples/tailwind/postcss.config.js
````javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
````

## File: examples/tailwind/styles.css
````css
@tailwind base;

/* Start purging... */
@tailwind components;
@tailwind utilities;
/* Stop purging. */
````

## File: examples/tailwind/tailwind.config.js
````javascript
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class'
}
````

## File: examples/with-app-dir/src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
````

## File: examples/with-app-dir/src/app/layout.tsx
````typescript
import './globals.css'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black min-h-dvh">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}
````

## File: examples/with-app-dir/src/app/page.tsx
````typescript
import { ThemeToggle } from './ThemeToggle'

export default function Home() {
  return (
    <div className="w-full container p-4 mx-auto">
      <div className="py-20 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-center text-gray-800 dark:text-gray-100 font-bold">
          Next Themes + Tailwind Dark Mode
        </h1>
        <p className="italic text-2xl">with app-dir</p>

        <ThemeToggle />
      </div>
    </div>
  )
}
````

## File: examples/with-app-dir/src/app/ThemeToggle.tsx
````typescript
'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      Change Theme
    </button>
  )
}
````

## File: examples/with-app-dir/.gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## File: examples/with-app-dir/package.json
````json
{
  "name": "with-app-dir",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.21",
    "next-themes": "workspace:*",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "10.4.15",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.3"
  }
}
````

## File: examples/with-app-dir/postcss.config.js
````javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
````

## File: examples/with-app-dir/README.md
````markdown
# with-app-dir example

> An example on how to use `next-themes` with `next.js` app directory.
````

## File: examples/with-app-dir/tailwind.config.ts
````typescript
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: []
} satisfies Config
````

## File: examples/with-app-dir/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## File: next-themes/__tests__/index.test.tsx
````typescript
// @vitest-environment jsdom

import * as React from 'react'
import { act, render, renderHook, screen } from '@testing-library/react'
import { vi, beforeAll, beforeEach, afterEach, afterAll, describe, test, it, expect } from 'vitest'
import { cleanup } from '@testing-library/react'

import { ThemeProvider, useTheme } from '../src/index'
import { ThemeProviderProps } from '../src/types'

let originalLocalStorage: Storage
const localStorageMock: Storage = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string): string => store[key] ?? null),
    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string): void => {
      delete store[key]
    }),
    clear: vi.fn((): void => {
      store = {}
    }),
    key: vi.fn((index: number): string | null => ''),
    length: Object.keys(store).length
  }
})()

// HelperComponent to render the theme inside a paragraph-tag and setting a theme via the forceSetTheme prop
const HelperComponent = ({ forceSetTheme }: { forceSetTheme?: string }) => {
  const { setTheme, theme, forcedTheme, resolvedTheme, systemTheme } = useTheme()

  React.useEffect(() => {
    if (forceSetTheme) {
      setTheme(forceSetTheme)
    }
  }, [forceSetTheme])

  return (
    <>
      <p data-testid="theme">{theme}</p>
      <p data-testid="forcedTheme">{forcedTheme}</p>
      <p data-testid="resolvedTheme">{resolvedTheme}</p>
      <p data-testid="systemTheme">{systemTheme}</p>
    </>
  )
}

function setDeviceTheme(theme: 'light' | 'dark') {
  // Create a mock of the window.matchMedia function
  // Based on: https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: theme === 'dark' ? true : false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}

beforeAll(() => {
  // Create mocks of localStorage getItem and setItem functions
  originalLocalStorage = window.localStorage
  window.localStorage = localStorageMock
})

beforeEach(() => {
  // Reset window side-effects
  setDeviceTheme('light')
  document.documentElement.style.colorScheme = ''
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('class')

  // Clear the localStorage-mock
  localStorageMock.clear()
})

afterEach(() => {
  cleanup()
})

afterAll(() => {
  window.localStorage = originalLocalStorage
})

function makeWrapper(props: ThemeProviderProps) {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider {...props}>{children}</ThemeProvider>
  )
}

describe('defaultTheme', () => {
  test('should return system-theme when no default-theme is set', () => {
    setDeviceTheme('light')

    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({})
    })
    expect(result.current.theme).toBe('system')
    expect(result.current.systemTheme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')
  })

  test('should return light when no default-theme is set and enableSystem=false', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({ enableSystem: false })
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')
  })

  test('should return light when light is set as default-theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({ defaultTheme: 'light' })
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')
  })

  test('should return dark when dark is set as default-theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({ defaultTheme: 'dark' })
    })
    expect(result.current.theme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')
  })
})

describe('provider', () => {
  it('ignores nested ThemeProviders', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="dark">
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </ThemeProvider>
      )
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')
  })
})

describe('storage', () => {
  test('should not set localStorage with default value', () => {
    renderHook(() => useTheme(), {
      wrapper: makeWrapper({ defaultTheme: 'dark' })
    })

    expect(window.localStorage.setItem).toBeCalledTimes(0)
    expect(window.localStorage.getItem('theme')).toBeNull()
  })

  test('should set localStorage when switching themes', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({})
    })
    result.current.setTheme('dark')

    expect(window.localStorage.setItem).toBeCalledTimes(1)
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })
})

describe('custom storageKey', () => {
  test("should save to localStorage with 'theme' key when using default settings", () => {
    act(() => {
      render(
        <ThemeProvider>
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(window.localStorage.getItem).toHaveBeenCalledWith('theme')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  test("should save to localStorage with 'custom' when setting prop 'storageKey' to 'customKey'", () => {
    act(() => {
      render(
        <ThemeProvider storageKey="customKey">
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(window.localStorage.getItem).toHaveBeenCalledWith('customKey')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('customKey', 'light')
  })
})

describe('custom attribute', () => {
  test('should use data-theme attribute when using default', () => {
    act(() => {
      render(
        <ThemeProvider>
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  test('should use class attribute (CSS-class) when attribute="class"', () => {
    act(() => {
      render(
        <ThemeProvider attribute="class">
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.classList.contains('light')).toBeTruthy()
  })

  test('should use "data-example"-attribute when attribute="data-example"', () => {
    act(() => {
      render(
        <ThemeProvider attribute="data-example">
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-example')).toBe('light')
  })

  test('supports multiple attributes', () => {
    act(() => {
      render(
        <ThemeProvider attribute={['data-example', 'data-theme-test']}>
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-example')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme-test')).toBe('light')
  })
})

describe('custom value-mapping', () => {
  test('should use custom value mapping when using value={{pink:"my-pink-theme"}}', () => {
    localStorageMock.setItem('theme', 'pink')

    act(() => {
      render(
        <ThemeProvider
          themes={['pink', 'light', 'dark', 'system']}
          value={{ pink: 'my-pink-theme' }}
        >
          <HelperComponent forceSetTheme="pink" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('my-pink-theme')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'pink')
  })

  test('should allow missing values (attribute)', () => {
    act(() => {
      render(
        <ThemeProvider value={{ dark: 'dark-mode' }}>
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.hasAttribute('data-theme')).toBeFalsy()
  })

  test('should allow missing values (class)', () => {
    act(() => {
      render(
        <ThemeProvider attribute="class" value={{ dark: 'dark-mode' }}>
          <HelperComponent forceSetTheme="light" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.classList.contains('light')).toBeFalsy()
  })

  test('supports multiple attributes', () => {
    act(() => {
      render(
        <ThemeProvider
          attribute={['data-example', 'data-theme-test']}
          themes={['pink', 'light', 'dark', 'system']}
          value={{ pink: 'my-pink-theme' }}
        >
          <HelperComponent forceSetTheme="pink" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-example')).toBe('my-pink-theme')
    expect(document.documentElement.getAttribute('data-theme-test')).toBe('my-pink-theme')
  })
})

describe('forcedTheme', () => {
  test('should render saved theme when no forcedTheme is set', () => {
    localStorageMock.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({})
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.forcedTheme).toBeUndefined()
  })

  test('should render light theme when forcedTheme is set to light', () => {
    localStorageMock.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({
        forcedTheme: 'light'
      })
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.forcedTheme).toBe('light')
  })
})

describe('system theme', () => {
  test('resolved theme should be set', () => {
    setDeviceTheme('dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({})
    })

    expect(result.current.theme).toBe('system')
    expect(result.current.systemTheme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')
    expect(result.current.forcedTheme).toBeUndefined()
  })

  test('system theme should be set, even if theme is not system', () => {
    setDeviceTheme('dark')

    act(() => {
      render(
        <ThemeProvider defaultTheme="light">
          <HelperComponent />
        </ThemeProvider>
      )
    })

    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(screen.getByTestId('forcedTheme').textContent).toBe('')
    expect(screen.getByTestId('resolvedTheme').textContent).toBe('light')
    expect(screen.getByTestId('systemTheme').textContent).toBe('dark')
  })

  test('system theme should not be set if enableSystem is false', () => {
    setDeviceTheme('dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: makeWrapper({ enableSystem: false, defaultTheme: 'light' })
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.systemTheme).toBeUndefined()
    expect(result.current.resolvedTheme).toBe('light')
    expect(result.current.forcedTheme).toBeUndefined()
  })
})

describe('color-scheme', () => {
  test('does not set color-scheme when disabled', () => {
    act(() => {
      render(
        <ThemeProvider enableColorScheme={false}>
          <HelperComponent />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.style.colorScheme).toBe('')
  })

  test('should set color-scheme light when light theme is active', () => {
    act(() => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  test('should set color-scheme dark when dark theme is active', () => {
    act(() => {
      render(
        <ThemeProvider defaultTheme="dark">
          <HelperComponent forceSetTheme="dark" />
        </ThemeProvider>
      )
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })
})

describe('setTheme', () => {
  test('setTheme(<literal>)', () => {
    const { result, rerender } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    })
    expect(result.current?.setTheme).toBeDefined()
    expect(result.current.resolvedTheme).toBe('light')
    result.current.setTheme('dark')
    rerender()
    expect(result.current.resolvedTheme).toBe('dark')
  })

  test('setTheme(<function>)', () => {
    const { result, rerender } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    })
    expect(result.current?.setTheme).toBeDefined()
    expect(result.current.theme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')

    const toggleTheme = vi.fn((theme: string) => (theme === 'light' ? 'dark' : 'light'))

    result.current.setTheme(toggleTheme)
    expect(toggleTheme).toBeCalledTimes(1)
    rerender()

    expect(result.current.theme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')

    result.current.setTheme(toggleTheme)
    expect(toggleTheme).toBeCalledTimes(2)
    rerender()

    expect(result.current.theme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')
  })

  test('setTheme(<function>) gets relevant state value', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    })

    act(() => {
      result.current.setTheme((theme) => {
        console.log('1', theme)
        return theme === 'dark' ? 'light' : 'dark'
      })
      result.current.setTheme((theme) => {
        console.log('2', theme)
        return theme === 'light' ? 'dark' : 'light'
      })
    })

    expect(consoleSpy).toHaveBeenCalledWith('1', 'light')
    expect(consoleSpy).toHaveBeenCalledWith('2', 'dark')
    expect(result.current.theme).toBe('light')

    consoleSpy.mockRestore()
  })

})

describe('inline script', () => {
  test('should pass props to script', () => {
    act(() => {
      render(
        <ThemeProvider defaultTheme="light" scriptProps={{ 'data-test': '1234' }}>
          <HelperComponent />
        </ThemeProvider>
      )
    })

    expect(document.querySelector('script[data-test="1234"]')).toBeTruthy()
  })
})
````

## File: next-themes/src/index.tsx
````typescript
'use client'

import * as React from 'react'
import { script } from './script'
import type { Attribute, ThemeProviderProps, UseThemeProps } from './types'

const colorSchemes = ['light', 'dark']
const MEDIA = '(prefers-color-scheme: dark)'
const isServer = typeof window === 'undefined'
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = { setTheme: _ => { }, themes: [] }

const saveToLS = (storageKey: string, value: string) => {
  // Save to storage
  try {
    localStorage.setItem(storageKey, value)
  } catch (e) {
    // Unsupported
  }
}

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext

export const ThemeProvider = (props: ThemeProviderProps) => {
  const context = React.useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>
  return <Theme {...props} />
}

const defaultThemes = ['light', 'dark']

const Theme = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
  scriptProps
}: ThemeProviderProps) => {
  const [theme, setThemeState] = React.useState(() => getTheme(storageKey, defaultTheme))
  const [resolvedTheme, setResolvedTheme] = React.useState(() => theme === 'system' ? getSystemTheme() : theme)
  const attrs = !value ? themes : Object.values(value)

  const applyTheme = React.useCallback(theme => {
    let resolved = theme
    if (!resolved) return

    // If theme is system, resolve it before setting theme
    if (theme === 'system' && enableSystem) {
      resolved = getSystemTheme()
    }

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation(nonce) : null
    const d = document.documentElement

    const handleAttribute = (attr: Attribute) => {
      if (attr === 'class') {
        d.classList.remove(...attrs)
        if (name) d.classList.add(name)
      } else if (attr.startsWith('data-')) {
        if (name) {
          d.setAttribute(attr, name)
        } else {
          d.removeAttribute(attr)
        }
      }
    }

    if (Array.isArray(attribute)) attribute.forEach(handleAttribute)
    else handleAttribute(attribute)

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback
      // @ts-ignore
      d.style.colorScheme = colorScheme
    }

    enable?.()
  }, [nonce])

  const setTheme = React.useCallback(value => {
    if (typeof value === 'function') {
      setThemeState(prevTheme => {
        const newTheme = value(prevTheme)

        saveToLS(storageKey, newTheme)

        return newTheme
      })
    } else {
      setThemeState(value)
      saveToLS(storageKey, value)
    }
  }, [])

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme]
  )

  // Always listen to System preference
  React.useEffect(() => {
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      if (!e.newValue) {
        setTheme(defaultTheme)
      } else {
        setThemeState(e.newValue) // Direct state update to avoid loops
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  // Whenever theme or forcedTheme changes, apply it
  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  const providerValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === 'system' ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, 'system'] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          nonce,
          scriptProps
        }}
      />

      {children}
    </ThemeContext.Provider>
  )
}

const ThemeScript = React.memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themes,
    nonce,
    scriptProps
  }: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) => {
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme
    ]).slice(1, -1)

    return (
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === 'undefined' ? nonce : ''}
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
      />
    )
  }
)

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return theme || fallback
}

const disableAnimation = (nonce?: string) => {
  const css = document.createElement('style')
  if (nonce) css.setAttribute('nonce', nonce)
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ; (() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

// Re-export types
export type { Attribute, ThemeProviderProps, UseThemeProps } from './types'
````

## File: next-themes/src/script.ts
````typescript
export const script = (
  attribute,
  storageKey,
  defaultTheme,
  forcedTheme,
  themes,
  value,
  enableSystem,
  enableColorScheme
) => {
  const el = document.documentElement
  const systemThemes = ['light', 'dark']

  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute]

    attributes.forEach(attr => {
      const isClass = attr === 'class'
      const classes = isClass && value ? themes.map(t => value[t] || t) : themes
      if (isClass) {
        el.classList.remove(...classes)
        el.classList.add(value && value[theme] ? value[theme] : theme)
      } else {
        el.setAttribute(attr, theme)
      }
    })

    setColorScheme(theme)
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme
    }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme
      const isSystem = enableSystem && themeName === 'system'
      const theme = isSystem ? getSystemTheme() : themeName
      updateDOM(theme)
    } catch (e) {
      //
    }
  }
}
````

## File: next-themes/src/types.ts
````typescript
import * as React from 'react'

interface ValueObject {
  [themeName: string]: string
}

type DataAttribute = `data-${string}`

interface ScriptProps
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  [dataAttribute: DataAttribute]: any
}

export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[]
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined
  /** Update the theme */
  setTheme: React.Dispatch<React.SetStateAction<string>>
  /** Active theme name */
  theme?: string | undefined
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string | undefined
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'dark' | 'light' | undefined
}

export type Attribute = DataAttribute | 'class'

export interface ThemeProviderProps extends React.PropsWithChildren {
  /** List of all available theme names */
  themes?: string[] | undefined
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean | undefined
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean | undefined
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string | undefined
  /** HTML attribute modified based on the active theme. Accepts `class`, `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.), or an array which could include both */
  attribute?: Attribute | Attribute[] | undefined
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject | undefined
  /** Nonce string to pass to the inline script and style elements for CSP headers */
  nonce?: string
  /** Props to pass the inline script */
  scriptProps?: ScriptProps
}
````

## File: next-themes/license.md
````markdown
MIT License

Copyright (c) 2022 Paco Coursey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: next-themes/package.json
````json
{
  "name": "next-themes",
  "version": "0.4.6",
  "license": "MIT",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "prepublish": "pnpm build",
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run __tests__"
  },
  "peerDependencies": {
    "react": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc",
    "react-dom": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc"
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/pacocoursey/next-themes.git"
  }
}
````

## File: next-themes/README.md
````markdown
# next-themes ![next-themes minzip package size](https://img.shields.io/bundlephobia/minzip/next-themes) [![Version](https://img.shields.io/npm/v/next-themes.svg?colorB=green)](https://www.npmjs.com/package/next-themes)

An abstraction for themes in your React app.

- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 `appDir`
- ✅ No flash on load (both SSR and SSG)
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ `useTheme` hook

Check out the [Live Example](https://next-themes-example.vercel.app/) to try it for yourself.

## Install

```bash
$ npm install next-themes
# or
$ yarn add next-themes
```

## Use

### With pages/

You'll need a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use next-themes. The simplest `_app` looks like this:

```jsx
// pages/_app.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

Adding dark mode support takes 2 lines of code:

```jsx
// pages/_app.js
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

### With app/

You'll need to update your `app/layout.jsx` to use next-themes. The simplest `layout` looks like this:

```jsx
// app/layout.jsx
export default function Layout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
```

Adding dark mode support takes 2 lines of code:

```jsx
// app/layout.jsx
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

Note that `ThemeProvider` is a client component, not a server component.

> **Note!** If you do not add [suppressHydrationWarning](https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning:~:text=It%20only%20works%20one%20level%20deep) to your `<html>` you will get warnings because `next-themes` updates that element. This property only applies one level deep, so it won't block hydration warnings on other elements.

### HTML & CSS

That's it, your Next.js app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, next-themes modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

```css
:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
}

[data-theme='dark'] {
  --background: black;
  --foreground: white;
}
```

> **Note!** If you set the attribute of your Theme Provider to class for Tailwind next-themes will modify the `class` attribute on the `html` element. See [With TailwindCSS](#with-tailwindcss).

### useTheme

Your UI will need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```jsx
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}
```

> **Warning!** The above code is hydration _unsafe_ and will throw a hydration mismatch warning when rendering with SSG or SSR. This is because we cannot know the `theme` on the server, so it will always be `undefined` until mounted on the client.
>
> You should delay rendering any theme toggling UI until mounted on the client. See the [example](#avoid-hydration-mismatch).

## API

Let's dig into the details.

### ThemeProvider

All your theme configuration is passed to ThemeProvider.

- `storageKey = 'theme'`: Key used to store theme setting in localStorage
- `defaultTheme = 'system'`: Default theme name (for v0.0.12 and lower the default was `light`). If `enableSystem` is false, the default theme is `light`
- `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
- `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
- `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
- `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes ([example](#disable-transitions-on-theme-change))
- `themes = ['light', 'dark']`: List of theme names
- `attribute = 'data-theme'`: HTML attribute modified based on the active theme
  - accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) ([example](#class-instead-of-data-attribute))
- `value`: Optional mapping of theme name to attribute value
  - value is an `object` where key is the theme name and value is the attribute value ([example](#differing-dom-attribute-and-theme-name))
- `nonce`: Optional nonce passed to the injected `script` tag, used to allow-list the next-themes script in your CSP
- `scriptProps`: Optional props to pass to the injected `script` tag ([example](#using-with-cloudflare-rocket-loader))

### useTheme

useTheme takes no parameters, but returns:

- `theme`: Active theme name
- `setTheme(name)`: Function to update the theme. The API is identical to the [set function](https://react.dev/reference/react/useState#setstate) returned by `useState`-hook. Pass the new theme value or use a callback to set the new theme based on the current theme.
- `forcedTheme`: Forced page theme or falsy. If `forcedTheme` is set, you should disable any theme switching UI
- `resolvedTheme`: If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
- `systemTheme`: If `enableSystem` is true, represents the System theme preference ("dark" or "light"), regardless what the active theme is
- `themes`: The list of themes passed to `ThemeProvider` (with "system" appended, if `enableSystem` is true)

Not too bad, right? Let's see how to use these properties with examples:

## Examples

The [Live Example](https://next-themes-example.vercel.app/) shows next-themes in action, with dark, light, system themes and pages with forced themes.

### Use System preference by default

For versions above v0.0.12, the `defaultTheme` is automatically set to "system", so to use System preference you can simply use:

```jsx
<ThemeProvider>
```

### Ignore System preference

If you don't want a System theme, disable it via `enableSystem`:

```jsx
<ThemeProvider enableSystem={false}>
```

### Class instead of data attribute

If your Next.js app uses a class to style the page based on the theme, change the attribute prop to `class`:

```jsx
<ThemeProvider attribute="class">
```

Now, setting the theme to "dark" will set `class="dark"` on the `html` element.

### Force page to a theme

Let's say your cool new marketing page is dark mode only. The page should always use the dark theme, and changing the theme should have no effect. To force a theme on your Next.js pages, simply set a variable on the page component:

```js
// pages/awesome-page.js

const Page = () => { ... }
Page.theme = 'dark'
export default Page
```

In your `_app`, read the variable and pass it to ThemeProvider:

```jsx
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || null}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

Done! Your page is always dark theme (regardless of user preference), and calling `setTheme` from `useTheme` is now a no-op. However, you should make sure to disable any of your UI that would normally change the theme:

```js
const { forcedTheme } = useTheme()

// Theme is forced, we shouldn't allow user to change the theme
const disabled = !!forcedTheme
```

### Disable transitions on theme change

I wrote about [this technique here](https://paco.sh/blog/disable-theme-transitions). We can forcefully disable all CSS transitions before the theme is changed, and re-enable them immediately afterwards. This ensures your UI with different transition durations won't feel inconsistent when changing the theme.

To enable this behavior, pass the `disableTransitionOnChange` prop:

```jsx
<ThemeProvider disableTransitionOnChange>
```

### Differing DOM attribute and theme name

The name of the active theme is used as both the localStorage value and the value of the DOM attribute. If the theme name is "pink", localStorage will contain `theme=pink` and the DOM will be `data-theme="pink"`. You **cannot** modify the localStorage value, but you **can** modify the DOM value.

If we want the DOM to instead render `data-theme="my-pink-theme"` when the theme is "pink", pass the `value` prop:

```jsx
<ThemeProvider value={{ pink: 'my-pink-theme' }}>
```

Done! To be extra clear, this affects only the DOM. Here's how all the values will look:

```js
const { theme } = useTheme()
// => "pink"

localStorage.getItem('theme')
// => "pink"

document.documentElement.getAttribute('data-theme')
// => "my-pink-theme"
```

### Using with Cloudflare Rocket Loader

[Rocket Loader](https://developers.cloudflare.com/fundamentals/speed/rocket-loader/) is a Cloudflare optimization that defers the loading of inline and external scripts to prioritize the website content. Since next-themes relies on a script injection to avoid screen flashing on page load, Rocket Loader breaks this functionality. Individual scripts [can be ignored](https://developers.cloudflare.com/fundamentals/speed/rocket-loader/ignore-javascripts/) by adding the `data-cfasync="false"` attribute to the script tag:

```jsx
<ThemeProvider scriptProps={{ 'data-cfasync': 'false' }}>
```

### More than light and dark mode

next-themes is designed to support any number of themes! Simply pass a list of themes:

```jsx
<ThemeProvider themes={['pink', 'red', 'blue']}>
```

> **Note!** When you pass `themes`, the default set of themes ("light" and "dark") are overridden. Make sure you include those if you still want your light and dark themes:

```jsx
<ThemeProvider themes={['pink', 'red', 'blue', 'light', 'dark']}>
```

For an example on how to use this, check out the [multi-theme example](./examples/multi-theme/README.md)

### Without CSS variables

This library does not rely on your theme styling using CSS variables. You can hard-code the values in your CSS, and everything will work as expected (without any flashing):

```css
html,
body {
  color: #000;
  background: #fff;
}

[data-theme='dark'],
[data-theme='dark'] body {
  color: #fff;
  background: #000;
}
```

### With Styled Components and any CSS-in-JS

Next Themes is completely CSS independent, it will work with any library. For example, with Styled Components you just need to `createGlobalStyle` in your custom App:

```jsx
// pages/_app.js
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'next-themes'

// Your themeing variables
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
```

### Avoid Hydration Mismatch

Because we cannot know the `theme` on the server, many of the values returned from `useTheme` will be `undefined` until mounted on the client. This means if you try to render UI based on the current theme before mounting on the client, you will see a hydration mismatch error.

The following code sample is **unsafe**:

```jsx
import { useTheme } from 'next-themes'

// Do NOT use this! It will throw a hydration mismatch error.
const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSwitch
```

To fix this, make sure you only render UI that uses the current theme when the page is mounted on the client:

```jsx
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSwitch
```

Alternatively, you could lazy load the component on the client side. The following example uses `next/dynamic` but you could also use `React.lazy`:

```js
import dynamic from 'next/dynamic'

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), { ssr: false })

const ThemePage = () => {
  return (
    <div>
      <ThemeSwitch />
    </div>
  )
}

export default ThemePage
```

To avoid [Layout Shift](https://web.dev/cls/), consider rendering a skeleton/placeholder until mounted on the client side.

#### Images

Showing different images based on the current theme also suffers from the hydration mismatch problem. With [`next/image`](https://nextjs.org/docs/basic-features/image-optimization) you can use an empty image until the theme is resolved:

```jsx
import Image from 'next/image'
import { useTheme } from 'next-themes'

function ThemedImage() {
  const { resolvedTheme } = useTheme()
  let src

  switch (resolvedTheme) {
    case 'light':
      src = '/light.png'
      break
    case 'dark':
      src = '/dark.png'
      break
    default:
      src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      break
  }

  return <Image src={src} width={400} height={400} />
}

export default ThemedImage
```

#### CSS

You can also use CSS to hide or show content based on the current theme. To avoid the hydration mismatch, you'll need to render _both_ versions of the UI, with CSS hiding the unused version. For example:

```jsx
function ThemedImage() {
  return (
    <>
      {/* When the theme is dark, hide this div */}
      <div data-hide-on-theme="dark">
        <Image src="light.png" width={400} height={400} />
      </div>

      {/* When the theme is light, hide this div */}
      <div data-hide-on-theme="light">
        <Image src="dark.png" width={400} height={400} />
      </div>
    </>
  )
}

export default ThemedImage
```

```css
[data-theme='dark'] [data-hide-on-theme='dark'],
[data-theme='light'] [data-hide-on-theme='light'] {
  display: none;
}
```

### With TailwindCSS

[Visit the live example](https://next-themes-tailwind.vercel.app) • [View the example source code](https://github.com/pacocoursey/next-themes/tree/master/examples/tailwind)

> NOTE! Tailwind only supports dark mode in version >2.

In your `tailwind.config.js`, set the dark mode property to `selector`:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'selector'
}
```

_Note: If you are using an older version of tailwindcss < 3.4.1 use `'class'` instead of `'selector'`_

Set the attribute for your Theme Provider to class:

```tsx
// pages/_app.tsx
<ThemeProvider attribute="class">
```

If you're using the value prop to specify different attribute values, make sure your dark theme explicitly uses the "dark" value, as required by Tailwind.

That's it! Now you can use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

#### Using a custom selector (tailwindcss > 3.4.1)

Tailwind also allows you to use a [custom selector](https://tailwindcss.com/docs/dark-mode#customizing-the-selector) for dark-mode as of v3.4.1.

In that case, your `tailwind.config.js` would look like this:

```js
// tailwind.config.js
module.exports = {
  // data-mode is used as an example, next-themes supports using any data attribute
  darkMode: ['selector', '[data-mode="dark"]']
  …
}
```

Now set the attribute for your ThemeProvider to `data-mode`:

```tsx
// pages/_app.tsx
<ThemeProvider attribute="data-mode">
```

With this setup, you can now use Tailwind's dark mode classes, as in the previous example:

## Discussion

### The Flash

ThemeProvider automatically injects a script into `next/head` to update the `html` element with the correct attributes before the rest of your page loads. This means the page will not flash under any circumstances, including forced themes, system theme, multiple themes, and incognito. No `noflash.js` required.

## FAQ

---

**Why is my page still flashing?**

In Next.js dev mode, the page may still flash. When you build your app in production mode, there will be no flashing.

---

**Why do I get server/client mismatch error?**

When using `useTheme`, you will use see a hydration mismatch error when rendering UI that relies on the current theme. This is because many of the values returned by `useTheme` are undefined on the server, since we can't read `localStorage` until mounting on the client. See the [example](#avoid-hydration-mismatch) for how to fix this error.

---

**Do I need to use CSS variables with this library?**

Nope. See the [example](#without-css-variables).

---

**Can I set the class or data attribute on the body or another element?**

Nope. If you have a good reason for supporting this feature, please open an issue.

---

**Can I use this package with Gatsby or CRA?**

Yes, starting from the 0.3.0 version.

---

**Is the injected script minified?**

Yes.

---

**Why is `resolvedTheme` necessary?**

When supporting the System theme preference, you want to make sure that's reflected in your UI. This means your buttons, selects, dropdowns, or whatever you use to indicate the current theme should say "System" when the System theme preference is active.

If we didn't distinguish between `theme` and `resolvedTheme`, the UI would show "Dark" or "Light", when it should really be "System".

`resolvedTheme` is then useful for modifying behavior or styles at runtime:

```jsx
const { resolvedTheme } = useTheme()

<div style={{ color: resolvedTheme === 'dark' ? 'white' : 'black' }}>
```

If we didn't have `resolvedTheme` and only used `theme`, you'd lose information about the state of your UI (you would only know the theme is "system", and not what it resolved to).
````

## File: next-themes/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es2018",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "noEmit": true,
    "types": ["vitest/jsdom"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules", "build", "dist", ".next"]
}
````

## File: next-themes/tsup.config.ts
````typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  sourcemap: false,
  minify: true,
  dts: true,
  clean: true,
  external: ['react'],
  format: ['esm', 'cjs'],
  splitting: false,
  bundle: true
})
````

## File: test/forced-theme.test.ts
````typescript
import { test } from '@playwright/test'
import { checkAppliedTheme, checkStoredTheme, makeBrowserContext } from './util'

test.describe('forced theme test-suite', async () => {
  function makeForcedThemeTest(pageUrl: string, storedTheme: string, expectedTheme: string) {
    test(`should render forced-theme (${expectedTheme}) instead of stored theme (${expectedTheme})`, async ({
      browser,
      baseURL
    }) => {
      const context = await makeBrowserContext(browser, {
        baseURL,
        localStorage: [{ name: 'theme', value: storedTheme }]
      })
      const page = await context.newPage()
      await page.goto(pageUrl)

      await checkStoredTheme(page, storedTheme)
      await checkAppliedTheme(page, expectedTheme)
    })
  }

  makeForcedThemeTest('/light', 'dark', 'light')
  makeForcedThemeTest('/dark', 'light', 'dark')
})
````

## File: test/storage-event.test.ts
````typescript
import { test, expect } from '@playwright/test'
import { checkAppliedTheme, makeBrowserContext } from './util'

test.describe('storage-events test-suite', async () => {
  test('should switch theme if stored theme value is updated in a different tab', async ({
    browser,
    baseURL
  }) => {
    const context = await makeBrowserContext(browser, {
      colorScheme: 'light',
      baseURL: baseURL,
      localStorage: [{ name: 'theme', value: 'light' }]
    })
    // Create page and see if stored theme is applied
    const page1 = await context.newPage()
    await page1.goto('/')
    await checkAppliedTheme(page1, 'light')

    // Create second page and also check theme value
    const page2 = await context.newPage()
    await page2.goto('/')
    await checkAppliedTheme(page2, 'light')

    // Select theme in page2
    await page2.locator('[data-test-id="theme-selector"]').selectOption('dark')
    // Expect both pages to have changed theme
    await checkAppliedTheme(page2, 'dark')
    await checkAppliedTheme(page1, 'dark')
  })

  test('should apply ignored storage-event once page with forced-theme is left', async ({
    browser,
    baseURL
  }) => {
    const context = await makeBrowserContext(browser, {
      colorScheme: 'light',
      baseURL: baseURL,
      localStorage: [{ name: 'theme', value: 'dark' }]
    })

    // Create page and see if stored theme is applied
    const page1 = await context.newPage()
    await page1.goto('/')
    await checkAppliedTheme(page1, 'dark')

    // Create second page and also check theme value
    const page2 = await context.newPage()
    await page2.goto('/dark')
    await checkAppliedTheme(page2, 'dark')

    // Change theme on page1 and assert theme change
    await page1.locator('[data-test-id="theme-selector"]').selectOption('light')
    await checkAppliedTheme(page1, 'light')

    // Page 2 should not have changed theme since on page with forced theme
    await checkAppliedTheme(page2, 'dark')
    const localStorage = await page2.evaluate(() => window.localStorage)
    expect(localStorage?.theme).toBe('light')

    // Navigate to home and check if newly stored theme is now applied
    await page2.locator('text=Go back home').click()
    await page2.locator('[data-test-id="theme-selector"]').waitFor()
    expect(page2.url()).toBe(baseURL + '/')
    await checkAppliedTheme(page2, 'light')
  })
})
````

## File: test/switch-theme.test.ts
````typescript
import { test } from '@playwright/test'
import { checkAppliedTheme, makeBrowserContext } from './util'

test.describe('basic theming test-suite', () => {
  function makeRenderThemeTest(theme: string) {
    test(`should render ${theme} theme`, async ({ browser, baseURL }) => {
      const context = await makeBrowserContext(browser, {
        baseURL,
        localStorage: [{ name: 'theme', value: theme }]
      })
      const page = await context.newPage()

      await page.goto('/')
      // Select dark
      await page.locator('[data-test-id="theme-selector"]').selectOption(theme)
      // Check if dark theme is applied
      await checkAppliedTheme(page, theme)
    })
  }

  makeRenderThemeTest('light')
  makeRenderThemeTest('dark')

  function shouldUpdateTheme(initialTheme, targetTheme: string) {
    test(`should switch from ${initialTheme} to ${targetTheme}-theme`, async ({
      browser,
      baseURL
    }) => {
      const context = await makeBrowserContext(browser, {
        baseURL,
        localStorage: [{ name: 'theme', value: initialTheme }]
      })
      const page = await context.newPage()

      await page.goto('/')
      await checkAppliedTheme(page, initialTheme)
      // Select dark
      await page.locator('[data-test-id="theme-selector"]').selectOption(targetTheme)
      // Check if dark theme is applied
      await checkAppliedTheme(page, targetTheme)
    })
  }

  shouldUpdateTheme('light', 'dark')
  shouldUpdateTheme('dark', 'light')
})
````

## File: test/system-theme.test.ts
````typescript
import { test, expect } from '@playwright/test'
import { checkAppliedTheme, checkStoredTheme, makeBrowserContext } from './util'

test.describe('system theme test-suite', () => {
  function testSystemTheme(
    pagePath: string,
    preferredColorScheme: 'light' | 'dark',
    expectedTheme: string
  ) {
    test(`should render ${expectedTheme} theme if preferred-colorscheme is ${preferredColorScheme}`, async ({
      browser,
      baseURL
    }) => {
      const context = await makeBrowserContext(browser, {
        colorScheme: preferredColorScheme,
        baseURL,
        localStorage: [{ name: 'theme', value: 'system' }]
      })

      const page = await context.newPage()
      await page.goto(pagePath)

      await checkStoredTheme(page, 'system')
      await checkAppliedTheme(page, expectedTheme)
    })
  }

  // Test if preferred-colorscheme works
  testSystemTheme('/', 'light', 'light')
  testSystemTheme('/', 'dark', 'dark')
})
````

## File: test/util.ts
````typescript
import { Page, expect, Browser } from '@playwright/test'

export async function checkAppliedTheme(page: Page, theme: string) {
  expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe(theme)
  expect(await page.evaluate(() => document.documentElement.getAttribute('style'))).toBe(
    `color-scheme: ${theme};`
  )
}

export async function checkStoredTheme(page: Page, expectedTheme: string) {
  const localStorage = await page.evaluate(() => window.localStorage)
  expect(localStorage?.theme).toBe(expectedTheme)
}

type MakeBrowserContextOptions = {
  baseURL?: string
  colorScheme?: 'light' | 'dark' | 'no-preference'
  localStorage?: { name: string; value: string }[]
}

export async function makeBrowserContext(browser: Browser, options: MakeBrowserContextOptions) {
  return await browser.newContext({
    colorScheme: options.colorScheme ?? 'no-preference',
    storageState: {
      cookies: [],
      origins: [
        {
          origin: options.baseURL ?? 'http://localhost:3000',
          localStorage: options.localStorage ?? []
        }
      ]
    }
  })
}
````

## File: .gitignore
````
.DS_Store
node_modules/
dist/
.next/
.yalc/
yalc.lock
.idea/
.turbo
````

## File: .prettierignore
````
.next
dist
build
````

## File: .prettierrc
````
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "printWidth": 100
}
````

## File: license.md
````markdown
MIT License

Copyright (c) 2022 Paco Coursey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: package.json
````json
{
  "private": true,
  "scripts": {
    "prepublish": "pnpm build --filter=next-themes",
    "build": "turbo build",
    "start": "turbo start",
    "dev": "turbo dev",
    "test": "turbo test",
    "test:e2e": "pnpm playwright test",
    "lint": "prettier . --write"
  },
  "devDependencies": {
    "@playwright/test": "^1.51.0",
    "@testing-library/react": "^14.2.1",
    "@types/node": "20.5.7",
    "@types/react": "^18.2.65",
    "@types/react-dom": "18.2.7",
    "jsdom": "^24.0.0",
    "prettier": "^3.2.5",
    "tsup": "^8.3.5",
    "turbo": "^1.10.12",
    "typescript": "^5.4.2",
    "vitest": "^1.6.1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/pacocoursey/next-themes.git"
  },
  "engines": {
    "node": ">=20",
    "pnpm": ">=9"
  }
}
````

## File: playwright.config.ts
````typescript
import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  testDir: './test',
  webServer: {
    command: 'pnpm start --filter=example...',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
}

export default config
````

## File: pnpm-workspace.yaml
````yaml
packages:
  - 'next-themes'
  - 'examples/*'
````

## File: turbo.json
````json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/", ".next/", "!.next/cache"]
    },
    "start": {
      "dependsOn": ["build"],
      "persistent": true
    },
    "dev": {
      "persistent": true
    },
    "test": {},
    "test:e2e": {}
  }
}
````
