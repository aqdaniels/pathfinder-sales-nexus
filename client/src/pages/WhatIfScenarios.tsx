
import { Layout } from "@/components/layout/Layout";
import { WhatIfBuilder } from "@/components/growth-analyzer/WhatIfBuilder";

export default function WhatIfScenarios() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">What-If Scenarios</h1>
          <p className="text-muted-foreground">
            Model different strategic approaches and their potential outcomes
          </p>
        </div>
        <WhatIfBuilder 
          client="Acme Corporation" 
          industry="Technology" 
          timeframe="5-year" 
        />
      </div>
    </Layout>
  );
}
