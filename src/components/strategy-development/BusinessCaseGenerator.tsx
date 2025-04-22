
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Minus, 
  Calculator, 
  CircleDollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Percent, 
  FileDown, 
  Calendar, 
  Gauge, 
  FileText, 
  FileSpreadsheet,
  Download,
  FileCheck,
  Copy,
  FileSearch,
  PlusCircle,
  Check,
  Pencil
} from "lucide-react";

// Sample data for visualizations
const benefitsData = [
  { year: 'Year 1', value: 250000, projected: 275000 },
  { year: 'Year 2', value: 550000, projected: 600000 },
  { year: 'Year 3', value: 850000, projected: 900000 },
  { year: 'Year 4', value: 950000, projected: 1100000 },
  { year: 'Year 5', value: 1050000, projected: 1250000 },
];

const costsData = [
  { year: 'Year 1', implementation: 500000, operation: 100000, total: 600000 },
  { year: 'Year 2', implementation: 250000, operation: 150000, total: 400000 },
  { year: 'Year 3', implementation: 100000, operation: 175000, total: 275000 },
  { year: 'Year 4', implementation: 50000, operation: 200000, total: 250000 },
  { year: 'Year 5', implementation: 25000, operation: 225000, total: 250000 },
];

const cumulativeData = [
  { year: 'Year 1', value: -350000 },
  { year: 'Year 2', value: -200000 },
  { year: 'Year 3', value: 375000 },
  { year: 'Year 4', value: 1075000 },
  { year: 'Year 5', value: 1875000 },
];

const valueSources = [
  { name: 'Cost Reduction', value: 40 },
  { name: 'Revenue Growth', value: 25 },
  { name: 'Risk Mitigation', value: 15 },
  { name: 'Productivity', value: 20 },
];

// Sample benefits
const sampleBenefits = [
  {
    id: 'benefit-1',
    category: 'Cost Reduction',
    description: 'Reduced manual claims processing costs',
    annualValue: 250000,
    confidenceLevel: 'high',
    startYear: 1,
    rampUp: [25, 65, 90, 100, 100]
  },
  {
    id: 'benefit-2',
    category: 'Productivity',
    description: 'Improved staff productivity through automation',
    annualValue: 175000,
    confidenceLevel: 'medium',
    startYear: 1,
    rampUp: [20, 60, 100, 100, 100]
  },
  {
    id: 'benefit-3',
    category: 'Revenue Growth',
    description: 'Increased customer satisfaction leading to retention',
    annualValue: 325000,
    confidenceLevel: 'medium',
    startYear: 2,
    rampUp: [0, 40, 75, 100, 100]
  },
  {
    id: 'benefit-4',
    category: 'Risk Mitigation',
    description: 'Reduced compliance and regulatory penalties',
    annualValue: 150000,
    confidenceLevel: 'high',
    startYear: 1,
    rampUp: [50, 100, 100, 100, 100]
  }
];

// Sample costs
const sampleCosts = [
  {
    id: 'cost-1',
    category: 'Implementation',
    description: 'Solution development and deployment',
    amount: 350000,
    type: 'one-time',
    year: 1
  },
  {
    id: 'cost-2',
    category: 'Implementation',
    description: 'Systems integration',
    amount: 175000,
    type: 'one-time',
    year: 1
  },
  {
    id: 'cost-3',
    category: 'Implementation',
    description: 'Training and change management',
    amount: 150000,
    type: 'one-time',
    year: 1
  },
  {
    id: 'cost-4',
    category: 'Operation',
    description: 'Annual licensing and maintenance',
    amount: 100000,
    type: 'recurring',
    year: 1
  },
  {
    id: 'cost-5',
    category: 'Operation',
    description: 'Ongoing support and enhancements',
    amount: 75000,
    type: 'recurring',
    year: 1
  }
];

// Risk adjusted values
const riskAdjustedData = [
  { name: 'NPV', baseline: 1500000, riskadjusted: 1275000 },
  { name: 'ROI', baseline: 250, riskadjusted: 210 },
  { name: '5-Year TCO', baseline: 1775000, riskadjusted: 1950000 },
];

// Alternatives comparison
const alternativesData = [
  { name: 'Proposed', npv: 1275000, roi: 210, payback: 2.5, risk: 'Medium' },
  { name: 'Alternative 1', npv: 975000, roi: 170, payback: 3.1, risk: 'Low' },
  { name: 'Alternative 2', npv: 1500000, roi: 240, payback: 2.2, risk: 'High' },
  { name: 'Do Nothing', npv: 0, roi: 0, payback: 0, risk: 'High' },
];

