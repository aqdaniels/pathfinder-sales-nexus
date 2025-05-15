
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  ThumbsDown, 
  ThumbsUp, 
  Users 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

type StakeholderInsight = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  type: "champion" | "advocate" | "detractor" | "gap" | "declining";
  sentiment: number;
  sentimentTrend: "up" | "down" | "stable";
  lastInteractionDate: string;
  engagementLevel: number;
  priority: "high" | "medium" | "low";
  conversationStarters: string[];
  influence: number;
  recentActivities?: {
    type: string;
    date: string;
    note: string;
  }[];
};

// Sample data - in a real app would come from an API
const stakeholdersData: StakeholderInsight[] = [
  {
    id: "stk1",
    name: "John Smith",
    role: "CIO",
    imageUrl: "",
    type: "champion",
    sentiment: 88,
    sentimentTrend: "up",
    lastInteractionDate: "Apr 15, 2025",
    engagementLevel: 85,
    priority: "high",
    conversationStarters: [
      "Ask about his recent presentation at the IT Leadership Summit",
      "Discuss the cloud security concerns he mentioned in the last meeting",
      "Follow up on his interest in AI application in operations"
    ],
    influence: 90,
    recentActivities: [
      {
        type: "Meeting",
        date: "Apr 15, 2025",
        note: "Expressed strong interest in our cloud migration approach"
      },
      {
        type: "Email",
        date: "Apr 10, 2025",
        note: "Shared article about digital transformation success metrics"
      }
    ]
  },
  {
    id: "stk2",
    name: "Sarah Johnson",
    role: "Digital Transformation Lead",
    imageUrl: "",
    type: "advocate",
    sentiment: 76,
    sentimentTrend: "stable",
    lastInteractionDate: "Apr 12, 2025",
    engagementLevel: 70,
    priority: "medium",
    conversationStarters: [
      "Discuss the implementation timeline concerns she raised",
      "Share case study on similar manufacturing digital transformation",
      "Ask about her team's readiness for the upcoming changes"
    ],
    influence: 75,
    recentActivities: [
      {
        type: "Meeting",
        date: "Apr 12, 2025",
        note: "Asked detailed questions about implementation process"
      }
    ]
  },
  {
    id: "stk3",
    name: "Michael Chen",
    role: "IT Director",
    imageUrl: "",
    type: "declining",
    sentiment: 62,
    sentimentTrend: "down",
    lastInteractionDate: "Apr 08, 2025",
    engagementLevel: 45,
    priority: "high",
    conversationStarters: [
      "Address the concerns about technical support responsiveness",
      "Discuss his team's involvement in the migration planning",
      "Share the new technical documentation he requested"
    ],
    influence: 80,
    recentActivities: [
      {
        type: "Meeting",
        date: "Apr 08, 2025",
        note: "Expressed concerns about technical support responsiveness"
      },
      {
        type: "Email",
        date: "Apr 02, 2025",
        note: "Requested additional technical documentation"
      }
    ]
  },
  {
    id: "stk4",
    name: "Lisa Williams",
    role: "CFO",
    imageUrl: "",
    type: "gap",
    sentiment: 0,
    sentimentTrend: "stable",
    lastInteractionDate: "N/A",
    engagementLevel: 0,
    priority: "high",
    conversationStarters: [
      "Introduce our cost reduction case studies relevant to manufacturing",
      "Discuss ROI metrics that would be most valuable for her evaluation",
      "Share TCO comparison for cloud vs. on-prem in similar organizations"
    ],
    influence: 95,
    recentActivities: []
  },
  {
    id: "stk5",
    name: "Robert Taylor",
    role: "Infrastructure Manager",
    imageUrl: "",
    type: "detractor",
    sentiment: 35,
    sentimentTrend: "down",
    lastInteractionDate: "Apr 05, 2025",
    engagementLevel: 40,
    priority: "medium",
    conversationStarters: [
      "Address concerns about job security post-migration",
      "Discuss transition plan and team upskilling opportunities",
      "Share success stories of infrastructure teams post-cloud adoption"
    ],
    influence: 65,
    recentActivities: [
      {
        type: "Meeting",
        date: "Apr 05, 2025",
        note: "Raised objections to the proposed timeline and staffing implications"
      }
    ]
  }
];

