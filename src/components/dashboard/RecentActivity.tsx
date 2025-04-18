
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "meeting" | "recommendation" | "competitive" | "client";
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
};

const activities: Activity[] = [
  {
    id: "1",
    title: "Acme Corp Meeting Analysis",
    description: "New insights detected from yesterday's executive meeting",
    time: "25 min ago",
    type: "meeting",
    user: {
      name: "Sarah Chen",
      initials: "SC",
    },
  },
  {
    id: "2",
    title: "GlobalTech Portfolio Match",
    description: "High confidence match with Cloud Transformation offering",
    time: "2 hours ago",
    type: "recommendation",
    user: {
      name: "Michael Kim",
      initials: "MK",
    },
  },
  {
    id: "3",
    title: "Competitor Update: Accenture",
    description: "New positioning in the Data & AI space detected",
    time: "Yesterday",
    type: "competitive",
    user: {
      name: "James Wilson",
      initials: "JW",
    },
  },
  {
    id: "4",
    title: "BankCo SWOT Analysis",
    description: "Updated with new market insights and opportunities",
    time: "2 days ago",
    type: "client",
    user: {
      name: "Emma Davis",
      initials: "ED",
    },
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "meeting":
      return "bg-blue-100 text-blue-600";
    case "recommendation":
      return "bg-green-100 text-green-600";
    case "competitive":
      return "bg-red-100 text-red-600";
    case "client":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-md p-3 hover:bg-muted/50 transition-colors"
            >
              <Avatar className={getActivityIcon(activity.type)}>
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  {activity.time} · {activity.user.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
