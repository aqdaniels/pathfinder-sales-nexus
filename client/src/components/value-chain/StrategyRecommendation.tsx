
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileCheck, LineChart, Shield, Lightbulb, PlusCircle, ChartBar } from "lucide-react";

const recommendations = [
  {
    id: "rec-1",
    title: "Claims Automation Transformation",
    description: "Implement end-to-end claims automation with intelligent validation and denial prediction",
    impact: "High",
    timeframe: "6-9 months",
    roi: "287%",
    riskLevel: "Low",
    valueChainArea: "Claims Management",
    valueProposition: "Reduce claims processing costs by 42% and accelerate payment cycles by 16 days",
    keyInitiatives: [
      {
        name: "Claims Preprocessing Automation",
        timeline: "1-3 months",
        value: "$450K/year",
        effort: "Medium",
        details: "Deploy intelligent document processing for claim forms and clinical documentation"
      },
      {
        name: "Rules Engine Implementation",
        timeline: "2-4 months",
        value: "$650K/year",
        effort: "High",
        details: "Implement rules engine for claim validation and compliance checking"
      },
      {
        name: "Denial Prediction Analytics",
        timeline: "3-6 months",
        value: "$1.2M/year",
        effort: "High",
        details: "Deploy ML models to predict and prevent claim denials"
      }
    ],
    caseStudies: [
      {
        client: "Large Regional Health System",
        results: "35% reduction in claims processing costs, 45% reduction in denial rate"
      },
      {
        client: "Multi-State Provider Network",
        results: "22% improvement in cash flow, $2.1M annual savings"
      }
    ]
  },
  {
    id: "rec-2",
    title: "Care Coordination Platform",
    description: "Implement unified care coordination platform to improve patient outcomes and reduce readmissions",
    impact: "High",
    timeframe: "9-12 months",
    roi: "215%",
    riskLevel: "Medium",
    valueChainArea: "Follow-up Care",
    valueProposition: "Reduce readmission rates by 28% and improve patient satisfaction scores by 32%",
    keyInitiatives: [
      {
        name: "Patient Journey Mapping",
        timeline: "1-2 months",
        value: "$250K/year",
        effort: "Low",
        details: "Document current patient journeys and identify coordination gaps"
      },
      {
        name: "Care Team Collaboration Platform",
        timeline: "3-5 months",
        value: "$750K/year",
        effort: "Medium",
        details: "Deploy unified platform for care team communication and coordination"
      },
      {
        name: "Post-Discharge Monitoring System",
        timeline: "4-6 months",
        value: "$1.3M/year",
        effort: "High",
        details: "Implement remote monitoring and early intervention system"
      }
    ],
    caseStudies: [
      {
        client: "Academic Medical Center",
        results: "31% reduction in readmissions, $3.2M annual savings in penalties"
      },
      {
        client: "Integrated Delivery Network",
        results: "26% improvement in care plan adherence, 29% reduction in ED visits"
      }
    ]
  }
];

