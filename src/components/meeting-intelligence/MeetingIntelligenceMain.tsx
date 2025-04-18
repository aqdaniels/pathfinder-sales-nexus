
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreMeetingIntelligence } from "./PreMeetingIntelligence";
import { ConversationInsights } from "./ConversationInsights";
import { PostMeetingAnalysis } from "./PostMeetingAnalysis";
import { SalesCoaching } from "./SalesCoaching";
import { KnowledgeSharing } from "./KnowledgeSharing";

export function MeetingIntelligenceMain() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Meeting Intelligence & Coaching</h1>
        <p className="text-muted-foreground">
          Enhance client conversations with AI-powered insights and coaching
        </p>
      </div>

      <Tabs defaultValue="pre-meeting" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="pre-meeting">Pre-Meeting Intel</TabsTrigger>
          <TabsTrigger value="conversation">Conversation Insights</TabsTrigger>
          <TabsTrigger value="post-meeting">Post-Meeting Analysis</TabsTrigger>
          <TabsTrigger value="coaching">Sales Coaching</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Sharing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pre-meeting">
          <PreMeetingIntelligence />
        </TabsContent>
        
        <TabsContent value="conversation">
          <ConversationInsights />
        </TabsContent>
        
        <TabsContent value="post-meeting">
          <PostMeetingAnalysis />
        </TabsContent>
        
        <TabsContent value="coaching">
          <SalesCoaching />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <KnowledgeSharing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
