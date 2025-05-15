
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendsTab } from "./TrendsTab";
import { TopicsTab } from "./TopicsTab";
import { ImprovementTab } from "./ImprovementTab";

type TrendDataPoint = {
  month: string;
  sentiment: number;
  engagement: number;
};

type TopicData = {
  name: string;
  count: number;
  sentiment: number;
};

type InsightsTabsProps = {
  trendData: TrendDataPoint[];
  topTopics: TopicData[];
};

export function InsightsTabs({ trendData, topTopics }: InsightsTabsProps) {
  return (
    <Tabs defaultValue="trends" className="space-y-4">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="trends">Communication Trends</TabsTrigger>
        <TabsTrigger value="topics">Key Topics</TabsTrigger>
        <TabsTrigger value="improvement">Improvement Areas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="trends">
        <TrendsTab trendData={trendData} />
      </TabsContent>
      
      <TabsContent value="topics">
        <TopicsTab topTopics={topTopics} />
      </TabsContent>
      
      <TabsContent value="improvement">
        <ImprovementTab />
      </TabsContent>
    </Tabs>
  );
}
