import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ExternalLink, ChevronRight, ArrowRight, MessageSquare } from "lucide-react";

// Mock data for whitespace opportunities
const getWhitespaceData = (client: string, industry: string, timeframe: string, filter: string) => {
  // This would be replaced with real API calls in a production environment
  // The filter parameter would modify what data is returned
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
        description: "Expansion into AI/ML services for predictive analytics and process automation",
        clientEvidence: [
          "CTO mentioned interest in AI for operational efficiency during Q1 business review",
          "IT Director described current manual analytics processes as 'burdensome' in March meeting",
          "Recent RFI included requirements for ML capabilities (Apr 12, 2025)"
        ]
      },
      {
        name: "Industry Cloud",
        size: 27,
        value: 27,
        confidence: "high",
        opportunity: "$31.2M",
        growth: 24.7,
        dxcOffering: "Industry Cloud Accelerators",
        description: "Vertical-specific cloud solutions tailored to industry regulations and workflows",
        clientEvidence: [
          "CFO discussed industry-specific compliance challenges (Feb 18, 2025)",
          "Monthly technical review identified cloud migration blockers due to unique requirements",
          "Client mentioned competitor's industry-specific solution in passing"
        ]
      },
      {
        name: "API Ecosystem",
        size: 18,
        value: 18,
        confidence: "medium",
        opportunity: "$21.5M",
        growth: 19.6,
        dxcOffering: "Integration Platform",
        description: "API management and ecosystem development to enable new revenue streams",
        clientEvidence: [
          "Digital strategy discussion highlighted need for partner ecosystem (Jan 7, 2025)",
          "Current integration pains mentioned in technical meeting",
          "IT roadmap mentions 'API First' strategy for 2026"
        ]
      },
      {
        name: "Digital Supply Chain",
        size: 15,
        value: 15,
        confidence: "medium",
        opportunity: "$18.4M",
        growth: 17.2,
        dxcOffering: "Supply Chain Visibility",
        description: "End-to-end supply chain digitization and optimization solutions",
        clientEvidence: [
          "COO expressed frustration with supply chain visibility (Mar 22, 2025)",
          "Business review highlighted inventory management challenges",
          "IT planning mentions supply chain systems as 'end of life' in next 18 months"
        ]
      },
      {
        name: "Sustainability Tech",
        size: 12,
        value: 12,
        confidence: "medium",
        opportunity: "$14.7M",
        growth: 22.5,
        dxcOffering: "Sustainability Dashboard",
        description: "ESG monitoring, reporting and optimization technology solutions",
        clientEvidence: [
          "Board directive on sustainability metrics mentioned in executive meeting",
          "Current manual ESG reporting described as 'painful' by Finance lead",
          "RFI for sustainability solutions seen in procurement system"
        ]
      },
      {
        name: "IoT Analytics",
        size: 10,
        value: 10,
        confidence: "low",
        opportunity: "$12.3M",
        growth: 28.3,
        dxcOffering: "Connected Assets",
        description: "IoT data collection, analysis and real-time intelligence solutions",
        clientEvidence: [
          "Pilot IoT project mentioned in passing during technical review",
          "Operations lead asked about sensor data analytics capabilities",
          "Email thread referenced future IoT expansion plans"
        ]
      },
    ],
    benchmarks: [
      { name: "Industry Average", penetration: 38 },
      { name: "Top Quartile", penetration: 67 },
      { name: "Current Client", penetration: 42 }
    ],
    topM_A_targets: [
      "TechVision Analytics",
      "CloudSphere Solutions",
      "DataFlow Systems",
    ]
  };
};

