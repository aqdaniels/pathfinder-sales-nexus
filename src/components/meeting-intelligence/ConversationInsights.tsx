
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Mic, ThumbsDown, ThumbsUp } from "lucide-react";
import { Badge } from "../ui/badge";

const meetingData = {
  id: "m123",
  title: "Acme Corp - Strategic Planning",
  date: "Apr 15, 2025",
  duration: "45 minutes",
  attendees: ["John Smith", "Sarah Wong", "Michael Chen"],
  transcript: `
    John: Thanks everyone for joining today's strategic planning session.
    Sarah: Happy to be here. We've been looking at your proposal for modernizing our backend systems.
    Michael: Yes, and we believe there are opportunities to improve your data architecture as well.
    Sarah: That's interesting. What kind of improvements do you envision?
    Michael: Based on our assessment, we see potential for a 30% improvement in data processing times.
    John: Additionally, we can help reduce operational costs while improving system reliability.
    Sarah: Those are compelling points. Our current system has been causing some bottlenecks.
    Michael: We've worked with similar enterprises facing the same challenges.
    Sarah: What would implementation timeline look like?
    John: We're thinking a phased approach over 6-9 months to minimize disruption.
  `,
  sentiment: {
    overall: 78,
    keyMoments: [
      { time: "05:23", score: 85, text: "Excited about modernization potential" },
      { time: "12:47", score: 65, text: "Concerned about implementation timeline" },
      { time: "18:32", score: 82, text: "Positive reaction to cost reduction estimates" },
    ],
  },
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
  opportunities: [
    { name: "Cloud Migration", confidence: 92 },
    { name: "Analytics Platform", confidence: 85 },
    { name: "Process Automation", confidence: 78 },
  ],
};

export function ConversationInsights() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{meetingData.title}</h2>
          <p className="text-muted-foreground">
            {meetingData.date} · {meetingData.duration} · {meetingData.attendees.length} attendees
          </p>
        </div>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ThumbsUp className="mr-2 h-5 w-5 text-dxc-purple" /> Key Topics
              </CardTitle>
              <CardDescription>Topics mentioned during the conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetingData.keyTopics.map((topic) => (
                  <div key={topic.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{topic.name}</span>
                      <Badge variant={topic.sentiment > 75 ? "success" : "warning"}>
                        {topic.sentiment}% positive
                      </Badge>
                    </div>
                    <Progress value={topic.sentiment} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Mentioned {topic.mentions} times
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ThumbsDown className="mr-2 h-5 w-5 text-dxc-purple" /> Challenges Detected
              </CardTitle>
              <CardDescription>Client challenges identified from conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetingData.challenges.map((challenge) => (
                  <div key={challenge.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{challenge.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {challenge.confidence}% confidence
                      </span>
                    </div>
                    <Progress value={challenge.confidence} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Mic className="mr-2 h-5 w-5 text-dxc-purple" /> Opportunity Detection
            </CardTitle>
            <CardDescription>Potential opportunities based on conversation analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meetingData.opportunities.map((opportunity) => (
                <div key={opportunity.name} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{opportunity.name}</h4>
                    <Badge className={opportunity.confidence > 85 ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}>
                      {opportunity.confidence}%
                    </Badge>
                  </div>
                  <Progress value={opportunity.confidence} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {opportunity.confidence > 85
                      ? "High confidence match"
                      : "Medium confidence match"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sentiment" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Sentiment Analysis</CardTitle>
            <CardDescription>Client emotional response during conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-48 h-48 mb-6">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                  <div className="text-4xl font-bold text-dxc-purple">
                    {meetingData.sentiment.overall}%
                  </div>
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-dxc-purple"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${
                      50 + 50 * Math.cos((Math.PI * 2 * 78) / 100)
                    }% ${50 - 50 * Math.sin((Math.PI * 2 * 78) / 100)}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`,
                  }}
                ></div>
              </div>
              <p className="text-lg font-medium">Positive Sentiment</p>
              <p className="text-muted-foreground text-sm max-w-md text-center mt-2">
                Client showed predominantly positive reactions to our proposals, particularly around
                cost reduction and modernization benefits.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium mb-4">Key Sentiment Moments</h4>
              <div className="space-y-4">
                {meetingData.sentiment.keyMoments.map((moment, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <span className="text-xs font-mono">{moment.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{moment.text}</span>
                        <span
                          className={`text-sm font-medium ${
                            moment.score > 75 ? "text-green-600" : "text-yellow-600"
                          }`}
                        >
                          {moment.score}%
                        </span>
                      </div>
                      <Progress value={moment.score} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="transcript">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="mr-2 h-5 w-5 text-dxc-purple" /> Meeting Transcript
            </CardTitle>
            <CardDescription>Full conversation transcript with insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg whitespace-pre-line font-mono text-sm">
              {meetingData.transcript}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
