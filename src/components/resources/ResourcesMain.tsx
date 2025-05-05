
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeSharing } from "../meeting-intelligence/KnowledgeSharing";

export function ResourcesMain() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">
          Knowledge sharing and helpful resources for your team
        </p>
      </div>

      <Tabs defaultValue="knowledge-sharing" className="space-y-4">
        <TabsList className="grid grid-cols-1 w-full">
          <TabsTrigger value="knowledge-sharing">Knowledge Sharing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="knowledge-sharing">
          <KnowledgeSharing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
