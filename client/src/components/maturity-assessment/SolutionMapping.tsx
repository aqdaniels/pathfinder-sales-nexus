
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, ExternalLink, Star, Tag, Zap } from "lucide-react";

type SolutionMappingProps = {
  client: string;
  industry: string;
};

type Solution = {
  id: string;
  name: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  complexity: "High" | "Medium" | "Low";
  timeline: string;
  domains: string[];
  offerings: string[];
};

type Recommendation = {
  id: string;
  domain: string;
  gap: string;
  maturityScore: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  solutions: string[];
};

export function SolutionMapping({ client, industry }: SolutionMappingProps) {
  // Mock recommendations data - would be fetched from API
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "rec-1",
      domain: "DevOps & Delivery",
      gap: "Limited CI/CD capabilities",
      maturityScore: 1.5,
      priority: "Critical",
      solutions: ["sol-1", "sol-3"]
    },
    {
      id: "rec-2",
      domain: "Cloud Adoption",
      gap: "No cloud migration strategy",
      maturityScore: 2.1,
      priority: "High",
      solutions: ["sol-2", "sol-5"]
    },
    {
      id: "rec-3",
      domain: "Data & Analytics",
      gap: "Siloed data architecture",
      maturityScore: 2.8,
      priority: "Medium",
      solutions: ["sol-4"]
    },
    {
      id: "rec-4",
      domain: "Digital Workplace",
      gap: "Limited collaboration tools",
      maturityScore: 2.4,
      priority: "Medium",
      solutions: ["sol-6"]
    },
    {
      id: "rec-5",
      domain: "App Portfolio",
      gap: "High technical debt",
      maturityScore: 3.2,
      priority: "High",
      solutions: ["sol-7"]
    }
  ]);

  // Mock solutions data - would be fetched from API
  const [solutions, setSolutions] = useState<Solution[]>([
    {
      id: "sol-1",
      name: "DevOps Transformation Platform",
      description: "End-to-end DevOps implementation with CI/CD pipeline automation",
      impact: "High",
      complexity: "Medium",
      timeline: "3-6 months",
      domains: ["DevOps & Delivery"],
      offerings: ["DXC DevSecOps Platform", "Agile Delivery Framework"]
    },
    {
      id: "sol-2",
      name: "Cloud Migration Accelerator",
      description: "Automated cloud migration with minimal business disruption",
      impact: "High",
      complexity: "High",
      timeline: "6-12 months",
      domains: ["Cloud Adoption", "App Portfolio"],
      offerings: ["DXC Cloud Right", "Application Modernization"]
    },
    {
      id: "sol-3",
      name: "Continuous Testing Framework",
      description: "Automated testing platform with coverage analytics",
      impact: "Medium",
      complexity: "Medium",
      timeline: "2-4 months",
      domains: ["DevOps & Delivery"],
      offerings: ["DXC Quality Engineering", "Test Automation Suite"]
    },
    {
      id: "sol-4",
      name: "Data Mesh Implementation",
      description: "Domain-oriented data ownership and architecture",
      impact: "High",
      complexity: "High", 
      timeline: "9-12 months",
      domains: ["Data & Analytics"],
      offerings: ["DXC Data Platform", "Analytics Modernization"]
    },
    {
      id: "sol-5",
      name: "Cloud Landing Zone",
      description: "Secure, compliant cloud foundation with governance",
      impact: "Medium",
      complexity: "Medium",
      timeline: "3-5 months",
      domains: ["Cloud Adoption", "Security"],
      offerings: ["DXC Cloud Architecture", "Cloud Security"]
    },
    {
      id: "sol-6",
      name: "Digital Workplace Platform",
      description: "Modern workplace tools with collaboration capabilities",
      impact: "Medium",
      complexity: "Low",
      timeline: "2-3 months",
      domains: ["Digital Workplace"],
      offerings: ["DXC Modern Workplace", "Microsoft 365 Implementation"]
    },
    {
      id: "sol-7",
      name: "Application Portfolio Rationalization",
      description: "Full assessment and modernization roadmap",
      impact: "High",
      complexity: "Medium",
      timeline: "4-6 months",
      domains: ["App Portfolio"],
      offerings: ["Application Transformation", "DXC Platform X"]
    }
  ]);

  const [activeView, setActiveView] = useState("prioritized");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSolutionsByRecommendation = (recommendationId: string) => {
    const recommendation = recommendations.find(r => r.id === recommendationId);
    if (!recommendation) return [];
    return solutions.filter(s => recommendation.solutions.includes(s.id));
  };

  const getRecommendationsBySolution = (solutionId: string) => {
    return recommendations.filter(r => r.solutions.includes(solutionId));
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="prioritized">Prioritized Recommendations</TabsTrigger>
          <TabsTrigger value="solutions">DXC Solutions</TabsTrigger>
          <TabsTrigger value="roadmap">Implementation Roadmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prioritized" className="space-y-6">
          <div className="grid gap-6">
            {recommendations
              .sort((a, b) => {
                const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
              })
              .map(recommendation => (
                <Card key={recommendation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{recommendation.domain}</CardTitle>
                        <CardDescription>{recommendation.gap}</CardDescription>
                      </div>
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Current Maturity: {recommendation.maturityScore}/5.0</p>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              recommendation.maturityScore < 2 ? 'bg-red-500' : 
                              recommendation.maturityScore < 3 ? 'bg-yellow-500' : 
                              recommendation.maturityScore < 4 ? 'bg-blue-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${(recommendation.maturityScore / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Recommended Solutions:</p>
                        <div className="space-y-2">
                          {getSolutionsByRecommendation(recommendation.id).map(solution => (
                            <div key={solution.id} className="border p-3 rounded-md">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium">{solution.name}</span>
                                <div className="flex gap-1">
                                  <Badge className={getImpactColor(solution.impact)}>
                                    {solution.impact} Impact
                                  </Badge>
                                  <Badge className={getComplexityColor(solution.complexity)}>
                                    {solution.complexity} Complexity
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{solution.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="outline" className="gap-1 text-xs">
                                  <Clock className="h-3 w-3" />
                                  {solution.timeline}
                                </Badge>
                                {solution.offerings.map(offering => (
                                  <Badge key={offering} variant="outline" className="gap-1 text-xs">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {offering}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto gap-1">
                      <ExternalLink className="h-4 w-4" />
                      View Solution Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="solutions">
          <Card>
            <CardHeader>
              <CardTitle>DXC Solutions Mapping</CardTitle>
              <CardDescription>
                Solutions tailored to address identified maturity gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Solution</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Complexity</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Domains</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solutions.map(solution => (
                    <TableRow key={solution.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{solution.name}</div>
                          <div className="text-sm text-muted-foreground">{solution.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getImpactColor(solution.impact)}>
                          {solution.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getComplexityColor(solution.complexity)}>
                          {solution.complexity}
                        </Badge>
                      </TableCell>
                      <TableCell>{solution.timeline}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {solution.domains.map(domain => (
                            <Badge key={domain} variant="outline" className="text-xs">
                              {domain}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Zap className="h-4 w-4" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
              <CardDescription>
                Suggested implementation sequence based on priorities and dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute h-full w-0.5 bg-border left-9 top-0"></div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center absolute left-5 -translate-x-1/2 z-10">
                        <span className="font-bold text-primary text-sm">1</span>
                      </div>
                      <div className="pl-14">
                        <h3 className="font-semibold text-lg flex items-center">
                          Phase 1: Foundation (0-3 months)
                          <Badge className="ml-2">Current Focus</Badge>
                        </h3>
                        <p className="text-muted-foreground mb-3">Establish core capabilities and quick wins</p>
                        
                        <div className="grid gap-2">
                          {solutions
                            .filter(s => s.id === "sol-5" || s.id === "sol-6")
                            .map(solution => (
                              <div key={solution.id} className="border p-3 rounded-md">
                                <div className="flex justify-between">
                                  <span className="font-medium">{solution.name}</span>
                                  <Badge variant="outline">{solution.timeline}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{solution.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center absolute left-5 -translate-x-1/2 z-10">
                        <span className="font-bold text-gray-600 text-sm">2</span>
                      </div>
                      <div className="pl-14">
                        <h3 className="font-semibold text-lg">Phase 2: Optimization (3-6 months)</h3>
                        <p className="text-muted-foreground mb-3">Address critical improvement areas</p>
                        
                        <div className="grid gap-2">
                          {solutions
                            .filter(s => s.id === "sol-1" || s.id === "sol-3" || s.id === "sol-7")
                            .map(solution => (
                              <div key={solution.id} className="border p-3 rounded-md bg-gray-50">
                                <div className="flex justify-between">
                                  <span className="font-medium">{solution.name}</span>
                                  <Badge variant="outline">{solution.timeline}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{solution.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center absolute left-5 -translate-x-1/2 z-10">
                        <span className="font-bold text-gray-600 text-sm">3</span>
                      </div>
                      <div className="pl-14">
                        <h3 className="font-semibold text-lg">Phase 3: Transformation (6-12 months)</h3>
                        <p className="text-muted-foreground mb-3">Implement complex, high-impact initiatives</p>
                        
                        <div className="grid gap-2">
                          {solutions
                            .filter(s => s.id === "sol-2" || s.id === "sol-4")
                            .map(solution => (
                              <div key={solution.id} className="border p-3 rounded-md bg-gray-50">
                                <div className="flex justify-between">
                                  <span className="font-medium">{solution.name}</span>
                                  <Badge variant="outline">{solution.timeline}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{solution.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
