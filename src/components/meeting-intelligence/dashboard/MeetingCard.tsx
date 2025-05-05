
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  MessageSquare, 
  FileCheck, 
  PieChart, 
  Users2,
  ThumbsUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export type Meeting = {
  id: string;
  title: string;
  date: string;
  type: string;
  participants: string[];
  sentiment: number;
  talkRatio: number;
  keyTopics: string[];
  meetingScore: number;
  insights: string[];
};

type MeetingCardProps = {
  meeting: Meeting;
};

export function MeetingCard({ meeting }: MeetingCardProps) {
  const navigate = useNavigate();

  const navigateToView = (meetingId: string, view: string) => {
    navigate(`/meeting-intelligence?meeting=${meetingId}&view=${view}`);
  };

  return (
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
  );
}
