
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle,
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Link, 
  MessageSquare, 
  Users 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

type NextAction = {
  id: string;
  title: string;
  description: string;
  type: "meeting" | "content" | "outreach" | "solution" | "proposal";
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  relatedTo?: {
    type: "opportunity" | "stakeholder";
    id: string;
    name: string;
  };
  talkingPoints?: string[];
  evidence?: {
    source: string;
    date: string;
    snippet: string;
  };
  relatedResources?: {
    type: "case-study" | "solution" | "whitepaper";
    title: string;
    url: string;
  }[];
};

// Sample data - in a real app would come from an API
const nextActionsData: NextAction[] = [
  {
    id: "act1",
    title: "Schedule technical workshop on legacy integration",
    description: "Follow up on the client's expressed challenges with legacy system integration by scheduling a technical workshop with their IT team.",
    type: "meeting",
    priority: "high",
    dueDate: "Apr 20, 2025",
    completed: false,
    relatedTo: {
      type: "opportunity",
      id: "op1",
      name: "Legacy System Integration Challenges"
    },
    talkingPoints: [
      "Discuss specific integration pain points with mainframe systems",
      "Explore API management approach vs direct integration",
      "Demonstrate successful case studies in similar environments",
      "Identify key technical stakeholders for the workshop"
    ],
    evidence: {
      source: "Technical Planning Meeting",
      date: "Apr 15, 2025",
      snippet: "Sarah: Our biggest headache is connecting these new cloud services to our mainframe systems. We've tried three different approaches and nothing seems to work smoothly."
    },
    relatedResources: [
      {
        type: "case-study",
        title: "Manufacturing Legacy Integration Success Story",
        url: "#case-study-123"
      },
      {
        type: "solution",
        title: "API Management for Legacy Systems",
        url: "#solution-api"
      }
    ]
  },
  {
    id: "act2",
    title: "Share AI customer service implementation case study",
    description: "Provide examples of successful AI implementation in customer service within the manufacturing sector.",
    type: "content",
    priority: "medium",
    dueDate: "Apr 22, 2025",
    completed: false,
    relatedTo: {
      type: "opportunity",
      id: "op5",
      name: "AI Implementation in Customer Service"
    },
    talkingPoints: [
      "Highlight 30% reduction in response times at similar organizations",
      "Address concerns about implementation complexity",
      "Discuss staged implementation approach",
      "Emphasize ROI metrics and measurement approach"
    ],
    relatedResources: [
      {
        type: "case-study",
        title: "AI Transformation in Manufacturing Support",
        url: "#case-study-456"
      },
      {
        type: "whitepaper",
        title: "ROI of AI in Customer Service",
        url: "#whitepaper-789"
      }
    ]
  },
  {
    id: "act3",
    title: "Establish contact with CFO Lisa Williams",
    description: "Reach out to CFO to address the relationship gap and discuss financial aspects of the digital transformation initiative.",
    type: "outreach",
    priority: "high",
    dueDate: "Apr 25, 2025",
    completed: false,
    relatedTo: {
      type: "stakeholder",
      id: "stk4",
      name: "Lisa Williams (CFO)"
    },
    talkingPoints: [
      "Introduction and brief background on DXC's work with Acme",
      "Share TCO comparison for cloud migration vs. maintaining current systems",
      "Discuss financial metrics for measuring digital transformation success",
      "Offer to coordinate with their financial team on ROI analysis"
    ],
    relatedResources: [
      {
        type: "solution",
        title: "TCO Calculator for Cloud Migration",
        url: "#solution-tco"
      }
    ]
  },
  {
    id: "act4",
    title: "Prepare data center migration proposal",
    description: "Develop a detailed migration proposal addressing timeline constraints identified in recent client communications.",
    type: "proposal",
    priority: "high",
    dueDate: "Apr 28, 2025",
    completed: false,
    relatedTo: {
      type: "opportunity",
      id: "op3",
      name: "Data Center Migration Timeline"
    },
    talkingPoints: [
      "6-month accelerated migration plan with key milestones",
      "Risk mitigation approach for critical systems",
      "Resource requirements and client participation expectations",
      "Post-migration support structure"
    ],
    evidence: {
      source: "Email from IT Director",
      date: "Apr 10, 2025",
      snippet: "Given the lease expiration at our current facility, we need to have the data center migration completed no later than October this year."
    }
  },
  {
    id: "act5",
    title: "Address Michael Chen's declining engagement",
    description: "Schedule a one-on-one discussion with the IT Director to address concerns and rebuild relationship.",
    type: "outreach",
    priority: "medium",
    dueDate: "Apr 21, 2025",
    completed: false,
    relatedTo: {
      type: "stakeholder",
      id: "stk3",
      name: "Michael Chen (IT Director)"
    },
    talkingPoints: [
      "Discuss concerns about technical support responsiveness",
      "Present enhanced support model for the project",
      "Address any unstated concerns about team roles post-migration",
      "Review technical documentation that was requested"
    ],
    evidence: {
      source: "Operations Review Meeting",
      date: "Apr 08, 2025",
      snippet: "Michael: We're concerned about the level of technical support we'd receive during the transition. Our team is already stretched thin."
    }
  }
];

