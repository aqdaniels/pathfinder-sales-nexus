
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompetitorMatrix } from "./CompetitorMatrix";
import { ValueProposition } from "./ValueProposition";
import { TcoCalculator } from "./TcoCalculator";
import { ObjectionHandler } from "./ObjectionHandler";
import { FileDown } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function BattlecardGenerator() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Competitive Battlecard Generator
          </h1>
          <p className="text-muted-foreground">
            Create focused, actionable battlecards for competitive scenarios
          </p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="value">Value Proposition</TabsTrigger>
          <TabsTrigger value="tco">TCO Analysis</TabsTrigger>
          <TabsTrigger value="objections">Objection Handling</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Recent Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last quarter
                    </p>
                  </CardContent>
                </Card>
                {/* Will add more stats cards here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <CompetitorMatrix />
        </TabsContent>

        <TabsContent value="value">
          <ValueProposition />
        </TabsContent>

        <TabsContent value="tco">
          <TcoCalculator />
        </TabsContent>

        <TabsContent value="objections">
          <ObjectionHandler />
        </TabsContent>
      </Tabs>
    </div>
  );
}
