
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, BookOpen, CheckCircle2, HelpCircle, LineChart, Lightbulb, MessageCircle, ThumbsUp, Mic, PieChart, Star, Zap } from "lucide-react";

const coachingData = {
  conversationMetrics: {
    talkRatio: 56,
    questionQuality: 72,
    listeningSkills: 85,
    valueMessaging: 63,
    overallScore: 69,
  },
  keyInsights: [
    { type: "strength", text: "Excellent listening and follow-up questions when the client mentioned budget constraints" },
    { type: "improvement", text: "Missed opportunity to quantify ROI when discussing supply chain solutions" },
    { type: "strength", text: "Good use of relevant industry examples for manufacturing challenges" },
    { type: "improvement", text: "Too much technical detail when explaining cloud architecture" },
    { type: "improvement", text: "Limited discussion of business outcomes vs technical features" },
  ],
  bestPractices: [
    { title: "Value-Based Discussion", score: 63, benchmark: 78 },
    { title: "Discovery Questions", score: 72, benchmark: 70 },
    { title: "Active Listening", score: 85, benchmark: 73 },
    { title: "Executive Engagement", score: 59, benchmark: 75 },
    { title: "Business Challenge Focus", score: 68, benchmark: 82 },
  ],
  improvementSuggestions: [
    { 
      category: "Value Messaging",
      suggestions: [
        "Connect technical capabilities to specific business outcomes that matter to the CIO",
        "Quantify the impact of solutions in terms of cost savings, efficiency gains, or risk reduction",
        "Tailor value messaging to the Asian expansion priorities mentioned by the client"
      ]
    },
    { 
      category: "Executive Conversation",
      suggestions: [
        "Use more strategic framing when addressing the CIO's concerns about digital transformation",
        "Focus on high-level roadmap implications rather than implementation details",
        "Prepare specific examples of how other CIOs have successfully navigated similar transformations"
      ]
    },
  ],
  trendAnalysis: {
    meetings: ["Mar 10", "Mar 24", "Apr 5", "Apr 20"],
    scores: [62, 65, 67, 69],
  }
};

