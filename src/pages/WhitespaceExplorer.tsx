
import { Layout } from "@/components/layout/Layout";
import { WhitespaceExplorer as WhitespaceExplorerComponent } from "@/components/growth-analyzer/WhitespaceExplorer";

export default function WhitespaceExplorer() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Whitespace Explorer</h1>
          <p className="text-muted-foreground">
            Identify untapped growth opportunities and adjacencies
          </p>
        </div>
        <WhitespaceExplorerComponent 
          client="Acme Corporation" 
          industry="Manufacturing" 
          timeframe="12 months" 
        />
      </div>
    </Layout>
  );
}
