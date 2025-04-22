
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  FileDown, 
  Users, 
  PlusCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Flag,
  Bookmark,
  Share,
  Save,
  Send,
  Scale
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Sample data for hypothesis testing
const hypotheses = [
  {
    id: 1,
    statement: "The solution will reduce claims processing time by at least 40%",
    category: "Performance",
    owner: "Sarah Johnson",
    status: "validated",
    evidence: [
      { id: 1, type: "benchmark", description: "Similar implementation achieved 45% reduction at Client X" },
      { id: 2, type: "test", description: "Pilot testing showed 42% average reduction across sample cases" }
    ],
    feedback: [
      { id: 1, user: "David Lee", comment: "Confirmed by our lab testing results", timestamp: "2 days ago" },
      { id: 2, user: "Amanda Chen", comment: "Need to factor in learning curve for full rollout", timestamp: "1 day ago" }
    ]
  },
  {
    id: 2,
    statement: "The solution will achieve 80% user adoption within 3 months of deployment",
    category: "Adoption",
    owner: "Michael Brown",
    status: "partially-validated",
    evidence: [
      { id: 3, type: "survey", description: "User surveys indicate 70% willingness to adopt" },
      { id: 4, type: "interview", description: "Department heads confirm support but request additional training" }
    ],
    feedback: [
      { id: 3, user: "Tina Rodriguez", comment: "Previous rollouts took 4-5 months to reach this level", timestamp: "3 days ago" }
    ]
  },
  {
    id: 3,
    statement: "The solution will integrate with existing legacy systems without significant modification",
    category: "Technical",
    owner: "Robert Chen",
    status: "refuted",
    evidence: [
      { id: 5, type: "assessment", description: "Technical assessment identified 3 major integration challenges" },
      { id: 6, type: "prototype", description: "Prototype testing revealed compatibility issues with database structure" }
    ],
    feedback: [
      { id: 4, user: "James Wilson", comment: "We need to allocate more resources for middleware development", timestamp: "1 day ago" },
      { id: 5, user: "Linda Park", comment: "Let's explore API-based integration as an alternative", timestamp: "12 hours ago" }
    ]
  }
];

// Sample assumptions for testing
const assumptions = [
  {
    id: 1,
    statement: "Client has sufficient IT resources to support implementation",
    category: "Resource",
    criticality: "high",
    status: "verified",
    verification: "Confirmed availability of 3 developers and 1 project manager for 6 months"
  },
  {
    id: 2,
    statement: "Regulatory requirements will remain stable during implementation",
    category: "External",
    criticality: "medium",
    status: "uncertain",
    verification: "Pending confirmation from regulatory affairs team"
  },
  {
    id: 3,
    statement: "Current data quality is sufficient for the new system",
    category: "Data",
    criticality: "high",
    status: "false",
    verification: "Data quality audit revealed 15% of records have missing or incorrect information"
  },
  {
    id: 4,
    statement: "End users have basic digital literacy skills",
    category: "People",
    criticality: "medium",
    status: "verified",
    verification: "Skills assessment confirmed adequate baseline capabilities"
  },
  {
    id: 5,
    statement: "Executive sponsorship will remain consistent throughout the project",
    category: "Governance",
    criticality: "high",
    status: "verified",
    verification: "Executive sponsor has formalized commitment through project charter"
  }
];

