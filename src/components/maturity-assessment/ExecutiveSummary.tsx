
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { FileText, FileDown, PieChart, Presentation, Share2 } from "lucide-react";

type ExecutiveSummaryProps = {
  client: string;
  industry: string;
};

export function ExecutiveSummary({ client, industry }: ExecutiveSummaryProps) {
  // Mock data for the executive summary - would be fetched from API
  const domainScores = [
    { domain: "App Portfolio", score: 3.2, benchmark: 3.7, gap: 0.5, color: "#9b87f5" },
    { domain: "Cloud Adoption", score: 2.1, benchmark: 4.0, gap: 1.9, color: "#7E69AB" },
    { domain: "Data & Analytics", score: 2.8, benchmark: 3.5, gap: 0.7, color: "#6E59A5" },
    { domain: "Security", score: 3.5, benchmark: 4.2, gap: 0.7, color: "#D6BCFA" },
    { domain: "DevOps", score: 1.5, benchmark: 3.8, gap: 2.3, color: "#8E9196" },
    { domain: "Digital Workplace", score: 2.4, benchmark: 3.4, gap: 1.0, color: "#221F26" },
    { domain: "IT Operations", score: 3.0, benchmark: 3.6, gap: 0.6, color: "#9b87f5" },
  ];

  const keyFindings = [
    "Limited DevOps capabilities impacting release velocity and quality",
    "Cloud adoption at early stages, lacking strategic direction",
    "Data and analytics capabilities not effectively supporting decision-making",
    "Security posture above industry average, but gaps in cloud security",
    "Application portfolio carrying significant technical debt"
  ];

  const valueOpportunities = [
    { opportunity: "Accelerate software delivery by 70%", value: "$2.5M", improvement: "DevOps Transformation" },
    { opportunity: "Reduce infrastructure costs by 30%", value: "$1.8M", improvement: "Cloud Migration" },
    { opportunity: "Enable data-driven decision making", value: "$3.2M", improvement: "Data Mesh Implementation" },
    { opportunity: "Reduce operational incidents by 45%", value: "$1.2M", improvement: "Application Modernization" },
    { opportunity: "Improve workforce productivity by 15%", value: "$1.5M", improvement: "Digital Workplace Platform" }
  ];

  // Calculate total estimated value
  const totalValue = valueOpportunities.reduce((sum, item) => sum + parseFloat(item.value.replace('$', '').replace('M', '')), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>
              Key findings and opportunities from technology maturity assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Technology Maturity Overview</h3>
              <p className="text-muted-foreground mb-4">
                The assessment evaluated 7 technology domains with an overall maturity score of 3.2/5.0, which is below the industry average of 3.7/5.0 for the {industry} sector.
              </p>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={domainScores}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Current Maturity" dataKey="score">
                      {domainScores.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Bar name="Industry Average" dataKey="benchmark" fill="#FF9900" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Key Findings</h3>
              <ul className="space-y-2">
                {keyFindings.map((finding, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 text-xs font-medium">
                      {i + 1}
                    </span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Business Value Opportunities</h3>
              <p className="text-muted-foreground mb-4">
                Implementation of recommended improvements is estimated to deliver approximately ${totalValue.toFixed(1)}M in business value through cost savings, productivity improvements, and risk reduction.
              </p>
              
              <div className="space-y-4">
                {valueOpportunities.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.opportunity}</p>
                      <p className="text-sm text-muted-foreground">via {item.improvement}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-4">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" className="gap-1">
              <FileDown className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-1">
              <Presentation className="h-4 w-4" />
              Presentation Template
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ready-Made Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Executive Summary PDF
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Presentation className="h-4 w-4" />
                Presentation Deck
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <PieChart className="h-4 w-4" />
                Business Case Template
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Share2 className="h-4 w-4" />
                Stakeholder Communication Plan
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maturity Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-medium">3.2/5.0</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">12-Month Target</span>
                  <span className="font-medium">4.1/5.0</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry Leaders</span>
                  <span className="font-medium">4.5/5.0</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">Implementing the recommended improvements is projected to increase overall maturity by 0.9 points over the next 12 months.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
