
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  LineChart,
  MessageCircle,
  MessageSquare,
  PieChart,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  Users2,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data for the dashboard
const conversationTimelineData = [
  { date: "2025-04-01", type: "Discovery", sentiment: 72, attendees: 4 },
  { date: "2025-04-05", type: "Technical", sentiment: 65, attendees: 3 },
  { date: "2025-04-12", type: "Proposal", sentiment: 80, attendees: 5 },
  { date: "2025-04-18", type: "Discovery", sentiment: 75, attendees: 3 },
  { date: "2025-04-22", type: "Technical", sentiment: 68, attendees: 4 },
  { date: "2025-05-02", type: "Proposal", sentiment: 85, attendees: 6 },
];

const sentimentTrendData = [
  { date: "Mar 01", sentiment: 65 },
  { date: "Mar 15", sentiment: 68 },
  { date: "Apr 01", sentiment: 72 },
  { date: "Apr 15", sentiment: 75 },
  { date: "May 01", sentiment: 80 },
  { date: "May 15", sentiment: 82 },
];

const stakeholderSentimentData = [
  { name: "John Smith (CIO)", sentiment: 85, change: 5 },
  { name: "Sarah Johnson (CFO)", sentiment: 65, change: -3 },
  { name: "Michael Chen (COO)", sentiment: 78, change: 2 },
  { name: "Lisa Williams (CTO)", sentiment: 72, change: 4 },
];

const topicSentimentData = [
  { name: "Cloud Migration", sentiment: 80, mentions: 12 },
  { name: "Cost Reduction", sentiment: 85, mentions: 8 },
  { name: "Security Compliance", sentiment: 65, mentions: 6 },
  { name: "Digital Transformation", sentiment: 75, mentions: 14 },
  { name: "AI/ML Implementation", sentiment: 82, mentions: 7 },
];

const actionItemsData = [
  { id: 1, task: "Send cloud migration proposal", priority: "High", dueDate: "May 10", status: "pending", source: "Apr 22 Meeting" },
  { id: 2, task: "Schedule technical workshop", priority: "Medium", dueDate: "May 15", status: "pending", source: "Apr 18 Meeting" },
  { id: 3, task: "Share security compliance report", priority: "High", dueDate: "May 08", status: "completed", source: "Apr 12 Meeting" },
  { id: 4, task: "Follow up on budget concerns", priority: "Medium", dueDate: "May 12", status: "pending", source: "May 02 Meeting" },
  { id: 5, task: "Provide ROI calculation", priority: "Low", dueDate: "May 20", status: "pending", source: "Apr 22 Meeting" },
];

const challengesData = [
  { category: "Technical", challenge: "Legacy System Integration", frequency: 8, lastMentioned: "May 02", solution: "Modern Integration Platform" },
  { category: "Financial", challenge: "Budget Constraints", frequency: 12, lastMentioned: "May 02", solution: "Value-Based Pricing" },
  { category: "Process", challenge: "Change Management", frequency: 6, lastMentioned: "Apr 22", solution: "Adoption Services" },
  { category: "Security", challenge: "Compliance Requirements", frequency: 5, lastMentioned: "Apr 18", solution: "Compliance Framework" },
];

const insightsData = [
  { type: "Quote", content: "We need to move faster on digital transformation to stay competitive.", speaker: "John Smith (CIO)", meeting: "May 02" },
  { type: "Theme", content: "Cost optimization is becoming a primary concern across discussions.", meetings: 5, lastMentioned: "May 02" },
  { type: "Competitive", content: "Client mentioned they're also evaluating Oracle's solution.", competitor: "Oracle", meeting: "Apr 22" },
  { type: "Decision", content: "Budget approval expected by end of Q2.", probability: "High", meeting: "May 02" },
];

