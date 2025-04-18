
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Shield } from "lucide-react";

export function ObjectionHandler() {
  const objections = [
    {
      objection: "Your solution is more expensive than competitor X",
      response:
        "While our initial cost may be slightly higher in some cases, our TCO analysis shows that over a 3-year period, customers typically save 20-30% with DXC due to reduced maintenance costs, fewer required upgrades, and significantly lower operational overhead. We also provide a dedicated account team that delivers continuous value optimization throughout the relationship.",
      evidence: [
        "Case Study: Global Financial Services firm saved $2.3M over 3 years",
        "Forrester TEI Report showing 145% ROI with 9-month payback period",
      ],
    },
    {
      objection: "Competitor X has a more mature cloud platform",
      response:
        "DXC's cloud platform is built on 30+ years of enterprise IT management experience. Unlike many competitors who've retrofitted consumer platforms for enterprise use, our solution was designed from the ground up for complex enterprise environments with hybrid infrastructure. Our platform receives regular quarterly updates with industry-leading SLAs and 99.99% availability track record over the past 18 months.",
      evidence: [
        "Gartner recognition for completeness of vision in latest Magic Quadrant",
        "Platform uptime dashboard showing 99.99% availability",
        "Release notes showing 4 major platform upgrades in past year",
      ],
    },
    {
      objection: "Your implementation timeline is too long",
      response:
        "Our implementation approach is tailored to enterprise realities. We've developed accelerators that reduce typical timeframes by 40% compared to industry standards. Our proven methodology includes parallel workstreams and a dedicated migration factory that has successfully transitioned over 500 enterprise applications. We can demonstrate references from similar organizations where we've met or exceeded timeline expectations.",
      evidence: [
        "Implementation framework documentation showing accelerator components",
        "Reference from similar client with 4-week implementation time",
        "Migration factory capabilities overview",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Objection Handling Guide</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Common Objections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {objections.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-medium text-left">
                  {item.objection}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Recommended Response</h4>
                          <p className="text-muted-foreground">{item.response}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Supporting Evidence</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {item.evidence.map((evidence, i) => (
                          <li key={i}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
