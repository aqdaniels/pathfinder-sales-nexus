
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Save, Share2, PlayCircle, RefreshCw, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Scenario = {
  name: string;
  description: string;
  baselineRevenue: number;
  baselineMarketShare: number;
  baselineGrowthRate: number;
  projections: any[];
};

type WhatIfBuilderProps = {
  client: string;
  industry: string;
  timeframe: string;
};

export const WhatIfBuilder = ({ client, industry, timeframe }: WhatIfBuilderProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("organic");
  const [investmentLevel, setInvestmentLevel] = useState<number>(50);
  const [executionSpeed, setExecutionSpeed] = useState<number>(50);
  const [competitivePressure, setCompetitivePressure] = useState<number>(50);
  
  // Mock data for scenarios
  const scenarios: Record<string, Scenario> = {
    organic: {
      name: "Organic Growth",
      description: "Maintain current trajectory with incremental improvements",
      baselineRevenue: 450,
      baselineMarketShare: 12.5,
      baselineGrowthRate: 5.8,
      projections: []
    },
    cloud: {
      name: "Cloud Modernization",
      description: "Accelerate cloud capabilities and market position",
      baselineRevenue: 450,
      baselineMarketShare: 12.5,
      baselineGrowthRate: 5.8,
      projections: []
    },
    dataAI: {
      name: "Data & AI Expansion",
      description: "Enter and expand in high-growth data and AI services",
      baselineRevenue: 450,
      baselineMarketShare: 12.5,
      baselineGrowthRate: 5.8,
      projections: []
    },
    acquisition: {
      name: "Strategic Acquisition",
      description: "Acquire capabilities in adjacent markets",
      baselineRevenue: 450,
      baselineMarketShare: 12.5,
      baselineGrowthRate: 5.8,
      projections: []
    }
  };

  // Calculate scenario projections based on parameters
  const calculateProjections = () => {
    const scenario = scenarios[selectedScenario];
    const investmentFactor = investmentLevel / 100;
    const executionFactor = executionSpeed / 100;
    const competitiveFactor = 1 - (competitivePressure / 100);
    
    // Adjust growth rates based on factors
    const baseGrowth = scenario.baselineGrowthRate;
    
    let growthBoost = 0;
    switch(selectedScenario) {
      case "organic":
        growthBoost = 2.5;
        break;
      case "cloud":
        growthBoost = 7.2;
        break;
      case "dataAI":
        growthBoost = 9.5;
        break;
      case "acquisition":
        growthBoost = 11.0;
        break;
    }
    
    // Apply factors to growth boost
    const adjustedBoost = growthBoost * investmentFactor * executionFactor * competitiveFactor;
    const targetGrowthRate = baseGrowth + adjustedBoost;
    
    // Generate 5-year projections
    const years = timeframe === "1-year" ? 1 : timeframe === "3-year" ? 3 : 5;
    const projections = [];
    
    let currentRevenue = scenario.baselineRevenue;
    let currentMarketShare = scenario.baselineMarketShare;
    const marketGrowth = 7.5; // Assumed market growth rate
    
    for (let i = 0; i <= years; i++) {
      const year = 2025 + i;
      
      if (i > 0) {
        currentRevenue = currentRevenue * (1 + (targetGrowthRate / 100));
        // Market share changes based on growth differential
        const marketShareChange = (targetGrowthRate - marketGrowth) / 10;
        currentMarketShare = currentMarketShare + marketShareChange;
      }
      
      projections.push({
        year,
        baseline: i === 0 ? currentRevenue : scenario.baselineRevenue * Math.pow(1 + (baseGrowth / 100), i),
        projected: currentRevenue,
        marketShare: currentMarketShare.toFixed(1)
      });
    }
    
    return projections;
  };
  
  const projections = calculateProjections();
  const finalYearProjection = projections[projections.length - 1];
  const growthPercentage = ((finalYearProjection.projected - scenarios[selectedScenario].baselineRevenue) / scenarios[selectedScenario].baselineRevenue * 100).toFixed(1);
  const additionalRevenue = (finalYearProjection.projected - finalYearProjection.baseline).toFixed(1);
  
  const chartConfig = {
    baseline: {
      label: "Baseline",
      theme: {
        light: "#8E9196",
        dark: "#8E9196"
      }
    },
    projected: {
      label: "Projected",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>What-If Scenario Builder</CardTitle>
            <CardDescription>
              Model different growth scenarios to explore potential outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Scenario Type</label>
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic Growth</SelectItem>
                    <SelectItem value="cloud">Cloud Modernization</SelectItem>
                    <SelectItem value="dataAI">Data & AI Expansion</SelectItem>
                    <SelectItem value="acquisition">Strategic Acquisition</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">{scenarios[selectedScenario].description}</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Investment Level</label>
                    <span className="text-sm text-muted-foreground">{investmentLevel}%</span>
                  </div>
                  <Slider
                    value={[investmentLevel]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={(values) => setInvestmentLevel(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Minimal</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Execution Speed</label>
                    <span className="text-sm text-muted-foreground">{executionSpeed}%</span>
                  </div>
                  <Slider
                    value={[executionSpeed]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={(values) => setExecutionSpeed(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Standard</span>
                    <span>Accelerated</span>
                    <span>Rapid</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Competitive Pressure</label>
                    <span className="text-sm text-muted-foreground">{competitivePressure}%</span>
                  </div>
                  <Slider
                    value={[competitivePressure]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={(values) => setCompetitivePressure(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>Intense</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button>
              <PlayCircle className="h-4 w-4 mr-1" />
              Run Simulation
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-1" />
              Save Scenario
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Growth Projection</CardTitle>
            <CardDescription>
              {timeframe === "1-year" ? "1 year" : timeframe === "3-year" ? "3 year" : "5 year"} outlook
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Growth</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  {growthPercentage}%
                  <Badge variant="success" className="text-xs">+{additionalRevenue}M</Badge>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Revenue by {projections[projections.length-1].year}</div>
                <div className="text-2xl font-bold">${finalYearProjection.projected.toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground mt-1">
                  vs. ${finalYearProjection.baseline.toFixed(1)}M baseline
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Market Share</div>
                <div className="text-2xl font-bold">{finalYearProjection.marketShare}%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  vs. {scenarios[selectedScenario].baselineMarketShare.toFixed(1)}% current
                </div>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Projection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Growth Trajectory</CardTitle>
          <CardDescription>
            Projected revenue growth compared to baseline over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={projections}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}M`}
                  label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => [`$${value}M`, ""]}
                    />
                  }
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  name="baseline"
                  stroke="var(--color-baseline)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  name="projected"
                  stroke="var(--color-projected)" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