export function MeetingIntelligenceDashboard() {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Meeting Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and analysis from client conversations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-md overflow-hidden">
            <Button 
              variant={timeframe === "week" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setTimeframe("week")}
              className="rounded-none h-8"
            >
              Week
            </Button>
            <Button 
              variant={timeframe === "month" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setTimeframe("month")}
              className="rounded-none h-8"
            >
              Month
            </Button>
            <Button 
              variant={timeframe === "quarter" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setTimeframe("quarter")}
              className="rounded-none h-8"
            >
              Quarter
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            Select Date
          </Button>
        </div>
      </div>

      {/* Conversation Timeline View */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-dxc-purple" /> Conversation Timeline
          </CardTitle>
          <CardDescription>
            Chronological view of client meetings over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversationTimelineData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-md border shadow-md text-xs">
                          <p className="font-medium">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          <div className="mt-1 space-y-1">
                            <p><span className="text-muted-foreground">Type:</span> {data.type}</p>
                            <p><span className="text-muted-foreground">Sentiment:</span> {data.sentiment}%</p>
                            <p><span className="text-muted-foreground">Attendees:</span> {data.attendees}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="sentiment" 
                  fill="#9b87f5" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                  name="Sentiment Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-dxc-purple rounded-sm mr-2"></div>
                <span className="text-sm">Discovery</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                <span className="text-sm">Proposal</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                <span className="text-sm">Technical</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 px-2">
                <Users2 className="h-3 w-3" /> 6 Meetings
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 px-2">
                <TrendingUp className="h-3 w-3 text-green-500" /> 75% Avg Sentiment
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Sentiment Analysis Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-dxc-purple" /> Sentiment Analysis
              </CardTitle>
              <CardDescription>
                Client sentiment tracking over time and by topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trend" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="trend">Sentiment Trend</TabsTrigger>
                  <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="trend" className="space-y-4">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sentimentTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="sentiment" 
                          stroke="#9b87f5" 
                          fillOpacity={1} 
                          fill="url(#sentimentGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Sentiment</p>
                      <p className="text-2xl font-bold">82%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Change</p>
                      <p className="text-xl font-bold text-green-500 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> +17%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Inflection Points</p>
                      <p className="text-xl font-bold">3</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stakeholders">
                  <div className="space-y-4">
                    {stakeholderSentimentData.map((stakeholder, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{stakeholder.name}</span>
                          <div className="flex items-center">
                            <span className="font-medium">{stakeholder.sentiment}%</span>
                            <span className={`ml-2 text-xs flex items-center ${stakeholder.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {stakeholder.change >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {stakeholder.change > 0 ? '+' : ''}{stakeholder.change}%
                            </span>
                          </div>
                        </div>
                        <Progress value={stakeholder.sentiment} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="topics">
                  <div className="space-y-4">
                    {topicSentimentData.map((topic, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              {topic.mentions} mentions
                            </Badge>
                            <span className="font-medium">{topic.sentiment}%</span>
                          </div>
                        </div>
                        <Progress value={topic.sentiment} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Action Intelligence Center */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-dxc-purple" /> Action Intelligence
              </CardTitle>
              <CardDescription>
                Prioritized action items extracted from conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actionItemsData.map((action) => (
                  <div 
                    key={action.id} 
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 
                        ${action.status === 'completed' ? 'bg-green-100 border-green-500' : 
                          action.priority === 'High' ? 'bg-red-100 border-red-500' : 
                          action.priority === 'Medium' ? 'bg-orange-100 border-orange-500' : 
                          'bg-blue-100 border-blue-500'}`}
                      >
                        {action.status === 'completed' ? 
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : 
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium">{action.task}</p>
                        <p className="text-xs text-muted-foreground">
                          Due {action.dueDate} · Source: {action.source}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      action.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                      action.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' : 
                      action.priority === 'Medium' ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                      'bg-blue-100 text-blue-800 border-blue-200'
                    }>
                      {action.status === 'completed' ? 'Completed' : action.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full text-sm">View All Actions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Client Challenge Tracker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-dxc-purple" /> Client Challenges
              </CardTitle>
              <CardDescription>
                Key challenges identified from conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challengesData.map((challenge, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{challenge.category}</Badge>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">Last mentioned</span>
                        <span className="text-xs font-medium">{challenge.lastMentioned}</span>
                      </div>
                    </div>
                    <p className="font-medium">{challenge.challenge}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Mentioned {challenge.frequency} times</span>
                      <span className="font-medium text-dxc-purple">Maps to: {challenge.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Insight Highlights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <ThumbsUp className="mr-2 h-5 w-5 text-dxc-purple" /> Insight Highlights
              </CardTitle>
              <CardDescription>
                Key insights extracted from conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insightsData.map((insight, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge 
                        className={
                          insight.type === 'Quote' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          insight.type === 'Theme' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          insight.type === 'Competitive' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }
                      >
                        {insight.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {insight.meeting && `Meeting: ${insight.meeting}`}
                        {insight.meetings && `${insight.meetings} meetings`}
                      </span>
                    </div>
                    <p className="text-sm">{insight.content}</p>
                    <div className="text-xs text-muted-foreground">
                      {insight.speaker && `Speaker: ${insight.speaker}`}
                      {insight.competitor && `Competitor: ${insight.competitor}`}
                      {insight.probability && `Decision probability: ${insight.probability}`}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  Full Transcripts
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All Insights
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
