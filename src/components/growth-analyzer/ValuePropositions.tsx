
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, ArrowRight, Download, Calendar, Clock } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for value propositions
const getValuePropositions = (client: string, industry: string, growthType: string) => {
  // This would be replaced with real API calls
  const baseProps = {
    portfolio: {
      title: "Portfolio Momentum Value Propositions",
      description: "Financial impact models and value propositions for addressing portfolio growth gaps",
      valueProps: [
        {
          title: "Cloud Modernization Program",
          impact: "$24.5M revenue potential",
          roi: "285%",
          payback: "14 months",
          offerings: ["Cloud Migration Services", "Modern Application Platform", "Cloud Optimization"],
          keyPoints: [
            "Accelerate market-competitive capabilities in cloud infrastructure services",
            "Reduce time-to-market for new services by 65%",
            "Enable consumption-based pricing models for improved margins"
          ]
        },
        {
          title: "Data Services Acceleration",
          impact: "$31.6M revenue potential",
          roi: "327%",
          payback: "11 months",
          offerings: ["Data Platform Modernization", "AI & Analytics", "Data Governance"],
          keyPoints: [
            "Close the 9.1% growth gap in data services segment",
            "Enable real-time analytics capabilities for competitive advantage",
            "Monetize data assets through new service offerings"
          ]
        }
      ]
    },
    "market-share": {
      title: "Market Share Recapture Value Propositions",
      description: "Strategies and value models for addressing market share erosion and competitive positioning",
      valueProps: [
        {
          title: "Digital Experience Transformation",
          impact: "$18.3M revenue potential",
          roi: "214%",
          payback: "16 months",
          offerings: ["CX Design & Implementation", "Digital Channel Integration", "AI-Powered Personalization"],
          keyPoints: [
            "Address -3.4% market share decline in digital experience services",
            "Deploy industry-leading CX capabilities to counter Competitor E's advances",
            "Enable 35% faster time-to-market for digital initiatives"
          ]
        },
        {
          title: "Analytics-as-a-Service Platform",
          impact: "$22.1M revenue potential",
          roi: "258%",
          payback: "12 months",
          offerings: ["Analytics Platform", "Business Intelligence", "Decision Support"],
          keyPoints: [
            "Counter market share losses in analytics services segment",
            "Differentiate with industry-specific analytics solutions",
            "Create recurring revenue streams through analytics subscription services"
          ]
        }
      ]
    },
    adjacency: {
      title: "Adjacency Expansion Value Propositions",
      description: "Value propositions for entering and capturing high-growth adjacent markets",
      valueProps: [
        {
          title: "AI/ML Services Integration",
          impact: "$42.6M revenue potential",
          roi: "312%",
          payback: "10 months",
          offerings: ["AI Operations Suite", "ML Acceleration", "Intelligent Automation"],
          keyPoints: [
            "Enter high-growth (32.4%) AI/ML services adjacency",
            "Leverage existing client relationships to cross-sell AI capabilities",
            "Create competitive differentiation through industry-specific AI models"
          ]
        },
        {
          title: "Industry Cloud Ecosystem",
          impact: "$31.2M revenue potential",
          roi: "241%",
          payback: "15 months",
          offerings: ["Industry Cloud Accelerators", "Regulatory Compliance", "Ecosystem Integration"],
          keyPoints: [
            "Capitalize on 24.7% growth trend in industry-specific cloud solutions",
            "Address industry-specific compliance and integration challenges",
            "Create defensible market position through domain expertise and IP"
          ]
        }
      ]
    }
  };

  return baseProps[growthType as keyof typeof baseProps];
};

type ValuePropositionsProps = {
  client: string;
  industry: string;
  growthType: "portfolio" | "market-share" | "adjacency";
};

export const ValuePropositions = ({ client, industry, growthType }: ValuePropositionsProps) => {
  const data = getValuePropositions(client, industry, growthType);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {data.valueProps.map((prop, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-left">
                  <CircleDollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <div>{prop.title}</div>
                    <div className="text-xs font-normal text-muted-foreground">{prop.impact}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">ROI</div>
                        <div className="text-lg font-bold">{prop.roi}</div>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Payback Period</div>
                        <div className="text-lg font-bold">{prop.payback}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">DXC Offerings</div>
                    <div className="flex flex-wrap gap-2">
                      {prop.offerings.map((offering, i) => (
                        <Badge key={i} variant="secondary">{offering}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Key Message Points</div>
                    <ul className="space-y-1">
                      {prop.keyPoints.map((point, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-1 shrink-0 text-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm">
                      View Full Business Case
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Create Custom Value Proposition
        </Button>
      </CardFooter>
    </Card>
  );
};
