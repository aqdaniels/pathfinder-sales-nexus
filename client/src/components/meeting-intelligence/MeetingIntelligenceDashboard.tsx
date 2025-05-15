
import { 
  BarChart3, 
  ThumbsUp 
} from "lucide-react";
import { RecentMeetings } from "./dashboard/RecentMeetings";
import { StatCards } from "./dashboard/StatCards";
import { InsightsTabs } from "./dashboard/InsightsTabs";

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
  return (
    <div className="space-y-6">
      {/* 1. Meeting Metrics */}
      <StatCards />

      {/* 2. Visualization Tabs */}
      <InsightsTabs trendData={trendData} topTopics={topTopics} />

      {/* 3. Recent Meetings Timeline */}
      <RecentMeetings meetings={meetings} />
    </div>
  );
}