type StakeholderTypeInfo = {
  icon: React.ElementType;
  color: string;
  label: string;
  description: string;
};

const stakeholderTypeMap: Record<StakeholderInsight['type'], StakeholderTypeInfo> = {
  champion: { 
    icon: ThumbsUp, 
    color: "text-green-500", 
    label: "Champion", 
    description: "Strong advocate who actively promotes your solutions" 
  },
  advocate: { 
    icon: ThumbsUp, 
    color: "text-blue-500", 
    label: "Advocate", 
    description: "Supportive stakeholder who sees value in your offerings" 
  },
  detractor: { 
    icon: ThumbsDown, 
    color: "text-red-500", 
    label: "Detractor", 
    description: "Opposed to or skeptical about your proposed solutions" 
  },
  gap: { 
    icon: AlertCircle, 
    color: "text-orange-500", 
    label: "Relationship Gap", 
    description: "Key stakeholder with insufficient engagement" 
  },
  declining: { 
    icon: ThumbsDown, 
    color: "text-amber-500", 
    label: "Declining Engagement", 
    description: "Previously positive relationship showing signs of deterioration" 
  },
};

interface RelationshipInsightsProps {
  limit?: number;
}

export function RelationshipInsights({ limit }: RelationshipInsightsProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderInsight | null>(null);
  
  // Display all or limited insights based on prop
  const displayStakeholders = limit ? stakeholdersData.slice(0, limit) : stakeholdersData;

  return (
    <div className="space-y-4">
      {displayStakeholders.map((stakeholder) => {
        const typeInfo = stakeholderTypeMap[stakeholder.type];
        const initials = stakeholder.name.split(' ').map(n => n[0]).join('');
        
        return (
          <div key={stakeholder.id} className="rounded-lg border p-4 transition-all hover:bg-muted/50">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={stakeholder.imageUrl} alt={stakeholder.name} />
                  <AvatarFallback className="bg-muted-foreground/10">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{stakeholder.name}</h3>
                  <p className="text-muted-foreground text-xs">{stakeholder.role}</p>
                  
                  {stakeholder.type !== 'gap' && (
                    <div className="flex items-center mt-1 gap-1">
                      <p className="text-xs flex items-center">
                        <span className={`${stakeholder.sentimentTrend === 'up' ? 'text-green-500' : stakeholder.sentimentTrend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                          Sentiment: {stakeholder.sentiment}%
                        </span>
                        {stakeholder.sentimentTrend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 ml-1" />
                        ) : stakeholder.sentimentTrend === 'down' ? (
                          <ArrowUpRight className="h-3 w-3 text-red-500 ml-1 transform rotate-90" />
                        ) : null}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Badge className={
                stakeholder.type === 'champion' || stakeholder.type === 'advocate' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : stakeholder.type === 'detractor' 
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : 'bg-orange-100 text-orange-800 border-orange-200'
              }>
                {typeInfo.label}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                {stakeholder.type !== 'gap' ? (
                  <>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last: {stakeholder.lastInteractionDate}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      Influence: {stakeholder.influence}%
                    </span>
                  </>
                ) : (
                  <span className="flex items-center text-orange-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    No direct engagement yet
                  </span>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 gap-1 text-xs"
                    onClick={() => setSelectedStakeholder(stakeholder)}
                  >
                    View Details
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  {selectedStakeholder && (
                    <>
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          <DialogTitle className="flex items-center gap-2">
                            <span>{selectedStakeholder.name}</span>
                            <Badge className={
                              selectedStakeholder.type === 'champion' || selectedStakeholder.type === 'advocate' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : selectedStakeholder.type === 'detractor' 
                                ? 'bg-red-100 text-red-800 border-red-200'
                                : 'bg-orange-100 text-orange-800 border-orange-200'
                            }>
                              {stakeholderTypeMap[selectedStakeholder.type].label}
                            </Badge>
                          </DialogTitle>
                        </div>
                        <DialogDescription>
                          {selectedStakeholder.role} · {stakeholderTypeMap[selectedStakeholder.type].description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={selectedStakeholder.imageUrl} alt={selectedStakeholder.name} />
                            <AvatarFallback className="bg-muted-foreground/10 text-lg">
                              {selectedStakeholder.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            {selectedStakeholder.type !== 'gap' && (
                              <>
                                <div className="space-y-1">
                                  <h4 className="text-sm font-medium">Sentiment</h4>
                                  <div className="flex items-center gap-3">
                                    <Progress value={selectedStakeholder.sentiment} className="h-2 flex-1" />
                                    <span className="text-sm font-medium">{selectedStakeholder.sentiment}%</span>
                                  </div>
                                  <p className="text-xs flex items-center gap-1">
                                    <span className={selectedStakeholder.sentimentTrend === 'up' ? 'text-green-500' : selectedStakeholder.sentimentTrend === 'down' ? 'text-red-500' : 'text-muted-foreground'}>
                                      {selectedStakeholder.sentimentTrend === 'up' ? 'Improving' : selectedStakeholder.sentimentTrend === 'down' ? 'Declining' : 'Stable'}
                                    </span>
                                    {selectedStakeholder.sentimentTrend === 'up' ? (
                                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                                    ) : selectedStakeholder.sentimentTrend === 'down' ? (
                                      <ArrowUpRight className="h-3 w-3 text-red-500 transform rotate-90" />
                                    ) : null}
                                  </p>
                                </div>
                                
                                <div className="space-y-1">
                                  <h4 className="text-sm font-medium">Influence Level</h4>
                                  <div className="flex items-center gap-3">
                                    <Progress value={selectedStakeholder.influence} className="h-2 flex-1" />
                                    <span className="text-sm font-medium">{selectedStakeholder.influence}%</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {selectedStakeholder.influence > 80 ? 'Key decision maker' : 
                                      selectedStakeholder.influence > 60 ? 'Strong influence' : 'Moderate influence'}
                                  </p>
                                </div>
                              </>
                            )}
                            
                            {selectedStakeholder.type === 'gap' && (
                              <div className="col-span-2">
                                <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-md p-3">
                                  <h4 className="text-sm font-medium flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Relationship Gap Alert
                                  </h4>
                                  <p className="text-sm mt-1">
                                    No direct engagement with this key stakeholder. Given their role as {selectedStakeholder.role}, 
                                    establishing contact should be a priority.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-dxc-purple" />
                            Recommended Conversation Starters
                          </h4>
                          <ul className="space-y-2">
                            {selectedStakeholder.conversationStarters.map((starter, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                                  {i + 1}
                                </span>
                                {starter}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {selectedStakeholder.recentActivities && selectedStakeholder.recentActivities.length > 0 && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4 text-dxc-purple" />
                                Recent Interactions
                              </h4>
                              <div className="space-y-3">
                                {selectedStakeholder.recentActivities.map((activity, i) => (
                                  <div key={i} className="text-sm flex items-start gap-3">
                                    <div className="bg-muted rounded-md p-1.5 flex-shrink-0">
                                      {activity.type === 'Meeting' ? (
                                        <Users className="h-4 w-4 text-dxc-purple" />
                                      ) : (
                                        <FileText className="h-4 w-4 text-dxc-purple" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">{activity.type}</span>
                                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                                      </div>
                                      <p className="text-muted-foreground">{activity.note}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        
                        <div className="flex justify-between pt-2">
                          <Button variant="ghost" size="sm">View Full Profile</Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Calendar className="h-4 w-4" />
                            Schedule Outreach
                          </Button>
                        </div>
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
