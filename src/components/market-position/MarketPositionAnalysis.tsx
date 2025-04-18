
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { ChartData } from "../dashboard/ChartCard";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { ArrowRight, ArrowUpRight, BarChart3, LineChart, PieChart } from "lucide-react";

// Sample data for market position charts
const industryBenchmarkData: ChartData[] = [
  { name: "Cloud Adoption", value: 78, industry: 65, leader: 92 },
  { name: "Data Maturity", value: 62, industry: 58, leader: 85 },
  { name: "Process Automation", value: 45, industry: 52, leader: 88 },
  { name: "AI Readiness", value: 38, industry: 42, leader: 80 },
  { name: "Digital Experience", value: 70, industry: 62, leader: 90 },
];

const trendData: ChartData[] = [
  { name: "Q1", value: 42, industry: 40 },
  { name: "Q2", value: 48, industry: 45 },
  { name: "Q3", value: 54, industry: 47 },
  { name: "Q4", value: 60, industry: 50 },
  { name: "Q1", value: 65, industry: 52 },
  { name: "Q2", value: 70, industry: 55 },
];

const opportunityData: ChartData[] = [
  { name: "Cloud Migration", value: 32 },
  { name: "Data Platform", value: 28 },
  { name: "AI/ML Solutions", value: 22 },
  { name: "Process Automation", value: 18 },
];

const gapAnalysisData = [
  {
    category: "Technology Infrastructure",
    client: 65,
    industry: 70,
    leader: 92,
    gap: 27,
    opportunity: "High",
  },
  {
    category: "Data Management",
    client: 58,
    industry: 65,
    leader: 88,
    gap: 30,
    opportunity: "High",
  },
  {
    category: "Process Efficiency",
    client: 72,
    industry: 68,
    leader: 90,
    gap: 18,
    opportunity: "Medium",
  },
  {
    category: "Innovation Capability",
    client: 45,
    industry: 60,
    leader: 85,
    gap: 40,
    opportunity: "Critical",
  },
  {
    category: "Customer Experience",
    client: 75,
    industry: 72,
    leader: 94,
    gap: 19,
    opportunity: "Medium",
  },
];