// Sample scenarios for planning
const scenarios = [
  {
    id: 1,
    name: "Base Case",
    description: "Expected implementation timeline with anticipated adoption curve",
    probability: "60%",
    implications: [
      "Achieve ROI targets as projected",
      "Full functionality delivered in 9 months",
      "Standard change management approach"
    ],
    responses: [
      "Execute as planned",
      "Regular progress monitoring",
      "Standard governance process"
    ]
  },
  {
    id: 2,
    name: "Accelerated Adoption",
    description: "Faster than expected user adoption and quicker value realization",
    probability: "20%",
    implications: [
      "ROI achieved 2-3 months earlier than projected",
      "Increased demand for support services in early phases",
      "Opportunity to expand solution scope"
    ],
    responses: [
      "Prepare for scaling support resources",
      "Develop phase 2 enhancements earlier",
      "Accelerate related digital initiatives"
    ]
  },
  {
    id: 3,
    name: "Technical Challenges",
    description: "Significant integration issues delay implementation",
    probability: "15%",
    implications: [
      "3-4 month delay in full deployment",
      "30% increase in implementation costs",
      "Phased rollout instead of full cutover"
    ],
    responses: [
      "Allocate contingency budget",
      "Prepare modular implementation approach",
      "Strengthen technical team with integration specialists"
    ]
  },
  {
    id: 4,
    name: "Organizational Resistance",
    description: "Higher than expected resistance to process changes",
    probability: "25%",
    implications: [
      "Lower adoption rates in first 6 months",
      "Delayed benefit realization",
      "Potential scope reduction"
    ],
    responses: [
      "Enhanced change management program",
      "Increased executive sponsorship visibility",
      "More extensive training and support"
    ]
  },
  {
    id: 5,
    name: "Competitive Response",
    description: "Competitors launch similar capabilities during implementation",
    probability: "10%",
    implications: [
      "Reduced competitive advantage",
      "Pressure to accelerate timeline",
      "Potential need to enhance feature set"
    ],
    responses: [
      "Monitor competitive landscape closely",
      "Prepare acceleration options with additional resources",
      "Develop enhanced differentiation strategy"
    ]
  }
];

// Sample competitive analysis
const competitiveResponses = [
  {
    id: 1,
    competitor: "Acme Solutions",
    likelihood: "High",
    response: "Price reduction for comparable services",
    impact: "Medium",
    counterStrategy: "Emphasize total value of ownership and unique capabilities"
  },
  {
    id: 2,
    competitor: "TechGlobal",
    likelihood: "Medium",
    response: "Accelerate their own digital offering roadmap",
    impact: "High",
    counterStrategy: "Secure early reference clients and publicize success metrics"
  },
  {
    id: 3,
    competitor: "Innovate Inc",
    likelihood: "Low",
    response: "Form strategic partnership with complementary provider",
    impact: "Medium",
    counterStrategy: "Strengthen our own partner ecosystem and integration capabilities"
  },
  {
    id: 4,
    competitor: "LegacySys",
    likelihood: "High",
    response: "FUD campaign highlighting risks of new approach",
    impact: "Medium",
    counterStrategy: "Develop risk mitigation messaging and showcases"
  }
];

// Sample risk register
const riskRegister = [
  {
    id: 1,
    risk: "Data migration issues delay implementation",
    category: "Technical",
    probability: "Medium",
    impact: "High",
    mitigation: "Conduct detailed data assessment and prepare cleansing procedures",
    owner: "Robert Chen",
    status: "Mitigating"
  },
  {
    id: 2,
    risk: "Key stakeholder departure affects sponsorship",
    category: "Organizational",
    probability: "Low",
    impact: "High",
    mitigation: "Establish broad sponsorship coalition and document commitments",
    owner: "Lisa Johnson",
    status: "Mitigated"
  },
  {
    id: 3,
    risk: "Scope creep extends timeline and budget",
    category: "Project",
    probability: "High",
    impact: "Medium",
    mitigation: "Implement formal change control process with executive approval",
    owner: "Michael Brown",
    status: "Monitoring"
  },
  {
    id: 4,
    risk: "Performance does not meet SLA requirements",
    category: "Technical",
    probability: "Medium",
    impact: "High",
    mitigation: "Implement comprehensive performance testing and tuning",
    owner: "Sarah Kim",
    status: "Mitigating"
  },
  {
    id: 5,
    risk: "Budget constraints limit necessary resources",
    category: "Financial",
    probability: "Medium",
    impact: "High",
    mitigation: "Secure funding commitment and develop phased approach options",
    owner: "David Morgan",
    status: "Mitigated"
  }
];

