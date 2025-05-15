import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, Lightbulb, ArrowRight, Check } from "lucide-react";

// Sample maturity data for healthcare domain
const maturityData = [
  {
    name: "Patient Experience",
    current: 2.5,
    industry: 3.8,
    best: 4.6,
    gap: 1.3,
    impactValue: "$1.1M"
  },
  {
    name: "Claims Management",
    current: 1.8,
    industry: 3.2,
    best: 4.3,
    gap: 1.4,
    impactValue: "$2.5M"
  },
  {
    name: "Clinical Workflow",
    current: 3.1,
    industry: 3.5,
    best: 4.4,
    gap: 0.4,
    impactValue: "$750K"
  },
  {
    name: "Data Management",
    current: 2.4,
    industry: 3.4,
    best: 4.5,
    gap: 1.0,
    impactValue: "$1.3M"
  },
  {
    name: "IT Infrastructure",
    current: 3.2,
    industry: 3.7,
    best: 4.8,
    gap: 0.5,
    impactValue: "$850K"
  },
  {
    name: "Regulatory Compliance",
    current: 3.6,
    industry: 3.9,
    best: 4.7,
    gap: 0.3,
    impactValue: "$660K"
  },
];

// Radar chart data
const radarData = maturityData.map(item => ({
  subject: item.name,
  "Current State": item.current,
  "Industry Average": item.industry,
  "Best Practice": item.best,
  fullMark: 5
}));

// Maturity assessment criteria
const maturityCriteria = [
  {
    id: "claims-maturity",
    domain: "Claims Management",
    level: 1.8,
    levelText: "Developing",
    criteria: [
      { id: "claim-1", text: "Manual claims submission process with high error rates", satisfied: false },
      { id: "claim-2", text: "Basic claims tracking with limited visibility", satisfied: true },
      { id: "claim-3", text: "Reactive denials management", satisfied: true },
      { id: "claim-4", text: "Limited analytics capabilities", satisfied: false },
      { id: "claim-5", text: "Minimal integration with clinical systems", satisfied: false },
    ],
    nextLevel: {
      improvements: [
        "Implement automated claims submission with validation",
        "Enhance denial prediction and prevention",
        "Integrate clinical documentation with claims processes"
      ]
    }
  },
  {
    id: "patient-maturity",
    domain: "Patient Experience",
    level: 2.5,
    levelText: "Defined",
    criteria: [
      { id: "patient-1", text: "Digital patient intake with some paper processes", satisfied: true },
      { id: "patient-2", text: "Basic patient portal with limited functionality", satisfied: true },
      { id: "patient-3", text: "Standardized patient communication channels", satisfied: true },
      { id: "patient-4", text: "Limited personalization of patient experience", satisfied: false },
      { id: "patient-5", text: "Basic patient satisfaction measurement", satisfied: true },
    ],
    nextLevel: {
      improvements: [
        "Implement omnichannel patient engagement",
        "Enhance personalization through data analytics",
        "Deploy real-time patient feedback mechanisms"
      ]
    }
  },
];

export function MaturityAssessment() {
  const [activeDomain, setActiveDomain] = useState("claims-maturity");
  
  const currentCriteria = maturityCriteria.find(c => c.id === activeDomain);
  
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Capability Maturity Assessment</CardTitle>
            <CardDescription>
              Current maturity levels compared to industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 5]} />
                  <Radar
                    name="Current State"
                    dataKey="Current State"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="Industry Average"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Best Practice"
                    dataKey="Best Practice"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium">Maturity Gap Analysis</h3>
              <div className="grid grid-cols-3 gap-4">
                {maturityData.map((domain) => (
                  <div 
                    key={domain.name}
                    className="border rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      const domainId = domain.name.toLowerCase().replace(/\s+/g, '-') + '-maturity';
                      if (maturityCriteria.some(c => c.id === domainId)) {
                        setActiveDomain(domainId);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">{domain.name}</h4>
                      <Badge 
                        variant={domain.gap > 1 ? "destructive" : domain.gap > 0.5 ? "outline" : "secondary"}
                      >
                        Gap: {domain.gap.toFixed(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                      <div 
                        className="h-2 rounded-full bg-purple-500" 
                        style={{ width: `${(domain.current / 5) * 100}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Current: {domain.current.toFixed(1)}</span>
                      <span className="text-gray-500">Target: {domain.industry.toFixed(1)}</span>
                    </div>
                    <div className="text-xs mt-2">Opportunity: {domain.impactValue}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Assessment Details</CardTitle>
            <CardDescription>
              {currentCriteria ? currentCriteria.domain : "Select a domain"} maturity assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentCriteria && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Gauge 
                      className="w-16 h-16 text-gray-200" 
                      strokeWidth={1}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{currentCriteria.level.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{currentCriteria.domain}</h3>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm">Maturity Level:</span>
                      <Badge>{currentCriteria.levelText}</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Assessment Criteria</h3>
                  <div className="space-y-2">
                    {currentCriteria.criteria.map((criterion) => (
                      <div 
                        key={criterion.id} 
                        className="flex items-start gap-2 p-2 border rounded-md"
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                          criterion.satisfied ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {criterion.satisfied ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="text-xs">✕</span>
                          )}
                        </div>
                        <span className="text-sm">{criterion.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-medium text-blue-600">Improvement Recommendations</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    {currentCriteria.nextLevel.improvements.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">Full Assessment Report</Button>
                  <Button>
                    <span>Improvement Roadmap</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
