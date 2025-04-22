
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, PieChart, PieArcDatum } from "recharts";
import { ArrowRight, Download, FileDown, FileText, MessageSquare, PlusCircle, Presentation, Share2 } from "lucide-react";

export function ExecutiveCommunication() {
  const [selectedPresentation, setSelectedPresentation] = useState("exec-summary");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="visuals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visuals">Value Chain Visuals</TabsTrigger>
          <TabsTrigger value="dashboards">Impact Dashboards</TabsTrigger>
          <TabsTrigger value="narratives">Transformation Narratives</TabsTrigger>
          <TabsTrigger value="presentations">Executive Presentations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visuals" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Value Chain Visualization</CardTitle>
                <CardDescription>
                  Customizable view of the end-to-end value chain with opportunity highlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md overflow-hidden">
                  <div className="relative">
                    <div className="flex justify-between items-center">
                      {/* Value Chain Visualization */}
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-gray-50 flex items-center justify-center p-2 text-center text-sm">
                              Patient Acquisition
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-gray-50 flex items-center justify-center p-2 text-center text-sm">
                              Patient Intake
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-gray-50 flex items-center justify-center p-2 text-center text-sm">
                              Diagnosis & Treatment
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-gray-50 flex items-center justify-center p-2 text-center text-sm">
                              Care Delivery
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-red-50 border-red-200 flex items-center justify-center p-2 text-center text-sm">
                              Billing & Claims
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                          <div className="w-1/6 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-md border bg-yellow-50 border-yellow-200 flex items-center justify-center p-2 text-center text-sm">
                              Follow-up Care
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-300"></div>
                          </div>
                        </div>
                        
                        {/* Pain points and opportunity indicators */}
                        <div className="flex justify-between mt-6">
                          <div className="w-1/6"></div>
                          <div className="w-1/6">
                            <div className="text-xs text-gray-500 bg-gray-100 p-1 rounded">
                              Minor issues
                            </div>
                          </div>
                          <div className="w-1/6">
                            <div className="text-xs text-gray-500 bg-gray-100 p-1 rounded">
                              Some gaps
                            </div>
                          </div>
                          <div className="w-1/6"></div>
                          <div className="w-1/6">
                            <div className="text-xs text-red-500 bg-red-50 p-1 rounded border border-red-100">
                              Major pain point
                            </div>
                          </div>
                          <div className="w-1/6">
                            <div className="text-xs text-yellow-500 bg-yellow-50 p-1 rounded border border-yellow-100">
                              Moderate issue
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Value leakage indicators */}
                    <div className="mt-8">
                      <h4 className="text-sm font-medium mb-2">Value Leakage Points</h4>
                      <div className="flex space-x-4">
                        <div className="flex-1 p-2 border rounded-md bg-red-50">
                          <div className="text-xs font-medium">Claims Errors</div>
                          <div className="text-xs">$1.2M annually</div>
                        </div>
                        <div className="flex-1 p-2 border rounded-md bg-yellow-50">
                          <div className="text-xs font-medium">Readmissions</div>
                          <div className="text-xs">$1.8M annually</div>
                        </div>
                        <div className="flex-1 p-2 border rounded-md bg-gray-50">
                          <div className="text-xs font-medium">Registration Delays</div>
                          <div className="text-xs">$650K annually</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    Customize View
                  </Button>
                  <Button>
                    <FileDown className="h-4 w-4 mr-2" />
                    Export Visual
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Value Improvement Opportunity Map</CardTitle>
                <CardDescription>
                  Visualization of opportunities across the value chain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Opportunity Value Map</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>High Value</span>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1 ml-2"></div>
                        <span>Medium Value</span>
                        <div className="w-3 h-3 rounded-full bg-green-500 mx-1 ml-2"></div>
                        <span>Quick Win</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="aspect-square border rounded-md p-4 bg-red-50 border-red-200 flex flex-col">
                          <div className="text-sm font-medium">Claims Automation</div>
                          <div className="text-xs text-gray-600 mt-1">End-to-end claims process transformation</div>
                          <div className="mt-auto">
                            <div className="text-xs flex justify-between">
                              <span>Value: $2.3M/year</span>
                              <Badge variant="destructive">High</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="aspect-square border rounded-md p-4 bg-yellow-50 border-yellow-200 flex flex-col">
                          <div className="text-sm font-medium">Care Coordination</div>
                          <div className="text-xs text-gray-600 mt-1">Follow-up care and readmission reduction</div>
                          <div className="mt-auto">
                            <div className="text-xs flex justify-between">
                              <span>Value: $1.8M/year</span>
                              <Badge>Medium</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="aspect-square border rounded-md p-4 bg-green-50 border-green-200 flex flex-col">
                          <div className="text-sm font-medium">Patient Intake</div>
                          <div className="text-xs text-gray-600 mt-1">Digital forms and automated registration</div>
                          <div className="mt-auto">
                            <div className="text-xs flex justify-between">
                              <span>Value: $650K/year</span>
                              <Badge variant="outline">Quick Win</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="aspect-square border rounded-md p-4 bg-blue-50 border-blue-200 flex flex-col">
                          <div className="text-sm font-medium">Data Integration</div>
                          <div className="text-xs text-gray-600 mt-1">Clinical data exchange and interoperability</div>
                          <div className="mt-auto">
                            <div className="text-xs flex justify-between">
                              <span>Value: $950K/year</span>
                              <Badge>Medium</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Total Annual Opportunity:</span>
                        <span className="font-medium ml-1">$5.7M</span>
                      </div>
                      <div>
                        <span className="text-gray-500">5-Year Value:</span>
                        <span className="font-medium ml-1">$28.5M</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    Update Values
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>View ROI Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>ROI Analysis Details</DialogTitle>
                        <DialogDescription>
                          Detailed breakdown of financial projections
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="border rounded-md p-3">
                          <div className="font-medium mb-2">5-Year ROI Projection</div>
                          <div className="h-40 w-full bg-gray-50"></div>
                          <div className="text-xs text-center mt-2 text-gray-500">Detailed ROI chart would appear here</div>
                        </div>
                        <div className="text-sm">
                          <p>The ROI analysis shows a projected 435% return over 5 years with an initial investment of $2.7M and cumulative benefits of $28.5M.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="dashboards">
          <Card>
            <CardHeader>
              <CardTitle>Executive Impact Dashboard</CardTitle>
              <CardDescription>
                Key metrics and expected outcomes for executive review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Financial Impact Summary</h3>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-gray-500">Cost Reduction</div>
                      <div className="text-xl font-medium">$3.2M</div>
                      <div className="text-xs text-gray-500">Annual</div>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '56%' }} />
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-gray-500">Revenue Impact</div>
                      <div className="text-xl font-medium">$2.5M</div>
                      <div className="text-xs text-gray-500">Annual</div>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '44%' }} />
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-gray-500">Total Investment</div>
                      <div className="text-xl font-medium">$2.7M</div>
                      <div className="text-xs text-green-600">Payback: 10 months</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-gray-500">5-Year ROI</div>
                      <div className="text-xl font-medium">435%</div>
                      <div className="text-xs text-green-600">NPV: $17.8M</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-gray-50">
                    <div className="text-sm font-medium mb-2">Performance Impact by Quarter</div>
                    <div className="h-52 border bg-white">
                      <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                        Performance chart visualization would appear here
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-3">Key Performance Indicators</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Claims Processing Time</span>
                          <span className="text-green-600">-64%</span>
                        </div>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '64%' }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Current: 14 days</span>
                          <span>Target: 5 days</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Denial Rate</span>
                          <span className="text-green-600">-42%</span>
                        </div>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Current: 12%</span>
                          <span>Target: 7%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Readmission Rate</span>
                          <span className="text-green-600">-28%</span>
                        </div>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '28%' }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Current: 18%</span>
                          <span>Target: 13%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Patient Satisfaction</span>
                          <span className="text-green-600">+24%</span>
                        </div>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '24%' }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Current: 72%</span>
                          <span>Target: 89%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-3">Strategic Alignment</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2"></div>
                        <div className="text-sm">Supports "Digital First" corporate strategy</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2"></div>
                        <div className="text-sm">Aligns with value-based care transition</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2"></div>
                        <div className="text-sm">Addresses critical process inefficiencies</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2"></div>
                        <div className="text-sm">Improves competitive position vs. regional systems</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>
                  <Presentation className="h-4 w-4 mr-2" />
                  Present to Executive Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="narratives">
          <Card>
            <CardHeader>
              <CardTitle>Transformation Storytelling</CardTitle>
              <CardDescription>
                Create compelling narratives for executive discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <Card className="col-span-1">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Story Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div 
                        className={`p-3 border rounded-md cursor-pointer hover:shadow-sm transition-shadow ${selectedPresentation === "exec-summary" ? "bg-gray-50 border-gray-300" : ""}`}
                        onClick={() => setSelectedPresentation("exec-summary")}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div className="font-medium text-sm">Executive Summary</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Concise overview for C-suite leaders
                        </div>
                      </div>
                      
                      <div 
                        className={`p-3 border rounded-md cursor-pointer hover:shadow-sm transition-shadow ${selectedPresentation === "problem-solution" ? "bg-gray-50 border-gray-300" : ""}`}
                        onClick={() => setSelectedPresentation("problem-solution")}
                      >
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <div className="font-medium text-sm">Problem-Solution Narrative</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Challenge-focused storytelling approach
                        </div>
                      </div>
                      
                      <div 
                        className={`p-3 border rounded-md cursor-pointer hover:shadow-sm transition-shadow ${selectedPresentation === "vision-roadmap" ? "bg-gray-50 border-gray-300" : ""}`}
                        onClick={() => setSelectedPresentation("vision-roadmap")}
                      >
                        <div className="flex items-center gap-2">
                          <Presentation className="h-4 w-4 text-gray-500" />
                          <div className="font-medium text-sm">Vision & Roadmap</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Future-focused transformation story
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-3">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Custom Template
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div className="col-span-2">
                    <div className="border rounded-md p-6 h-full bg-white">
                      {selectedPresentation === "exec-summary" && (
                        <div className="space-y-4">
                          <div className="text-lg font-bold">Healthcare Revenue Cycle Transformation</div>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p>
                              [Client Name] is facing significant challenges in revenue cycle management, with claims processing
                              inefficiencies resulting in approximately $2.3M in annual revenue leakage and patient follow-up care 
                              gaps leading to $1.8M in avoidable costs.
                            </p>
                            <p>
                              Our value chain analysis has identified two high-impact transformation initiatives that can address
                              these challenges while supporting [Client Name]'s strategic goals of digital transformation and
                              value-based care transition:
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="pl-4 border-l-2 border-purple-400">
                              <div className="font-medium">Claims Automation Transformation</div>
                              <div className="text-sm text-gray-600">
                                End-to-end claims modernization to reduce processing time by 64% and denials by 42%,
                                yielding $2.3M+ in annual benefits with 7-9 month payback period.
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-blue-400">
                              <div className="font-medium">Care Coordination Platform</div>
                              <div className="text-sm text-gray-600">
                                Comprehensive care coordination solution to reduce readmissions by 28% and improve
                                patient satisfaction by 24%, delivering $1.8M in annual value.
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <p>
                              The proposed transformation program requires a $2.7M investment with a 10-month payback period
                              and 435% ROI over 5 years. Implementation can begin within 4-6 weeks with phased delivery of
                              business value starting in Q2.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedPresentation === "problem-solution" && (
                        <div className="space-y-4">
                          <div className="text-lg font-bold">Addressing Revenue Cycle Challenges</div>
                          <div className="space-y-4">
                            <div>
                              <div className="font-medium text-red-600">The Challenge</div>
                              <div className="text-sm text-gray-600 mt-1">
                                [Client Name] is experiencing critical challenges in revenue cycle management:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  <li>23% claims error rate causing $1.2M in annual revenue leakage</li>
                                  <li>Claims processing time of 14 days vs. industry average of 8 days</li>
                                  <li>18% readmission rate resulting in $1.8M in avoidable costs</li>
                                  <li>Limited care coordination capabilities and patient engagement</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium text-blue-600">The Solution</div>
                              <div className="text-sm text-gray-600 mt-1">
                                A comprehensive transformation program addressing the entire value chain:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  <li>Intelligent claims automation with ML-based error prevention</li>
                                  <li>Denial prediction and management capabilities</li>
                                  <li>Care coordination platform with post-discharge monitoring</li>
                                  <li>Digital patient engagement tools integrated with clinical workflows</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium text-green-600">The Outcome</div>
                              <div className="text-sm text-gray-600 mt-1">
                                Expected business outcomes with implementation:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  <li>42% reduction in denial rate with 64% faster claims processing</li>
                                  <li>28% reduction in readmissions and improved clinical outcomes</li>
                                  <li>$5.7M annual financial improvement (cost savings + revenue)</li>
                                  <li>Improved patient satisfaction scores by 24%</li>
                                  <li>435% ROI over 5 years with 10-month payback</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedPresentation === "vision-roadmap" && (
                        <div className="space-y-4">
                          <div className="text-lg font-bold">Healthcare Value Chain Transformation</div>
                          <div className="space-y-4">
                            <div>
                              <div className="font-medium">Future State Vision</div>
                              <div className="text-sm text-gray-600 mt-1">
                                <p>
                                  By 2025, [Client Name] will operate a fully integrated, digital-first revenue cycle
                                  and care coordination model that delivers exceptional financial performance, clinical
                                  outcomes, and patient experiences.
                                </p>
                                <p className="mt-2">
                                  The transformed value chain will feature:
                                </p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>End-to-end automation and intelligence across all processes</li>
                                  <li>Proactive exception management and intervention</li>
                                  <li>Seamless care coordination across the continuum</li>
                                  <li>Data-driven decision making at all levels</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium">Transformation Roadmap</div>
                              <div className="p-4 border rounded-md bg-gray-50 mt-2">
                                <div className="space-y-3">
                                  <div className="flex">
                                    <div className="w-1/4 p-2 border-r">
                                      <div className="text-xs font-medium">Phase 1: Foundation</div>
                                      <div className="text-xs text-gray-500">Q2-Q3 2023</div>
                                      <div className="text-xs mt-1">Claims automation quick wins</div>
                                    </div>
                                    <div className="w-1/4 p-2 border-r">
                                      <div className="text-xs font-medium">Phase 2: Expansion</div>
                                      <div className="text-xs text-gray-500">Q4 2023 - Q1 2024</div>
                                      <div className="text-xs mt-1">Care coordination platform</div>
                                    </div>
                                    <div className="w-1/4 p-2 border-r">
                                      <div className="text-xs font-medium">Phase 3: Integration</div>
                                      <div className="text-xs text-gray-500">Q2-Q3 2024</div>
                                      <div className="text-xs mt-1">End-to-end process integration</div>
                                    </div>
                                    <div className="w-1/4 p-2">
                                      <div className="text-xs font-medium">Phase 4: Optimization</div>
                                      <div className="text-xs text-gray-500">Q4 2024+</div>
                                      <div className="text-xs mt-1">Advanced analytics & AI</div>
                                    </div>
                                  </div>
                                  
                                  <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div className="h-2 rounded-full bg-purple-500" style={{ width: '25%' }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium">Expected Outcomes</div>
                              <div className="text-sm text-gray-600 mt-1">
                                <p>
                                  By implementing this transformation roadmap, [Client Name] will achieve:
                                </p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>Best-in-class revenue cycle performance metrics</li>
                                  <li>Reduced cost of operations by over 40%</li>
                                  <li>Top quartile patient satisfaction and clinical outcomes</li>
                                  <li>Strong competitive positioning in the local market</li>
                                  <li>$28.5M cumulative value over 5 years</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Customize Narrative
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button>
                      <FileDown className="h-4 w-4 mr-2" />
                      Download Presentation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="presentations">
          <Card>
            <CardHeader>
              <CardTitle>Executive Presentation Generator</CardTitle>
              <CardDescription>
                Create ready-to-present executive materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="border rounded-md p-4 aspect-video flex flex-col justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Presentation className="h-8 w-8 text-gray-500 mb-2" />
                  <div className="font-medium text-sm">Executive Summary</div>
                  <div className="text-xs text-gray-500 mt-1">5-7 slides</div>
                </div>
                
                <div className="border rounded-md p-4 aspect-video flex flex-col justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <LineChart className="h-8 w-8 text-gray-500 mb-2" />
                  <div className="font-medium text-sm">Financial Analysis</div>
                  <div className="text-xs text-gray-500 mt-1">8-10 slides</div>
                </div>
                
                <div className="border rounded-md p-4 aspect-video flex flex-col justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <MessageSquare className="h-8 w-8 text-gray-500 mb-2" />
                  <div className="font-medium text-sm">Transformation Story</div>
                  <div className="text-xs text-gray-500 mt-1">12-15 slides</div>
                </div>
              </div>
              
              <div className="mt-6 border rounded-md p-4 bg-blue-50">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">Present with Impact</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Our executive presentation generator creates slide decks tailored to your 
                      audience with key findings from your value chain analysis. Presentations include 
                      speaking notes and are fully customizable.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6 flex justify-end">
                <Button>
                  <Presentation className="h-4 w-4 mr-2" />
                  Generate Presentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
