
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Coins, TrendingUp, Award, CheckCircle2, AlertCircle, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for pipeline by deal size
const pipelineData = [
  { month: 'Jan', small: 12, large: 3 },
  { month: 'Feb', small: 14, large: 2 },
  { month: 'Mar', small: 18, large: 5 },
  { month: 'Apr', small: 16, large: 4 },
  { month: 'May', small: 21, large: 3 },
  { month: 'Jun', small: 24, large: 6 },
  { month: 'Jul', small: 22, large: 5 },
  { month: 'Aug', small: 25, large: 7 },
  { month: 'Sep', small: 28, large: 4 },
  { month: 'Oct', small: 26, large: 6 },
  { month: 'Nov', small: 30, large: 5 },
  { month: 'Dec', small: 32, large: 8 },
];

// Mock data for performance metrics
const performanceData = {
  smallDeals: {
    winRate: 36,
    avgCycleTime: 45, // days
    resourceEfficiency: 82,
    averageValue: "2.1M",
    totalRevenue: "68M",
    dealCount: 32
  },
  largeDeals: {
    winRate: 24,
    avgCycleTime: 118, // days
    resourceEfficiency: 68,
    averageValue: "8.7M",
    totalRevenue: "78M",
    dealCount: 9
  }
};

// Mock data for win rate trends
const winRateTrendData = [
  { quarter: 'Q1 2024', smallDealWinRate: 32, largeDealWinRate: 21 },
  { quarter: 'Q2 2024', smallDealWinRate: 35, largeDealWinRate: 22 },
  { quarter: 'Q3 2024', smallDealWinRate: 37, largeDealWinRate: 24 },
  { quarter: 'Q4 2024', smallDealWinRate: 36, largeDealWinRate: 24 },
];

// Mock data for sales guidance
const salesGuidanceData = {
  smallDeals: [
    { criterion: "Decision Timeline", value: "< 90 days", priority: "high" },
    { criterion: "Required Approvals", value: "Regional Only", priority: "medium" },
    { criterion: "Resource Allocation", value: "Standard Templates", priority: "high" },
    { criterion: "Value Proposition", value: "Cost & Efficiency", priority: "high" },
    { criterion: "Stakeholder Level", value: "Director & VP", priority: "medium" },
  ],
  largeDeals: [
    { criterion: "Decision Timeline", value: "90+ days", priority: "medium" },
    { criterion: "Required Approvals", value: "Global & Board", priority: "high" },
    { criterion: "Resource Allocation", value: "Custom & Senior", priority: "high" },
    { criterion: "Value Proposition", value: "Strategic Value", priority: "high" },
    { criterion: "Stakeholder Level", value: "C-Suite & Board", priority: "high" },
  ]
};

// Colors for the charts
const COLORS = {
  smallDeals: "#9b87f5",
  largeDeals: "#7E69AB",
};

type DealSizeSegmentationProps = {
  client?: string;
  industry?: string;
};

