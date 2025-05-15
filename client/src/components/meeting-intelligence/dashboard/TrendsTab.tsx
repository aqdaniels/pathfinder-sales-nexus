
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type TrendDataPoint = {
  month: string;
  sentiment: number;
  engagement: number;
};

type TrendsTabProps = {
  trendData: TrendDataPoint[];
};

export function TrendsTab({ trendData }: TrendsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Sentiment & Engagement Trends</CardTitle>
        <CardDescription>How your communication resonates over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative bg-muted/20 rounded-md flex items-center justify-center">
          <div className="absolute inset-0 p-6">
            <div className="flex justify-between">
              {trendData.map((data, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-2">{data.month}</div>
                  <div className="relative h-[200px] w-16">
                    <div 
                      className="absolute bottom-0 w-6 bg-dxc-purple rounded-t-sm" 
                      style={{ height: `${data.sentiment * 2}px`, left: 0 }} 
                    />
                    <div 
                      className="absolute bottom-0 w-6 bg-blue-400 rounded-t-sm" 
                      style={{ height: `${data.engagement * 2}px`, right: 0 }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-dxc-purple rounded-sm" />
                <span className="text-xs">Client Sentiment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                <span className="text-xs">Engagement Score</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">
          View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
