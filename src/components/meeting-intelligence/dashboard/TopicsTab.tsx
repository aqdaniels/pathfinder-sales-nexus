
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

type TopicData = {
  name: string;
  count: number;
  sentiment: number;
};

type TopicsTabProps = {
  topTopics: TopicData[];
};

export function TopicsTab({ topTopics }: TopicsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Discussed Topics</CardTitle>
        <CardDescription>What clients are talking about most</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topTopics.map((topic) => (
            <div key={topic.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{topic.name}</span>
                <Badge variant={topic.sentiment > 75 ? "success" : "warning"}>
                  {topic.sentiment}% positive
                </Badge>
              </div>
              <Progress value={topic.sentiment} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mentioned {topic.count} times</span>
                <span>{topic.sentiment > 75 ? "Positive reception" : "Mixed reception"}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Based on analysis of last 30 days of meetings
        </div>
        <Button variant="outline" size="sm">
          View All Topics <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
