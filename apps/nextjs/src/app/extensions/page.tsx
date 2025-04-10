import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui/components/tabs";

import { Button } from "@acme/ui/components/button";
import Link from "next/link";

export default function ExtensionsPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Theme Extensions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Extend the theme system with component-specific themes
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full max-w-6xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="develop">Develop</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Extension System</CardTitle>
              <CardDescription>
                Component-level theming that integrates with the core theme
                system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Theme extensions allow you to create component-specific themes
                that work alongside the global theme system. This is perfect for
                parts of your application that need their own styling context,
                such as:
              </p>

              <ul className="ml-6 list-disc space-y-2">
                <li>Code editors with syntax highlighting themes</li>
                <li>Dashboard widgets with their own visual styles</li>
                <li>Document editors with different layout templates</li>
                <li>Data visualization components with chart themes</li>
                <li>Form builders with various style options</li>
              </ul>

              <p className="mt-4">
                Extensions can be used independently or bundled into plugins
                that provide complete theming solutions for specific use cases.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#examples">View Examples</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor Extension</CardTitle>
                <CardDescription>
                  Syntax highlighting themes for code editors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-slate-950 p-4">
                  <pre className="text-xs text-slate-100">
                    <code>{`function Example() {
  // This is a code example
  const value = "Hello World";
  return <div>{value}</div>;
}`}</code>
                  </pre>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    Monokai
                  </Button>
                  <Button size="sm" variant="outline">
                    GitHub
                  </Button>
                  <Button size="sm" variant="outline">
                    Nord
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Install Extension
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Extension</CardTitle>
                <CardDescription>
                  Themes for dashboard components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-blue-500 p-4 text-white">
                    <div className="text-xs opacity-80">Revenue</div>
                    <div className="text-xl font-bold">$24,500</div>
                  </div>
                  <div className="rounded-md bg-green-500 p-4 text-white">
                    <div className="text-xs opacity-80">Customers</div>
                    <div className="text-xl font-bold">1,245</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    Classic
                  </Button>
                  <Button size="sm" variant="outline">
                    Minimal
                  </Button>
                  <Button size="sm" variant="outline">
                    Dark
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Install Extension
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="develop" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Develop Extensions</CardTitle>
              <CardDescription>
                Create your own theme extensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Building your own theme extensions is straightforward with our
                plugin system. Here's a simplified example of how to create a
                code editor theme extension:
              </p>

              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <pre className="text-xs">
                  <code>{`import { createThemeExtension } from "@acme/theme-system";

// Create a code editor theme extension
export const codeEditorTheme = createThemeExtension({
  id: "code-editor",
  name: "Code Editor",
  themes: [
    {
      id: "monokai",
      name: "Monokai",
      variables: {
        "--code-bg": "#272822",
        "--code-text": "#f8f8f2",
        "--code-comment": "#88846f",
        "--code-keyword": "#f92672",
        "--code-string": "#a6e22e",
        "--code-number": "#ae81ff",
        // ...more variables
      }
    },
    // ...more themes
  ]
});

// Use in your components
function CodeEditor() {
  const { theme, setTheme } = codeEditorTheme.useTheme();
  
  return (
    <div>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="monokai">Monokai</option>
        <option value="github">GitHub</option>
      </select>
      <pre className="editor" style={{ 
        background: theme.variables["--code-bg"],
        color: theme.variables["--code-text"]
      }}>
        {/* Your code editor content */}
      </pre>
    </div>
  );
}`}</code>
                </pre>
              </div>

              <p>
                Check out our comprehensive documentation to learn more about
                creating theme extensions and publishing them as plugins.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs/extensions">View Extension Docs</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
