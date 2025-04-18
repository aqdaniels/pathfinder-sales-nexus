
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Clock, FileText, MessageSquare, PieChart, Send, ThumbsUp, Users2 } from "lucide-react";

const meetingData = {
  title: "Acme Corp Q2 Digital Transformation Review",
  date: "April 20, 2025",
  duration: "1h 30m",
  attendees: ["John Smith", "Sarah Johnson", "Michael Chen"],
  summary: "The meeting focused on Acme's cloud migration challenges and their plans for Asian manufacturing expansion. The CIO expressed concerns about budget constraints affecting their digital transformation timeline. They're interested in exploring cost-effective solutions that can scale with their Asian operations while improving their supply chain visibility.",
  keyTakeaways: [
    "Budget constraints are the primary blocker for cloud migration",
    "Asian expansion is top priority for next 12 months",
    "New CIO wants to reset digital transformation roadmap",
    "Supply chain visibility is a critical operational concern"
  ],
  nextActions: [
    { task: "Send budget-optimized cloud migration proposal", assignee: "David Parker", due: "Apr 25", status: "pending" },
    { task: "Schedule technical workshop on supply chain solutions", assignee: "Lisa Williams", due: "Apr 28", status: "pending" },
    { task: "Share manufacturing AI case studies", assignee: "Lisa Williams", due: "Apr 23", status: "completed" },
    { task: "Prepare Asian expansion technology assessment", assignee: "David Parker", due: "May 3", status: "pending" }
  ],
  opportunityScore: 78,
  opportunityInsights: [
    { factor: "Budget Alignment", score: 65 },
    { factor: "Solution Fit", score: 85 },
    { factor: "Decision Timeline", score: 75 },
    { factor: "Stakeholder Buy-in", score: 80 },
  ],
  followUpTemplate: "Hello [Name],\n\nThank you for the productive discussion today regarding your digital transformation initiatives. Based on our conversation, I understand that [key pain point] is a priority, particularly as it relates to [specific context].\n\nI've attached some information on how our [solution] has helped similar manufacturing companies address these challenges while working within budget constraints. The case study from [reference company] demonstrates [specific outcome].\n\nWould you be available next week for a follow-up discussion with our technical team to explore some tailored approaches?\n\nBest regards,\n[Your name]"
};

export function PostMeetingAnalysis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-xl">{meetingData.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {meetingData.date} · {meetingData.duration} · 
                  <Users2 className="h-4 w-4 mx-1" />
                  {meetingData.attendees.length} attendees
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                View Transcript
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Meeting Summary</h3>
              <p className="text-muted-foreground text-sm">{meetingData.summary}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-dxc-purple" />
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {meetingData.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="bg-dxc-purple/10 text-dxc-purple font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-dxc-purple" />
                Recommended Next Actions
              </h3>
              <div className="space-y-3">
                {meetingData.nextActions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-start gap-3">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${action.status === 'completed' ? 'bg-green-100 border-green-500' : 'bg-orange-100 border-orange-500'}`}>
                        {action.status === 'completed' ? 
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : 
                          <Clock className="h-3.5 w-3.5 text-orange-600" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium">{action.task}</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned to {action.assignee} · Due {action.due}
                        </p>
                      </div>
                    </div>
                    <Badge className={action.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'}>
                      {action.status === 'completed' ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-dxc-purple" />
              Follow-Up Email Template
            </CardTitle>
            <CardDescription>Customizable template based on meeting insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 border rounded-md p-4 text-sm whitespace-pre-line">
              {meetingData.followUpTemplate}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm">
                Edit Template
              </Button>
              <Button size="sm" className="gap-1">
                <Send className="h-4 w-4" />
                Use Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-dxc-purple" />
              Opportunity Qualification
            </CardTitle>
            <CardDescription>AI-powered opportunity assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                  <div className="text-3xl font-bold text-dxc-purple">{meetingData.opportunityScore}%</div>
                </div>
                <div className="absolute inset-0 rounded-full border-8 border-dxc-purple" 
                     style={{
                       clipPath: `polygon(50% 50%, 50% 0%, ${
                         50 + 50 * Math.cos((Math.PI * 2 * meetingData.opportunityScore) / 100)
                       }% ${50 - 50 * Math.sin((Math.PI * 2 * meetingData.opportunityScore) / 100)}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`,
                     }}>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {meetingData.opportunityInsights.map((insight, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{insight.factor}</span>
                    <span className="font-medium">{insight.score}%</span>
                  </div>
                  <Progress value={insight.score} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" className="w-full justify-between">
                View Detailed Analysis
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Client Engagement Team</CardTitle>
            <CardDescription>Team members involved in this opportunity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-dxc-purple text-white">LW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Lisa Williams</p>
                  <p className="text-sm text-muted-foreground">Account Executive</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-dxc-purple text-white">DP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">David Parker</p>
                  <p className="text-sm text-muted-foreground">Solution Architect</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-muted-foreground/20 text-muted-foreground">+</AvatarFallback>
                </Avatar>
                <Button variant="ghost" className="text-sm h-8">Add team member</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
