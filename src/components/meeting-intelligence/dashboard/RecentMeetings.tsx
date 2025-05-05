
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MeetingCard, type Meeting } from "./MeetingCard";
import { ThumbsUp } from "lucide-react";

type RecentMeetingsProps = {
  meetings: Meeting[];
};

export function RecentMeetings({ meetings }: RecentMeetingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Client Meetings</CardTitle>
        <CardDescription>Select a meeting to see detailed intelligence</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
