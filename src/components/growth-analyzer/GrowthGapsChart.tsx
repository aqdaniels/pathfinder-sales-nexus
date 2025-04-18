
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine, Label } from "recharts";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for growth gaps chart
const getGrowthGapsData = (client: string, industry: string, timeframe: string) => {
  // This would be replaced with real API calls
  return [
    {
      segment: "Cloud Infrastructure",
      clientGrowth: 5.2,
      marketGrowth: 12.6,
      gap: 7.4,
      opportunity: "$24.5M"
    },
    {
      segment: "Application Services",
      clientGrowth: 8.9,
      marketGrowth: 10.3,
      gap: 1.4,
      opportunity: "$8.7M"
    },
    {
      segment: "Security Services",
      clientGrowth: 14.2,
      marketGrowth: 17.8,
      gap: 3.6,
      opportunity: "$12.3M"
    },
    {
      segment: "Data Services",
      clientGrowth: 9.1,
      marketGrowth: 18.2,
      gap: 9.1,
      opportunity: "$31.6M"
    },
    {
      segment: "IoT Solutions",
      clientGrowth: 6.8,
      marketGrowth: 22.5,
      gap: 15.7,
      opportunity: "$42.1M"
    }
  ];
};

type GrowthGapsChartProps = {
  client: string;
  industry: string;
  timeframe: string;
};

export const GrowthGapsChart = ({ client, industry, timeframe }: GrowthGapsChartProps) => {
  const data = getGrowthGapsData(client, industry, timeframe);
  
  // Calculate the largest gap for insights
  const largestGap = [...data].sort((a, b) => b.gap - a.gap)[0];

  const chartConfig = {
    clientGrowth: {
      label: "Client Growth",
      theme: {
        light: "#7E69AB",
        dark: "#7E69AB"
      }
    },
    marketGrowth: {
      label: "Market Growth",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Portfolio Growth Gaps Analysis</span>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-1" />
              Methodology
            </Button>
          </CardTitle>
          <CardDescription>
            Comparing client growth rates to market benchmarks across portfolio segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer
              config={chartConfig}
            >
              <BarChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="segment" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                  label={{ value: 'Growth Rate (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(value) => `${value} Segment`}
                      formatter={(value, name) => [`${value}%`, name === "clientGrowth" ? "Client Growth" : "Market Growth"]}
                    />
                  }
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => (value === "clientGrowth" ? "Client Growth" : "Market Growth")}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="clientGrowth" 
                  name="clientGrowth"
                  fill="var(--color-clientGrowth)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="marketGrowth" 
                  name="marketGrowth"
                  fill="var(--color-marketGrowth)" 
                  radius={[4, 4, 0, 0]}
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#666" 
                  yAxisId="left"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Key Insight</AlertTitle>
        <AlertDescription>
          <p className="mb-1">
            The <strong>{largestGap.segment}</strong> segment shows the largest growth gap of <strong>{largestGap.gap}%</strong> between client performance ({largestGap.clientGrowth}%) and market growth ({largestGap.marketGrowth}%).
          </p>
          <p>
            Estimated opportunity value: <strong>{largestGap.opportunity}</strong> in incremental revenue over the selected timeframe.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
};
