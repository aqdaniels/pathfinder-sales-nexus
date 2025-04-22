
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileDown, Share2 } from "lucide-react";
import { CompetitorComparisonMatrix } from "./CompetitorComparisonMatrix";
import { WinLossAnalytics } from "./WinLossAnalytics";
import { ObjectionHandlingLibrary } from "./ObjectionHandlingLibrary";
import { BattlecardGeneratorAdvanced } from "./BattlecardGeneratorAdvanced";
import { ValueVisualizationTools } from "./ValueVisualizationTools";

export function CompetitiveIntelligenceCenter() {
  const [activeTab, setActiveTab] = useState("comparison-matrix");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Competitive Intelligence Center
          </h1>
          <p className="text-muted-foreground">
            Actionable competitive insights and positioning guidance for sales teams
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Insights
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="comparison-matrix" 
        className="space-y-4" 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="comparison-matrix">
            Comparison Matrix
          </TabsTrigger>
          <TabsTrigger value="win-loss">
            Win/Loss Analysis
          </TabsTrigger>
          <TabsTrigger value="objection-handling">
            Objection Handling
          </TabsTrigger>
          <TabsTrigger value="battlecards">
            Battlecards
          </TabsTrigger>
          <TabsTrigger value="value-visualization">
            Value Visualization
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison-matrix">
          <CompetitorComparisonMatrix />
        </TabsContent>
        
        <TabsContent value="win-loss">
          <WinLossAnalytics />
        </TabsContent>
        
        <TabsContent value="objection-handling">
          <ObjectionHandlingLibrary />
        </TabsContent>
        
        <TabsContent value="battlecards">
          <BattlecardGeneratorAdvanced />
        </TabsContent>
        
        <TabsContent value="value-visualization">
          <ValueVisualizationTools />
        </TabsContent>
      </Tabs>
    </div>
  );
}
