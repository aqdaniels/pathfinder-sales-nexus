
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileCheck, 
  MessageSquare, 
  PieChart, 
  ThumbsUp, 
  Mic, 
  Users2, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

// Sample data - in a real app, this would come from your backend
const meetings = [
  {
    id: "m1",
    title: "Acme Corp - Strategic Planning",
    date: "Apr 15, 2025",
    type: "Discovery",
    participants: ["John Smith", "Sarah Wong", "Michael Chen"],
    sentiment: 78,
    talkRatio: 58,
    keyTopics: ["Backend Modernization", "Data Architecture", "Cost Reduction"],
    meetingScore: 72,
    insights: [
      "Client shows high interest in modernization",
      "Timeline concerns need addressing",
      "Strong positive reaction to cost savings"
    ]
  },
  {
    id: "m2",
    title: "TechSolutions Inc - Product Demo",
    date: "Apr 22, 2025",
    type: "Demo",
    participants: ["David Lee", "Emma Watson"],
    sentiment: 85,
    talkRatio: 45,
    keyTopics: ["Product Features", "Pricing", "Integration"],
    meetingScore: 80,
    insights: [
      "Client impressed with dashboard functionality",
      "Questions about enterprise pricing model",
      "Need for API documentation highlighted"
    ]
  },
  {
    id: "m3",
    title: "Global Industries - Quarterly Review",
    date: "May 02, 2025",
    type: "Review",
    participants: ["Jennifer Davis", "Mark Wilson"],
    sentiment: 63,
    talkRatio: 62,
    keyTopics: ["Performance Review", "Roadmap Planning", "Service Issues"],
    meetingScore: 65,
    insights: [
      "Some dissatisfaction with recent service outages",
      "Positive reception to roadmap presentation",
      "Need follow-up on new compliance requirements"
    ]
  },
];

// Sample time-series data for charts
const trendData = [
  { month: 'Jan', sentiment: 65, engagement: 70 },
  { month: 'Feb', sentiment: 68, engagement: 72 },
  { month: 'Mar', sentiment: 72, engagement: 75 },
  { month: 'Apr', sentiment: 78, engagement: 80 },
  { month: 'May', sentiment: 80, engagement: 82 },
];

// Top topics across all meetings
const topTopics = [
  { name: "Modernization", count: 24, sentiment: 82 },
  { name: "Cost Reduction", count: 18, sentiment: 88 },
  { name: "Implementation", count: 15, sentiment: 65 },
  { name: "Security", count: 12, sentiment: 75 },
];

export function MeetingIntelligenceDashboard() {
  const navigate = useNavigate();

  const navigateToView = (meetingId: string, view: string) => {
    navigate(`/meeting-intelligence?meeting=${meetingId}&view=${view}`);
  };

  return (
    <div className="space-y-6">
      {/* Recent Meetings Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Client Meetings</CardTitle>
          <CardDescription>Select a meeting to see detailed intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="border border-dashed hover:border-dxc-purple/50 hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{meeting.date}</span>
                          <Badge variant="outline">{meeting.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users2 className="h-4 w-4" />
                          <span>{meeting.participants.join(", ")}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={meeting.sentiment > 75 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {meeting.sentiment}% Sentiment
                        </Badge>
                        <div className="text-xs text-muted-foreground">Meeting Score: {meeting.meetingScore}%</div>
                      </div>
                    </div>
                    
                    {/* Quick Insights */}
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-dxc-purple" />
                        <span className="text-sm font-medium">Key Insights</span>
                      </div>
                      <ul className="text-xs space-y-1">
                        {meeting.insights.slice(0, 2).map((insight, i) => (
                          <li key={i} className="text-muted-foreground">• {insight}</li>
                        ))}
                        {meeting.insights.length > 2 && (
                          <li className="text-xs text-dxc-purple cursor-pointer">+ {meeting.insights.length - 2} more insights</li>
                        )}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => navigateToView(meeting.id, "pre-meeting")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Pre-Meeting Intel
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => navigateToView(meeting.id, "conversation")}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Conversation Insights
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => navigateToView(meeting.id, "post-meeting")}
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        Post-Meeting Analysis
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => navigateToView(meeting.id, "coaching")}
                      >
                        <PieChart className="mr-2 h-4 w-4" />
                        Sales Coaching
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Meetings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Client Talk Ratio
            </CardTitle>
            <Mic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42:58</div>
            <p className="text-xs text-muted-foreground">
              Clients speak 42% of the time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Client Sentiment
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Meeting Effectiveness
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="trends">Communication Trends</TabsTrigger>
          <TabsTrigger value="topics">Key Topics</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Areas</TabsTrigger>
        </TabsList>
        
        {/* Communication Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Client Sentiment & Engagement Trends</CardTitle>
              <CardDescription>How your communication resonates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full relative bg-muted/20 rounded-md flex items-center justify-center">
                {/* In a real implementation, this would be a chart component */}
                <div className="absolute inset-0 p-6">
                  <div className="flex justify-between">
                    {trendData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-2">{data.month}</div>
                        <div className="relative h-[200px] w-16">
                          <div 
                            className="absolute bottom-0 w-6 bg-dxc-purple rounded-t-sm" 
                            style={{ height: `${data.sentiment * 2}px`, left: 0 }} 
                          />
                          <div 
                            className="absolute bottom-0 w-6 bg-blue-400 rounded-t-sm" 
                            style={{ height: `${data.engagement * 2}px`, right: 0 }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-dxc-purple rounded-sm" />
                      <span className="text-xs">Client Sentiment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                      <span className="text-xs">Engagement Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Key Topics Tab */}
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Most Discussed Topics</CardTitle>
              <CardDescription>What clients are talking about most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topTopics.map((topic) => (
                  <div key={topic.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{topic.name}</span>
                      <Badge variant={topic.sentiment > 75 ? "success" : "warning"}>
                        {topic.sentiment}% positive
                      </Badge>
                    </div>
                    <Progress value={topic.sentiment} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mentioned {topic.count} times</span>
                      <span>{topic.sentiment > 75 ? "Positive reception" : "Mixed reception"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Based on analysis of last 30 days of meetings
              </div>
              <Button variant="outline" size="sm">
                View All Topics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Improvement Areas Tab */}
        <TabsContent value="improvement">
          <Card>
            <CardHeader>
              <CardTitle>Top Improvement Areas</CardTitle>
              <CardDescription>Focus on these areas to improve client engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Value Articulation</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Be more explicit about specific value metrics when discussing solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Executive Engagement</span>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <Progress value={58} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Tailor communication to executive concerns like ROI and strategic impact
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Discovery Questions</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ask more open-ended questions to uncover underlying business challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Active Listening</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Continue strong active listening practices to build client trust
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Personalized Coaching <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
