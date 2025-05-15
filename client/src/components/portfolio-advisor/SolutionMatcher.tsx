
import { Button } from "@/components/ui/button";
import { BarChart, CheckCircle2, InfoIcon, Layers, LinkIcon, Zap } from "lucide-react";
import { ClientInsightPanel } from "./ClientInsightPanel";
import { SolutionCardWithEvidence } from "./SolutionCardWithEvidence";
import { useState } from "react";
import { Solution, matchSolutionToInsights, SolutionWithEvidence, ClientInsight } from "@/utils/ChallengeMatchingEngine";
import { Badge } from "../ui/badge";

// Sample meeting data - would be connected to the actual meeting intelligence in a real implementation
const clientInsights: ClientInsight = {
  clientName: "Acme Corp",
  lastMeeting: "Apr 15, 2025",
  sentiment: 78,
  keyTopics: [
    { name: "Backend Modernization", mentions: 8, sentiment: 82 },
    { name: "Data Architecture", mentions: 6, sentiment: 75 },
    { name: "Cost Reduction", mentions: 5, sentiment: 88 },
    { name: "Implementation Timeline", mentions: 4, sentiment: 65 },
  ],
  challenges: [
    { name: "Legacy System Integration", confidence: 89 },
    { name: "Data Migration Complexity", confidence: 76 },
    { name: "Staff Training Requirements", confidence: 82 },
  ],
  summary: "Client expressed strong interest in modernizing their backend systems with concerns about implementation timelines. Cost reduction is a primary driver for their digital transformation initiatives."
};

// Sample solutions data
const solutionsData: Solution[] = [
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
  // Process solutions against client insights
  const [filteredBy, setFilteredBy] = useState<string | null>(null);
  
  // Match solutions to client insights
  const rankedSolutions: SolutionWithEvidence[] = solutionsData
    .map(solution => matchSolutionToInsights(solution, clientInsights))
    .sort((a, b) => b.overallScore - a.overallScore);
  
  // Filter solutions based on selected challenge, if any
  const displayedSolutions = filteredBy 
    ? rankedSolutions.filter(sol => 
        sol.matchEvidence.some(evidence => evidence.challengeName === filteredBy)
      )
    : rankedSolutions;
    
  const topSolution = displayedSolutions[0];
  const alternativeSolutions = displayedSolutions.slice(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Portfolio Solution Matching</h2>
        <p className="text-muted-foreground">
          AI-recommended solutions based on client challenges and needs
        </p>
      </div>

      {/* Client Intelligence Panel */}
      <ClientInsightPanel />
      
      {/* Challenge Filter */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <span className="text-sm font-medium mr-2">Filter by challenge:</span>
        <Badge 
          variant={filteredBy === null ? "secondary" : "outline"}
          className="cursor-pointer"
          onClick={() => setFilteredBy(null)}
        >
          All Challenges
        </Badge>
        {clientInsights.challenges.map(challenge => (
          <Badge 
            key={challenge.name}
            variant={filteredBy === challenge.name ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilteredBy(challenge.name)}
          >
            {challenge.name}
          </Badge>
        ))}
      </div>

      {/* Top Solution */}
      {topSolution && (
        <SolutionCardWithEvidence solution={topSolution} isTopRecommendation={true} />
      )}

      {/* Alternative Solutions */}
      {alternativeSolutions.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-8">Alternative Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alternativeSolutions.map((solution) => (
              <SolutionCardWithEvidence key={solution.id} solution={solution} />
            ))}
          </div>
        </>
      )}
      
      {/* Feedback & Actions */}
      <div className="flex justify-between items-center pt-6 mt-6 border-t">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-dxc-purple" />
          <span className="text-sm font-medium">AI-powered matching based on client conversations</span>
        </div>
        <Button>
          Save Recommendations
        </Button>
      </div>
    </div>
  );
}
