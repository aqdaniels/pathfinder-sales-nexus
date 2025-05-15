
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ArrowUpRight, BarChart2, Calendar, Clock, DollarSign, FileText, MessageSquare, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type OpportunitySignal = {
  id: string;
  type: "challenge" | "budget" | "timeline" | "competitive" | "initiative";
  title: string;
  description: string;
  confidence: number;
  source: "meeting" | "email" | "sfdc";
  dateDetected: string;
  priority: "high" | "medium" | "low";
  context?: string;
  relatedSolutions?: string[];
  sourceDetails?: {
    title: string;
    date: string;
    snippet: string;
  };
};

// Sample data - in a real app would come from an API
const signalsData: OpportunitySignal[] = [
  {
    id: "op1",
    type: "challenge",
    title: "Legacy System Integration Challenges",
    description: "Client expressed frustration with integrating new cloud services with their existing legacy systems.",
    confidence: 92,
    source: "meeting",
    dateDetected: "Apr 15, 2025",
    priority: "high",
    context: "This came up multiple times during the technical discussion portion of the call.",
    relatedSolutions: ["API Management Services", "Legacy System Modernization", "Integration Strategy"],
    sourceDetails: {
      title: "Technical Planning Session",
      date: "Apr 15, 2025",
      snippet: "Sarah: Our biggest headache is connecting these new cloud services to our mainframe systems. We've tried three different approaches and nothing seems to work smoothly."
    }
  },
  {
    id: "op2",
    type: "budget",
    title: "Q3 Budget Approval for Digital Transformation",
    description: "CIO mentioned a newly approved budget for digital transformation initiatives starting in Q3.",
    confidence: 85,
    source: "meeting",
    dateDetected: "Apr 12, 2025",
    priority: "high",
    relatedSolutions: ["Digital Transformation Strategy", "Cloud Migration"],
    sourceDetails: {
      title: "Executive Briefing",
      date: "Apr 12, 2025",
      snippet: "John: We just got approval for the Q3 digital transformation budget. It's about 30% larger than we initially requested, so we can accelerate some of our plans."
    }
  },
  {
    id: "op3",
    type: "timeline",
    title: "Data Center Migration Timeline",
    description: "IT Director indicated they need to complete data center migration within 6 months.",
    confidence: 78,
    source: "email",
    dateDetected: "Apr 10, 2025",
    priority: "medium",
    relatedSolutions: ["Data Center Migration Services", "Cloud Strategy"],
    sourceDetails: {
      title: "Data Center Planning Email",
      date: "Apr 10, 2025",
      snippet: "Given the lease expiration at our current facility, we need to have the data center migration completed no later than October this year."
    }
  },
  {
    id: "op4",
    type: "competitive",
    title: "Dissatisfaction with Current Vendor",
    description: "Multiple stakeholders expressed frustration with their current managed services provider's response times.",
    confidence: 88,
    source: "meeting",
    dateDetected: "Apr 08, 2025",
    priority: "high",
    context: "Sentiment analysis indicates significant negative emotion when discussing current vendor.",
    relatedSolutions: ["Managed Services", "Service Desk Solutions"],
    sourceDetails: {
      title: "Operations Review",
      date: "Apr 08, 2025",
      snippet: "Michael: We're constantly waiting days for responses from [competitor]. The service levels have deteriorated significantly over the past quarter."
    }
  },
  {
    id: "op5",
    type: "initiative",
    title: "AI Implementation in Customer Service",
    description: "New strategic initiative to implement AI-powered customer service tools by end of year.",
    confidence: 75,
    source: "sfdc",
    dateDetected: "Apr 05, 2025",
    priority: "medium",
    relatedSolutions: ["AI Solutions", "Customer Experience Transformation"],
    sourceDetails: {
      title: "SFDC Notes - Strategic Planning",
      date: "Apr 05, 2025",
      snippet: "Customer is investigating AI-powered service solutions to improve first-call resolution rates and reduce support costs."
    }
  },
];

