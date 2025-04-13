"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@acme/ui/tooltip";

import { Card } from "@acme/ui/card";
import { Sheet } from "@acme/ui/sheet";

export default function DemoPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">UI Components Demo</h1>

      <Tabs defaultValue="card" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="sheet">Sheet</TabsTrigger>
          <TabsTrigger value="tooltip">Tooltip</TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Card Component</h2>
            <p className="text-gray-600">
              This is a basic card component that can be used to group related
              content. It supports various styling options and can be customized
              using Tailwind classes.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="sheet">
          <div className="flex justify-center">
            <Sheet>
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Sheet Component</h2>
                <p className="text-gray-600">
                  The Sheet component is typically used for side panels or
                  modal-like interfaces. It can be triggered to slide in from
                  any edge of the screen.
                </p>
              </div>
            </Sheet>
          </div>
        </TabsContent>

        <TabsContent value="tooltip">
          <div className="flex justify-center p-12">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
                  Hover me
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip that appears on hover!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