export function SalesCoaching() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Star className="mr-2 h-5 w-5 text-dxc-purple" /> Conversation Performance
          </CardTitle>
          <CardDescription>
            AI-powered analysis of your communication effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-dxc-purple" />
                  <span className="text-sm font-medium">Talk/Listen Ratio</span>
                </div>
                <span className={`text-sm font-medium ${coachingData.conversationMetrics.talkRatio > 65 ? 'text-amber-600' : 'text-green-600'}`}>
                  {coachingData.conversationMetrics.talkRatio}%
                </span>
              </div>
              <Progress value={coachingData.conversationMetrics.talkRatio} className="h-2" 
                indicator={coachingData.conversationMetrics.talkRatio > 65 ? 'bg-amber-500' : 'bg-green-500'} />
              <p className="text-xs text-muted-foreground">
                {coachingData.conversationMetrics.talkRatio > 65 
                  ? 'Try to listen more than you speak'
                  : 'Good balance of speaking and listening'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-dxc-purple" />
                  <span className="text-sm font-medium">Question Quality</span>
                </div>
                <span className={`text-sm font-medium ${coachingData.conversationMetrics.questionQuality < 70 ? 'text-amber-600' : 'text-green-600'}`}>
                  {coachingData.conversationMetrics.questionQuality}%
                </span>
              </div>
              <Progress value={coachingData.conversationMetrics.questionQuality} className="h-2" 
                indicator={coachingData.conversationMetrics.questionQuality < 70 ? 'bg-amber-500' : 'bg-green-500'} />
              <p className="text-xs text-muted-foreground">
                {coachingData.conversationMetrics.questionQuality < 70
                  ? 'Focus on more open-ended questions'
                  : 'Good use of discovery questions'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Mic className="h-4 w-4 mr-2 text-dxc-purple" />
                  <span className="text-sm font-medium">Listening Skills</span>
                </div>
                <span className={`text-sm font-medium ${coachingData.conversationMetrics.listeningSkills < 70 ? 'text-amber-600' : 'text-green-600'}`}>
                  {coachingData.conversationMetrics.listeningSkills}%
                </span>
              </div>
              <Progress value={coachingData.conversationMetrics.listeningSkills} className="h-2" 
                indicator={coachingData.conversationMetrics.listeningSkills < 70 ? 'bg-amber-500' : 'bg-green-500'} />
              <p className="text-xs text-muted-foreground">
                {coachingData.conversationMetrics.listeningSkills < 70
                  ? 'Try reflecting back what you hear more often'
                  : 'Excellent active listening demonstrated'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-dxc-purple" />
                  <span className="text-sm font-medium">Value Messaging</span>
                </div>
                <span className={`text-sm font-medium ${coachingData.conversationMetrics.valueMessaging < 70 ? 'text-amber-600' : 'text-green-600'}`}>
                  {coachingData.conversationMetrics.valueMessaging}%
                </span>
              </div>
              <Progress value={coachingData.conversationMetrics.valueMessaging} className="h-2" 
                indicator={coachingData.conversationMetrics.valueMessaging < 70 ? 'bg-amber-500' : 'bg-green-500'} />
              <p className="text-xs text-muted-foreground">
                {coachingData.conversationMetrics.valueMessaging < 70
                  ? 'Connect features to business outcomes more clearly'
                  : 'Strong value articulation'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <PieChart className="h-4 w-4 mr-2 text-dxc-purple" />
                  <span className="text-sm font-medium">Overall</span>
                </div>
                <span className={`text-sm font-medium ${coachingData.conversationMetrics.overallScore < 70 ? 'text-amber-600' : 'text-green-600'}`}>
                  {coachingData.conversationMetrics.overallScore}%
                </span>
              </div>
              <Progress value={coachingData.conversationMetrics.overallScore} className="h-2" 
                indicator={coachingData.conversationMetrics.overallScore < 70 ? 'bg-amber-500' : 'bg-green-500'} />
              <p className="text-xs text-muted-foreground">
                {coachingData.conversationMetrics.overallScore < 70
                  ? 'Focus on improvement areas below'
                  : 'Solid performance with room to grow'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-dxc-purple" /> Key Insights & Recommendations
              </CardTitle>
              <CardDescription>
                Specific feedback to improve your client conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coachingData.keyInsights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-md border ${insight.type === 'strength' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="flex items-start gap-3">
                      {insight.type === 'strength' ? (
                        <ThumbsUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Zap className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <Badge className={insight.type === 'strength' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                          {insight.type === 'strength' ? 'Strength' : 'Improvement Area'}
                        </Badge>
                        <p className="mt-1 text-sm">{insight.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Tabs defaultValue="value" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="value">Value Messaging</TabsTrigger>
                  <TabsTrigger value="executive">Executive Conversation</TabsTrigger>
                </TabsList>
                
                {coachingData.improvementSuggestions.map((category) => (
                  <TabsContent key={category.category} value={category.category === 'Value Messaging' ? 'value' : 'executive'}>
                    <div className="space-y-3 pt-3">
                      {category.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-dxc-purple flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-dxc-purple" /> Best Practices Comparison
              </CardTitle>
              <CardDescription>
                How your approach compares to top performers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coachingData.bestPractices.map((practice, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{practice.title}</span>
                      <span>{practice.score}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-dxc-purple rounded-full"
                        style={{ width: `${practice.score}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 left-0 h-full w-px bg-gray-800"
                        style={{ left: `${practice.benchmark}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Your score</span>
                      <span>Benchmark: {practice.benchmark}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-dxc-purple" /> Progress Tracking
              </CardTitle>
              <CardDescription>
                Your conversation effectiveness over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full mt-4">
                <div className="flex h-full items-end pb-4">
                  {coachingData.trendAnalysis.scores.map((score, index) => (
                    <div key={index} className="flex-1 mx-1">
                      <div className="relative h-full flex flex-col justify-end items-center">
                        <div 
                          className="w-full bg-dxc-purple/80 rounded-t"
                          style={{ height: `${score}%` }}
                        ></div>
                        <span className="absolute top-0 -mt-6 text-xs font-medium">{score}%</span>
                      </div>
                      <p className="text-xs text-center mt-2">{coachingData.trendAnalysis.meetings[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <BarChart3 className="h-4 w-4 mr-2 text-dxc-purple" />
                <p className="text-sm text-muted-foreground">
                  Your conversation effectiveness has improved by 
                  <span className="text-green-600 font-medium"> 7%</span> over the last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