type WhitespaceExplorerProps = {
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

export const WhitespaceExplorer = ({ client, industry, timeframe }: WhitespaceExplorerProps) => {
  const [filter, setFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("map");
  const [sortBy, setSortBy] = useState("opportunity");

  const data = getWhitespaceData(client, industry, timeframe, filter);

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
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="map">Opportunity Map</TabsTrigger>
            <TabsTrigger value="list">Detailed List</TabsTrigger>
            <TabsTrigger value="evidence">Evidence View</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Whitespace Opportunity Map</CardTitle>
                <CardDescription>
                  Areas of growth opportunity based on market potential, fit, and client evidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <Treemap
                        data={treeMapData}
                        dataKey="value"
                        aspectRatio={4 / 3}
                        stroke="#fff"
                        content={<CustomizedContent />}
                      >
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                      </Treemap>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Whitespace Opportunities</CardTitle>
                <CardDescription>
                  Prioritized list of expansion opportunities with market and client context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
                  {data.adjacencies.sort((a, b) => {
                    if (sortBy === "opportunity") {
                      return parseInt(b.opportunity.replace(/[^0-9.]/g, '')) - parseInt(a.opportunity.replace(/[^0-9.]/g, ''));
                    } else if (sortBy === "confidence") {
                      const confidenceOrder = { high: 3, medium: 2, low: 1 };
                      return confidenceOrder[b.confidence as keyof typeof confidenceOrder] - confidenceOrder[a.confidence as keyof typeof confidenceOrder];
                    } else {
                      return b.growth - a.growth;
                    }
                  }).map((adjacency, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-base">{adjacency.name}</div>
                        <Badge className={CONFIDENCE_COLORS[adjacency.confidence as keyof typeof CONFIDENCE_COLORS]}>
                          {adjacency.confidence} confidence
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{adjacency.description}</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground">Opportunity:</span>
                          <span className="ml-1 font-medium">{adjacency.opportunity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth Rate:</span>
                          <span className="ml-1 font-medium">{adjacency.growth}%</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">DXC Offering:</span>
                          <span className="ml-1 font-medium text-primary">{adjacency.dxcOffering}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          View Client Evidence ({(adjacency as any).clientEvidence?.length || 0})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Client Evidence View</CardTitle>
                <CardDescription>
                  Supporting client statements and data points for each opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
                  {data.adjacencies.map((adjacency, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-base">{adjacency.name}</div>
                        <Badge className={CONFIDENCE_COLORS[adjacency.confidence as keyof typeof CONFIDENCE_COLORS]}>
                          {adjacency.opportunity}
                        </Badge>
                      </div>

                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Client Evidence:</h4>
                        <ul className="space-y-2">
                          {(adjacency as any).clientEvidence?.map((evidence: string, i: number) => (
                            <li key={i} className="bg-muted p-2 rounded text-sm flex items-start">
                              <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                              <span>{evidence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3 pt-3 border-t flex justify-between">
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Related Meeting Transcripts
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Add Evidence
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business Process</SelectItem>
              <SelectItem value="industry">Industry Specific</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="opportunity" onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opportunity">Opportunity Size</SelectItem>
              <SelectItem value="confidence">Confidence</SelectItem>
              <SelectItem value="growth">Growth Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <CardTitle className="text-lg">Benchmarking</CardTitle>
            <CardDescription>
              Portfolio penetration compared to industry peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 py-2">
              {data.benchmarks.map((benchmark, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{benchmark.name}</span>
                    <span>{benchmark.penetration}% penetration</span>
                  </div>
                  <Progress value={benchmark.penetration} className="h-2" />
                </div>
              ))}
            </div>

            <div className="bg-muted/30 p-3 rounded-md mt-4">
              <p className="text-sm">
                {data.benchmarks[2].penetration > data.benchmarks[0].penetration ? (
                  <>This client's portfolio penetration is {data.benchmarks[2].penetration - data.benchmarks[0].penetration}% above industry average.</>
                ) : (
                  <>This client's portfolio penetration is {data.benchmarks[0].penetration - data.benchmarks[2].penetration}% below industry average.</>
                )}
              </p>
              <p className="text-sm mt-1">
                {data.benchmarks[1].penetration - data.benchmarks[2].penetration}% portfolio growth potential to reach top quartile performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
