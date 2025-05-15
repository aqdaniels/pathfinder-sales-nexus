
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calculator } from "lucide-react";

export function TcoCalculator() {
  const [dxcCost, setDxcCost] = useState(100000);
  const [competitorCost, setCompetitorCost] = useState(125000);
  const [years, setYears] = useState(3);
  
  const dxcYearlyCosts = [
    { year: 1, cost: dxcCost * 0.8 },
    { year: 2, cost: dxcCost * 0.6 },
    { year: 3, cost: dxcCost * 0.6 },
    { year: 4, cost: dxcCost * 0.5 },
    { year: 5, cost: dxcCost * 0.5 },
  ].slice(0, years);
  
  const competitorYearlyCosts = [
    { year: 1, cost: competitorCost * 0.9 },
    { year: 2, cost: competitorCost * 0.7 },
    { year: 3, cost: competitorCost * 0.7 },
    { year: 4, cost: competitorCost * 0.6 },
    { year: 5, cost: competitorCost * 0.6 },
  ].slice(0, years);
  
  const dxcTotalCost = dxcYearlyCosts.reduce((sum, item) => sum + item.cost, 0);
  const competitorTotalCost = competitorYearlyCosts.reduce((sum, item) => sum + item.cost, 0);
  const savings = competitorTotalCost - dxcTotalCost;
  const savingsPercentage = (savings / competitorTotalCost) * 100;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Total Cost of Ownership Analysis</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            TCO Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dxc-cost">DXC Initial Cost</Label>
                <Input
                  id="dxc-cost"
                  type="number"
                  value={dxcCost}
                  onChange={(e) => setDxcCost(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitor-cost">Competitor Initial Cost</Label>
                <Input
                  id="competitor-cost"
                  type="number"
                  value={competitorCost}
                  onChange={(e) => setCompetitorCost(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years">Years to Calculate</Label>
                <Input
                  id="years"
                  type="number"
                  min="1"
                  max="5"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-lg font-medium">TCO Comparison ({years} years)</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>DXC Solution</span>
                      <span>${dxcTotalCost.toLocaleString()}</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Competitor Solution</span>
                      <span>${competitorTotalCost.toLocaleString()}</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
                
                <div className="mt-6 rounded-md bg-muted p-4">
                  <div className="font-medium">Projected Savings with DXC</div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${savings.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600">
                      {savingsPercentage.toFixed(1)}% less than competitor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
