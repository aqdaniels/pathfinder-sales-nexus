
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";
import { CheckCircle2, InfoIcon, Layers, LinkIcon, Zap } from "lucide-react";

type Solution = {
  id: string;
  name: string;
  description: string;
  confidenceScore: number;
  keyFeatures: string[];
  benefits: string[];
  practice: "Custom Apps" | "SAP" | "Enterprise & Cloud" | "Data & AI";
  tags: string[];
};

const solutions: Solution[] = [
  {
    id: "s1",
    name: "Enterprise Cloud Transformation",
    description: "Comprehensive cloud migration and modernization solution for enterprise workloads",
    confidenceScore: 92,
    practice: "Enterprise & Cloud",
    keyFeatures: [
      "Legacy application modernization",
      "Cloud-native architecture",
      "Hybrid cloud management",
      "Automated deployment pipelines",
    ],
    benefits: [
      "30-40% reduction in operational costs",
      "60% faster application deployment",
      "99.99% platform availability",
      "Enhanced security and compliance",
    ],
    tags: ["Azure", "Cloud", "Modernization", "DevOps"],
  },
  {
    id: "s2",
    name: "Data Analytics Platform",
    description: "End-to-end data platform for advanced analytics and insights",
    confidenceScore: 85,
    practice: "Data & AI",
    keyFeatures: [
      "Real-time data processing",
      "Advanced analytics dashboards",
      "Predictive modeling capabilities",
      "Data governance framework",
    ],
    benefits: [
      "Comprehensive customer 360° view",
      "Predictive operational insights",
      "Data-driven decision making",
      "Regulatory compliance assurance",
    ],
    tags: ["Analytics", "Data", "AI/ML", "Insights"],
  },
  {
    id: "s3",
    name: "SAP S/4HANA Transformation",
    description: "Strategic SAP modernization and business process optimization",
    confidenceScore: 78,
    practice: "SAP",
    keyFeatures: [
      "S/4HANA implementation or migration",
      "Business process reengineering",
      "Integration with cloud services",
      "Custom SAP extensions",
    ],
    benefits: [
      "Streamlined business processes",
      "Real-time financial insights",
      "Enhanced user experience",
      "Future-ready ERP foundation",
    ],
    tags: ["SAP", "S/4HANA", "ERP", "Business Transformation"],
  },
];

export function SolutionMatcher() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Portfolio Solution Matching</h2>
        <p className="text-muted-foreground">
          AI-recommended solutions based on client challenges and needs
        </p>
      </div>

      <Card className="border-dxc-purple/30">
        <CardHeader className="bg-dxc-purple-light/10 border-b border-dxc-purple/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-lg text-dxc-purple-dark">
                <Zap className="mr-2 h-5 w-5 text-dxc-purple" /> Top Recommendation
              </CardTitle>
              <CardDescription>
                Highest confidence match based on client conversations
              </CardDescription>
            </div>
            <Badge className="bg-dxc-purple/80">
              {solutions[0].confidenceScore}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{solutions[0].name}</h3>
              <p className="text-muted-foreground">{solutions[0].description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium flex items-center mb-3">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-dxc-purple" /> Key Features
                </h4>
                <ul className="space-y-2">
                  {solutions[0].keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-dxc-purple-light/30 text-dxc-purple-dark flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium flex items-center mb-3">
                  <Layers className="mr-2 h-4 w-4 text-dxc-purple" /> Client Benefits
                </h4>
                <ul className="space-y-2">
                  {solutions[0].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs mr-2 mt-0.5">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{solutions[0].practice}</Badge>
              {solutions[0].tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <InfoIcon className="mr-2 h-4 w-4" /> View Details
              </Button>
              <Button>
                <LinkIcon className="mr-2 h-4 w-4" /> Map to Client
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-8">Alternative Solutions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.slice(1).map((solution) => (
          <Card key={solution.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{solution.name}</CardTitle>
                <Badge variant="outline">{solution.confidenceScore}%</Badge>
              </div>
              <CardDescription>{solution.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Confidence Score</span>
                  <Progress value={solution.confidenceScore} className="h-2 mt-1" />
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Key Features</span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {solution.keyFeatures.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-4 w-4 rounded-full bg-dxc-purple-light/30 text-dxc-purple-dark flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{solution.practice}</Badge>
                  {solution.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full">View Solution</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
