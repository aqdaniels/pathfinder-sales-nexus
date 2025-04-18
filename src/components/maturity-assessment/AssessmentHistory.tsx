
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, TrendingDown, FileText, Calendar } from "lucide-react";

type AssessmentHistoryProps = {
  client: string;
  industry: string;
};

export function AssessmentHistory({ client, industry }: AssessmentHistoryProps) {
  // Mock data for assessment history - would be fetched from API
  const historyData = [
    { id: "assess-1", date: "2024-05-15", version: "Current", score: 3.2, user: "Sarah Johnson", notes: "Full assessment after Q2 review" },
    { id: "assess-2", date: "2023-12-10", version: "Q4 2023", score: 2.8, user: "David Chen", notes: "End-of-year assessment focusing on cloud and security domains" },
    { id: "assess-3", date: "2023-08-22", version: "Q3 2023", score: 2.5, user: "Sarah Johnson", notes: "Initial assessment prior to modernization program" },
  ];

  // Mock trend data by domain
  const trendData = [
    { month: "Aug '23", "App Portfolio": 2.8, "Cloud Adoption": 1.5, "DevOps": 1.2, "Security": 3.1, "Overall": 2.5 },
    { month: "Dec '23", "App Portfolio": 3.0, "Cloud Adoption": 1.8, "DevOps": 1.3, "Security": 3.3, "Overall": 2.8 },
    { month: "May '24", "App Portfolio": 3.2, "Cloud Adoption": 2.1, "DevOps": 1.5, "Security": 3.5, "Overall": 3.2 },
  ];

  // Create improvement data
  const improvements = [
    { domain: "Cloud Adoption", baseline: 1.5, current: 2.1, change: "+0.6", changePercent: "+40%", initiative: "Cloud migration strategy development" },
    { domain: "App Portfolio", baseline: 2.8, current: 3.2, change: "+0.4", changePercent: "+14%", initiative: "Application rationalization" },
    { domain: "Security", baseline: 3.1, current: 3.5, change: "+0.4", changePercent: "+13%", initiative: "Security posture enhancement" },
    { domain: "DevOps", baseline: 1.2, current: 1.5, change: "+0.3", changePercent: "+25%", initiative: "CI pipeline introduction" },
    { domain: "Data & Analytics", baseline: 2.5, current: 2.8, change: "+0.3", changePercent: "+12%", initiative: "Data governance program" },
  ];

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (change.startsWith('-')) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Maturity Trends</CardTitle>
            <CardDescription>
              Progress over time across key technology domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Overall" stroke="#000000" strokeWidth={2} />
                  <Line type="monotone" dataKey="App Portfolio" stroke="#9b87f5" />
                  <Line type="monotone" dataKey="Cloud Adoption" stroke="#7E69AB" />
                  <Line type="monotone" dataKey="DevOps" stroke="#8E9196" />
                  <Line type="monotone" dataKey="Security" stroke="#D6BCFA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Improvements</CardTitle>
            <CardDescription>
              Most significant progress since baseline assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Baseline</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Initiative</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {improvements.map((item) => (
                  <TableRow key={item.domain}>
                    <TableCell className="font-medium">{item.domain}</TableCell>
                    <TableCell>{item.baseline.toFixed(1)}</TableCell>
                    <TableCell>{item.current.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getChangeIcon(item.change)}
                        <span className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {item.change} ({item.changePercent})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{item.initiative}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>
              Previous assessment records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyData.map((assessment) => (
                <div key={assessment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        {assessment.version}
                        {assessment.version === "Current" && (
                          <Badge>Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(assessment.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{assessment.score.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">Overall Score</div>
                    </div>
                  </div>
                  <div className="text-sm my-2">{assessment.notes}</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Conducted by: {assessment.user}
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Eye className="h-4 w-4" />
                    View Assessment
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3 bg-primary/5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Quarterly Review</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Aug 15, 2024
                    </div>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Annual Full Assessment</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Nov 10, 2024
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full gap-1">
                <FileText className="h-4 w-4" />
                View Assessment Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
