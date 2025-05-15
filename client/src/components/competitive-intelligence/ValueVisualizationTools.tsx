
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calculator, Clock, TrendingUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

// Define types for benefit and cost items
interface BenefitItem {
  value: number;
  confidence: number;
}

interface CostItem {
  value: number;
  confidence: number;
}

interface CompetitorInfo {
  benefits: number;
  costs: number;
}

// Define types for the ROI model data
interface RoiModelData {
  benefits: {
    [key: string]: BenefitItem;
  };
  costs: {
    [key: string]: CostItem;
  };
  competitors: {
    [key: string]: CompetitorInfo;
  };
  timeline: number;
}

export function ValueVisualizationTools() {
  const [activeTab, setActiveTab] = useState("tco-calculator");

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="tco-calculator" 
        className="space-y-4" 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="tco-calculator">
            TCO Calculator
          </TabsTrigger>
          <TabsTrigger value="value-timeline">
            Value Realization Timeline
          </TabsTrigger>
          <TabsTrigger value="roi-model">
            Risk-Adjusted ROI
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tco-calculator">
          <TcoCalculatorAdvanced />
        </TabsContent>
        
        <TabsContent value="value-timeline">
          <ValueRealizationTimeline />
        </TabsContent>
        
        <TabsContent value="roi-model">
          <RiskAdjustedRoi />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TcoCalculatorAdvanced() {
  const [dxcCost, setDxcCost] = useState(1000000);
  const [competitor, setCompetitor] = useState("acme-corp");
  const [competitorCost, setCompetitorCost] = useState(850000);
  const [years, setYears] = useState(3);
  const [industry, setIndustry] = useState("financial-services");
  
  // Pre-calculated cost structures based on industry and competitor
  const costStructures = {
    "financial-services": {
      "acme-corp": {
        dxc: {
          implementation: 0.35, // 35% of total cost
          licensing: 0.25,
          support: 0.15,
          maintenance: 0.10,
          training: 0.05,
          security: 0.10
        },
        competitor: {
          implementation: 0.30,
          licensing: 0.25,
          support: 0.10, // Lower support costs initially
          maintenance: 0.15,
          training: 0.05,
          security: 0.15 // Higher security costs
        },
        yearlyChanges: {
          dxc: [1.0, 0.65, 0.60, 0.55, 0.55], // First year is 100%, then drops
          competitor: [1.0, 0.70, 0.75, 0.80, 0.85] // First year is 100%, but less reduction in future
        }
      },
      // Add other competitors...
    },
    // Add other industries...
  };
  
  // Get the appropriate cost structure
  const costStructure = costStructures["financial-services"]["acme-corp"];
  
  // Calculate yearly costs
  const dxcYearlyCosts = costStructure.yearlyChanges.dxc
    .slice(0, years)
    .map((factor, index) => ({ 
      year: index + 1, 
      cost: dxcCost * factor,
      implementation: index === 0 ? dxcCost * costStructure.dxc.implementation : 0,
      licensing: dxcCost * costStructure.dxc.licensing * factor,
      support: dxcCost * costStructure.dxc.support * factor,
      maintenance: dxcCost * costStructure.dxc.maintenance * factor,
      training: index === 0 ? dxcCost * costStructure.dxc.training : dxcCost * costStructure.dxc.training * 0.2,
      security: dxcCost * costStructure.dxc.security * factor
    }));
  
  const competitorYearlyCosts = costStructure.yearlyChanges.competitor
    .slice(0, years)
    .map((factor, index) => ({ 
      year: index + 1, 
      cost: competitorCost * factor,
      implementation: index === 0 ? competitorCost * costStructure.competitor.implementation : 0,
      licensing: competitorCost * costStructure.competitor.licensing * factor,
      support: competitorCost * costStructure.competitor.support * factor,
      maintenance: competitorCost * costStructure.competitor.maintenance * factor,
      training: index === 0 ? competitorCost * costStructure.competitor.training : competitorCost * costStructure.competitor.training * 0.2,
      security: competitorCost * costStructure.competitor.security * factor
    }));
  
  // Calculate cost breakdown for the entire period
  const dxcBreakdown = {
    implementation: dxcYearlyCosts.reduce((sum, year) => sum + year.implementation, 0),
    licensing: dxcYearlyCosts.reduce((sum, year) => sum + year.licensing, 0),
    support: dxcYearlyCosts.reduce((sum, year) => sum + year.support, 0),
    maintenance: dxcYearlyCosts.reduce((sum, year) => sum + year.maintenance, 0),
    training: dxcYearlyCosts.reduce((sum, year) => sum + year.training, 0),
    security: dxcYearlyCosts.reduce((sum, year) => sum + year.security, 0)
  };
  
  const competitorBreakdown = {
    implementation: competitorYearlyCosts.reduce((sum, year) => sum + year.implementation, 0),
    licensing: competitorYearlyCosts.reduce((sum, year) => sum + year.licensing, 0),
    support: competitorYearlyCosts.reduce((sum, year) => sum + year.support, 0),
    maintenance: competitorYearlyCosts.reduce((sum, year) => sum + year.maintenance, 0),
    training: competitorYearlyCosts.reduce((sum, year) => sum + year.training, 0),
    security: competitorYearlyCosts.reduce((sum, year) => sum + year.security, 0)
  };
  
  // Calculate totals
  const dxcTotalCost = dxcYearlyCosts.reduce((sum, item) => sum + item.cost, 0);
  const competitorTotalCost = competitorYearlyCosts.reduce((sum, item) => sum + item.cost, 0);
  
  // Calculate savings
  const savings = competitorTotalCost - dxcTotalCost;
  const savingsPercentage = (savings / competitorTotalCost) * 100;
  
  // Prepare data for yearly comparison chart
  const yearlyComparisonData = Array.from({ length: years }, (_, i) => ({
    year: `Year ${i + 1}`,
    DXC: dxcYearlyCosts[i].cost,
    Competitor: competitorYearlyCosts[i].cost
  }));
  
  // Prepare data for cost breakdown chart
  const costBreakdownData = [
    { name: "Implementation", DXC: dxcBreakdown.implementation, Competitor: competitorBreakdown.implementation },
    { name: "Licensing", DXC: dxcBreakdown.licensing, Competitor: competitorBreakdown.licensing },
    { name: "Support", DXC: dxcBreakdown.support, Competitor: competitorBreakdown.support },
    { name: "Maintenance", DXC: dxcBreakdown.maintenance, Competitor: competitorBreakdown.maintenance },
    { name: "Training", DXC: dxcBreakdown.training, Competitor: competitorBreakdown.training },
    { name: "Security", DXC: dxcBreakdown.security, Competitor: competitorBreakdown.security }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Total Cost of Ownership Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-services">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="competitor">Competitor</Label>
              <Select value={competitor} onValueChange={setCompetitor}>
                <SelectTrigger id="competitor">
                  <SelectValue placeholder="Select Competitor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme-corp">Acme Corp</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions Inc</SelectItem>
                  <SelectItem value="innovate-inc">Innovate Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dxc-cost">DXC Initial Investment</Label>
              <Input
                id="dxc-cost"
                type="number"
                value={dxcCost}
                onChange={(e) => setDxcCost(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="competitor-cost">Competitor Initial Investment</Label>
              <Input
                id="competitor-cost"
                type="number"
                value={competitorCost}
                onChange={(e) => setCompetitorCost(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="years">Years to Calculate</Label>
              <Input
                id="years"
                type="number"
                min="1"
                max="5"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-4 md:col-span-2">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-medium">TCO Comparison ({years} Years)</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>DXC Solution</span>
                    <span>${dxcTotalCost.toLocaleString()}</span>
                  </div>
                  <Progress value={dxcTotalCost / Math.max(dxcTotalCost, competitorTotalCost) * 100} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Competitor Solution</span>
                    <span>${competitorTotalCost.toLocaleString()}</span>
                  </div>
                  <Progress value={competitorTotalCost / Math.max(dxcTotalCost, competitorTotalCost) * 100} className="h-3 bg-gray-200" />
                </div>
              </div>
              
              <div className="mt-6 rounded-md bg-muted p-4">
                {savings > 0 ? (
                  <div>
                    <div className="font-medium">Projected Savings with DXC</div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${savings.toLocaleString()}
                      </span>
                      <span className="text-sm text-green-600">
                        {savingsPercentage.toFixed(1)}% less than competitor
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">Price Premium for DXC Quality</div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${Math.abs(savings).toLocaleString()}
                      </span>
                      <span className="text-sm text-blue-600">
                        {Math.abs(savingsPercentage).toFixed(1)}% premium for enterprise quality
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-md p-3">
                <h4 className="text-sm font-medium mb-2">Yearly Cost Comparison</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={yearlyComparisonData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="DXC" fill="#8884d8" name="DXC" />
                    <Bar dataKey="Competitor" fill="#82ca9d" name="Competitor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="border rounded-md p-3">
                <h4 className="text-sm font-medium mb-2">Cost Breakdown</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={costBreakdownData}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 60, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="DXC" fill="#8884d8" name="DXC" />
                    <Bar dataKey="Competitor" fill="#82ca9d" name="Competitor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ValueRealizationTimeline() {
  const [solution, setSolution] = useState("cloud-transformation");
  
  // Value realization timeline data
  const timelineData = {
    "cloud-transformation": {
      dxc: [
        { quarter: "Q1", value: 5, cost: 25 },
        { quarter: "Q2", value: 15, cost: 20 },
        { quarter: "Q3", value: 30, cost: 15 },
        { quarter: "Q4", value: 45, cost: 10 },
        { quarter: "Q5", value: 65, cost: 10 },
        { quarter: "Q6", value: 85, cost: 10 },
        { quarter: "Q7", value: 95, cost: 5 },
        { quarter: "Q8", value: 100, cost: 5 }
      ],
      competitor: [
        { quarter: "Q1", value: 0, cost: 30 },
        { quarter: "Q2", value: 5, cost: 25 },
        { quarter: "Q3", value: 15, cost: 20 },
        { quarter: "Q4", value: 30, cost: 15 },
        { quarter: "Q5", value: 45, cost: 15 },
        { quarter: "Q6", value: 65, cost: 10 },
        { quarter: "Q7", value: 80, cost: 10 },
        { quarter: "Q8", value: 90, cost: 5 }
      ]
    },
    // Add other solutions...
  };
  
  const selectedData = timelineData[solution];
  
  // Calculate breakeven points
  const dxcCumulative = selectedData.dxc.map((item, index) => {
    const costToDate = selectedData.dxc.slice(0, index + 1).reduce((sum, q) => sum + q.cost, 0);
    const valueToDate = item.value;
    return { ...item, costToDate, valueToDate };
  });
  
  const competitorCumulative = selectedData.competitor.map((item, index) => {
    const costToDate = selectedData.competitor.slice(0, index + 1).reduce((sum, q) => sum + q.cost, 0);
    const valueToDate = item.value;
    return { ...item, costToDate, valueToDate };
  });
  
  // Find when value exceeds cost (breakeven)
  const dxcBreakeven = dxcCumulative.find(item => item.valueToDate >= item.costToDate)?.quarter || "Beyond Q8";
  const competitorBreakeven = competitorCumulative.find(item => item.valueToDate >= item.costToDate)?.quarter || "Beyond Q8";
  
  // Combine data for the chart
  const chartData = selectedData.dxc.map((item, index) => ({
    quarter: item.quarter,
    "DXC Value": item.value,
    "Competitor Value": selectedData.competitor[index].value,
    "DXC Cost": selectedData.dxc.slice(0, index + 1).reduce((sum, q) => sum + q.cost, 0),
    "Competitor Cost": selectedData.competitor.slice(0, index + 1).reduce((sum, q) => sum + q.cost, 0)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Value Realization Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="solution">Solution Type</Label>
              <Select value={solution} onValueChange={setSolution}>
                <SelectTrigger id="solution" className="w-[240px]">
                  <SelectValue placeholder="Select Solution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud-transformation">Cloud Transformation</SelectItem>
                  <SelectItem value="application-modernization">Application Modernization</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="digital-workplace">Digital Workplace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="p-3 border rounded-md flex flex-col min-w-[160px]">
                <span className="text-sm text-muted-foreground">DXC Breakeven</span>
                <span className="text-xl font-bold text-purple-600">{dxcBreakeven}</span>
              </div>
              <div className="p-3 border rounded-md flex flex-col min-w-[160px]">
                <span className="text-sm text-muted-foreground">Competitor Breakeven</span>
                <span className="text-xl font-bold">{competitorBreakeven}</span>
              </div>
              <div className="p-3 border rounded-md flex flex-col min-w-[160px]">
                <span className="text-sm text-muted-foreground">Value Advantage</span>
                <span className="text-xl font-bold text-green-600">
                  {selectedData.dxc[7].value - selectedData.competitor[7].value}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">Value vs. Cost Over Time</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="DXC Value" stroke="#8884d8" name="DXC Value" strokeWidth={2} />
                <Line type="monotone" dataKey="Competitor Value" stroke="#82ca9d" name="Competitor Value" strokeWidth={2} />
                <Line type="monotone" dataKey="DXC Cost" stroke="#8884d8" strokeDasharray="5 5" name="DXC Cost (Cumulative)" />
                <Line type="monotone" dataKey="Competitor Cost" stroke="#82ca9d" strokeDasharray="5 5" name="Competitor Cost (Cumulative)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-2">DXC Advantage: Faster Time to Value</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">Early Wins</Badge>
                  <span>Rapid implementation of high-value components first</span>
                </li>
                <li className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">Parallel Workstreams</Badge>
                  <span>Simultaneous implementation reduces wait times</span>
                </li>
                <li className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">Pre-built Solutions</Badge>
                  <span>Industry-specific accelerators reduce custom development</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-2">Competitor Limitations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800 border-red-300">Sequential Approach</Badge>
                  <span>Linear implementation delays value realization</span>
                </li>
                <li className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800 border-red-300">Resource Constraints</Badge>
                  <span>Limited specialized staff for rapid deployment</span>
                </li>
                <li className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800 border-red-300">Integration Gaps</Badge>
                  <span>Additional time required for system integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskAdjustedRoi() {
  const [solution, setSolution] = useState("cloud-transformation");
  const [riskProfile, setRiskProfile] = useState("moderate");
  
  // Risk-adjusted ROI model data
  const roiModelData: { [key: string]: RoiModelData } = {
    "cloud-transformation": {
      benefits: {
        "infrastructure-savings": { value: 2500000, confidence: 0.9 },
        "operational-efficiency": { value: 1800000, confidence: 0.8 },
        "faster-time-to-market": { value: 1200000, confidence: 0.7 },
        "reduced-downtime": { value: 900000, confidence: 0.85 }
      },
      costs: {
        "implementation": { value: 1500000, confidence: 0.95 },
        "training": { value: 300000, confidence: 0.9 },
        "licensing": { value: 800000, confidence: 1.0 },
        "maintenance": { value: 600000, confidence: 0.85 }
      },
      competitors: {
        "acme-corp": {
          benefits: 0.8, // 80% of DXC benefits
          costs: 0.9 // 90% of DXC costs
        },
        "tech-solutions": {
          benefits: 0.7,
          costs: 0.85
        }
      },
      timeline: 3 // years
    },
    // Add other solutions...
  };
  
  // Risk adjustment factors based on risk profile
  const riskAdjustments: { [key: string]: { benefits: number; costs: number } } = {
    "low": { benefits: 0.95, costs: 1.05 },
    "moderate": { benefits: 0.85, costs: 1.1 },
    "high": { benefits: 0.7, costs: 1.2 }
  };
  
  const selectedModel = roiModelData[solution];
  const riskFactor = riskAdjustments[riskProfile];
  
  // Calculate DXC ROI
  const totalBenefits = Object.entries(selectedModel.benefits).reduce(
    (sum, [_, item]) => sum + (item.value * item.confidence), 0
  );
  
  const totalCosts = Object.entries(selectedModel.costs).reduce(
    (sum, [_, item]) => sum + (item.value * item.confidence), 0
  );
  
  // Apply risk adjustments
  const riskAdjustedBenefits = totalBenefits * riskFactor.benefits;
  const riskAdjustedCosts = totalCosts * riskFactor.costs;
  
  // Calculate competitor ROIs
  const competitorResults: { [key: string]: { benefits: number; costs: number } } = {
    "acme-corp": {
      benefits: riskAdjustedBenefits * selectedModel.competitors["acme-corp"].benefits,
      costs: riskAdjustedCosts * selectedModel.competitors["acme-corp"].costs
    },
    "tech-solutions": {
      benefits: riskAdjustedBenefits * selectedModel.competitors["tech-solutions"].benefits,
      costs: riskAdjustedCosts * selectedModel.competitors["tech-solutions"].costs
    }
  };
  
  // Calculate ROI values
  const dxcRoi = ((riskAdjustedBenefits - riskAdjustedCosts) / riskAdjustedCosts) * 100;
  const acmeRoi = ((competitorResults["acme-corp"].benefits - competitorResults["acme-corp"].costs) / competitorResults["acme-corp"].costs) * 100;
  const techRoi = ((competitorResults["tech-solutions"].benefits - competitorResults["tech-solutions"].costs) / competitorResults["tech-solutions"].costs) * 100;
  
  // Prepare data for ROI comparison chart
  const roiComparisonData = [
    { name: "DXC", roi: dxcRoi },
    { name: "Acme Corp", roi: acmeRoi },
    { name: "Tech Solutions", roi: techRoi }
  ];
  
  // Prepare data for benefits breakdown chart
  const benefitsData = [
    { 
      name: "Infrastructure", 
      DXC: selectedModel.benefits["infrastructure-savings"].value * selectedModel.benefits["infrastructure-savings"].confidence * riskFactor.benefits,
      "Acme Corp": 0,
      "Tech Solutions": 0
    },
    { 
      name: "Operational", 
      DXC: selectedModel.benefits["operational-efficiency"].value * selectedModel.benefits["operational-efficiency"].confidence * riskFactor.benefits,
      "Acme Corp": 0,
      "Tech Solutions": 0
    },
    { 
      name: "Time to Market", 
      DXC: selectedModel.benefits["faster-time-to-market"].value * selectedModel.benefits["faster-time-to-market"].confidence * riskFactor.benefits,
      "Acme Corp": 0,
      "Tech Solutions": 0
    },
    { 
      name: "Reduced Downtime", 
      DXC: selectedModel.benefits["reduced-downtime"].value * selectedModel.benefits["reduced-downtime"].confidence * riskFactor.benefits,
      "Acme Corp": 0,
      "Tech Solutions": 0
    }
  ];
  
  // Add competitor data
  benefitsData.forEach(item => {
    item["Acme Corp"] = item.DXC * selectedModel.competitors["acme-corp"].benefits;
    item["Tech Solutions"] = item.DXC * selectedModel.competitors["tech-solutions"].benefits;
  });
  
  // Yearly benefits projection
  const yearlyProjection = Array.from({ length: selectedModel.timeline }, (_, i) => {
    const year = `Year ${i + 1}`;
    
    // Benefits increase over time (simplified model)
    const yearFactor = 0.6 + (i * 0.2);
    
    return {
      name: year,
      DXC: riskAdjustedBenefits * yearFactor / selectedModel.timeline,
      "Acme Corp": competitorResults["acme-corp"].benefits * yearFactor / selectedModel.timeline,
      "Tech Solutions": competitorResults["tech-solutions"].benefits * yearFactor / selectedModel.timeline
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Risk-Adjusted ROI Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label htmlFor="solution-roi">Solution Type</Label>
              <Select value={solution} onValueChange={setSolution}>
                <SelectTrigger id="solution-roi" className="w-[240px]">
                  <SelectValue placeholder="Select Solution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud-transformation">Cloud Transformation</SelectItem>
                  <SelectItem value="application-modernization">Application Modernization</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="digital-workplace">Digital Workplace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="risk-profile">Risk Profile</Label>
              <Select value={riskProfile} onValueChange={setRiskProfile}>
                <SelectTrigger id="risk-profile" className="w-[200px]">
                  <SelectValue placeholder="Select Risk Profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk (Conservative)</SelectItem>
                  <SelectItem value="moderate">Moderate Risk (Balanced)</SelectItem>
                  <SelectItem value="high">High Risk (Aggressive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Risk-Adjusted ROI Comparison</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={roiComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => {
                    if (typeof value === 'number') {
                      return `${value.toFixed(1)}%`;
                    }
                    return value;
                  }} />
                  <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-2 bg-purple-50 rounded-md text-center">
                  <div className="text-sm text-muted-foreground">DXC</div>
                  <div className="font-bold text-purple-700">{dxcRoi.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-blue-50 rounded-md text-center">
                  <div className="text-sm text-muted-foreground">Acme</div>
                  <div className="font-bold text-blue-700">{acmeRoi.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-green-50 rounded-md text-center">
                  <div className="text-sm text-muted-foreground">Tech Solutions</div>
                  <div className="font-bold text-green-700">{techRoi.toFixed(1)}%</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Benefits Breakdown</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={benefitsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => {
                    if (typeof value === 'number') {
                      return `$${(value / 1000000).toFixed(2)}M`;
                    }
                    return value;
                  }} />
                  <Legend />
                  <Bar dataKey="DXC" fill="#8884d8" />
                  <Bar dataKey="Acme Corp" fill="#82ca9d" />
                  <Bar dataKey="Tech Solutions" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">Benefits Projection Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={yearlyProjection}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(value) => {
                  if (typeof value === 'number') {
                    return `$${(value / 1000000).toFixed(2)}M`;
                  }
                  return value;
                }} />
                <Legend />
                <Area type="monotone" dataKey="DXC" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Acme Corp" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="Tech Solutions" stackId="3" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h4 className="font-medium text-blue-800 mb-2">Risk Adjustment Factors Applied</h4>
            <p className="text-sm text-blue-700 mb-2">Based on the selected <strong>{riskProfile}</strong> risk profile:</p>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Benefits reduced by {(100 - riskFactor.benefits * 100).toFixed(0)}% to account for potential delays or underperformance</li>
              <li>• Costs increased by {((riskFactor.costs - 1) * 100).toFixed(0)}% to account for potential overruns or unforeseen expenses</li>
              <li>• Confidence factors applied to individual benefit and cost categories</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
