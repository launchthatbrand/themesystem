import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";

import { Button } from "@acme/ui/components/button";
import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Learn how to use the theme system in your applications
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Installation and basic setup</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/installation"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/quick-start"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/migration"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Migration from v1
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/getting-started">View Guide</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Concepts</CardTitle>
            <CardDescription>Understanding the theme system</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/architecture"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/themes"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Theme Definition
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/extensions"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Theme Extensions
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/core-concepts">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>Complete API documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/api/providers"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Providers
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api/hooks"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Hooks
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api/components"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Components
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/api">View API Reference</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guides</CardTitle>
            <CardDescription>Step-by-step tutorials</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/guides/nextjs"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Next.js Integration
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides/custom-themes"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Creating Custom Themes
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides/extensions"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Building Theme Extensions
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/guides">View Guides</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Usage</CardTitle>
            <CardDescription>Advanced techniques and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/advanced/performance"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Performance Optimization
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/advanced/ssr"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Server-Side Rendering
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/advanced/permissions"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Permission System
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/advanced">View Advanced Topics</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
            <CardDescription>Code examples and sample projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/examples/basic"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Basic Implementation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/examples/advanced"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Advanced Implementation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/examples/plugins"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Plugin Examples
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs/examples">View Examples</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 w-full max-w-6xl rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="text-2xl font-bold">Need Help?</h2>
        <p className="mt-2 text-muted-foreground">
          If you need any assistance using the theme system, check out these
          resources:
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <Link
            href="https://github.com/yourusername/theme-system/discussions"
            className="block rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            GitHub Discussions
          </Link>
          <Link
            href="https://discord.gg/example"
            className="block rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90"
          >
            Discord Community
          </Link>
          <Link
            href="mailto:support@example.com"
            className="block rounded-md bg-muted px-4 py-2 text-muted-foreground hover:bg-muted/90"
          >
            Email Support
          </Link>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