export function StrategyRecommendation() {
  const [selectedRecommendation, setSelectedRecommendation] = useState(recommendations[0].id);
  
  const currentRec = recommendations.find(r => r.id === selectedRecommendation) || recommendations[0];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Strategic initiatives based on value chain analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className={`border rounded-md p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedRecommendation === rec.id ? 'bg-gray-50 border-gray-300' : ''
                  }`}
                  onClick={() => setSelectedRecommendation(rec.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{rec.title}</h3>
                    <Badge variant={rec.impact === "High" ? "default" : "outline"}>
                      {rec.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <div className="flex justify-between text-xs mt-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{rec.timeframe}</span>
                    </div>
                    <div className="flex items-center">
                      <LineChart className="h-3 w-3 mr-1" />
                      <span>ROI: {rec.roi}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Risk: {rec.riskLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Generate More Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-5">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{currentRec.title}</CardTitle>
                  <CardDescription>
                    {currentRec.description}
                  </CardDescription>
                </div>
                <Button>Add to Proposal</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="initiatives">Key Initiatives</TabsTrigger>
                  <TabsTrigger value="business-case">Business Case</TabsTrigger>
                  <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
                  <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-500">Timeframe</div>
                          <div className="font-medium">{currentRec.timeframe}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full">
                          <LineChart className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-500">Expected ROI</div>
                          <div className="font-medium">{currentRec.roi}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <ChartBar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-500">Value Chain Area</div>
                          <div className="font-medium">{currentRec.valueChainArea}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Value Proposition</h3>
                    <p className="text-sm">{currentRec.valueProposition}</p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <h3 className="font-medium text-blue-600">AI Recommendation Rationale</h3>
                    </div>
                    <p className="text-sm">
                      This recommendation addresses the highest-value pain points identified in your value chain assessment.
                      It offers a balance of quick wins and strategic improvements with a strong ROI profile and proven success
                      in similar client organizations.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="initiatives">
                  <div className="space-y-4">
                    {currentRec.keyInitiatives.map((initiative, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{index + 1}. {initiative.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{initiative.details}</p>
                          </div>
                          <Badge variant={
                            initiative.effort === "Low" ? "secondary" :
                            initiative.effort === "Medium" ? "outline" : "default"
                          }>
                            {initiative.effort} Effort
                          </Badge>
                        </div>
                        <div className="mt-3 flex justify-between text-sm">
                          <div>
                            <span className="text-gray-500">Timeline:</span> {initiative.timeline}
                          </div>
                          <div>
                            <span className="text-gray-500">Est. Value:</span> <span className="font-medium">{initiative.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end">
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Custom Initiative
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="business-case">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Investment Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Estimated Total Investment</div>
                          <div className="text-lg font-medium">$1.2M - $1.5M</div>
                          <div className="text-xs text-gray-500 mt-1">Including implementation and first-year support</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Estimated Annual Value</div>
                          <div className="text-lg font-medium">$2.3M+</div>
                          <div className="text-xs text-gray-500 mt-1">Cost savings and revenue improvements</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Value Components</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Operational Cost Reduction</div>
                          <div className="text-sm font-medium">$950K/year</div>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '41%' }} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Revenue Cycle Improvement</div>
                          <div className="text-sm font-medium">$780K/year</div>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Quality Improvement Benefits</div>
                          <div className="text-sm font-medium">$570K/year</div>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">ROI Analysis</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-gray-500">Payback Period</div>
                          <div className="text-lg font-medium">7-9 months</div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-gray-500">5-Year ROI</div>
                          <div className="text-lg font-medium">684%</div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-gray-500">NPV (5-year)</div>
                          <div className="text-lg font-medium">$8.2M</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="case-studies">
                  <div className="space-y-4">
                    {currentRec.caseStudies.map((caseStudy, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <FileCheck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{caseStudy.client}</h3>
                            <p className="text-sm text-gray-600 mt-1">{caseStudy.results}</p>
                            <Button variant="link" className="h-auto p-0 mt-1">
                              View Full Case Study
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-4 border border-dashed rounded-md flex items-center justify-center">
                      <Button variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Find Similar Case Studies
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="risk-analysis">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Risk Assessment</h3>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-md bg-yellow-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Change Management Risk</div>
                              <p className="text-sm text-gray-600 mt-1">
                                Resistance to workflow changes by clinical staff may delay adoption
                              </p>
                            </div>
                            <Badge variant="outline">Medium</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Mitigation:</span> Implement phased approach with clinical champions 
                            and dedicated training programs
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-md bg-red-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Integration Complexity Risk</div>
                              <p className="text-sm text-gray-600 mt-1">
                                Connecting to legacy systems may introduce technical challenges
                              </p>
                            </div>
                            <Badge variant="destructive">High</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Mitigation:</span> Conduct detailed technical discovery and 
                            develop integration roadmap before implementation
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-md bg-green-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Regulatory Compliance Risk</div>
                              <p className="text-sm text-gray-600 mt-1">
                                Changes to billing processes must maintain regulatory compliance
                              </p>
                            </div>
                            <Badge variant="secondary">Low</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Mitigation:</span> Incorporate compliance reviews at key 
                            milestones and validation testing
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Risk Management Plan</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Bi-weekly risk review meetings with steering committee</li>
                        <li>Documented contingency plans for high-impact risks</li>
                        <li>Staff impact assessment and change management program</li>
                        <li>Phased implementation approach with defined success criteria</li>
                        <li>Regular compliance reviews with legal and compliance teams</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
