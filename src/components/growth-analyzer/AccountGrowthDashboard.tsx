
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, Users, Star, Calendar } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const growthData = [
  { month: 'Jan', actual: 32, projected: 30 },
  { month: 'Feb', actual: 38, projected: 33 },
  { month: 'Mar', actual: 45, projected: 38 },
  { month: 'Apr', actual: 48, projected: 44 },
  { month: 'May', actual: 53, projected: 50 },
  { month: 'Jun', actual: 0, projected: 57 },
  { month: 'Jul', actual: 0, projected: 63 },
  { month: 'Aug', actual: 0, projected: 68 },
];

type AccountGrowthDashboardProps = {
  client: string;
  industry: string;
  timeframe: string;
};

export const AccountGrowthDashboard = ({ client, industry, timeframe }: AccountGrowthDashboardProps) => {
  // In a real implementation, these would be fetched from an API based on the client, industry, and timeframe
  const clientMetrics = {
    totalOpportunityValue: "$8.2M",
    growthRate: 23.5,
    penetrationRate: 42,
    activeServices: 7,
    potentialServices: 12,
    keyRelationships: 9,
    relationshipGaps: 3,
    nextMilestone: "Q3 Strategic Review",
    topGrowthAreas: [
      { name: "AI Services", score: 87, trend: "up" },
      { name: "Cloud Migration", score: 76, trend: "up" },
      { name: "App Modernization", score: 63, trend: "flat" },
      { name: "Data Analytics", score: 58, trend: "up" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Growth Executive Summary
          </CardTitle>
          <CardDescription>Key metrics and opportunities for {client}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Opportunity Value</div>
              <div className="text-2xl font-bold">{clientMetrics.totalOpportunityValue}</div>
              <div className="text-xs text-muted-foreground">Across all potential areas</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">YoY Growth Rate</div>
              <div className="text-2xl font-bold">{clientMetrics.growthRate}%</div>
              <div className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                5.2% above target
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Portfolio Penetration</div>
              <div className="text-2xl font-bold">{clientMetrics.penetrationRate}%</div>
              <div className="text-xs text-muted-foreground">
                {clientMetrics.activeServices}/{clientMetrics.potentialServices} services active
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Next Milestone</div>
              <div className="text-lg font-semibold">{clientMetrics.nextMilestone}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Jul 15, 2025
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Trend Visualization */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            Growth Trend Visualization
          </CardTitle>
          <CardDescription>Historical and projected growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7E69AB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip />
                <Area type="monotone" dataKey="actual" stroke="#9b87f5" fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="projected" stroke="#7E69AB" fillOpacity={1} fill="url(#colorProjected)" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
              <span>Actual Growth</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
              <span>Projected Growth</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Growth Areas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Priority Growth Areas
          </CardTitle>
          <CardDescription>Highest potential opportunities based on client data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientMetrics.topGrowthAreas.map((area, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{area.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{area.score}/100</span>
                    {area.trend === "up" && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Rising</Badge>
                    )}
                    {area.trend === "flat" && (
                      <Badge variant="outline">Stable</Badge>
                    )}
                    {area.trend === "down" && (
                      <Badge variant="destructive">Declining</Badge>
                    )}
                  </div>
                </div>
                <Progress value={area.score} className="h-2" />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View Detailed Opportunity Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relationship Network Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Relationship Network
          </CardTitle>
          <CardDescription>Key stakeholders and relationship strength</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Network Summary</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Key Relationships:</div>
                <div className="font-medium">{clientMetrics.keyRelationships}</div>
                <div>Relationship Gaps:</div>
                <div className="font-medium">{clientMetrics.relationshipGaps}</div>
                <div>Exec Sponsor:</div>
                <div className="font-medium">Sarah Chen, CTO</div>
                <div>Champion:</div>
                <div className="font-medium">David Wilson, VP IT</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Next Relationship Actions</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-1">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center rounded-full">1</Badge>
                  <span>Connect with Mark Johnson (CFO)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center rounded-full">2</Badge>
                  <span>Follow up with Innovation Team</span>
                </li>
                <li className="flex items-center gap-1">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center rounded-full">3</Badge>
                  <span>Engage Security Director</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              Open Full Relationship Network
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