type SignalTypeInfo = {
  icon: React.ElementType;
  color: string;
  label: string;
};

const signalTypeMap: Record<OpportunitySignal['type'], SignalTypeInfo> = {
  challenge: { icon: AlertCircle, color: "text-orange-500", label: "Client Challenge" },
  budget: { icon: DollarSign, color: "text-green-500", label: "Budget Discussion" },
  timeline: { icon: Calendar, color: "text-blue-500", label: "Timeline" },
  competitive: { icon: BarChart2, color: "text-purple-500", label: "Competitive Intel" },
  initiative: { icon: Zap, color: "text-amber-500", label: "Strategic Initiative" },
};

interface OpportunitySignalsProps {
  limit?: number;
}

export function OpportunitySignals({ limit }: OpportunitySignalsProps) {
  const [selectedSignal, setSelectedSignal] = useState<OpportunitySignal | null>(null);

  // Display all or limited signals based on prop
  const displaySignals = limit ? signalsData.slice(0, limit) : signalsData;

  const getConfidenceLevelText = (confidence: number) => {
    if (confidence >= 90) return "Very High";
    if (confidence >= 75) return "High";
    if (confidence >= 60) return "Medium";
    return "Low";
  };

  return (
    <div className="space-y-4">
      {displaySignals.map((signal) => {
        const typeInfo = signalTypeMap[signal.type];
        return (
          <div key={signal.id} className="rounded-lg border p-4 transition-all hover:bg-muted/50">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${signal.priority === 'high' ? 'bg-red-100' : signal.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{signal.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{signal.description}</p>
                </div>
              </div>
              <Badge variant={signal.priority === 'high' ? 'destructive' : signal.priority === 'medium' ? 'default' : 'secondary'}>
                {signal.priority === 'high' ? 'High' : signal.priority === 'medium' ? 'Medium' : 'Low'} Priority
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {signal.dateDetected}
                </span>
                <span className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  {signal.source === 'meeting' ? 'Meeting' : signal.source === 'email' ? 'Email' : 'SFDC'}
                </span>
                <span className="flex items-center">
                  {getConfidenceLevelText(signal.confidence)} confidence ({signal.confidence}%)
                </span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => setSelectedSignal(signal)}
                  >
                    View Details
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  {selectedSignal && (
                    <>
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          {typeInfo.icon && (
                            <div className={`rounded-full p-2 ${selectedSignal.priority === 'high' ? 'bg-red-100' : selectedSignal.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                              <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                            </div>
                          )}
                          <DialogTitle>{selectedSignal.title}</DialogTitle>
                        </div>
                        <DialogDescription>
                          Detected on {selectedSignal.dateDetected} from {selectedSignal.source === 'meeting' ? 'a meeting' : selectedSignal.source === 'email' ? 'an email' : 'SFDC data'}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground">{selectedSignal.description}</p>
                          {selectedSignal.context && (
                            <p className="text-sm text-muted-foreground mt-2">{selectedSignal.context}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Confidence Assessment</h4>
                          <div className="flex items-center gap-3">
                            <Progress value={selectedSignal.confidence} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{selectedSignal.confidence}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {getConfidenceLevelText(selectedSignal.confidence)} confidence based on context, frequency, and sentiment analysis
                          </p>
                        </div>

                        <Separator />

                        {selectedSignal.sourceDetails && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Source Evidence
                            </h4>
                            <div className="bg-muted p-3 rounded-md">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{selectedSignal.sourceDetails.title}</span>
                                <span className="text-muted-foreground">{selectedSignal.sourceDetails.date}</span>
                              </div>
                              <p className="text-sm italic">"{selectedSignal.sourceDetails.snippet}"</p>
                            </div>
                          </div>
                        )}

                        {selectedSignal.relatedSolutions && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Related Solutions</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedSignal.relatedSolutions.map((solution, i) => (
                                <Badge key={i} variant="outline">{solution}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
}
