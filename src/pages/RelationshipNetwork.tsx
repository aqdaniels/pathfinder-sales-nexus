
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { RelationshipNetworkVisualization } from "@/components/relationship-network/RelationshipNetworkVisualization";
import { OnboardingWelcome } from "@/components/relationship-network/OnboardingWelcome";
import { NetworkControls } from "@/components/relationship-network/NetworkControls";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";

export default function RelationshipNetwork() {
  const [searchParams] = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(!searchParams.get('skipWelcome'));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relationship Network</h1>
          <p className="text-muted-foreground">
            Map key stakeholders and relationship connections
          </p>
        </div>
        
        {showOnboarding ? (
          <OnboardingWelcome onComplete={() => setShowOnboarding(false)} />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <Card className="h-[700px] overflow-hidden">
                <RelationshipNetworkVisualization />
              </Card>
            </div>
            <div className="xl:col-span-1">
              <NetworkControls />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
