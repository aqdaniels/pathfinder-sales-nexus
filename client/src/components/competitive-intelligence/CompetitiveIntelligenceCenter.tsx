
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileDown, Share2, Star, Clock, ChevronRight } from "lucide-react";
import { CompetitorComparisonMatrix } from "./CompetitorComparisonMatrix";
import { WinLossAnalytics } from "./WinLossAnalytics";
import { ObjectionHandlingLibrary } from "./ObjectionHandlingLibrary";
import { BattlecardGeneratorAdvanced } from "./BattlecardGeneratorAdvanced";
import { ValueVisualizationTools } from "./ValueVisualizationTools";
import { Card, CardContent } from "@/components/ui/card";

export function CompetitiveIntelligenceCenter() {
  const [activeTab, setActiveTab] = useState("comparison-matrix");

  // Example related tools that would be contextually relevant
  const relatedTools = [
    { name: "Market Position Analysis", path: "/market-position", description: "Compare with market trends" },
    { name: "SWOT Analysis", path: "/swot-analysis", description: "Analyze strengths and weaknesses" },
    { name: "Battlecards", path: "/competitive-battlecard", description: "Create battlecards for sales enablement" }
  ];
  
  // Example recently viewed items
  const recentlyViewed = [
    { name: "Oracle Comparison Matrix", type: "Competitor", date: "Yesterday" },
    { name: "SAP Win/Loss Analysis", type: "Win/Loss", date: "2 days ago" },
    { name: "Common Cloud Migration Objections", type: "Objection", date: "1 week ago" }
  ];

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
        
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
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
          </div>
          
          {/* Contextual sidebar with related tools and recent items */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Related Tools
                </div>
                <div className="space-y-3">
                  {relatedTools.map((tool, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="w-full justify-start text-left h-auto py-2"
                      asChild
                    >
                      <a href={tool.path} className="flex flex-col items-start">
                        <span className="flex items-center w-full">
                          {tool.name}
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </span>
                        <span className="text-xs text-muted-foreground">{tool.description}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recently Viewed
                </div>
                <div className="space-y-2">
                  {recentlyViewed.map((item, index) => (
                    <div key={index} className="text-sm p-2 hover:bg-muted rounded-md">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{item.type}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