// COLORS
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export function BusinessCaseGenerator() {
  const [activeTab, setActiveTab] = useState("value-drivers");
  const [benefits, setBenefits] = useState(sampleBenefits);
  const [costs, setCosts] = useState(sampleCosts);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [editingCost, setEditingCost] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  
  const totalBenefits = benefits.reduce((sum, b) => sum + b.annualValue, 0);
  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0);
  const recurringCosts = costs.filter(c => c.type === 'recurring').reduce((sum, c) => sum + c.amount, 0);
  
  // Financial metrics
  const financialMetrics = {
    npv: 1275000,
    roi: 210,
    irr: 45,
    paybackPeriod: 2.5,
    bcr: 2.1
  };
  
  const addNewBenefit = () => {
    const newBenefit = {
      id: `benefit-${benefits.length + 1}`,
      category: 'Cost Reduction',
      description: '',
      annualValue: 0,
      confidenceLevel: 'medium',
      startYear: 1,
      rampUp: [25, 75, 100, 100, 100]
    };
    
    setEditingBenefit(newBenefit);
    setBenefits([...benefits, newBenefit]);
  };
  
  const addNewCost = () => {
    const newCost = {
      id: `cost-${costs.length + 1}`,
      category: 'Implementation',
      description: '',
      amount: 0,
      type: 'one-time',
      year: 1
    };
    
    setEditingCost(newCost);
    setCosts([...costs, newCost]);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="value-drivers">Value Drivers</TabsTrigger>
          <TabsTrigger value="cost-modeling">Cost Modeling</TabsTrigger>
          <TabsTrigger value="financial-analysis">Financial Analysis</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
          <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="value-drivers" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Value driver summary */}
            <Card className="col-span-8">
              <CardHeader>
                <CardTitle>Value Driver Analysis</CardTitle>
                <CardDescription>
                  Identify and quantify business value sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={valueSources}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              fill="#8884d8"
                              paddingAngle={2}
                              dataKey="value"
                              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                              {valueSources.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-gray-500">
                        Value Distribution by Category
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={benefitsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            <Legend />
                            <Line type="monotone" dataKey="value" name="Baseline" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="projected" name="Projected" stroke="#82ca9d" strokeDasharray="5 5" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-gray-500">
                        Value Realization Timeline
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex items-center text-blue-700 font-medium mb-2">
                      <CircleDollarSign className="h-5 w-5 mr-2" />
                      Total Value Opportunity
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-700">
                          ${totalBenefits.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">Annual Value</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">
                          ${(totalBenefits * 5).toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">5-Year Potential</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">
                          ${financialMetrics.npv.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">Net Present Value</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">
                          {financialMetrics.roi}%
                        </div>
                        <div className="text-sm text-blue-600">Return on Investment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Value driver breakdown */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Value Categories</CardTitle>
                <CardDescription>
                  Value contribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {valueSources.map((source, index) => (
                    <div key={source.name}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-gray-500">{source.value}%</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${source.value}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }} 
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {source.name === 'Cost Reduction' && 'Operational efficiency and process automation savings'}
                        {source.name === 'Revenue Growth' && 'Improved customer retention and cross-sell opportunities'}
                        {source.name === 'Risk Mitigation' && 'Reduced compliance penalties and operational risks'}
                        {source.name === 'Productivity' && 'Enhanced workforce efficiency and output quality'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Benefits detail */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Benefit Details</CardTitle>
                  <CardDescription>
                    Specific value drivers and their quantified impact
                  </CardDescription>
                </div>
                <Button onClick={addNewBenefit}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Benefit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Annual Value</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Start Year</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benefits.map((benefit) => (
                    <TableRow key={benefit.id}>
                      <TableCell>
                        <Badge variant="outline">{benefit.category}</Badge>
                      </TableCell>
                      <TableCell>{benefit.description}</TableCell>
                      <TableCell>${benefit.annualValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            benefit.confidenceLevel === 'high' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : benefit.confidenceLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-red-100 text-red-700 hover:bg-red-100'
                          }
                        >
                          {benefit.confidenceLevel.charAt(0).toUpperCase() + benefit.confidenceLevel.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>Year {benefit.startYear}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setEditingBenefit(benefit)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost-modeling" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Cost overview */}
            <Card className="col-span-8">
              <CardHeader>
                <CardTitle>Cost Overview</CardTitle>
                <CardDescription>
                  Implementation and operational costs over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="implementation" name="Implementation" stackId="a" fill="#8884d8" />
                        <Bar dataKey="operation" name="Operation" stackId="a" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-md">
                    <div className="flex items-center text-indigo-700 font-medium mb-2">
                      <CircleDollarSign className="h-5 w-5 mr-2" />
                      Cost Summary
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${totalCosts.toLocaleString()}
                        </div>
                        <div className="text-sm text-indigo-600">Total Implementation</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${recurringCosts.toLocaleString()}
                        </div>
                        <div className="text-sm text-indigo-600">Annual Recurring</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${costsData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-indigo-600">5-Year TCO</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${(costsData.reduce((sum, item) => sum + item.total, 0) / 5).toLocaleString()}
                        </div>
                        <div className="text-sm text-indigo-600">Average Annual Cost</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Implementation timeline */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>
                  Project phases and resource allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mr-4">
                      Q1-Q2
                    </div>
                    <div>
                      <h4 className="font-medium">Discovery & Planning</h4>
                      <p className="text-sm text-gray-500">Requirements gathering and solution design</p>
                      <div className="text-sm text-blue-600 mt-1">$150,000</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold mr-4">
                      Q2-Q3
                    </div>
                    <div>
                      <h4 className="font-medium">Development & Integration</h4>
                      <p className="text-sm text-gray-500">Solution build and systems integration</p>
                      <div className="text-sm text-purple-600 mt-1">$350,000</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-4">
                      Q3-Q4
                    </div>
                    <div>
                      <h4 className="font-medium">Testing & Deployment</h4>
                      <p className="text-sm text-gray-500">QA, UAT, and production deployment</p>
                      <div className="text-sm text-green-600 mt-1">$175,000</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold mr-4">
                      Q4+
                    </div>
                    <div>
                      <h4 className="font-medium">Training & Adoption</h4>
                      <p className="text-sm text-gray-500">User onboarding and change management</p>
                      <div className="text-sm text-orange-600 mt-1">$125,000</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cost details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Cost Details</CardTitle>
                  <CardDescription>
                    Implementation and operational expense breakdown
                  </CardDescription>
                </div>
                <Button onClick={addNewCost}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Cost
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costs.map((cost) => (
                    <TableRow key={cost.id}>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            cost.category === 'Implementation' 
                              ? 'border-purple-200 text-purple-700'
                              : 'border-green-200 text-green-700'
                          }
                        >
                          {cost.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{cost.description}</TableCell>
                      <TableCell>${cost.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            cost.type === 'one-time' 
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' 
                              : 'bg-green-100 text-green-700 hover:bg-green-100'
                          }
                        >
                          {cost.type === 'one-time' ? 'One-time' : 'Recurring'}
                        </Badge>
                      </TableCell>
                      <TableCell>Year {cost.year}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setEditingCost(cost)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial-analysis" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Key financial metrics */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-4">
                      <CircleDollarSign className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Net Present Value (NPV)</div>
                      <div className="text-3xl font-bold">${financialMetrics.npv.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Return on Investment (ROI)</div>
                        <div className="text-xl font-bold">{financialMetrics.roi}%</div>
                      </div>
                      <ArrowUpRight className="h-8 w-8 text-green-500" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Internal Rate of Return (IRR)</div>
                        <div className="text-xl font-bold">{financialMetrics.irr}%</div>
                      </div>
                      <ArrowUpRight className="h-8 w-8 text-green-500" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Payback Period</div>
                        <div className="text-xl font-bold">{financialMetrics.paybackPeriod} years</div>
                      </div>
                      <ArrowDownRight className="h-8 w-8 text-green-500" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Benefit-Cost Ratio</div>
                        <div className="text-xl font-bold">{financialMetrics.bcr}:1</div>
                      </div>
                      <ArrowUpRight className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Financial summary */}
            <Card className="col-span-8">
              <CardHeader>
                <CardTitle>Cumulative Cash Flow</CardTitle>
                <CardDescription>
                  5-year cash flow projection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cumulativeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" name="Cumulative Cash Flow" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-md">
                    <div className="font-medium text-green-700 mb-1">Breakeven Point</div>
                    <div className="text-2xl font-bold text-green-700">Year 3</div>
                    <div className="text-sm text-green-600 mt-1">Q1 of Year 3</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="font-medium text-blue-700 mb-1">5-Year Net Benefit</div>
                    <div className="text-2xl font-bold text-blue-700">$1,875,000</div>
                    <div className="text-sm text-blue-600 mt-1">After all costs</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-md">
                    <div className="font-medium text-purple-700 mb-1">Annual Run Rate Value</div>
                    <div className="text-2xl font-bold text-purple-700">$800,000</div>
                    <div className="text-sm text-purple-600 mt-1">Steady state</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Comparison with alternatives */}
          <Card>
            <CardHeader>
              <CardTitle>Alternative Comparison</CardTitle>
              <CardDescription>
                Financial analysis of solution alternatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alternative</TableHead>
                    <TableHead>NPV</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Payback Period</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alternativesData.map((alt, index) => (
                    <TableRow key={alt.name} className={index === 0 ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">
                        {alt.name}
                        {index === 0 && (
                          <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100">
                            Recommended
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>${alt.npv.toLocaleString()}</TableCell>
                      <TableCell>{alt.roi}%</TableCell>
                      <TableCell>{alt.payback === 0 ? "N/A" : `${alt.payback} years`}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            alt.risk === 'Low' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : alt.risk === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-red-100 text-red-700 hover:bg-red-100'
                          }
                        >
                          {alt.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {index === 0 ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Proceed
                          </Badge>
                        ) : index === 1 ? (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                            Consider
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            Reject
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline">
                  <FileCheck className="mr-2 h-4 w-4" />
                  View Detailed Comparison
                </Button>
                <Button>
                  <Check className="mr-2 h-4 w-4" />
                  Select Recommended Option
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sensitivity" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Confidence adjustment */}
            <Card className="col-span-5">
              <CardHeader>
                <CardTitle>Confidence Adjustment</CardTitle>
                <CardDescription>
                  Adjust confidence level for risk-adjusted projections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-40 h-40">
                      <Gauge className="w-40 h-40 text-gray-200" strokeWidth={2} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600">{confidenceLevel}%</span>
                        <span className="text-sm text-gray-500">Confidence</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex justify-between">
                      <span className="text-sm font-medium">Confidence Level Adjustment</span>
                      <span className="text-sm">{confidenceLevel}%</span>
                    </label>
                    <Slider
                      value={[confidenceLevel]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(values) => setConfidenceLevel(values[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative</span>
                      <span>Realistic</span>
                      <span>Optimistic</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Impact on Projections</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Baseline NPV</div>
                        <div className="font-medium">${financialMetrics.npv.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Risk-Adjusted NPV</div>
                        <div className="font-medium">${Math.round(financialMetrics.npv * (confidenceLevel / 100)).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Baseline ROI</div>
                        <div className="font-medium">{financialMetrics.roi}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Risk-Adjusted ROI</div>
                        <div className="font-medium">{Math.round(financialMetrics.roi * (confidenceLevel / 100))}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Risk-adjusted values */}
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Risk-Adjusted Projections</CardTitle>
                <CardDescription>
                  Comparison of baseline and risk-adjusted values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskAdjustedData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => value === 250 ? `${value}%` : `$${value / 1000}k`} />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === "ROI" ? `${value}%` : `$${value.toLocaleString()}`,
                          name === "baseline" ? "Baseline" : "Risk-Adjusted"
                        ]} 
                      />
                      <Legend />
                      <Bar dataKey="baseline" name="Baseline" fill="#8884d8" />
                      <Bar dataKey="riskadjusted" name="Risk-Adjusted" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Key Sensitivity Factors</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Implementation Timeline</div>
                        <div className="text-sm text-gray-500">Impact: High</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-red-500" style={{ width: '80%' }} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Each month of schedule delay reduces NPV by approximately $50,000
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Adoption Rate</div>
                        <div className="text-sm text-gray-500">Impact: Medium</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '60%' }} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Every 10% decrease in adoption reduces benefits by approximately 15%
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Integration Complexity</div>
                        <div className="text-sm text-gray-500">Impact: Medium</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '55%' }} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Higher complexity could increase implementation costs by up to 25%
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Market Conditions</div>
                        <div className="text-sm text-gray-500">Impact: Low</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '30%' }} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Market fluctuations have minimal impact on core value drivers
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Scenario analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Scenario Analysis</CardTitle>
              <CardDescription>
                Financial outcomes under different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scenario</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>NPV</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Payback</TableHead>
                      <TableHead>Probability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Best Case
                        </Badge>
                      </TableCell>
                      <TableCell>Early implementation, high adoption, all benefits realized</TableCell>
                      <TableCell>${(financialMetrics.npv * 1.25).toLocaleString()}</TableCell>
                      <TableCell>{Math.round(financialMetrics.roi * 1.2)}%</TableCell>
                      <TableCell>2.0 years</TableCell>
                      <TableCell>20%</TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-50">
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Expected Case
                        </Badge>
                      </TableCell>
                      <TableCell>On-time delivery, standard adoption curve</TableCell>
                      <TableCell>${financialMetrics.npv.toLocaleString()}</TableCell>
                      <TableCell>{financialMetrics.roi}%</TableCell>
                      <TableCell>2.5 years</TableCell>
                      <TableCell>60%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          Delayed Case
                        </Badge>
                      </TableCell>
                      <TableCell>3-month implementation delay, slower benefit realization</TableCell>
                      <TableCell>${Math.round(financialMetrics.npv * 0.8).toLocaleString()}</TableCell>
                      <TableCell>{Math.round(financialMetrics.roi * 0.8)}%</TableCell>
                      <TableCell>3.1 years</TableCell>
                      <TableCell>15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          Worst Case
                        </Badge>
                      </TableCell>
                      <TableCell>Significant delays, cost overruns, low adoption</TableCell>
                      <TableCell>${Math.round(financialMetrics.npv * 0.5).toLocaleString()}</TableCell>
                      <TableCell>{Math.round(financialMetrics.roi * 0.5)}%</TableCell>
                      <TableCell>4.0 years</TableCell>
                      <TableCell>5%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export Scenarios
                  </Button>
                  <Button>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Run Custom Scenario
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="executive-summary" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Executive Business Case Summary</CardTitle>
                  <CardDescription>
                    Key highlights for executive decision making
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Summary
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex items-center text-blue-700 font-medium mb-3">
                      <CircleDollarSign className="h-5 w-5 mr-2" />
                      Financial Impact
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Net Present Value</div>
                        <div className="text-2xl font-bold text-blue-700">${financialMetrics.npv.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">ROI</div>
                        <div className="text-2xl font-bold text-blue-700">{financialMetrics.roi}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Payback Period</div>
                        <div className="text-2xl font-bold text-blue-700">{financialMetrics.paybackPeriod} years</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <div className="flex items-center text-green-700 font-medium mb-3">
                      <ArrowUpRight className="h-5 w-5 mr-2" />
                      Business Value
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Annual Value</div>
                        <div className="text-2xl font-bold text-green-700">${totalBenefits.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">5-Year Value</div>
                        <div className="text-2xl font-bold text-green-700">${(benefitsData.reduce((sum, item) => sum + item.value, 0)).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Key Value Driver</div>
                        <div className="text-lg font-bold text-green-700">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                    <div className="flex items-center text-purple-700 font-medium mb-3">
                      <Calendar className="h-5 w-5 mr-2" />
                      Implementation
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Total Investment</div>
                        <div className="text-2xl font-bold text-purple-700">${totalCosts.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Implementation Timeline</div>
                        <div className="text-2xl font-bold text-purple-700">9 months</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Annual Operating Cost</div>
                        <div className="text-2xl font-bold text-purple-700">${recurringCosts.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Strategic Alignment</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Digital Transformation</div>
                          <p className="text-sm text-gray-600">Supports the organization's digital transformation strategy by automating manual processes and enabling data-driven decision making.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Customer Experience</div>
                          <p className="text-sm text-gray-600">Enhances customer experience through faster processing times and improved accuracy, leading to higher satisfaction scores.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Operational Excellence</div>
                          <p className="text-sm text-gray-600">Drives operational excellence by streamlining workflows, reducing errors, and improving compliance.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Risk Assessment</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Implementation Risk</div>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          Medium
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '60%' }} />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="font-medium">Financial Risk</div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Low
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '30%' }} />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="font-medium">Operational Risk</div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Low
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '35%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommendation</h3>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <p className="text-gray-700">
                      Based on the strong financial case (210% ROI, $1.28M NPV) and strategic alignment 
                      with key business objectives, we recommend proceeding with the proposed solution. 
                      The 2.5-year payback period falls within organizational investment guidelines, and 
                      the risk-adjusted analysis confirms the robustness of the business case even under 
                      conservative scenarios.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Button>
                        <Check className="mr-2 h-4 w-4" />
                        Approve Business Case
                      </Button>
                      <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Request Additional Analysis
                      </Button>
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
