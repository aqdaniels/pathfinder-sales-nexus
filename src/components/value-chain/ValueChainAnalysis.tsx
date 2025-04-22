
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessProcessModeling } from "./BusinessProcessModeling";
import { OpportunityIdentification } from "./OpportunityIdentification";
import { MaturityAssessment } from "./MaturityAssessment";
import { StrategyRecommendation } from "./StrategyRecommendation";
import { ExecutiveCommunication } from "./ExecutiveCommunication";
import { FileDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ValueChainAnalysis() {
  const [activeTab, setActiveTab] = useState("process-modeling");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Value Chain Analysis
          </h1>
          <p className="text-muted-foreground">
            Analyze client business processes and identify value improvement opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Analysis
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="process-modeling" 
        className="space-y-4" 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="process-modeling">
            Process Modeling
          </TabsTrigger>
          <TabsTrigger value="opportunity-identification">
            Opportunity Identification
          </TabsTrigger>
          <TabsTrigger value="maturity-assessment">
            Maturity Assessment
          </TabsTrigger>
          <TabsTrigger value="strategy-recommendation">
            Strategy Recommendation
          </TabsTrigger>
          <TabsTrigger value="executive-communication">
            Executive Communication
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="process-modeling">
          <BusinessProcessModeling />
        </TabsContent>
        
        <TabsContent value="opportunity-identification">
          <OpportunityIdentification />
        </TabsContent>
        
        <TabsContent value="maturity-assessment">
          <MaturityAssessment />
        </TabsContent>
        
        <TabsContent value="strategy-recommendation">
          <StrategyRecommendation />
        </TabsContent>
        
        <TabsContent value="executive-communication">
          <ExecutiveCommunication />
        </TabsContent>
      </Tabs>
    </div>
  );
}
