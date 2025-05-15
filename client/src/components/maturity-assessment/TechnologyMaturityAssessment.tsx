
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet, ArrowRight, BarChart4, Clock } from "lucide-react";
import { DomainAssessment } from "./DomainAssessment";
import { MaturityVisualizer } from "./MaturityVisualizer";
import { SolutionMapping } from "./SolutionMapping";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { AssessmentHistory } from "./AssessmentHistory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TechnologyMaturityAssessment() {
  const [activeTab, setActiveTab] = useState("assessment");
  const [selectedClient, setSelectedClient] = useState("acme-corp");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [assessmentStage, setAssessmentStage] = useState("in-progress");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Technology Maturity Assessment
          </h1>
          <p className="text-muted-foreground">
            Evaluate client capabilities and identify transformation opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Assessment
          </Button>
          <Button>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pb-2">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Client</span>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme-corp">Acme Corporation</SelectItem>
              <SelectItem value="globex">Globex Industries</SelectItem>
              <SelectItem value="initech">Initech Systems</SelectItem>
              <SelectItem value="massive-dynamic">Massive Dynamic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Industry</span>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="financial-services">Financial Services</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Status</span>
          <div className="h-10 flex items-center">
            <Badge className="py-1.5" variant={assessmentStage === "completed" ? "success" : "default"}>
              {assessmentStage === "in-progress" ? "In Progress" : "Completed"}
              {assessmentStage === "in-progress" && <Clock className="ml-1 h-3 w-3" />}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart4 className="h-4 w-4 text-primary" />
              Overall Maturity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2/5.0</div>
            <p className="text-sm text-muted-foreground">Mid-level maturity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base font-medium">DevOps & Delivery</div>
            <div className="flex items-center mt-1">
              <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: "30%" }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">1.5</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base font-medium">Cloud Adoption</div>
            <p className="text-sm text-muted-foreground">Est. impact: High</p>
            <Button variant="link" size="sm" className="px-0 h-5 mt-1">
              View Solutions <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Industry Position</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-base font-medium">
              <span className="text-amber-600">⬤</span> Below Average
            </div>
            <p className="text-sm text-muted-foreground">-1.2 vs. Technology sector</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="visualization">Maturity Model</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="executive">Executive Summary</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment">
          <DomainAssessment 
            client={selectedClient} 
            industry={selectedIndustry} 
          />
        </TabsContent>
        
        <TabsContent value="visualization">
          <MaturityVisualizer 
            client={selectedClient} 
            industry={selectedIndustry} 
          />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <SolutionMapping 
            client={selectedClient} 
            industry={selectedIndustry} 
          />
        </TabsContent>
        
        <TabsContent value="executive">
          <ExecutiveSummary 
            client={selectedClient} 
            industry={selectedIndustry} 
          />
        </TabsContent>
        
        <TabsContent value="history">
          <AssessmentHistory 
            client={selectedClient} 
            industry={selectedIndustry} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
