
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CompetitorComparisonMatrix() {
  const [industry, setIndustry] = useState("all");
  const [offering, setOffering] = useState("all");
  const [clientSize, setClientSize] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample comparison data
  const capabilities = [
    {
      name: "Cloud Infrastructure Services",
      category: "Cloud",
      dxc: {
        rating: "superior",
        description: "Enterprise-grade, fully managed cloud services with 24/7 support",
        evidence: "99.99% uptime SLA, 30% lower TCO than leading competitors"
      },
      competitor1: {
        name: "Acme Corp",
        rating: "good",
        description: "Standard cloud offerings with limited customization",
        evidence: "Standard SLAs, limited enterprise features"
      },
      competitor2: {
        name: "Tech Solutions Inc",
        rating: "average",
        description: "Basic cloud infrastructure with adequate support",
        evidence: "98.5% uptime, standard pricing model"
      }
    },
    {
      name: "Cybersecurity Services",
      category: "Security",
      dxc: {
        rating: "superior",
        description: "Zero-trust architecture with advanced threat intelligence",
        evidence: "SOC 2 Type II, ISO 27001, NIST compliance"
      },
      competitor1: {
        name: "Acme Corp",
        rating: "good",
        description: "Standard security protocols with limited AI capabilities",
        evidence: "Basic compliance certifications, limited threat intelligence"
      },
      competitor2: {
        name: "Tech Solutions Inc",
        rating: "poor",
        description: "Basic security offerings with reactive approach",
        evidence: "No advanced threat protection, limited compliance"
      }
    },
    {
      name: "Application Modernization",
      category: "Applications",
      dxc: {
        rating: "good",
        description: "Comprehensive modernization with minimal disruption",
        evidence: "30% average reduction in application maintenance costs"
      },
      competitor1: {
        name: "Acme Corp",
        rating: "superior",
        description: "Industry-leading modernization with advanced automation",
        evidence: "40% reduction in maintenance costs, faster time to market"
      },
      competitor2: {
        name: "Tech Solutions Inc",
        rating: "average",
        description: "Standard modernization approaches",
        evidence: "Limited automation, adequate results"
      }
    }
  ];

  const getRatingColor = (rating) => {
    switch (rating) {
      case "superior":
        return "bg-green-100 text-green-800 border-green-300";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "poor":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredCapabilities = capabilities.filter(capability => {
    const matchesSearch = searchTerm === "" || 
      capability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industry === "all" || true; // Add industry filter logic
    const matchesOffering = offering === "all" || capability.category.toLowerCase() === offering.toLowerCase();
    const matchesClientSize = clientSize === "all" || true; // Add client size filter logic
    
    return matchesSearch && matchesIndustry && matchesOffering && matchesClientSize;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitor Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center w-full md:w-auto">
              <Search className="h-4 w-4 absolute ml-2 text-gray-500" />
              <Input 
                placeholder="Search capabilities..." 
                className="pl-8" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={offering} onValueChange={setOffering}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Service Offering" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offerings</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="applications">Applications</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={clientSize} onValueChange={setClientSize}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Client Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="midmarket">Mid-Market</SelectItem>
                <SelectItem value="smb">Small Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Capability</TableHead>
                  <TableHead>DXC</TableHead>
                  <TableHead>Acme Corp</TableHead>
                  <TableHead>Tech Solutions Inc</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCapabilities.map((capability) => (
                  <TableRow key={capability.name}>
                    <TableCell className="font-medium">
                      <div>
                        {capability.name}
                        <Badge variant="outline" className="ml-2">
                          {capability.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={`${getRatingColor(capability.dxc.rating)}`}>
                          {capability.dxc.rating.charAt(0).toUpperCase() + capability.dxc.rating.slice(1)}
                        </Badge>
                        <p>{capability.dxc.description}</p>
                        <p className="text-xs text-gray-500">
                          <strong>Evidence:</strong> {capability.dxc.evidence}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={`${getRatingColor(capability.competitor1.rating)}`}>
                          {capability.competitor1.rating.charAt(0).toUpperCase() + capability.competitor1.rating.slice(1)}
                        </Badge>
                        <p>{capability.competitor1.description}</p>
                        <p className="text-xs text-gray-500">
                          <strong>Evidence:</strong> {capability.competitor1.evidence}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={`${getRatingColor(capability.competitor2.rating)}`}>
                          {capability.competitor2.rating.charAt(0).toUpperCase() + capability.competitor2.rating.slice(1)}
                        </Badge>
                        <p>{capability.competitor2.description}</p>
                        <p className="text-xs text-gray-500">
                          <strong>Evidence:</strong> {capability.competitor2.evidence}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
