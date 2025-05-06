
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, LineChart, MessageSquare, TrendingUp } from "lucide-react";

export function ClientOverview() {
  // This would come from API/context in a real implementation
  const clientData = {
    name: "Acme Corporation",
    industry: "Manufacturing",
    relationshipScore: 72,
    opportunityScore: 84,
    engagementTrend: "up",
    lastInteraction: "3 days ago",
    upcomingMeeting: "Apr 24, 2025",
    activeOpportunities: 3,
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={clientData.name} />
            <AvatarFallback className="text-lg bg-blue-100 text-blue-800">AC</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{clientData.name}</h2>
                <p className="text-muted-foreground">{clientData.industry}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <CalendarRange className="h-3 w-3" /> 
                  Next: {clientData.upcomingMeeting}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MessageSquare className="h-3 w-3" /> 
                  Last: {clientData.lastInteraction}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Relationship Health</span>
                  <span className="font-medium">{clientData.relationshipScore}%</span>
                </div>
                <Progress value={clientData.relationshipScore} className="h-2" />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  Improving over last 60 days
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Opportunity Signals</span>
                  <span className="font-medium">{clientData.opportunityScore}%</span>
                </div>
                <Progress value={clientData.opportunityScore} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  12 signals detected recently
                </p>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-2xl font-semibold">{clientData.activeOpportunities}</div>
                <div className="text-sm text-muted-foreground">Active Opportunities</div>
              </div>
              
              <div className="flex items-center justify-end">
                <Badge className="gap-1 cursor-pointer" variant="outline">
                  <LineChart className="h-3 w-3" />
                  View Full Client Profile
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
