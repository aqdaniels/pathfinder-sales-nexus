
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, AlertCircle, MessageSquare, BarChart } from "lucide-react";

// Sample meeting data - would be fetched from the meeting intelligence in a real implementation
const meetingInsights = {
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

export function ClientInsightPanel() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Client Intelligence</CardTitle>
            <CardDescription>Key insights from recent client conversations</CardDescription>
          </div>
          <Badge variant="outline" className="bg-dxc-purple-light/10 border-dxc-purple/20">
            Last Meeting: {meetingInsights.lastMeeting}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-md">
          <div className="flex items-start gap-2 text-sm">
            <MessageSquare className="h-5 w-5 text-dxc-purple mt-0.5" />
            <p>{meetingInsights.summary}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-dxc-purple" /> Detected Challenges
            </h3>
            <div className="space-y-3">
              {meetingInsights.challenges.map((challenge, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">{challenge.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {challenge.confidence}% confidence
                    </span>
                  </div>
                  <Progress value={challenge.confidence} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4 text-dxc-purple" /> Key Discussion Topics
            </h3>
            <div className="space-y-3">
              {meetingInsights.keyTopics.map((topic, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">{topic.name}</span>
                    <Badge variant={topic.sentiment > 75 ? "success" : "warning"} className="text-xs">
                      {topic.sentiment}% positive
                    </Badge>
                  </div>
                  <Progress value={topic.sentiment} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-dxc-purple" />
            <span className="text-sm font-medium">Overall Sentiment:</span>
            <span className="text-sm">{meetingInsights.sentiment}% Positive</span>
          </div>
          <Badge className="cursor-pointer" variant="outline">View All Insights</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
