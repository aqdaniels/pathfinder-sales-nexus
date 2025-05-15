
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Building, Calendar, CheckCircle2, FileText, LineChart, MoveUpRight, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const clientData = {
  name: "Acme Corporation",
  industry: "Manufacturing",
  meeting: {
    title: "Q2 Digital Transformation Review",
    date: "April 24, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "Microsoft Teams",
    participants: [
      { name: "John Smith", role: "CIO", company: "Acme Corp", imageUrl: "" },
      { name: "Sarah Johnson", role: "Digital Transformation Lead", company: "Acme Corp", imageUrl: "" },
      { name: "Michael Chen", role: "IT Director", company: "Acme Corp", imageUrl: "" },
      { name: "Lisa Williams", role: "Account Executive", company: "DXC", imageUrl: "" },
      { name: "David Parker", role: "Solution Architect", company: "DXC", imageUrl: "" },
    ],
  },
  insights: [
    { title: "Expanding Asian Manufacturing", category: "Strategic", source: "Q1 Earnings Call" },
    { title: "Cloud Migration Challenges", category: "Technical", source: "Previous Meeting Notes" },
    { title: "New CIO (John Smith) Appointed", category: "Organizational", source: "Press Release" },
    { title: "50% Reduction in IT Budget", category: "Financial", source: "Industry News" },
  ],
  trends: [
    { title: "Supply Chain Disruptions in Manufacturing", relevance: "High" },
    { title: "Increasing Cybersecurity Threats in the Industry", relevance: "Medium" },
    { title: "AI Adoption in Manufacturing Operations", relevance: "High" },
  ],
  talkingPoints: [
    "How are their cloud migration challenges impacting operational efficiency?",
    "What specific metrics are they using to measure digital transformation success?",
    "How is the reduced IT budget affecting their innovation roadmap?",
    "What supply chain visibility solutions would benefit their Asian expansion?",
    "What AI use cases are they considering for manufacturing operations?",
  ],
  checklistItems: [
    { text: "Review previous meeting notes", completed: true },
    { text: "Analyze client's Q1 financial results", completed: true },
    { text: "Prepare cloud migration case studies", completed: false },
    { text: "Develop budget-conscious proposal options", completed: false },
    { text: "Prepare supply chain enhancement examples", completed: true },
  ],
};

export function PreMeetingIntelligence() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Meeting Overview</CardTitle>
                <CardDescription>Upcoming client engagement details</CardDescription>
              </div>
              <Badge className="bg-dxc-purple text-white">{clientData.industry}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <h3 className="font-semibold text-lg">{clientData.meeting.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {clientData.meeting.date} · {clientData.meeting.time} · {clientData.meeting.location}
                </span>
              </div>
            </div>

            <Separator />
            
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Users className="mr-2 h-4 w-4 text-dxc-purple" /> Participants
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {clientData.meeting.participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-md border border-muted bg-muted/30">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={participant.imageUrl} />
                      <AvatarFallback className="bg-muted-foreground/10">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {participant.role} · {participant.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-dxc-purple" /> Key Client Insights
            </CardTitle>
            <CardDescription>Recent information that may impact your conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {clientData.insights.map((insight, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{insight.category}</Badge>
                    <span className="text-xs text-muted-foreground">{insight.source}</span>
                  </div>
                  <p className="font-medium">{insight.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-dxc-purple" /> Industry Trends & Context
            </CardTitle>
            <CardDescription>Relevant market dynamics for this client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientData.trends.map((trend, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <MoveUpRight className="mr-3 h-5 w-5 text-dxc-purple" />
                    <p>{trend.title}</p>
                  </div>
                  <Badge variant={trend.relevance === "High" ? "destructive" : "outline"}>
                    {trend.relevance} Relevance
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <FileText className="mr-2 h-5 w-5 text-dxc-purple" /> Suggested Talking Points
            </CardTitle>
            <CardDescription>Strategic questions to drive the conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {clientData.talkingPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 text-xs">
                    {index + 1}
                  </span>
                  <p className="text-sm">{point}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <Building className="mr-2 h-5 w-5 text-dxc-purple" /> About {clientData.name}
            </CardTitle>
            <CardDescription>Company profile and key information</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertTitle className="text-sm font-medium text-foreground">Client Intelligence Available</AlertTitle>
              <AlertDescription className="text-xs">
                View complete client analysis in the Client Intelligence module.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-dxc-purple" /> Meeting Preparation Checklist
            </CardTitle>
            <CardDescription>Essential preparation tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {clientData.checklistItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className={`h-5 w-5 rounded border mr-2 flex items-center justify-center ${item.completed ? 'bg-dxc-purple border-dxc-purple' : 'border-muted-foreground/30'}`}>
                    {item.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
