
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, Calendar as CalendarIcon, FileCheck, MessageSquare, PieChart, Users2 } from "lucide-react";

// Sample data - in a real app, this would come from your backend
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
    participants: ["David Lee", "Emma Watson"],
  },
  {
    id: "m3",
    title: "Global Industries - Quarterly Review",
    date: "May 02, 2025",
    type: "Review",
    participants: ["Jennifer Davis", "Mark Wilson"],
  },
];

export function MeetingIntelligenceDashboard() {
  const navigate = useNavigate();

  const navigateToView = (meetingId: string, view: string) => {
    // In a real app, you'd likely want to use state management to set the active meeting
    navigate(`/meeting-intelligence?meeting=${meetingId}&view=${view}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Meeting Selection</CardTitle>
          <CardDescription>Select a meeting and view intelligence reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a meeting" />
              </SelectTrigger>
              <SelectContent>
                {meetings.map((meeting) => (
                  <SelectItem key={meeting.id} value={meeting.id}>
                    <div className="flex flex-col gap-1">
                      <span>{meeting.title}</span>
                      <span className="text-xs text-muted-foreground">{meeting.date}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {meetings.map((meeting) => (
              <Card key={meeting.id} className="border border-dashed">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{meeting.date}</span>
                          <Badge variant="outline">{meeting.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users2 className="h-4 w-4" />
                          <span>{meeting.participants.join(", ")}</span>
                        </div>
                      </div>
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
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Meetings
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Talk Ratio
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58:42</div>
            <p className="text-xs text-muted-foreground">
              You speak 58% of the time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Meeting Score
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">
              +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Opportunity Rate
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Meeting Performance Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center rounded-md">
              <p className="text-sm text-muted-foreground">Performance chart will appear here</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Improvement Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Value Articulation</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-dxc-purple h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Executive Engagement</span>
                    <span className="text-sm font-medium">58%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-dxc-purple h-2.5 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Discovery Questions</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-dxc-purple h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Active Listening</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-dxc-purple h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
