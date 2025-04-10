import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/components/table";

import { Button } from "@acme/ui/components/button";
import Link from "next/link";

export default function PermissionsPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Permission Controls
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Configure theme system access for different user roles
        </p>
      </div>

      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Permission Settings</CardTitle>
          <CardDescription>
            Control who can modify different aspects of your theme system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permission Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Base Theme</TableCell>
                <TableCell>Light/Dark mode switching</TableCell>
                <TableCell>
                  <Select defaultValue="user">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">All Users</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Theme Library</TableCell>
                <TableCell>Switch between different theme styles</TableCell>
                <TableCell>
                  <Select defaultValue="user">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">All Users</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Extensions</TableCell>
                <TableCell>Component-level theme extensions</TableCell>
                <TableCell>
                  <Select defaultValue="admin">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">All Users</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Theme Creation</TableCell>
                <TableCell>Create new custom themes</TableCell>
                <TableCell>
                  <Select defaultValue="admin">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">All Users</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Default Theme</TableCell>
                <TableCell>Set organization default theme</TableCell>
                <TableCell>
                  <Select defaultValue="admin">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">All Users</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
          <CardDescription>
            Examples of permission setups for different use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">Organization Admin</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Full access to all theme settings
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Can change base theme</li>
                <li>• Can select theme styles</li>
                <li>• Can use all extensions</li>
                <li>• Can create new themes</li>
                <li>• Can set defaults</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">Regular User</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Basic customization options
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Can change base theme</li>
                <li>• Can select theme styles</li>
                <li>• Limited extension access</li>
                <li>• Can't create themes</li>
                <li>• Can't set defaults</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">Restricted User</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Minimal theme control
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Can change base theme only</li>
                <li>• Fixed theme style</li>
                <li>• No extension access</li>
                <li>• Can't create themes</li>
                <li>• Can't set defaults</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
