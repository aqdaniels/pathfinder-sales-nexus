
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileDown, CloudLightning, Sparkles, Target } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function BattlecardGeneratorAdvanced() {
  const [competitor, setCompetitor] = useState("acme-corp");
  const [industry, setIndustry] = useState("financial-services");
  const [solution, setSolution] = useState("cloud-transformation");
  const [isGenerating, setIsGenerating] = useState(false);
  const [battlecardGenerated, setBattlecardGenerated] = useState(false);

  const handleGenerateBattlecard = () => {
    setIsGenerating(true);
    // Simulate API call to generate battlecard
    setTimeout(() => {
      setIsGenerating(false);
      setBattlecardGenerated(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Battlecard Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Competitor</label>
              <Select value={competitor} onValueChange={setCompetitor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Competitor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme-corp">Acme Corp</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions Inc</SelectItem>
                  <SelectItem value="innovate-inc">Innovate Inc</SelectItem>
                  <SelectItem value="global-systems">Global Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-services">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="public-sector">Public Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Solution Focus</label>
              <Select value={solution} onValueChange={setSolution}>
                <SelectTrigger>
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
            
            <div className="flex items-end">
              <Button 
                className="w-full" 
                onClick={handleGenerateBattlecard}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Battlecard
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {battlecardGenerated && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Acme Corp Battlecard - Financial Services</h3>
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
                  <TabsTrigger value="positioning">DXC Positioning</TabsTrigger>
                  <TabsTrigger value="objections">Key Objections</TabsTrigger>
                  <TabsTrigger value="strategy">Win Strategy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">Acme Corp</h4>
                        <p className="text-muted-foreground">Global IT Services Provider</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                        Tier 1 Competitor
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h5 className="font-medium mb-2">Company Overview</h5>
                        <ul className="space-y-1 text-sm">
                          <li>Founded: 1995</li>
                          <li>HQ: San Francisco, CA</li>
                          <li>Revenue: $8.2B (2024)</li>
                          <li>Employees: ~42,000</li>
                          <li>Global Presence: 28 countries</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Financial Services Focus</h5>
                        <ul className="space-y-1 text-sm">
                          <li>15% of total revenue</li>
                          <li>Growing at 12% YoY</li>
                          <li>Top clients: 3 of top 10 global banks</li>
                          <li>Recent acquisition: FinTech Cloud (2023)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Cloud Transformation</h5>
                        <ul className="space-y-1 text-sm">
                          <li>Primary partner: Azure</li>
                          <li>Secondary: AWS</li>
                          <li>Limited Google Cloud presence</li>
                          <li>Compliance focus: SOC 2, PCI-DSS</li>
                          <li>Migration methodology: 5-phase approach</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <h5 className="font-medium mb-1 flex items-center text-blue-800">
                        <CloudLightning className="h-4 w-4 mr-2" />
                        Recent Intelligence
                      </h5>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>Announces new banking platform Q3 2024</li>
                        <li>Leadership change in Financial Services division (Jan 2024)</li>
                        <li>Pricing strategy shift toward value-based for enterprise clients</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="strengths" className="p-4 border rounded-md mt-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-3">
                        <li className="border-l-2 border-green-300 pl-3 py-1">
                          <span className="font-medium block">Strong Azure integration expertise</span>
                          <span className="text-sm text-muted-foreground">Particularly in Financial Services compliance solutions</span>
                        </li>
                        <li className="border-l-2 border-green-300 pl-3 py-1">
                          <span className="font-medium block">Fast implementation methodology</span>
                          <span className="text-sm text-muted-foreground">Typical 30% faster than industry average for mid-size deployments</span>
                        </li>
                        <li className="border-l-2 border-green-300 pl-3 py-1">
                          <span className="font-medium block">Competitive pricing</span>
                          <span className="text-sm text-muted-foreground">Often 10-15% lower than DXC for initial implementation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Weaknesses
                      </h4>
                      <ul className="space-y-3">
                        <li className="border-l-2 border-red-300 pl-3 py-1">
                          <span className="font-medium block">Support limitations</span>
                          <span className="text-sm text-muted-foreground">Limited 24/7 support capabilities in APAC region</span>
                        </li>
                        <li className="border-l-2 border-red-300 pl-3 py-1">
                          <span className="font-medium block">Integration challenges</span>
                          <span className="text-sm text-muted-foreground">Struggles with complex legacy system integrations</span>
                        </li>
                        <li className="border-l-2 border-red-300 pl-3 py-1">
                          <span className="font-medium block">High staff turnover</span>
                          <span className="text-sm text-muted-foreground">28% consultant turnover in 2023 causing knowledge continuity issues</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="positioning" className="space-y-4 p-4 border rounded-md mt-4">
                  <h4 className="font-semibold">DXC Differentiation in Financial Services Cloud Transformation</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <h5 className="font-medium text-green-800">Industry-Specific Solutions</h5>
                      <p className="text-sm text-green-700">DXC offers pre-built financial services compliance frameworks for cloud transformation that Acme lacks, reducing implementation time by 40% for regulated workloads.</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <h5 className="font-medium text-green-800">Enterprise-Scale Support</h5>
                      <p className="text-sm text-green-700">Unlike Acme's limited regional support, DXC provides full 24/7 follow-the-sun support with dedicated financial services specialists in all major global financial centers.</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <h5 className="font-medium text-green-800">Total Cost of Ownership</h5>
                      <p className="text-sm text-green-700">While Acme may offer lower initial pricing, DXC's 3-year TCO is typically 22% lower due to reduced ongoing maintenance, fewer security incidents, and optimized cloud resource utilization.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="objections" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">Objection: "Acme has a faster implementation timeline"</h4>
                      <div className="mt-2 text-sm">
                        <p className="font-medium text-muted-foreground">Response:</p>
                        <p className="mb-2">While Acme claims faster implementation, their approach often sacrifices critical security and compliance components for financial services. DXC's timeline includes complete regulatory compliance built-in, which typically saves 4-6 months in post-implementation remediation that Acme clients often require.</p>
                        <p className="font-medium text-muted-foreground">Evidence:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                          <li>Regional Bank case study showing 2-month implementation plus 5 months of compliance remediation with Acme</li>
                          <li>DXC 4-month implementation with no remediation required for similar scope</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">Objection: "Acme's pricing is more competitive"</h4>
                      <div className="mt-2 text-sm">
                        <p className="font-medium text-muted-foreground">Response:</p>
                        <p className="mb-2">Acme's initial pricing appears lower because they separate core services from essential financial services capabilities like advanced security monitoring, compliance reporting, and 24/7 support. When comparing complete solutions, DXC's transparent pricing typically delivers 22% lower TCO over 3 years.</p>
                        <p className="font-medium text-muted-foreground">Evidence:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                          <li>TCO calculator showing 3-year comparison including all operational costs</li>
                          <li>Client testimonial from Global Insurance Company that switched from Acme to DXC</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="strategy" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Winning Against Acme Corp</h4>
                    
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium mb-1">1. Expand the Evaluation Criteria</h5>
                        <p className="text-sm text-muted-foreground">Ensure RFPs and evaluations include enterprise-grade capabilities where DXC excels: global support, regulatory compliance, legacy integration, and long-term maintainability.</p>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium mb-1">2. Involve Risk/Compliance Stakeholders</h5>
                        <p className="text-sm text-muted-foreground">Acme solutions often require additional work to meet financial regulations. Engage risk and compliance teams early to highlight DXC's built-in capabilities.</p>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium mb-1">3. Demonstrate Total Cost of Ownership</h5>
                        <p className="text-sm text-muted-foreground">Use the Financial Services Cloud TCO calculator to show 3-year and 5-year comparisons including all operational costs, not just implementation.</p>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium mb-1">4. References and Case Studies</h5>
                        <p className="text-sm text-muted-foreground">Leverage DXC's strong financial services references, particularly those who previously used or evaluated Acme.</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                      <h5 className="font-medium text-blue-800 mb-1">Partnership Opportunity</h5>
                      <p className="text-sm text-blue-700">For smaller financial institutions or specific use cases where Acme has a strong presence, consider partnering approach where DXC provides enterprise management layer over Acme's solutions.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
