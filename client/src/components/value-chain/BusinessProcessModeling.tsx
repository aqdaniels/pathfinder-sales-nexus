
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Boxes, Plus, Save } from "lucide-react";

// Mock industry templates
const industryTemplates = [
  { id: "healthcare", name: "Healthcare" },
  { id: "banking", name: "Banking & Financial Services" },
  { id: "insurance", name: "Insurance" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "retail", name: "Retail & Consumer" },
  { id: "energy", name: "Energy & Utilities" },
];

// Mock process steps for Healthcare
const healthcareProcesses = [
  { id: "patient-acquisition", name: "Patient Acquisition", value: 65 },
  { id: "intake", name: "Patient Intake & Registration", value: 72 },
  { id: "diagnosis", name: "Diagnosis & Treatment Planning", value: 58 },
  { id: "care-delivery", name: "Care Delivery", value: 81 },
  { id: "billing", name: "Billing & Claims Processing", value: 43 },
  { id: "followup", name: "Follow-up Care", value: 62 },
];

export function BusinessProcessModeling() {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Industry Templates</CardTitle>
              <CardDescription>
                Select an industry template or create a custom value chain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedIndustry}
                onValueChange={setSelectedIndustry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Available Templates</h3>
                <div className="space-y-2">
                  {industryTemplates.map((template) => (
                    <div 
                      key={template.id} 
                      className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${selectedIndustry === template.id ? 'bg-gray-100 border border-gray-200' : ''}`}
                      onClick={() => setSelectedIndustry(template.id)}
                    >
                      <Boxes className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{template.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Template
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Healthcare Value Chain</CardTitle>
                <CardDescription>
                  Drag and drop elements to customize the process flow
                </CardDescription>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Process Map
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    {healthcareProcesses.map((process, index) => (
                      <React.Fragment key={process.id}>
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-20 border rounded-md bg-white shadow-sm hover:shadow transition-shadow duration-200 flex flex-col items-center justify-center p-2 cursor-move">
                            <div className="text-xs text-center font-medium">{process.name}</div>
                            <div className="mt-2 text-xs flex items-center">
                              <div className={`h-2 w-full rounded-full ${process.value < 50 ? 'bg-red-200' : process.value < 70 ? 'bg-yellow-200' : 'bg-green-200'}`}>
                                <div
                                  className={`h-2 rounded-full ${process.value < 50 ? 'bg-red-500' : process.value < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                  style={{ width: `${process.value}%` }}
                                />
                              </div>
                              <span className="ml-1">{process.value}%</span>
                            </div>
                          </div>
                          <div className="text-xs mt-1 text-gray-500">Drag to reorder</div>
                        </div>
                        {index < healthcareProcesses.length - 1 && (
                          <div className="h-0.5 w-6 bg-gray-300" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="space-y-2 w-1/2 pr-2">
                    <h3 className="text-sm font-medium">Pain Points</h3>
                    <div className="border rounded-md p-3 bg-red-50">
                      <div className="text-sm font-medium">Billing & Claims Processing</div>
                      <div className="text-xs text-gray-600 mt-1">High error rate (23%) in claims submission causing payment delays</div>
                    </div>
                    <div className="border rounded-md p-3 bg-yellow-50">
                      <div className="text-sm font-medium">Diagnosis & Treatment Planning</div>
                      <div className="text-xs text-gray-600 mt-1">Limited access to patient history across providers</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 w-1/2 pl-2">
                    <h3 className="text-sm font-medium">Benchmark Performance</h3>
                    <div className="border rounded-md p-3">
                      <div className="text-sm flex justify-between">
                        <span>Billing Cycle Time</span>
                        <span className="font-medium text-red-500">-32%</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Client: 43 days</span>
                        <span>Industry: 29 days</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm flex justify-between">
                        <span>Claims Approval Rate</span>
                        <span className="font-medium text-red-500">-18%</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Client: 72%</span>
                        <span>Industry: 88%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