type ActionTypeInfo = {
  icon: React.ElementType;
  color: string;
  label: string;
};

const actionTypeMap: Record<NextAction['type'], ActionTypeInfo> = {
  meeting: { icon: Calendar, color: "text-blue-500", label: "Schedule Meeting" },
  content: { icon: FileText, color: "text-purple-500", label: "Share Content" },
  outreach: { icon: Users, color: "text-green-500", label: "Stakeholder Outreach" },
  solution: { icon: Link, color: "text-orange-500", label: "Present Solution" },
  proposal: { icon: FileText, color: "text-amber-500", label: "Develop Proposal" },
};

interface NextBestActionsProps {
  limit?: number;
}

export function NextBestActions({ limit }: NextBestActionsProps) {
  const [selectedAction, setSelectedAction] = useState<NextAction | null>(null);
  const [actions, setActions] = useState(nextActionsData);
  
  // Display all or limited actions based on prop
  const displayActions = limit ? actions.slice(0, limit) : actions;

  const toggleActionComplete = (id: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  return (
    <div className="space-y-4">
      {displayActions.map((action) => {
        const typeInfo = actionTypeMap[action.type];
        return (
          <div key={action.id} className={`rounded-lg border p-4 transition-all hover:bg-muted/50 ${action.completed ? 'bg-muted/50' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id={`action-${action.id}`} 
                  checked={action.completed}
                  onCheckedChange={() => toggleActionComplete(action.id)}
                  className="mt-1"
                />
                <div>
                  <label 
                    htmlFor={`action-${action.id}`} 
                    className={`font-medium text-sm ${action.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {action.title}
                  </label>
                  <p className={`text-xs mt-1 ${action.completed ? 'text-muted-foreground/70 line-through' : 'text-muted-foreground'}`}>
                    {action.description}
                  </p>
                </div>
              </div>
              <Badge variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}>
                {action.priority === 'high' ? 'High' : action.priority === 'medium' ? 'Medium' : 'Low'} Priority
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-3 ml-10 pt-2 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Due: {action.dueDate}
                </span>
                {action.relatedTo && (
                  <span className="flex items-center">
                    {action.relatedTo.type === 'opportunity' ? (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Users className="h-3 w-3 mr-1" />
                    )}
                    {action.relatedTo.name}
                  </span>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 gap-1 text-xs"
                    onClick={() => setSelectedAction(action)}
                  >
                    View Details
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  {selectedAction && (
                    <>
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          {typeInfo.icon && (
                            <div className={`rounded-full p-2 ${selectedAction.priority === 'high' ? 'bg-red-100' : selectedAction.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                              <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                            </div>
                          )}
                          <DialogTitle className="flex items-center gap-2">
                            {selectedAction.title}
                            {selectedAction.completed && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 ml-2">
                                Completed
                              </Badge>
                            )}
                          </DialogTitle>
                        </div>
                        <DialogDescription>
                          Due by {selectedAction.dueDate} · {typeInfo.label}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground">{selectedAction.description}</p>
                        </div>
                        
                        {selectedAction.talkingPoints && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-dxc-purple" />
                              Recommended Talking Points
                            </h4>
                            <ul className="space-y-2">
                              {selectedAction.talkingPoints.map((point, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                                    {i + 1}
                                  </span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedAction.evidence && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Supporting Evidence</h4>
                              <div className="bg-muted p-3 rounded-md">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium">{selectedAction.evidence.source}</span>
                                  <span className="text-muted-foreground">{selectedAction.evidence.date}</span>
                                </div>
                                <p className="text-sm italic">"{selectedAction.evidence.snippet}"</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {selectedAction.relatedResources && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Related Resources</h4>
                              <Accordion type="single" collapsible className="w-full">
                                {selectedAction.relatedResources.map((resource, i) => (
                                  <AccordionItem key={i} value={`resource-${i}`} className="border-b-0">
                                    <AccordionTrigger className="py-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="font-normal">
                                          {resource.type === 'case-study' ? 'Case Study' : 
                                           resource.type === 'solution' ? 'Solution' : 
                                           'Whitepaper'}
                                        </Badge>
                                        {resource.title}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0 pb-2">
                                      <div className="bg-muted p-3 rounded-md text-sm">
                                        {resource.type === 'case-study' && (
                                          <p>
                                            Detailed study showing implementation approach, challenges overcome, and measurable results achieved with similar clients.
                                          </p>
                                        )}
                                        {resource.type === 'solution' && (
                                          <p>
                                            Technical overview of the solution including architecture, integration points, and implementation requirements.
                                          </p>
                                        )}
                                        {resource.type === 'whitepaper' && (
                                          <p>
                                            Industry analysis and best practices for implementation, with ROI models and performance metrics.
                                          </p>
                                        )}
                                        <Button size="sm" variant="outline" className="mt-2 gap-1">
                                          <Link className="h-3 w-3" />
                                          View Resource
                                        </Button>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <DialogFooter>
                        <div className="flex items-center gap-2 w-full justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => toggleActionComplete(selectedAction.id)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            {selectedAction.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                          </Button>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Assign</Button>
                            <Button size="sm">Take Action</Button>
                          </div>
                        </div>
                      </DialogFooter>
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
