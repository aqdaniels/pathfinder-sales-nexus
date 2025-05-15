
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryBuilder } from "./StoryBuilder";
import { ExecutiveTemplates } from "./ExecutiveTemplates";
import { DeliveryCoaching } from "./DeliveryCoaching";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExecutiveStorytellingCreator() {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Executive Value Storytelling
          </h1>
          <p className="text-muted-foreground">
            Craft compelling narratives for C-level executives
          </p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Export Story
        </Button>
      </div>

      <Tabs defaultValue="builder" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">Story Builder</TabsTrigger>
          <TabsTrigger value="templates">Executive Templates</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Coaching</TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder">
          <StoryBuilder />
        </TabsContent>
        
        <TabsContent value="templates">
          <ExecutiveTemplates />
        </TabsContent>
        
        <TabsContent value="delivery">
          <DeliveryCoaching />
        </TabsContent>
      </Tabs>
    </div>
  );
}
