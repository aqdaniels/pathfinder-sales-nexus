
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ClientIntelligenceDashboard } from "@/components/client-intelligence/ClientIntelligenceDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Building, Database, Calendar } from "lucide-react";

const ClientIntelligence = () => {
  const [selectedClient, setSelectedClient] = useState("acme-corp");
  const [timeRange, setTimeRange] = useState("30-days");
  const [dataSource, setDataSource] = useState("all");

  const clients = [
    { id: "acme-corp", name: "Acme Corporation" },
    { id: "globex", name: "Globex Industries" },
    { id: "initech", name: "Initech Systems" },
    { id: "massive-dynamic", name: "Massive Dynamic" }
  ];

  return (
    <Layout>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-[220px] border-dashed">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-days">Last 7 days</SelectItem>
                    <SelectItem value="30-days">Last 30 days</SelectItem>
                    <SelectItem value="90-days">Last 90 days</SelectItem>
                    <SelectItem value="12-months">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <Tabs value={dataSource} onValueChange={setDataSource}>
                  <TabsList className="h-8">
                    <TabsTrigger value="all" className="text-xs">All Sources</TabsTrigger>
                    <TabsTrigger value="meetings" className="text-xs">Meetings</TabsTrigger>
                    <TabsTrigger value="emails" className="text-xs">Emails</TabsTrigger>
                    <TabsTrigger value="miq" className="text-xs">Market Intelligence</TabsTrigger>
                    <TabsTrigger value="sfdc" className="text-xs">SFDC</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ClientIntelligenceDashboard />
    </Layout>
  );
};

export default ClientIntelligence;
