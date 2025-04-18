
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type MaturityVisualizerProps = {
  client: string;
  industry: string;
};

// Mock data for the maturity radar chart
const getMaturityData = (client: string, industry: string) => {
  // This would be replaced with real API calls
  return [
    { 
      domain: "App Portfolio", 
      score: 3.2, 
      benchmark: 3.7, 
      gap: 0.5,
      gapPercentage: 14
    },
    { 
      domain: "Cloud Adoption", 
      score: 2.1, 
      benchmark: 4.0, 
      gap: 1.9,
      gapPercentage: 48
    },
    { 
      domain: "Data & Analytics", 
      score: 2.8, 
      benchmark: 3.5, 
      gap: 0.7,
      gapPercentage: 20
    },
    { 
      domain: "Security", 
      score: 3.5, 
      benchmark: 4.2, 
      gap: 0.7,
      gapPercentage: 17
    },
    { 
      domain: "DevOps", 
      score: 1.5, 
      benchmark: 3.8, 
      gap: 2.3,
      gapPercentage: 61
    },
    { 
      domain: "Digital Workplace", 
      score: 2.4, 
      benchmark: 3.4, 
      gap: 1.0,
      gapPercentage: 29
    },
    { 
      domain: "IT Operations", 
      score: 3.0, 
      benchmark: 3.6, 
      gap: 0.6,
      gapPercentage: 17
    },
  ];
};

export function MaturityVisualizer({ client, industry }: MaturityVisualizerProps) {
  const [visualizationType, setVisualizationType] = useState("radar");
  const [benchmarkType, setBenchmarkType] = useState("industry");
  
  const maturityData = getMaturityData(client, industry);
  
  // Calculate the overall average score
  const overallScore = (maturityData.reduce((acc, item) => acc + item.score, 0) / maturityData.length).toFixed(1);
  const benchmarkScore = (maturityData.reduce((acc, item) => acc + item.benchmark, 0) / maturityData.length).toFixed(1);
  
  // Sort gap data for the bar chart
  const sortedGapData = [...maturityData].sort((a, b) => b.gap - a.gap);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Maturity Assessment</CardTitle>
              <div className="flex gap-2">
                <Select value={visualizationType} onValueChange={setVisualizationType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radar">Radar Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={benchmarkType} onValueChange={setBenchmarkType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Benchmark" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="industry">Industry Avg</SelectItem>
                    <SelectItem value="leaders">Industry Leaders</SelectItem>
                    <SelectItem value="similar">Similar Companies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>
              Current maturity vs {benchmarkType === 'industry' ? 'industry average' : 
                     benchmarkType === 'leaders' ? 'industry leaders' : 'similar companies'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[400px] w-full">
              {visualizationType === "radar" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={maturityData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="domain" />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} />
                    <Radar name="Current Maturity" dataKey="score" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
                    <Radar name={`${benchmarkType === 'industry' ? 'Industry Average' : 
                      benchmarkType === 'leaders' ? 'Industry Leaders' : 'Similar Companies'}`} 
                      dataKey="benchmark" stroke="#FF9900" fill="#FF9900" fillOpacity={0.3} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={maturityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Current Maturity" dataKey="score" fill="#9b87f5" />
                    <Bar name={`${benchmarkType === 'industry' ? 'Industry Average' : 
                      benchmarkType === 'leaders' ? 'Industry Leaders' : 'Similar Companies'}`} 
                      dataKey="benchmark" fill="#FF9900" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maturity Gaps</CardTitle>
            <CardDescription>
              Largest gaps between current state and industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedGapData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="domain" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar name="Gap Size" dataKey="gap" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Maturity</CardTitle>
            <CardDescription>
              Aggregate score across all domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6">
              <div className="text-5xl font-bold mb-2">{overallScore}</div>
              <div className="text-sm text-muted-foreground mb-4">out of 5.0</div>
              
              <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
                <div className="bg-primary h-4 rounded-full" style={{ width: `${(Number(overallScore) / 5) * 100}%` }}></div>
              </div>
              
              <div className="flex justify-between text-xs w-full px-1">
                <span>Initial</span>
                <span>Basic</span>
                <span>Defined</span>
                <span>Managed</span>
                <span>Optimized</span>
              </div>
              
              <div className="flex items-center mt-6 gap-2">
                <span className="text-sm text-muted-foreground">Benchmark:</span>
                <span className="font-medium">{benchmarkScore}</span>
                <Badge variant={Number(overallScore) >= Number(benchmarkScore) ? "success" : "destructive"} className="ml-1">
                  {Number(overallScore) >= Number(benchmarkScore) ? "Above" : "Below"} Average
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Domain Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maturityData.map((domain) => (
                <div key={domain.domain} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{domain.domain}</span>
                    <span className="text-sm">{domain.score} / 5.0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        domain.score < 2 ? 'bg-red-500' : 
                        domain.score < 3 ? 'bg-yellow-500' : 
                        domain.score < 4 ? 'bg-blue-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${(domain.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gap: {domain.gap.toFixed(1)}</span>
                    <span>{domain.gapPercentage}% below benchmark</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
