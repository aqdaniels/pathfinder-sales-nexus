
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, ShieldCheck, UserRound } from "lucide-react";

export function ObjectionHandlingLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Sample data for objection handling library
  const objections = [
    {
      id: 1,
      objection: "Your solution is more expensive than competitor X",
      competitor: "Acme Corp",
      relevantRoles: ["CFO", "CEO", "CIO"],
      response: "While our initial cost may be slightly higher in some cases, our TCO analysis shows that over a 3-year period, customers typically save 20-30% with DXC due to reduced maintenance costs, fewer required upgrades, and significantly lower operational overhead. We also provide a dedicated account team that delivers continuous value optimization throughout the relationship.",
      evidence: [
        "Case Study: Global Financial Services firm saved $2.3M over 3 years",
        "Forrester TEI Report showing 145% ROI with 9-month payback period",
      ],
      talkTracks: {
        CFO: "For your financial objectives, our solution delivers 22% lower 3-year TCO with higher reliability metrics that directly impact your bottom line.",
        CIO: "From an IT leadership perspective, our solution reduces operational overhead by 35% while improving service levels, letting your team focus on innovation rather than maintenance.",
        CEO: "Looking at business outcomes, our solution provides a more predictable cost structure with faster time-to-value, improving your competitive position in the market."
      }
    },
    {
      id: 2,
      objection: "Competitor X has a more mature cloud platform",
      competitor: "Tech Solutions Inc",
      relevantRoles: ["CIO", "CTO"],
      response: "DXC's cloud platform is built on 30+ years of enterprise IT management experience. Unlike many competitors who've retrofitted consumer platforms for enterprise use, our solution was designed from the ground up for complex enterprise environments with hybrid infrastructure. Our platform receives regular quarterly updates with industry-leading SLAs and 99.99% availability track record over the past 18 months.",
      evidence: [
        "Gartner recognition for completeness of vision in latest Magic Quadrant",
        "Platform uptime dashboard showing 99.99% availability",
        "Release notes showing 4 major platform upgrades in past year",
      ],
      talkTracks: {
        CIO: "For enterprise IT environments like yours, our platform was purpose-built to handle complex integration requirements while providing the agility of cloud, rather than being adapted from a consumer platform.",
        CTO: "From a technical architecture perspective, our platform's hybrid integration capabilities reduce complexity while increasing flexibility for your specific environment and compliance requirements."
      }
    },
    {
      id: 3,
      objection: "Your implementation timeline is too long",
      competitor: "Innovate Inc",
      relevantRoles: ["CEO", "CIO", "COO"],
      response: "Our implementation approach is tailored to enterprise realities. We've developed accelerators that reduce typical timeframes by 40% compared to industry standards. Our proven methodology includes parallel workstreams and a dedicated migration factory that has successfully transitioned over 500 enterprise applications. We can demonstrate references from similar organizations where we've met or exceeded timeline expectations.",
      evidence: [
        "Implementation framework documentation showing accelerator components",
        "Reference from similar client with 4-week implementation time",
        "Migration factory capabilities overview",
      ],
      talkTracks: {
        CEO: "We understand time-to-value is critical, which is why our approach focuses on delivering business outcomes in phases, with value created at each milestone rather than waiting for full implementation.",
        CIO: "Our implementation methodology has been refined through 500+ enterprise migrations, allowing us to confidently deliver within the timeframe while reducing operational risk.",
        COO: "For operational continuity, our implementation approach minimizes business disruption through a phased transition with parallel operations where needed."
      }
    }
  ];

  const filteredObjections = objections.filter(obj => {
    const matchesSearch = searchTerm === "" || 
      obj.objection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.competitor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || obj.relevantRoles.includes(roleFilter);
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input 
            placeholder="Search objections, competitors..." 
            className="pl-8" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Stakeholder Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stakeholders</SelectItem>
            <SelectItem value="CEO">CEO</SelectItem>
            <SelectItem value="CFO">CFO</SelectItem>
            <SelectItem value="CIO">CIO</SelectItem>
            <SelectItem value="CTO">CTO</SelectItem>
            <SelectItem value="COO">COO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5" />
            Objection Handling Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredObjections.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="font-medium text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                    <span>{item.objection}</span>
                    <Badge className="mt-1 md:mt-0" variant="outline">{item.competitor}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <Tabs defaultValue="response" className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="response">General Response</TabsTrigger>
                      <TabsTrigger value="talk-tracks">Role-Based Talk Tracks</TabsTrigger>
                      <TabsTrigger value="evidence">Supporting Evidence</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="response" className="pt-4">
                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h4 className="font-medium mb-1">Recommended Response</h4>
                            <p className="text-muted-foreground">{item.response}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="talk-tracks" className="pt-4">
                      <div className="space-y-4">
                        {Object.entries(item.talkTracks).map(([role, talkTrack]) => (
                          <div key={role} className="border rounded-md p-4">
                            <div className="flex items-start gap-3">
                              <UserRound className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">For {role}</h4>
                                <p className="text-muted-foreground">{talkTrack}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="evidence" className="pt-4">
                      <div>
                        <h4 className="font-medium mb-2">Supporting Evidence</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {item.evidence.map((evidence, i) => (
                            <li key={i}>{evidence}</li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
