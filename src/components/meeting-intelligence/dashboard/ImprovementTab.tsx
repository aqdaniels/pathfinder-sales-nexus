
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

export function ImprovementTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Improvement Areas</CardTitle>
        <CardDescription>Focus on these areas to improve client engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Value Articulation</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Be more explicit about specific value metrics when discussing solutions
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Executive Engagement</span>
                <span className="text-sm font-medium">58%</span>
              </div>
              <Progress value={58} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Tailor communication to executive concerns like ROI and strategic impact
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Discovery Questions</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Ask more open-ended questions to uncover underlying business challenges
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Active Listening</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Continue strong active listening practices to build client trust
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Get Personalized Coaching <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
