
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Save } from "lucide-react";

type DomainAssessmentProps = {
  client: string;
  industry: string;
};

type Domain = {
  id: string;
  name: string;
  description: string;
  progress: number;
  questions: Question[];
};

type Question = {
  id: string;
  text: string;
  hint?: string;
  rating: number | null;
  evidence?: string;
};

export function DomainAssessment({ client, industry }: DomainAssessmentProps) {
  // In a real app, this would be fetched from an API based on client and industry
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: "app-portfolio",
      name: "Application Portfolio",
      description: "Assessment of the client's application landscape, technical debt, and modernization readiness",
      progress: 75,
      questions: [
        {
          id: "app-1",
          text: "How would you rate the client's application portfolio in terms of business alignment?",
          hint: "Consider how well applications support current business objectives and processes",
          rating: 3,
          evidence: "Multiple legacy applications with limited business alignment. ERP system is 10+ years old."
        },
        {
          id: "app-2",
          text: "To what extent has the client documented their application architecture?",
          hint: "Look for documentation, diagrams, and dependency mapping",
          rating: 2,
          evidence: "Limited documentation exists, mostly outdated. No comprehensive view of all applications."
        },
        {
          id: "app-3",
          text: "How effectively is the client managing technical debt?",
          hint: "Consider planned retirements, modernization roadmaps, and remediation plans",
          rating: 1,
          evidence: "No formal technical debt tracking. Maintenance costs increasing year over year."
        }
      ]
    },
    {
      id: "cloud",
      name: "Cloud Adoption",
      description: "Evaluation of cloud strategy, migration progress, and cloud-native capabilities",
      progress: 30,
      questions: [
        {
          id: "cloud-1",
          text: "How mature is the client's cloud strategy and roadmap?",
          hint: "Consider completeness, executive alignment, and implementation progress",
          rating: 2,
          evidence: "Basic cloud strategy exists but lacks details on implementation approach."
        },
        {
          id: "cloud-2",
          text: "What percentage of workloads has the client migrated to cloud environments?",
          hint: "Consider IaaS, PaaS, and SaaS adoptions",
          rating: 1,
          evidence: "Less than 15% of workloads in cloud environments, mostly SaaS applications."
        },
        {
          id: "cloud-3", 
          text: "How would you rate the client's cloud operations and governance model?",
          hint: "Consider maturity of FinOps, security, and monitoring practices",
          rating: null,
          evidence: ""
        }
      ]
    },
    {
      id: "data",
      name: "Data and Analytics",
      description: "Assessment of data strategy, analytics capabilities, and data-driven decision making",
      progress: 50,
      questions: [
        {
          id: "data-1",
          text: "How mature is the client's data governance framework?",
          hint: "Consider data ownership, quality management, and regulatory compliance",
          rating: 3,
          evidence: "Recently implemented data governance framework with clear roles and responsibilities."
        },
        {
          id: "data-2",
          text: "To what extent does the client leverage advanced analytics and AI/ML?",
          hint: "Consider use cases, capabilities, and business outcomes",
          rating: 2,
          evidence: "Basic analytics for reporting. Limited predictive analytics capabilities."
        }
      ]
    },
    {
      id: "security",
      name: "Security and Compliance",
      description: "Evaluation of security posture, risk management, and regulatory compliance",
      progress: 60,
      questions: [
        {
          id: "security-1",
          text: "How comprehensive is the client's security program?",
          hint: "Consider policies, procedures, and security frameworks",
          rating: 3,
          evidence: "ISO 27001 certified with regular security assessments."
        }
      ]
    },
    {
      id: "devops",
      name: "DevOps and Delivery",
      description: "Assessment of software delivery capabilities, automation, and DevOps practices",
      progress: 20,
      questions: [
        {
          id: "devops-1",
          text: "How mature are the client's DevOps practices?",
          hint: "Consider CI/CD implementation, automation, and culture",
          rating: 1,
          evidence: "Limited automation. Manual deployments with multiple handoffs."
        }
      ]
    },
    {
      id: "workplace",
      name: "Digital Workplace",
      description: "Evaluation of workplace technology, collaboration tools, and employee experience",
      progress: 40,
      questions: [
        {
          id: "workplace-1",
          text: "How would you rate the client's digital workplace technologies?",
          hint: "Consider collaboration platforms, device management, and accessibility",
          rating: 2,
          evidence: "Office 365 implementation but limited adoption of collaborative features."
        }
      ]
    },
    {
      id: "operations",
      name: "IT Operations",
      description: "Assessment of operational efficiency, service management, and support capabilities",
      progress: 45,
      questions: [
        {
          id: "ops-1",
          text: "How mature is the client's IT service management?",
          hint: "Consider ITIL practices, incident management, and service level management",
          rating: 2,
          evidence: "ITSM tool in place but processes are not fully optimized."
        }
      ]
    }
  ]);

  const [activeDomain, setActiveDomain] = useState("app-portfolio");

  const handleRatingChange = (domainId: string, questionId: string, rating: number) => {
    setDomains(domains.map(domain => 
      domain.id === domainId 
        ? {
            ...domain,
            questions: domain.questions.map(question => 
              question.id === questionId 
                ? { ...question, rating } 
                : question
            )
          }
        : domain
    ));
  };

  const handleEvidenceChange = (domainId: string, questionId: string, evidence: string) => {
    setDomains(domains.map(domain => 
      domain.id === domainId 
        ? {
            ...domain,
            questions: domain.questions.map(question => 
              question.id === questionId 
                ? { ...question, evidence } 
                : question
            )
          }
        : domain
    ));
  };

  const activeDomainData = domains.find(d => d.id === activeDomain);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assessment Domains</CardTitle>
            <CardDescription>
              Evaluate each technology domain
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              {domains.map(domain => (
                <div 
                  key={domain.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeDomain === domain.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                  onClick={() => setActiveDomain(domain.id)}
                >
                  <div className="flex items-center">
                    {domain.progress === 100 
                      ? <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> 
                      : <Circle className={`h-4 w-4 mr-2 ${activeDomain === domain.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    }
                    <span className={activeDomain === domain.id ? 'font-medium' : ''}>{domain.name}</span>
                  </div>
                  <Progress value={domain.progress} className="w-16 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Assessment
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assessment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Overall completion</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Domains completed: 0/8</p>
                <p>Questions answered: 9/20</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-3">
        {activeDomainData && (
          <Card>
            <CardHeader>
              <CardTitle>{activeDomainData.name}</CardTitle>
              <CardDescription>{activeDomainData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeDomainData.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <span className="bg-muted text-muted-foreground w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 text-xs font-medium">
                        {index + 1}
                      </span>
                      <div className="space-y-1 flex-1">
                        <p className="font-medium">{question.text}</p>
                        {question.hint && (
                          <p className="text-sm text-muted-foreground">{question.hint}</p>
                        )}
                      </div>
                    </div>

                    <div className="pl-8">
                      <div className="pb-3">
                        <Label className="mb-2 block">Maturity Rating</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <Button
                              key={rating}
                              type="button"
                              variant={question.rating === rating ? "default" : "outline"}
                              size="sm"
                              className="w-10 h-10 rounded-full p-0"
                              onClick={() => handleRatingChange(activeDomainData.id, question.id, rating)}
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground px-1">
                          <span>Initial</span>
                          <span>Basic</span>
                          <span>Defined</span>
                          <span>Managed</span>
                          <span>Optimized</span>
                        </div>
                      </div>

                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1 h-7 px-2">
                            <ChevronRight className="h-4 w-4" />
                            Add supporting evidence
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2">
                          <Textarea
                            placeholder="Provide evidence, observations, or notes to support your rating..."
                            value={question.evidence || ""}
                            onChange={(e) => handleEvidenceChange(activeDomainData.id, question.id, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous: {domains[Math.max(0, domains.findIndex(d => d.id === activeDomain) - 1)].name}</Button>
              <Button>Next: {domains[Math.min(domains.length - 1, domains.findIndex(d => d.id === activeDomain) + 1)].name}</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