export function MarketPositionAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Market Position Analysis</h2>
        <p className="text-muted-foreground">
          Benchmark client capabilities against industry standards and identify growth opportunities
        </p>
      </div>

      <Tabs defaultValue="benchmarks">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="benchmarks" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Benchmarks
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Market Trends
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Opportunity Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="benchmarks">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industry Capability Benchmarks</CardTitle>
                <CardDescription>
                  Client capabilities compared to industry average and leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {industryBenchmarkData.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-dxc-purple mr-1"></div>
                            <span className="text-sm">{item.value}%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-gray-400 mr-1"></div>
                            <span className="text-sm">{item.industry}%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-dxc-blue-bright mr-1"></div>
                            <span className="text-sm">{item.leader}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-2 w-full bg-gray-100 rounded-full">
                        <div
                          className="absolute top-0 h-2 bg-gray-400 rounded-full"
                          style={{ width: `${item.industry}%` }}
                        ></div>
                        <div
                          className="absolute top-0 h-2 bg-dxc-purple rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                        <div
                          className="absolute top-0 h-2 w-1.5 bg-dxc-blue-bright rounded-full"
                          style={{ left: `${Number(item.leader) - 1}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Client Position</span>
                        <span>Industry Average</span>
                        <span>Leader</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-dxc-purple"></div>
                      <span className="text-sm">Client</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                      <span className="text-sm">Industry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-dxc-blue-bright"></div>
                      <span className="text-sm">Leader</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gap Analysis</CardTitle>
                <CardDescription>
                  Critical capability gaps and opportunity areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">Capability Area</th>
                        <th className="text-center font-medium p-2">Client</th>
                        <th className="text-center font-medium p-2">Industry</th>
                        <th className="text-center font-medium p-2">Gap vs Leader</th>
                        <th className="text-right font-medium p-2">Opportunity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gapAnalysisData.map((item, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2">{item.category}</td>
                          <td className="p-2 text-center">{item.client}%</td>
                          <td className="p-2 text-center">{item.industry}%</td>
                          <td className="p-2 text-center font-medium">
                            {item.gap}%
                            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                              <div
                                className={`h-1.5 rounded-full ${
                                  item.gap > 30
                                    ? "bg-red-500"
                                    : item.gap > 20
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${(item.gap / 50) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="p-2 text-right">
                            <Badge
                              className={
                                item.opportunity === "Critical"
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : item.opportunity === "High"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-green-100 text-green-800 border-green-200"
                              }
                            >
                              {item.opportunity}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Generate Detailed Gap Analysis Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Digital Maturity Trends</CardTitle>
                <CardDescription>
                  Client maturity progression compared to industry average
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <div className="h-full w-full">
                    {/* This would be a real chart in the implementation */}
                    <div className="h-full w-full bg-gray-50 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <LineChart className="h-10 w-10 mx-auto text-dxc-purple opacity-50" />
                        <p className="text-muted-foreground">Trend line chart visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-10 rounded-full bg-dxc-purple"></div>
                    <span className="text-sm">Client Trend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-10 rounded-full bg-gray-400"></div>
                    <span className="text-sm">Industry Average</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technology Adoption</CardTitle>
                <CardDescription>
                  Growth in key technology areas over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Cloud Services", growth: 32, industry: 28 },
                    { name: "Data Analytics", growth: 25, industry: 22 },
                    { name: "Process Automation", growth: 18, industry: 20 },
                    { name: "AI Solutions", growth: 15, industry: 12 },
                  ].map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="flex items-center font-medium text-dxc-purple">
                          +{item.growth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                      <div className="relative w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="absolute h-2 bg-gray-300 rounded-full"
                          style={{ width: `${item.industry}%` }}
                        ></div>
                        <div
                          className="absolute h-2 bg-dxc-purple rounded-full"
                          style={{ width: `${item.growth}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Client Growth</span>
                        <span>Industry Average</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Market Evolution Forecast</CardTitle>
                <CardDescription>
                  Projected industry changes and technology adoption rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      trend: "Cloud-Native Architecture",
                      current: 45,
                      forecast: 78,
                      timeframe: "2 years",
                      impact: "High",
                    },
                    {
                      trend: "AI-Powered Analytics",
                      current: 32,
                      forecast: 65,
                      timeframe: "3 years",
                      impact: "Very High",
                    },
                    {
                      trend: "Automation & Robotics",
                      current: 28,
                      forecast: 58,
                      timeframe: "3 years",
                      impact: "Medium",
                    },
                  ].map((item) => (
                    <div key={item.trend} className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium">{item.trend}</h4>
                      <div className="mt-2 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Current Adoption</span>
                            <span>{item.current}%</span>
                          </div>
                          <Progress value={item.current} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Forecast ({item.timeframe})</span>
                            <span>{item.forecast}%</span>
                          </div>
                          <Progress value={item.forecast} className="h-1.5" />
                        </div>
                        <div className="pt-2">
                          <Badge
                            variant={
                              item.impact === "Very High"
                                ? "destructive"
                                : item.impact === "High"
                                ? "warning"
                                : "success"
                            }
                          >
                            {item.impact} Business Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Opportunity Sizing</CardTitle>
                <CardDescription>
                  Value potential across capability improvement areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <div className="h-full w-full">
                    {/* This would be a real chart in the implementation */}
                    <div className="h-full w-full bg-gray-50 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 mx-auto text-dxc-purple opacity-50" />
                        <p className="text-muted-foreground">Opportunity distribution chart</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {[
                    { name: "Cloud Migration", color: "bg-dxc-purple" },
                    { name: "Data Platform", color: "bg-dxc-blue-bright" },
                    { name: "AI/ML Solutions", color: "bg-dxc-purple-dark" },
                    { name: "Process Automation", color: "bg-dxc-blue-sky" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Priority Opportunities</CardTitle>
                <CardDescription>
                  High-value initiatives based on capability gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Cloud Infrastructure Modernization",
                      value: "$2.4M - $3.2M",
                      timeframe: "12-18 months",
                      priority: "High",
                    },
                    {
                      name: "Enterprise Data Platform",
                      value: "$1.8M - $2.5M",
                      timeframe: "10-14 months",
                      priority: "Critical",
                    },
                    {
                      name: "Process Automation & Workflow",
                      value: "$1.1M - $1.5M",
                      timeframe: "6-9 months",
                      priority: "Medium",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="border rounded-lg p-4 hover:border-dxc-purple/40 hover:bg-dxc-purple-light/5 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.timeframe} implementation
                          </p>
                        </div>
                        <Badge
                          variant={
                            item.priority === "Critical"
                              ? "destructive"
                              : item.priority === "High"
                              ? "warning"
                              : "success"
                          }
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Value potential:</span>
                        <span className="ml-2 font-semibold text-dxc-purple">{item.value}</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
