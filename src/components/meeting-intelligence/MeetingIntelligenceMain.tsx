
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreMeetingIntelligence } from "./PreMeetingIntelligence";
import { ConversationInsights } from "./ConversationInsights";
import { PostMeetingAnalysis } from "./PostMeetingAnalysis";
import { SalesCoaching } from "./SalesCoaching";
import { MeetingIntelligenceDashboard } from "./MeetingIntelligenceDashboard";

// Sample meeting data
const meetings = [
  {
    id: "m1",
    title: "Acme Corp - Strategic Planning",
    date: "Apr 15, 2025",
    type: "Discovery",
    participants: ["John Smith", "Sarah Wong", "Michael Chen"],
  },
  {
    id: "m2",
    title: "TechSolutions Inc - Product Demo",
    date: "Apr 22, 2025",
    type: "Demo",
    participants: ["David Lee", "Emma Watson", "Robert Brown"],
  },
  {
    id: "m3",
    title: "Global Industries - Quarterly Review",
    date: "May 02, 2025",
    type: "Review",
    participants: ["Jennifer Davis", "Mark Wilson", "Lisa Anderson"],
  },
  {
    id: "m4",
    title: "Startup XYZ - Initial Consultation",
    date: "May 05, 2025",
    type: "Discovery",
    participants: ["Alex Turner", "Olivia Martinez", "Daniel White"],
  },
];

export function MeetingIntelligenceMain() {
  // Using a fixed meeting instead of selection
  const selectedMeeting = meetings[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Meeting Intelligence & Coaching</h1>
        <p className="text-muted-foreground">
          Enhance client conversations with AI-powered insights and coaching
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pre-meeting">Pre-Meeting Intel</TabsTrigger>
          <TabsTrigger value="conversation">Conversation Insights</TabsTrigger>
          <TabsTrigger value="post-meeting">Post-Meeting Analysis</TabsTrigger>
          <TabsTrigger value="coaching">Sales Coaching</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <MeetingIntelligenceDashboard />
        </TabsContent>
        
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
      </Tabs>
    </div>
  );
}
