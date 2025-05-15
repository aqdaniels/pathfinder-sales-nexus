
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart, User, PieChart, LineChart } from "lucide-react";

type ExecutiveRole = "ceo" | "cfo" | "cio" | "coo";

type TemplatePoint = {
  title: string;
  description: string;
  examples: string[];
};

type ExecutiveTemplate = {
  role: ExecutiveRole;
  title: string;
  icon: JSX.Element;
  description: string;
  focusAreas: TemplatePoint[];
  keyMetrics: TemplatePoint[];
  presentationTips: string[];
};

export function ExecutiveTemplates() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<ExecutiveRole>("ceo");
  
  const templates: Record<ExecutiveRole, ExecutiveTemplate> = {
    ceo: {
      role: "ceo",
      title: "CEO Template",
      icon: <User className="h-5 w-5" />,
      description: "Focus on strategic vision, market leadership, and competitive advantage",
      focusAreas: [
        {
          title: "Strategic Growth",
          description: "Connect DXC solutions to the client's strategic growth initiatives",
          examples: [
            "How our solutions increase market share or open new markets",
            "Strategic advantages against key competitors",
            "Accelerating time-to-market for new offerings"
          ]
        },
        {
          title: "Business Transformation",
          description: "Frame solutions as enablers of business transformation",
          examples: [
            "Reimagining business models and customer engagement",
            "Creating new revenue streams and business capabilities",
            "Enabling organizational agility and innovation"
          ]
        },
        {
          title: "Shareholder Value",
          description: "Quantify impact on long-term shareholder value",
          examples: [
            "Revenue growth and margin improvement",
            "Cost structure optimization",
            "Strategic differentiation in the market"
          ]
        }
      ],
      keyMetrics: [
        {
          title: "Market Position",
          description: "Metrics focused on competitive positioning",
          examples: [
            "Market share growth",
            "Brand value enhancement",
            "Customer acquisition/retention improvements"
          ]
        },
        {
          title: "Financial Performance",
          description: "High-level financial impact metrics",
          examples: [
            "Revenue growth projections",
            "Margin improvements",
            "EBITDA impact"
          ]
        }
      ],
      presentationTips: [
        "Keep presentations concise and strategic - 15 minutes maximum",
        "Lead with business outcomes, not technology capabilities",
        "Use industry benchmarks and peer comparisons",
        "Include real-world success stories from similar organizations",
        "Present high-level financial projections with clear ROI"
      ]
    },
    cfo: {
      role: "cfo",
      title: "CFO Template",
      icon: <BarChart className="h-5 w-5" />,
      description: "Focus on financial metrics, ROI, TCO, and risk reduction",
      focusAreas: [
        {
          title: "Financial Performance",
          description: "Demonstrate clear financial benefits and impact",
          examples: [
            "Cost reduction opportunities across the organization",
            "Revenue enhancement potential",
            "Working capital improvements"
          ]
        },
        {
          title: "Investment Analysis",
          description: "Provide comprehensive investment analysis",
          examples: [
            "ROI timeline with clear milestones",
            "TCO analysis comparing current vs. future state",
            "Cash flow impact analysis"
          ]
        },
        {
          title: "Risk Management",
          description: "Address financial and operational risk considerations",
          examples: [
            "Compliance enhancement capabilities",
            "Business continuity improvements",
            "Reduction in audit/regulatory findings"
          ]
        }
      ],
      keyMetrics: [
        {
          title: "Cost Metrics",
          description: "Detailed cost impact metrics",
          examples: [
            "Operating expense reduction (detailed by function)",
            "IT cost as percentage of revenue",
            "Cost avoidance calculations"
          ]
        },
        {
          title: "Investment Returns",
          description: "Comprehensive ROI metrics",
          examples: [
            "IRR (Internal Rate of Return)",
            "NPV (Net Present Value)",
            "Payback period (months)"
          ]
        }
      ],
      presentationTips: [
        "Lead with detailed financial analysis and projections",
        "Include sensitivity analysis for different scenarios",
        "Provide detailed TCO comparisons",
        "Present clear implementation costs and payment schedules",
        "Articulate financial risks and mitigation strategies"
      ]
    },
    cio: {
      role: "cio",
      title: "CIO Template",
      icon: <LineChart className="h-5 w-5" />,
      description: "Focus on technology roadmap, integration, and innovation",
      focusAreas: [
        {
          title: "IT Transformation",
          description: "Position solutions within broader IT transformation",
          examples: [
            "Legacy modernization benefits",
            "Technical debt reduction",
            "IT service improvement metrics"
          ]
        },
        {
          title: "Technology Integration",
          description: "Address integration with existing technology landscape",
          examples: [
            "Integration approach with existing systems",
            "Implementation methodology and timeline",
            "Skills and capability development"
          ]
        },
        {
          title: "Innovation Enablement",
          description: "Showcase how solutions enable future innovation",
          examples: [
            "Platform for future digital initiatives",
            "API and integration capabilities",
            "Analytics and data capabilities"
          ]
        }
      ],
      keyMetrics: [
        {
          title: "Operational Metrics",
          description: "IT operational improvement metrics",
          examples: [
            "System availability improvements",
            "Incident reduction percentages",
            "Mean time to recovery improvements"
          ]
        },
        {
          title: "Technology Lifecycle",
          description: "Lifecycle and maintenance metrics",
          examples: [
            "Technical debt reduction",
            "Support and maintenance cost reductions",
            "Technology refresh cycle improvements"
          ]
        }
      ],
      presentationTips: [
        "Connect technology solutions to business outcomes",
        "Include implementation approach and methodology",
        "Address security and compliance considerations",
        "Discuss integration with existing technology landscape",
        "Highlight future-proofing and scalability"
      ]
    },
    coo: {
      role: "coo",
      title: "COO Template",
      icon: <PieChart className="h-5 w-5" />,
      description: "Focus on operational efficiency and process excellence",
      focusAreas: [
        {
          title: "Operational Excellence",
          description: "Showcase operational efficiency improvements",
          examples: [
            "Process optimization and automation opportunities",
            "Workforce productivity enhancements",
            "Quality and defect reduction"
          ]
        },
        {
          title: "Business Continuity",
          description: "Address reliability and business continuity benefits",
          examples: [
            "Downtime reduction and service reliability",
            "Resilience improvements",
            "Disaster recovery enhancements"
          ]
        },
        {
          title: "Customer Experience",
          description: "Link operational improvements to customer experience",
          examples: [
            "Service level improvements",
            "Customer satisfaction impacts",
            "Cycle time reductions"
          ]
        }
      ],
      keyMetrics: [
        {
          title: "Efficiency Metrics",
          description: "Operational efficiency measurements",
          examples: [
            "Process cycle time reductions",
            "Resource utilization improvements",
            "Error rate reductions"
          ]
        },
        {
          title: "Quality Metrics",
          description: "Quality and performance improvements",
          examples: [
            "First-time-right percentages",
            "SLA performance improvements",
            "Customer satisfaction score impacts"
          ]
        }
      ],
      presentationTips: [
        "Focus on operational pain points and solutions",
        "Include process flow diagrams (before and after)",
        "Provide detailed implementation timelines",
        "Address change management considerations",
        "Include operational KPIs and expected improvements"
      ]
    }
  };
  
  const handleUseTemplate = (template: ExecutiveRole) => {
    setSelectedTemplate(template);
    toast({
      title: `${templates[template].title} applied`,
      description: "Template has been loaded into the story builder.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ceo" onValueChange={(value) => setSelectedTemplate(value as ExecutiveRole)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="ceo">CEO Perspective</TabsTrigger>
          <TabsTrigger value="cfo">CFO Perspective</TabsTrigger>
          <TabsTrigger value="cio">CIO Perspective</TabsTrigger>
          <TabsTrigger value="coo">COO Perspective</TabsTrigger>
        </TabsList>
        
        {Object.values(templates).map((template) => (
          <TabsContent key={template.role} value={template.role}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {template.icon}
                  <span className="ml-2">{template.title}</span>
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Focus Areas</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {template.focusAreas.map((area, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{area.title}</CardTitle>
                            <CardDescription className="text-xs">{area.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                              {area.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Key Metrics</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {template.keyMetrics.map((metric, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{metric.title}</CardTitle>
                            <CardDescription className="text-xs">{metric.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                              {metric.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Presentation Tips</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="pt-4">
                        <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                          {template.presentationTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleUseTemplate(template.role)}>
                  Use This Template
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