export const DealSizeSegmentation = ({ client, industry }: DealSizeSegmentationProps) => {
  const [focusTab, setFocusTab] = useState("pipeline");
  
  const chartConfig = {
    smallDeals: {
      label: "Deals < $5M",
      theme: {
        light: COLORS.smallDeals,
        dark: COLORS.smallDeals
      }
    },
    largeDeals: {
      label: "Deals > $5M",
      theme: {
        light: COLORS.largeDeals,
        dark: COLORS.largeDeals
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Small Deals (&lt;$5M)
            </CardTitle>
            <CardDescription>High volume opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-medium">{performanceData.smallDeals.winRate}%</span>
              </div>
              <Progress value={performanceData.smallDeals.winRate} />
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <div className="text-sm text-muted-foreground">Cycle Time</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{performanceData.smallDeals.avgCycleTime} days</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Deal Count</div>
                  <div className="font-medium">{performanceData.smallDeals.dealCount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg. Value</div>
                  <div className="font-medium">${performanceData.smallDeals.averageValue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="font-medium">${performanceData.smallDeals.totalRevenue}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Large Deals (&gt;$5M)
            </CardTitle>
            <CardDescription>Strategic opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-medium">{performanceData.largeDeals.winRate}%</span>
              </div>
              <Progress value={performanceData.largeDeals.winRate} />
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <div className="text-sm text-muted-foreground">Cycle Time</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{performanceData.largeDeals.avgCycleTime} days</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Deal Count</div>
                  <div className="font-medium">{performanceData.largeDeals.dealCount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg. Value</div>
                  <div className="font-medium">${performanceData.largeDeals.averageValue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="font-medium">${performanceData.largeDeals.totalRevenue}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={focusTab} onValueChange={setFocusTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="pipeline" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            <span>Pipeline Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <LineChartIcon className="h-4 w-4" />
            <span>Performance Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="guidance" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>Sales Guidance</span>
          </TabsTrigger>
          <TabsTrigger value="toolkits" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Deal Toolkits</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Visualization by Deal Size</CardTitle>
              <CardDescription>
                Dual-track pipeline showing deals above and below $5M over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <BarChart
                    data={pipelineData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent labelFormatter={(value) => `${value} 2024`} />}
                    />
                    <Legend />
                    <Bar
                      dataKey="small"
                      name="smallDeals"
                      fill="var(--color-smallDeals)"
                      radius={[4, 4, 0, 0]}
                      stackId="a"
                    />
                    <Bar
                      dataKey="large"
                      name="largeDeals"
                      fill="var(--color-largeDeals)"
                      radius={[4, 4, 0, 0]}
                      stackId="a"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <Alert className="mt-4">
                <AlertTitle>Pipeline Insight</AlertTitle>
                <AlertDescription>
                  <p>Small deals (&lt;$5M) represent 78% of the pipeline by count but only 47% by value. Large deals have a longer sales cycle but 3.1x higher revenue per opportunity.</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="flex items-center gap-1 bg-primary/10">
                      <TrendingUp className="h-3 w-3" />
                      Large deals growing 18% YoY
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 bg-primary/10">
                      <AlertCircle className="h-3 w-3" />
                      Optimize for improved conversion
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics by Deal Size</CardTitle>
              <CardDescription>
                Win rates, cycle times, and efficiency compared between deal size segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={winRateTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0, 40]} tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="smallDealWinRate"
                      name="smallDeals"
                      stroke="var(--color-smallDeals)"
                      strokeWidth={2}
                      dot={{ stroke: "var(--color-smallDeals)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="largeDealWinRate"
                      name="largeDeals"
                      stroke="var(--color-largeDeals)"
                      strokeWidth={2}
                      dot={{ stroke: "var(--color-largeDeals)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Performance Comparison</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Small Deals</TableHead>
                        <TableHead>Large Deals</TableHead>
                        <TableHead>Delta</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Win Rate</TableCell>
                        <TableCell>{performanceData.smallDeals.winRate}%</TableCell>
                        <TableCell>{performanceData.largeDeals.winRate}%</TableCell>
                        <TableCell className="text-green-600">+12%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cycle Time</TableCell>
                        <TableCell>{performanceData.smallDeals.avgCycleTime} days</TableCell>
                        <TableCell>{performanceData.largeDeals.avgCycleTime} days</TableCell>
                        <TableCell className="text-amber-600">+73 days</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resource Efficiency</TableCell>
                        <TableCell>{performanceData.smallDeals.resourceEfficiency}%</TableCell>
                        <TableCell>{performanceData.largeDeals.resourceEfficiency}%</TableCell>
                        <TableCell className="text-red-600">-14%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Recommendations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Optimize large deal pursuit process to reduce the 2.6x longer sales cycle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Apply templatized approach to small deals to further increase resource efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Consider senior executive sponsorship earlier in large deal cycles to improve win rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Implement cross-selling strategies to convert 20% of small deals to large deals</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidance">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Small Deal Guidance (&lt;$5M)
                </CardTitle>
                <CardDescription>
                  Streamlined approach for high-velocity deals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criterion</TableHead>
                      <TableHead>Guidance</TableHead>
                      <TableHead className="w-[100px]">Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesGuidanceData.smallDeals.map((item) => (
                      <TableRow key={item.criterion}>
                        <TableCell className="font-medium">{item.criterion}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>
                          <Badge variant={item.priority === "high" ? "default" : "secondary"}>
                            {item.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Key Focus Areas</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Fast qualification using standard criteria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Streamlined discovery and solution development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Focus on cost efficiency and quick implementation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Large Deal Guidance (&gt;$5M)
                </CardTitle>
                <CardDescription>
                  Comprehensive approach for strategic deals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criterion</TableHead>
                      <TableHead>Guidance</TableHead>
                      <TableHead className="w-[100px]">Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesGuidanceData.largeDeals.map((item) => (
                      <TableRow key={item.criterion}>
                        <TableCell className="font-medium">{item.criterion}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>
                          <Badge variant={item.priority === "high" ? "default" : "secondary"}>
                            {item.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Key Focus Areas</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Deep discovery aligned to strategic client initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Executive-level sponsorship and relationship building</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Comprehensive business case with strategic value metrics</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="toolkits">
          <Card>
            <CardHeader>
              <CardTitle>Deal-Specific Toolkits & Resources</CardTitle>
              <CardDescription>
                Optimized resources and templates based on deal size category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    Small Deal Toolkit (&lt;$5M)
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span>Quick Discovery Template</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Fast-Track Solution Builder</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Simplified ROI Calculator</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Director-Level Presentation</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Standard Contract Terms</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                  </ul>

                  <div className="mt-4">
                    <Badge className="bg-primary/10 text-primary">Optimized for speed</Badge>
                    <Badge className="bg-primary/10 text-primary ml-2">Templated approach</Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    Large Deal Toolkit (&gt;$5M)
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span>Comprehensive Discovery Framework</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Strategic Value Assessment</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Enterprise-Grade Business Case</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>C-Suite Engagement Playbook</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Custom Contract Framework</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                        <span>Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                  </ul>

                  <div className="mt-4">
                    <Badge className="bg-primary/10 text-primary">Strategic approach</Badge>
                    <Badge className="bg-primary/10 text-primary ml-2">Executive focus</Badge>
                  </div>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertTitle>Toolkit Selection Guidance</AlertTitle>
                <AlertDescription>
                  <p>Choose the appropriate toolkit based on initial deal size qualification. For deals near the $5M threshold, consider using elements from both toolkits based on strategic importance and executive visibility.</p>
                  <p className="mt-2">Our AI analysis indicates that implementing the right toolkit can improve win rates by up to 18% and reduce sales cycles by 22%.</p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
