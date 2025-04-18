
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TreeMap, Tooltip, ResponsiveContainer } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink, ChevronRight, ArrowRight } from "lucide-react";

// Mock data for adjacency opportunities
const getAdjacencyData = (client: string, industry: string, timeframe: string) => {
  // This would be replaced with real API calls
  return {
    adjacencies: [
      {
        name: "AI/ML Services",
        size: 38,
        value: 38,
        confidence: "high",
        opportunity: "$42.6M",
        growth: 32.4,
        dxcOffering: "AI Operations Suite",
        description: "Expansion into AI/ML services for predictive analytics and process automation"
      },
      {
        name: "Industry Cloud",
        size: 27,
        value: 27,
        confidence: "high",
        opportunity: "$31.2M",
        growth: 24.7,
        dxcOffering: "Industry Cloud Accelerators",
        description: "Vertical-specific cloud solutions tailored to industry regulations and workflows"
      },
      {
        name: "API Ecosystem",
        size: 18,
        value: 18,
        confidence: "medium",
        opportunity: "$21.5M",
        growth: 19.6,
        dxcOffering: "Integration Platform",
        description: "API management and ecosystem development to enable new revenue streams"
      },
      {
        name: "Digital Supply Chain",
        size: 15,
        value: 15,
        confidence: "medium",
        opportunity: "$18.4M",
        growth: 17.2,
        dxcOffering: "Supply Chain Visibility",
        description: "End-to-end supply chain digitization and optimization solutions"
      },
      {
        name: "Sustainability Tech",
        size: 12,
        value: 12,
        confidence: "medium",
        opportunity: "$14.7M",
        growth: 22.5,
        dxcOffering: "Sustainability Dashboard",
        description: "ESG monitoring, reporting and optimization technology solutions"
      },
      {
        name: "IoT Analytics",
        size: 10,
        value: 10,
        confidence: "low",
        opportunity: "$12.3M",
        growth: 28.3,
        dxcOffering: "Connected Assets",
        description: "IoT data collection, analysis and real-time intelligence solutions"
      },
    ],
    topM_A_targets: [
      "TechVision Analytics",
      "CloudSphere Solutions",
      "DataFlow Systems",
    ]
  };
};

type AdjacencyOpportunitiesProps = {
  client: string;
  industry: string;
  timeframe: string;
};

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#8E9196', '#221F26'];
const CONFIDENCE_COLORS = {
  high: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800"
};

export const AdjacencyOpportunities = ({ client, industry, timeframe }: AdjacencyOpportunitiesProps) => {
  const data = getAdjacencyData(client, industry, timeframe);
  
  // Find the adjacency with the highest opportunity value
  const topAdjacency = [...data.adjacencies].sort((a, b) => 
    parseInt(b.opportunity.replace(/[^0-9.]/g, '')) - parseInt(a.opportunity.replace(/[^0-9.]/g, ''))
  )[0];

  // Convert the adjacency data for the treemap
  const treeMapData = [
    {
      name: "Adjacency Opportunities",
      children: data.adjacencies.map((adj, index) => ({
        name: adj.name,
        size: adj.size,
        value: adj.value,
        opportunity: adj.opportunity,
        growth: adj.growth,
        confidence: adj.confidence,
        description: adj.description,
        fill: COLORS[index % COLORS.length]
      }))
    }
  ];

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, opportunity, growth } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: props.fill,
            stroke: '#fff',
            strokeWidth: 2,
            opacity: 0.9,
          }}
        />
        {width > 70 && height > 50 ? (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 12}
              textAnchor="middle"
              fill="#fff"
              fontSize={12}
              fontWeight={600}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 8}
              textAnchor="middle"
              fill="#fff"
              fontSize={11}
            >
              {opportunity}
            </text>
            {width > 100 && height > 70 && (
              <text
                x={x + width / 2}
                y={y + height / 2 + 24}
                textAnchor="middle"
                fill="#fff"
                fontSize={10}
              >
                Growth: {growth}%
              </text>
            )}
          </>
        ) : null}
      </g>
    );
  };

  const chartConfig = {
    adjacency: {
      label: "Adjacency Value",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>M&A and Adjacency Expansion Opportunities</CardTitle>
          <CardDescription>
            Areas of expansion opportunity based on market growth, strategic fit, and confidence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <TreeMap
                data={treeMapData}
                dataKey="value"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomizedContent />}
              >
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
              </TreeMap>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Adjacency Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto">
            <div className="space-y-4">
              {data.adjacencies.map((adjacency) => (
                <div key={adjacency.name} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-base">{adjacency.name}</div>
                    <Badge className={CONFIDENCE_COLORS[adjacency.confidence as keyof typeof CONFIDENCE_COLORS]}>
                      {adjacency.confidence} confidence
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{adjacency.description}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-3">
                    <div>
                      <span className="text-muted-foreground">Opportunity:</span>
                      <span className="ml-1 font-medium">{adjacency.opportunity}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Growth Rate:</span>
                      <span className="ml-1 font-medium">{adjacency.growth}%</span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="text-muted-foreground">DXC Offering:</span>
                      <span className="ml-1 font-medium text-primary">{adjacency.dxcOffering}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Alert className="h-auto">
            <AlertTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Primary Expansion Opportunity
            </AlertTitle>
            <AlertDescription className="space-y-2">
              <p>
                <strong>{topAdjacency.name}</strong> represents the highest-value adjacency opportunity at <strong>{topAdjacency.opportunity}</strong>.
              </p>
              <p>
                Market growing at <strong>{topAdjacency.growth}%</strong> with <strong>{topAdjacency.confidence}</strong> confidence in addressable opportunity.
              </p>
              <p>
                DXC's <strong>{topAdjacency.dxcOffering}</strong> offering provides a strategic entry point into this adjacency.
              </p>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Potential M&A Targets</CardTitle>
              <CardDescription>
                Strategic acquisition candidates to accelerate adjacency growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.topM_A_targets.map((target) => (
                  <li key={target} className="flex items-center justify-between p-2 border-b">
                    <span>{target}</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Profile
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View Full M&A Target Analysis
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
