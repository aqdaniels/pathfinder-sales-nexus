
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreMeetingIntelligence } from "./PreMeetingIntelligence";
import { ConversationInsights } from "./ConversationInsights";
import { PostMeetingAnalysis } from "./PostMeetingAnalysis";
import { SalesCoaching } from "./SalesCoaching";
import { MeetingIntelligenceDashboard } from "./MeetingIntelligenceDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users2, Video } from "lucide-react";

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
  const [selectedMeetingId, setSelectedMeetingId] = useState(meetings[0].id);
  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId) || meetings[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Meeting Intelligence & Coaching</h1>
        <p className="text-muted-foreground">
          Enhance client conversations with AI-powered insights and coaching
        </p>
      </div>

      {/* Meeting Selector */}
      <Card className="border-dashed border-2 border-dxc-purple/30">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Select Meeting</h3>
              <Select value={selectedMeetingId} onValueChange={setSelectedMeetingId}>
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select a meeting" />
                </SelectTrigger>
                <SelectContent>
                  {meetings.map((meeting) => (
                    <SelectItem key={meeting.id} value={meeting.id}>
                      {meeting.title} ({meeting.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="h-3.5 w-3.5 text-dxc-purple" />
                <span>{selectedMeeting.date}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Video className="h-3.5 w-3.5 text-dxc-purple" />
                <Badge variant="outline" className="text-xs font-normal">
                  {selectedMeeting.type}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Users2 className="h-3.5 w-3.5 text-dxc-purple" />
                <span>{selectedMeeting.participants.length} participants</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
