
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Legend, ResponsiveContainer, ReferenceLine, Label, Tooltip } from "recharts";
import { Info, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Mock data for market share analysis
const getMarketShareData = (client: string, industry: string, timeframe: string) => {
  // This would be replaced with real API calls
  return {
    competitors: [
      { name: "Client", x: 4.2, y: -1.8, z: 120, id: "client" },
      { name: "Competitor A", x: 7.8, y: 2.3, z: 150, id: "comp-a" },
      { name: "Competitor B", x: 3.1, y: 1.2, z: 90, id: "comp-b" },
      { name: "Competitor C", x: 5.6, y: -0.8, z: 110, id: "comp-c" },
      { name: "Competitor D", x: 2.4, y: -2.1, z: 70, id: "comp-d" },
      { name: "Competitor E", x: 8.3, y: 3.5, z: 130, id: "comp-e" },
    ],
    segments: [
      { name: "Cloud Services", shareChange: -2.7, marketGrowth: 14.2, opportunity: "$18.3M" },
      { name: "Managed Services", shareChange: 1.2, marketGrowth: 6.8, opportunity: "$7.5M" },
      { name: "Security", shareChange: -3.4, marketGrowth: 17.5, opportunity: "$22.1M" },
      { name: "Analytics", shareChange: -5.1, marketGrowth: 21.2, opportunity: "$31.6M" },
    ]
  };
};

type MarketShareAnalysisProps = {
  client: string;
  industry: string;
  timeframe: string;
};

export const MarketShareAnalysis = ({ client, industry, timeframe }: MarketShareAnalysisProps) => {
  const data = getMarketShareData(client, industry, timeframe);
  
  // Find the segment with the largest market share decline
  const largestDecline = [...data.segments].sort((a, b) => a.shareChange - b.shareChange)[0];

  const chartConfig = {
    client: {
      label: "Client",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    },
    competitor: {
      label: "Competitor",
      theme: {
        light: "#D6BCFA",
        dark: "#D6BCFA"
      }
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Market Share Position Map</span>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-1" />
              Methodology
            </Button>
          </CardTitle>
          <CardDescription>
            Relative position based on market growth rate (x-axis) and market share change (y-axis)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Market Growth" 
                  unit="%" 
                  domain={[0, 10]}
                  label={{ value: 'Market Growth Rate (%)', position: 'bottom', offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Share Change" 
                  unit="%" 
                  domain={[-6, 6]}
                  label={{ value: 'Market Share Change (%)', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[60, 200]} 
                  name="Market Size" 
                  unit="M"
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend />
                <ReferenceLine 
                  x={0} 
                  stroke="#666" 
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#666" 
                />
                <Scatter 
                  name="Competitors" 
                  data={data.competitors.filter(comp => comp.id !== "client")} 
                  fill="#D6BCFA" 
                  shape="circle"
                />
                <Scatter 
                  name="Your Client" 
                  data={data.competitors.filter(comp => comp.id === "client")} 
                  fill="#9b87f5" 
                  shape="star"
                />
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Market Share Change by Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.segments.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{segment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Market growth: {segment.marketGrowth}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {segment.shareChange > 0 ? (
                        <Badge variant="success" className="gap-1">
                          <ArrowUp className="h-3 w-3" />
                          +{segment.shareChange}%
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="gap-1">
                          <ArrowDown className="h-3 w-3" />
                          {segment.shareChange}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Opportunity: {segment.opportunity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Alert className="h-auto">
          <AlertTitle>Market Position Insight</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>
              Your client is positioned in a <strong>high-growth market</strong> but is <strong>losing market share</strong> (-1.8%).
            </p>
            <p>
              The largest share decline is in <strong>{largestDecline.name}</strong> at <strong>{largestDecline.shareChange}%</strong>, despite a market growth rate of {largestDecline.marketGrowth}%.
            </p>
            <p className="font-medium">
              Primary opportunity: Retain and grow in high-growth segments by addressing competitive gaps in {largestDecline.name}.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