export function StrategyTestingTools() {
  const [activeTab, setActiveTab] = useState("hypothesis-testing");
  const [selectedHypothesis, setSelectedHypothesis] = useState(null);
  const [comment, setComment] = useState("");
  
  const handleSelectHypothesis = (hypothesis) => {
    setSelectedHypothesis(hypothesis);
  };
  
  const handleAddComment = () => {
    if (!comment.trim() || !selectedHypothesis) return;
    
    // In a real app, this would add the comment to the hypothesis
    setComment("");
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="hypothesis-testing">Hypothesis Testing</TabsTrigger>
          <TabsTrigger value="assumption-validation">Assumption Validation</TabsTrigger>
          <TabsTrigger value="scenario-planning">Scenario Planning</TabsTrigger>
          <TabsTrigger value="competitive-response">Competitive Response</TabsTrigger>
          <TabsTrigger value="risk-mitigation">Risk Mitigation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hypothesis-testing" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Hypothesis list */}
            <Card className="col-span-5">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Solution Hypotheses</CardTitle>
                    <CardDescription>
                      Track and validate key solution assumptions
                    </CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Hypothesis
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {hypotheses.map((hypothesis) => (
                    <div 
                      key={hypothesis.id}
                      className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedHypothesis?.id === hypothesis.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectHypothesis(hypothesis)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{hypothesis.statement}</div>
                        <Badge
                          className={
                            hypothesis.status === 'validated' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : hypothesis.status === 'partially-validated'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-red-100 text-red-700 hover:bg-red-100'
                          }
                        >
                          {hypothesis.status === 'validated' 
                            ? 'Validated' 
                            : hypothesis.status === 'partially-validated'
                              ? 'Partially Validated'
                              : 'Refuted'
                          }
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{hypothesis.category}</span>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarFallback className="text-xs">
                              {hypothesis.owner.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{hypothesis.owner}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {hypothesis.evidence.length} pieces of evidence
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {hypothesis.feedback.length} comments
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Hypothesis details */}
            <Card className="col-span-7">
              {selectedHypothesis ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Hypothesis Details</CardTitle>
                        <CardDescription>
                          Evidence and validation status
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          selectedHypothesis.status === 'validated' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                            : selectedHypothesis.status === 'partially-validated'
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {selectedHypothesis.status === 'validated' 
                          ? 'Validated' 
                          : selectedHypothesis.status === 'partially-validated'
                            ? 'Partially Validated'
                            : 'Refuted'
                        }
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-lg font-medium mb-1">{selectedHypothesis.statement}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Badge variant="outline" className="mr-2">{selectedHypothesis.category}</Badge>
                        <span>Owner: {selectedHypothesis.owner}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Supporting Evidence</h3>
                      <div className="space-y-3">
                        {selectedHypothesis.evidence.map((evidence) => (
                          <div key={evidence.id} className="p-3 border rounded-md">
                            <div className="flex items-center mb-1">
                              <Badge variant="outline" className="mr-2 capitalize">
                                {evidence.type}
                              </Badge>
                              <div className="text-sm font-medium">{evidence.description}</div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Evidence
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Discussion ({selectedHypothesis.feedback.length})</h3>
                      <div className="space-y-4 mb-4">
                        {selectedHypothesis.feedback.map((feedback) => (
                          <div key={feedback.id} className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {feedback.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{feedback.user}</div>
                                <div className="text-xs text-gray-500">{feedback.timestamp}</div>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{feedback.comment}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">Agree</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">Reply</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>
                            YOU
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea 
                            placeholder="Add your feedback or evidence..."
                            className="mb-2"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Paperclip className="h-4 w-4 mr-1" />
                                <span className="text-xs">Attach</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Flag className="h-4 w-4 mr-1" />
                                <span className="text-xs">Flag</span>
                              </Button>
                            </div>
                            <Button size="sm" onClick={handleAddComment}>
                              <Send className="h-4 w-4 mr-1" />
                              <span>Send</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="h-[600px] flex items-center justify-center flex-col p-6 text-center text-gray-500">
                  <FileText className="h-16 w-16 opacity-20 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Select a Hypothesis</h3>
                  <p>Click on a hypothesis from the list to view and validate it</p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="assumption-validation" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Assumptions testing framework */}
            <Card className="col-span-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Assumption Validation Framework</CardTitle>
                    <CardDescription>
                      Test critical assumptions underlying the solution strategy
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Assumption
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      All Assumptions
                    </Badge>
                    <Badge variant="outline">
                      Resource
                    </Badge>
                    <Badge variant="outline">
                      External
                    </Badge>
                    <Badge variant="outline">
                      Data
                    </Badge>
                    <Badge variant="outline">
                      People
                    </Badge>
                    <Badge variant="outline">
                      Governance
                    </Badge>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[400px]">Assumption Statement</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Criticality</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verification Method</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assumptions.map((assumption) => (
                        <TableRow key={assumption.id}>
                          <TableCell>
                            <div className="font-medium">{assumption.statement}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{assumption.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                assumption.criticality === 'high' 
                                  ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                                  : assumption.criticality === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                    : 'bg-green-100 text-green-700 hover:bg-green-100'
                              }
                            >
                              {assumption.criticality.charAt(0).toUpperCase() + assumption.criticality.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {assumption.status === 'verified' ? (
                                <div className="flex items-center text-green-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span>Verified</span>
                                </div>
                              ) : assumption.status === 'uncertain' ? (
                                <div className="flex items-center text-yellow-600">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  <span>Uncertain</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-red-600">
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  <span>False</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{assumption.verification}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Test
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Testing Techniques</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Data Analysis</div>
                          <p className="text-sm text-gray-600">
                            Analyze historical data to validate patterns or trends
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Expert Interviews</div>
                          <p className="text-sm text-gray-600">
                            Consult domain experts for insights and experience
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Prototype Testing</div>
                          <p className="text-sm text-gray-600">
                            Build minimal prototypes to test technical assumptions
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Market Research</div>
                          <p className="text-sm text-gray-600">
                            Gather market data to validate external assumptions
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">User Testing</div>
                          <p className="text-sm text-gray-600">
                            Test with potential users to validate user assumptions
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Scenario Analysis</div>
                          <p className="text-sm text-gray-600">
                            Evaluate impact under different assumption scenarios
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="scenario-planning" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Scenario Overview */}
            <Card className="col-span-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Scenario Planning</CardTitle>
                    <CardDescription>
                      Anticipate and prepare for potential future scenarios
                    </CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Scenario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {scenarios.slice(0, 5).map((scenario, index) => (
                      <Card 
                        key={scenario.id}
                        className={
                          index === 0 
                            ? "border-blue-300 border-2" 
                            : ""
                        }
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{scenario.name}</CardTitle>
                            {index === 0 && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Base Case
                              </Badge>
                            )}
                          </div>
                          <CardDescription>
                            Probability: {scenario.probability}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                          
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-500">KEY IMPLICATIONS</div>
                            <ul className="text-sm space-y-1">
                              {scenario.implications.map((implication, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{implication}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-500">RESPONSE STRATEGY</div>
                            <ul className="text-sm space-y-1">
                              {scenario.responses.map((response, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{response}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex items-center text-blue-700 font-medium mb-2">
                      <Users className="h-5 w-5 mr-2" />
                      Scenario Workshop
                    </div>
                    <p className="text-sm text-blue-600 mb-3">
                      Facilitate a collaborative workshop with stakeholders to explore scenarios and develop response strategies.
                    </p>
                    <div className="flex gap-3">
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Schedule Workshop
                      </Button>
                      <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Templates
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Driving Factors</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Implementation Complexity</div>
                            <div className="text-sm text-gray-500">Impact: High</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full bg-red-500" style={{ width: '75%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">User Adoption Rate</div>
                            <div className="text-sm text-gray-500">Impact: High</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full bg-red-500" style={{ width: '70%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Budget Constraints</div>
                            <div className="text-sm text-gray-500">Impact: Medium</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full bg-yellow-500" style={{ width: '50%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Competitive Pressure</div>
                            <div className="text-sm text-gray-500">Impact: Medium</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full bg-yellow-500" style={{ width: '45%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Regulatory Changes</div>
                            <div className="text-sm text-gray-500">Impact: Low</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full bg-green-500" style={{ width: '25%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Early Warning Indicators</h3>
                      <div className="space-y-3">
                        <div className="flex items-start p-3 border rounded-md">
                          <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium text-sm">User Feedback Surveys</div>
                            <p className="text-sm text-gray-600">Monitor satisfaction and adoption intent through regular surveys</p>
                          </div>
                        </div>
                        <div className="flex items-start p-3 border rounded-md">
                          <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium text-sm">Technical Performance Metrics</div>
                            <p className="text-sm text-gray-600">Track response times, error rates, and availability statistics</p>
                          </div>
                        </div>
                        <div className="flex items-start p-3 border rounded-md">
                          <Square className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium text-sm">Implementation Milestone Tracking</div>
                            <p className="text-sm text-gray-600">Monitor adherence to implementation schedule and identify delays</p>
                          </div>
                        </div>
                        <div className="flex items-start p-3 border rounded-md">
                          <Square className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium text-sm">Competitive Intelligence Reports</div>
                            <p className="text-sm text-gray-600">Regular updates on competitor activities and market changes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="competitive-response" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Competitive Response Analysis */}
            <Card className="col-span-8">
              <CardHeader>
                <CardTitle>Competitive Response Analysis</CardTitle>
                <CardDescription>
                  Anticipate competitor reactions to your strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Competitor</TableHead>
                      <TableHead>Likely Response</TableHead>
                      <TableHead>Likelihood</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Counter Strategy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitiveResponses.map((response) => (
                      <TableRow key={response.id}>
                        <TableCell className="font-medium">{response.competitor}</TableCell>
                        <TableCell>{response.response}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              response.likelihood === 'High' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                                : response.likelihood === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                  : 'bg-green-100 text-green-700 hover:bg-green-100'
                            }
                          >
                            {response.likelihood}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              response.impact === 'High' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                                : response.impact === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                  : 'bg-green-100 text-green-700 hover:bg-green-100'
                            }
                          >
                            {response.impact}
                          </Badge>
                        </TableCell>
                        <TableCell>{response.counterStrategy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 flex justify-end">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Competitor
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Competitive Intelligence */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Competitive Intelligence</CardTitle>
                <CardDescription>
                  Recent activity and intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">Acme Solutions</div>
                      <Badge variant="outline" className="text-xs">2 days ago</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Announced new partnership with cloud provider for enhanced infrastructure services
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">Partnership</Badge>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Bookmark className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Save</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">TechGlobal</div>
                      <Badge variant="outline" className="text-xs">1 week ago</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Released updated version of workflow automation platform with AI features
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">Product Release</Badge>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Bookmark className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Save</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">LegacySys</div>
                      <Badge variant="outline" className="text-xs">2 weeks ago</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Reduced pricing for enterprise customers by approximately 15%
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">Pricing</Badge>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Bookmark className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Save</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">Innovate Inc</div>
                      <Badge variant="outline" className="text-xs">1 month ago</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Published case study showing 40% efficiency improvement for similar client
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">Marketing</Badge>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Bookmark className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Save</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Intelligence Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Differentiation Strategy */}
            <Card className="col-span-12">
              <CardHeader>
                <CardTitle>Differentiation Strategy</CardTitle>
                <CardDescription>
                  Key differentiators to emphasize against competitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="p-4 bg-purple-50 rounded-md border border-purple-100">
                    <div className="flex items-center text-purple-700 font-medium mb-3">
                      <Shield className="h-5 w-5 mr-2" />
                      Competitive Strengths
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-purple-500 mt-1 mr-2" />
                        <div>
                          <div className="font-medium text-sm">Integrated Ecosystem</div>
                          <p className="text-sm text-gray-600">Seamless integration across all solution components</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-purple-500 mt-1 mr-2" />
                        <div>
                          <div className="font-medium text-sm">Industry Expertise</div>
                          <p className="text-sm text-gray-600">Deep domain knowledge in client's specific industry</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-purple-500 mt-1 mr-2" />
                        <div>
                          <div className="font-medium text-sm">Implementation Speed</div>
                          <p className="text-sm text-gray-600">Faster time-to-value with proven accelerators</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-purple-500 mt-1 mr-2" />
                        <div>
                          <div className="font-medium text-sm">Partner Ecosystem</div>
                          <p className="text-sm text-gray-600">Strong partnerships with leading technology providers</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                    <div className="flex items-center text-blue-700 font-medium mb-3">
                      <Scale className="h-5 w-5 mr-2" />
                      Competitive Comparison
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-sm font-medium">Technology Innovation</div>
                          <div className="text-sm text-blue-600">+25%</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '75%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-sm font-medium">Implementation Time</div>
                          <div className="text-sm text-blue-600">-30%</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '80%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-sm font-medium">Solution Flexibility</div>
                          <div className="text-sm text-blue-600">+20%</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '70%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-sm font-medium">Total Cost of Ownership</div>
                          <div className="text-sm text-blue-600">-15%</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-sm font-medium">Customer Support</div>
                          <div className="text-sm text-blue-600">+35%</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <div className="flex items-center text-green-700 font-medium mb-3">
                      <ShieldCheck className="h-5 w-5 mr-2" />
                      Defensive Positioning
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-sm mb-1">Against Price Competition</div>
                        <p className="text-sm text-gray-600">
                          Emphasize total value of ownership and ROI metrics rather than initial investment
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Against Feature Competition</div>
                        <p className="text-sm text-gray-600">
                          Focus on integration capabilities and business outcomes over feature checklists
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Against Established Competitors</div>
                        <p className="text-sm text-gray-600">
                          Highlight agility, modern architecture, and lower technical debt
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Against New Entrants</div>
                        <p className="text-sm text-gray-600">
                          Emphasize proven track record, stability, and enterprise-grade capabilities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    Share Analysis
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk-mitigation" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Risk Register */}
            <Card className="col-span-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Risk Register</CardTitle>
                    <CardDescription>
                      Identify, assess, and plan mitigation for key risks
                    </CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Risk
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Risk Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead className="w-[300px]">Mitigation Strategy</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riskRegister.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-medium">{risk.risk}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{risk.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              risk.probability === 'High' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                                : risk.probability === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                  : 'bg-green-100 text-green-700 hover:bg-green-100'
                            }
                          >
                            {risk.probability}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              risk.impact === 'High' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                                : risk.impact === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                  : 'bg-green-100 text-green-700 hover:bg-green-100'
                            }
                          >
                            {risk.impact}
                          </Badge>
                        </TableCell>
                        <TableCell>{risk.mitigation}</TableCell>
                        <TableCell>{risk.owner}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              risk.status === 'Mitigated' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                                : risk.status === 'Mitigating'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            }
                          >
                            {risk.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Risk Mitigation Tools */}
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Matrix</CardTitle>
                  <CardDescription>
                    Visualize and prioritize risks by impact and probability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] bg-gray-50 rounded-md border border-dashed border-gray-300 flex items-center justify-center relative">
                    <div className="text-center text-gray-500">
                      <AlertTriangle className="h-16 w-16 mx-auto opacity-20 mb-3" />
                      <p className="mb-1">Risk matrix visualization would be rendered here</p>
                      <p className="text-sm">Showing risks plotted by impact and probability</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export Matrix
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Mitigation Planning</CardTitle>
                  <CardDescription>
                    Develop comprehensive risk management approaches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-md border">
                        <div className="flex items-center text-gray-700 font-medium mb-2">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Avoidance Strategies
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Clarify requirements with detailed specification documents</span>
                          </li>
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Implement thorough testing protocols prior to deployment</span>
                          </li>
                          <li className="flex items-start">
                            <Square className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <span>Establish clear change management procedures</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md border">
                        <div className="flex items-center text-gray-700 font-medium mb-2">
                          <ShieldAlert className="h-5 w-5 mr-2" />
                          Mitigation Strategies
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Develop contingency plans for critical system components</span>
                          </li>
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Establish backup resources for key personnel dependencies</span>
                          </li>
                          <li className="flex items-start">
                            <Square className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <span>Create phased implementation approach to reduce risk exposure</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-md border">
                        <div className="flex items-center text-gray-700 font-medium mb-2">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Transfer Strategies
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Identify partnership opportunities to share implementation risk</span>
                          </li>
                          <li className="flex items-start">
                            <Square className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <span>Evaluate insurance options for critical business risks</span>
                          </li>
                          <li className="flex items-start">
                            <Square className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <span>Consider third-party validation of critical components</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md border">
                        <div className="flex items-center text-gray-700 font-medium mb-2">
                          <ShieldAlert className="h-5 w-5 mr-2" />
                          Acceptance Strategies
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Document accepted risks with clear ownership</span>
                          </li>
                          <li className="flex items-start">
                            <CheckSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Establish monitoring protocols for accepted risks</span>
                          </li>
                          <li className="flex items-start">
                            <Square className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <span>Create communication plan for stakeholders on accepted risks</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                      <div className="flex items-center text-blue-700 font-medium mb-2">
                        <Users className="h-5 w-5 mr-2" />
                        Risk Management Workshop
                      </div>
                      <p className="text-sm text-blue-600 mb-3">
                        Schedule a collaborative risk management workshop with key stakeholders to identify, assess, and plan mitigations for all potential risks.
                      </p>
                      <div className="flex justify-end">
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Schedule Workshop
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
