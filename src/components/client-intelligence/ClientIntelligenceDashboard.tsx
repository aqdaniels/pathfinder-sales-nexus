
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunitySignals } from "./dashboard/OpportunitySignals";
import { RelationshipInsights } from "./dashboard/RelationshipInsights";
import { NextBestActions } from "./dashboard/NextBestActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Bell, CalendarRange, Search, Sparkles } from "lucide-react";
import { ClientOverview } from "./dashboard/ClientOverview";
import { Badge } from "../ui/badge";

export function ClientIntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Intelligence</h1>
        <p className="text-muted-foreground mt-1">
          Actionable insights from client conversations and interactions
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarRange className="h-4 w-4" />
            Last 30 days
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Refresh Insights</Button>
          <Button size="sm" className="gap-1">
            <Sparkles className="h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <Bell className="h-4 w-4" />
        <AlertTitle>New insights available</AlertTitle>
        <AlertDescription>
          7 new insights have been identified from recent meetings with Acme Corp, including budget discussions and competitive mentions.
        </AlertDescription>
      </Alert>

      <ClientOverview />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunity Signals</TabsTrigger>
            <TabsTrigger value="relationships">Relationship Insights</TabsTrigger>
            <TabsTrigger value="actions">Next Best Actions</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1">
              <Bell className="h-3 w-3" />
              12 New
            </Badge>
            <Badge variant="outline">High Priority: 5</Badge>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Opportunity Signals</CardTitle>
                  <CardDescription>What matters now</CardDescription>
                </CardHeader>
                <CardContent>
                  <OpportunitySignals limit={3} />
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("opportunities")}>
                      View all opportunity signals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Relationship Insights</CardTitle>
                  <CardDescription>Who matters now</CardDescription>
                </CardHeader>
                <CardContent>
                  <RelationshipInsights limit={3} />
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("relationships")}>
                      View all relationship insights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Next Best Actions</CardTitle>
                  <CardDescription>What to do now</CardDescription>
                </CardHeader>
                <CardContent>
                  <NextBestActions limit={3} />
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("actions")}>
                      View all recommended actions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Signals</CardTitle>
              <CardDescription>
                Client challenges, budget discussions, and strategic initiatives detected from recent conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitySignals />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships">
          <Card>
            <CardHeader>
              <CardTitle>Relationship Insights</CardTitle>
              <CardDescription>
                Key stakeholders, sentiment trends, and engagement opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RelationshipInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Next Best Actions</CardTitle>
              <CardDescription>
                Prioritized recommendations based on detected signals and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NextBestActions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
