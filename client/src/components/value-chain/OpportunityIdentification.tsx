
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Brain, Calculator, Check, Target } from "lucide-react";

const painPoints = [
  { 
    id: "pain-1", 
    area: "Billing & Claims Processing", 
    issue: "High error rate in claims submission",
    impact: "Payment delays and increased processing costs",
    value: "$1.2M annually",
    severity: "High",
    solutions: ["Claims Automation Platform", "ML-based Error Detection"],
    feasibility: 85,
    impact_score: 92
  },
  { 
    id: "pain-2", 
    area: "Diagnosis & Treatment Planning", 
    issue: "Limited access to patient history across providers",
    impact: "Duplicate tests and delayed diagnosis",
    value: "$850K annually",
    severity: "Medium",
    solutions: ["Health Information Exchange", "EHR Integration Services"],
    feasibility: 70,
    impact_score: 78
  },
  { 
    id: "pain-3", 
    area: "Patient Intake & Registration", 
    issue: "Manual data entry and duplicate patient records",
    impact: "Staff inefficiency and data quality issues",
    value: "$650K annually",
    severity: "Medium", 
    solutions: ["Patient Portal Modernization", "OCR-based Intake System"],
    feasibility: 92,
    impact_score: 65
  },
  { 
    id: "pain-4", 
    area: "Follow-up Care", 
    issue: "Poor care coordination leading to readmissions",
    impact: "Higher costs and reduced quality scores",
    value: "$1.8M annually",
    severity: "High",
    solutions: ["Care Coordination Platform", "Patient Engagement System"],
    feasibility: 75,
    impact_score: 88
  }
];

export function OpportunityIdentification() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Value Leakage Analysis</CardTitle>
            <CardDescription>
              AI-identified inefficiencies and pain points across the value chain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {painPoints.map((point) => (
                <div key={point.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{point.area}</h3>
                        <Badge variant={point.severity === "High" ? "destructive" : "outline"}>
                          {point.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{point.issue}</p>
                      <p className="text-sm text-gray-500 mt-1">Impact: {point.impact}</p>
                      <p className="text-sm font-medium mt-1">Est. Value Leakage: {point.value}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{point.area} - Pain Point Analysis</DialogTitle>
                          <DialogDescription>
                            Detailed analysis and solution mapping
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Issue:</h4>
                            <p className="text-sm">{point.issue}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Business Impact:</h4>
                            <p className="text-sm">{point.impact}</p>
                            <p className="text-sm font-medium">Estimated Value: {point.value}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Potential Solutions:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {point.solutions.map((solution) => (
                                <li key={solution}>{solution}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Opportunity Assessment:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Implementation Feasibility</p>
                                <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                                  <div 
                                    className="h-2 bg-green-500 rounded-full" 
                                    style={{ width: `${point.feasibility}%` }} 
                                  />
                                </div>
                                <p className="text-xs text-right mt-1">{point.feasibility}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Business Impact</p>
                                <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                                  <div 
                                    className="h-2 bg-blue-500 rounded-full" 
                                    style={{ width: `${point.impact_score}%` }} 
                                  />
                                </div>
                                <p className="text-xs text-right mt-1">{point.impact_score}%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Add to Strategy</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs font-medium mb-1">Recommended DXC Solutions:</div>
                    <div className="flex flex-wrap gap-2">
                      {point.solutions.map((solution) => (
                        <Badge key={solution} variant="secondary" className="text-xs">
                          {solution}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Prioritization</CardTitle>
            <CardDescription>
              Value/effort analysis matrix for identified opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square border rounded-md p-4 relative">
              {/* Y-axis label */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-500">
                Business Impact
              </div>
              
              {/* X-axis label */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-medium text-gray-500">
                Implementation Feasibility
              </div>
              
              {/* Quadrant labels */}
              <div className="absolute left-4 top-4 text-xs font-medium text-gray-500">
                Strategic Initiatives
              </div>
              <div className="absolute right-4 top-4 text-xs font-medium text-green-600">
                Quick Wins
              </div>
              <div className="absolute left-4 bottom-4 text-xs font-medium text-gray-400">
                Deprioritize
              </div>
              <div className="absolute right-4 bottom-4 text-xs font-medium text-blue-500">
                Potential Projects
              </div>
              
              {/* Quadrant dividers */}
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></div>
              <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300"></div>
              
              {/* Plot the opportunities */}
              {painPoints.map((point) => {
                const xPos = (point.feasibility / 100) * 100 + '%';
                const yPos = (100 - point.impact_score / 100 * 100) + '%';
                
                return (
                  <div 
                    key={point.id}
                    className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ left: xPos, top: yPos }}
                  >
                    <div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
                        point.severity === "High" ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'
                      } text-xs text-center p-1 hover:shadow-lg transition-shadow cursor-pointer`}
                      title={`${point.area}: ${point.issue}`}
                    >
                      <div>
                        <div className="font-medium">{point.area.split(' ')[0]}</div>
                        <div className="mt-1">{point.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    Recommended Focus
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Billing & Claims Processing and Follow-up Care represent the highest-value opportunities
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Analysis
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    Potential Value
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Addressing top pain points can yield $3M+ in annual value
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Calculation
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    AI Recommendation
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Implement Claims Automation as first priority based on feasibility and ROI
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
