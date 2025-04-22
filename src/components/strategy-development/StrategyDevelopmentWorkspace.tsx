
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScamperWorkshop } from "./ScamperWorkshop";
import { AIIdeationEngine } from "./AIIdeationEngine";
import { CollaborativeSolutionDesign } from "./CollaborativeSolutionDesign";
import { BusinessCaseGenerator } from "./BusinessCaseGenerator";
import { StrategyTestingTools } from "./StrategyTestingTools";

export function StrategyDevelopmentWorkspace() {
  const [activeTab, setActiveTab] = useState("scamper-workshop");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Strategy Development
          </h1>
          <p className="text-muted-foreground">
            Develop innovative solution strategies and compelling business cases
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Strategy
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export Deliverables
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="scamper-workshop" 
        className="space-y-4" 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="scamper-workshop">
            SCAMPER Workshop
          </TabsTrigger>
          <TabsTrigger value="ai-ideation">
            AI Ideation
          </TabsTrigger>
          <TabsTrigger value="solution-design">
            Solution Design
          </TabsTrigger>
          <TabsTrigger value="business-case">
            Business Case
          </TabsTrigger>
          <TabsTrigger value="strategy-testing">
            Strategy Testing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scamper-workshop">
          <ScamperWorkshop />
        </TabsContent>
        
        <TabsContent value="ai-ideation">
          <AIIdeationEngine />
        </TabsContent>
        
        <TabsContent value="solution-design">
          <CollaborativeSolutionDesign />
        </TabsContent>
        
        <TabsContent value="business-case">
          <BusinessCaseGenerator />
        </TabsContent>
        
        <TabsContent value="strategy-testing">
          <StrategyTestingTools />
        </TabsContent>
      </Tabs>
    </div>
  );
}
