
import React, { useState } from "react";
import { 
  ChevronDown, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Share2, 
  ArrowRight, 
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GrowthGapsChart } from "./GrowthGapsChart";
import { MarketShareAnalysis } from "./MarketShareAnalysis";
import { AdjacencyOpportunities } from "./AdjacencyOpportunities";
import { ValuePropositions } from "./ValuePropositions";
import { WhatIfBuilder } from "./WhatIfBuilder";

export const GrowthAnalyzer = () => {
  const [selectedClient, setSelectedClient] = useState("acme-corp");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [timeframe, setTimeframe] = useState("3-year");

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Granularity of Growth Analyzer</h1>
          <p className="text-muted-foreground">
            Quantify growth opportunities across portfolio, market share, and adjacencies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters and controls */}
      <div className="flex flex-wrap gap-4 pb-2">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Client</span>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme-corp">Acme Corporation</SelectItem>
              <SelectItem value="globex">Globex Industries</SelectItem>
              <SelectItem value="initech">Initech Systems</SelectItem>
              <SelectItem value="massive-dynamic">Massive Dynamic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Industry</span>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="financial-services">Financial Services</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Timeframe</span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="3-year">3 Years</SelectItem>
              <SelectItem value="5-year">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Growth summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Portfolio Momentum
            </CardTitle>
            <CardDescription>Market growth rates by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">+7.3%</span>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                2.1% above avg
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Projected CAGR across portfolio segments
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Market Share Performance
            </CardTitle>
            <CardDescription>Share gain/loss opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">-2.4%</span>
              <Badge variant="warning" className="gap-1">
                <Share2 className="h-3 w-3" />
                Potential loss
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Projected market share change at current trajectory
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              M&A/Adjacency Potential
            </CardTitle>
            <CardDescription>Expansion opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">$142M</span>
              <Badge className="gap-1 bg-primary">
                <ArrowRight className="h-3 w-3" />
                High confidence
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Total expansion opportunity value
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="growth-gaps" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="growth-gaps">Growth Gaps</TabsTrigger>
          <TabsTrigger value="market-share">Market Share</TabsTrigger>
          <TabsTrigger value="adjacencies">Adjacencies</TabsTrigger>
          <TabsTrigger value="what-if">What-If Scenarios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth-gaps" className="space-y-4">
          <GrowthGapsChart 
            client={selectedClient} 
            industry={selectedIndustry} 
            timeframe={timeframe} 
          />
          <ValuePropositions 
            client={selectedClient} 
            industry={selectedIndustry} 
            growthType="portfolio"
          />
        </TabsContent>
        
        <TabsContent value="market-share" className="space-y-4">
          <MarketShareAnalysis 
            client={selectedClient} 
            industry={selectedIndustry} 
            timeframe={timeframe} 
          />
          <ValuePropositions 
            client={selectedClient} 
            industry={selectedIndustry} 
            growthType="market-share"
          />
        </TabsContent>
        
        <TabsContent value="adjacencies" className="space-y-4">
          <AdjacencyOpportunities 
            client={selectedClient} 
            industry={selectedIndustry} 
            timeframe={timeframe} 
          />
          <ValuePropositions 
            client={selectedClient} 
            industry={selectedIndustry} 
            growthType="adjacency"
          />
        </TabsContent>
        
        <TabsContent value="what-if" className="space-y-4">
          <WhatIfBuilder 
            client={selectedClient} 
            industry={selectedIndustry} 
            timeframe={timeframe} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
