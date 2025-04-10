import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { Button } from "@acme/ui/button";
import Link from "next/link";

export default function ThemeSystemDemo() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Theme System</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A powerful and modular theme system for Next.js applications
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Light/Dark Mode</CardTitle>
            <CardDescription>
              Toggle between light, dark, and system themes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The theme system includes built-in support for light and dark
              modes with smooth transitions and system preference detection.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">Try It Out</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Styles</CardTitle>
            <CardDescription>
              Choose from a variety of visual styles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Select from multiple theme styles like Default, Rose, Green, Blue,
              and more to completely transform the look and feel of your app.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">Explore Themes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extensions</CardTitle>
            <CardDescription>App-specific theme extensions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Build app-specific theme extensions that integrate seamlessly with
              the core theme system for custom visual experiences.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zero Flashing</CardTitle>
            <CardDescription>No flash of unstyled content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The theme system prevents any flash of unstyled content on page
              load with client/server synchronization and an anti-flash script.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">See Demo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SSR Compatible</CardTitle>
            <CardDescription>Server-side rendering support</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Fully compatible with Next.js App Router and Server Components,
              with cookie-based synchronization between client and server.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">View Demo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TypeScript Support</CardTitle>
            <CardDescription>Fully typed APIs and components</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Enjoy complete TypeScript support with typed theme configurations,
              extension APIs, and component props for a smooth development
              experience.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/themes">Try Demo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 max-w-6xl">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Available Theme Styles
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-32 w-full overflow-hidden rounded-md bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            <span className="font-medium">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-32 w-full overflow-hidden rounded-md bg-gradient-to-br from-pink-400 to-rose-500"></div>
            <span className="font-medium">Rose</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-32 w-full overflow-hidden rounded-md bg-gradient-to-br from-emerald-400 to-green-500"></div>
            <span className="font-medium">Green</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-32 w-full overflow-hidden rounded-md bg-gradient-to-br from-blue-400 to-indigo-500"></div>
            <span className="font-medium">Blue</span>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl text-center">
        <h2 className="mb-4 text-2xl font-bold">Getting Started</h2>
        <p className="mb-6">
          Try out the theme system in this demo and see how it transforms your
          UI. Explore the options with the floating theme switcher in the bottom
          right.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/themes">Theme Demo</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          Click the floating theme switcher in the bottom-right corner to try
          different themes and styles!
        </p>
      </footer>
    </main>
  );
}
