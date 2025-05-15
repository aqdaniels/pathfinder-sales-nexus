
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrowthAnalyzer } from "@/components/growth-analyzer/GrowthAnalyzer";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GrowthAnalyzerPage = () => {
  const [selectedClient, setSelectedClient] = useState("acme-corp");
  const navigate = useNavigate();
  
  const clients = [
    { id: "acme-corp", name: "Acme Corporation" },
    { id: "globex", name: "Globex Industries" },
    { id: "initech", name: "Initech Systems" },
    { id: "massive-dynamic", name: "Massive Dynamic" }
  ];

  const handleClientIntelClick = () => {
    navigate("/client-intelligence");
  };

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

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleClientIntelClick} className="text-sm">
                View Client Intelligence
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <GrowthAnalyzer />
    </Layout>
  );
};

export default GrowthAnalyzerPage;
