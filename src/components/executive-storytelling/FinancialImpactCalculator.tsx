
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ChartCard, ChartData } from "@/components/dashboard/ChartCard";
import { DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CalculatorInputs = {
  revenueBefore: number;
  revenueGrowth: number;
  costSavings: number;
  productivityGain: number;
  implementationCost: number;
  timeToValue: number;
};

export function FinancialImpactCalculator() {
  const { toast } = useToast();
  const [financialResults, setFinancialResults] = useState<CalculatorInputs | null>(null);
  const [projected, setProjected] = useState<ChartData[]>([]);

  const form = useForm<CalculatorInputs>({
    defaultValues: {
      revenueBefore: 100000000,
      revenueGrowth: 5,
      costSavings: 2000000,
      productivityGain: 10,
      implementationCost: 1000000,
      timeToValue: 6,
    },
  });

  function calculateProjections(data: CalculatorInputs) {
    const years = 5;
    const yearlyProjections: ChartData[] = [];
    
    for (let i = 0; i <= years; i++) {
      const yearLabel = i === 0 ? "Current" : `Year ${i}`;
      const revenueBefore = data.revenueBefore;
      const revenueGrowthPercent = data.revenueGrowth / 100;
      
      // Compound revenue growth
      const projectedRevenue = i === 0 
        ? revenueBefore 
        : revenueBefore * Math.pow(1 + revenueGrowthPercent, i);
      
      // Accumulated savings over time
      const accumulatedSavings = i === 0 ? 0 : data.costSavings * i;
      
      // Productivity impact (simplified calculation)
      const productivityImpact = i === 0 
        ? 0 
        : (revenueBefore * (data.productivityGain / 100)) * i;
      
      // Implementation cost (only in year 1)
      const implementationCost = i === 1 ? data.implementationCost : 0;
      
      // Net impact calculation
      const netImpact = (projectedRevenue - revenueBefore) + 
        accumulatedSavings + 
        productivityImpact - 
        implementationCost;
      
      yearlyProjections.push({
        name: yearLabel,
        value: i === 0 ? 0 : Math.round(netImpact),
      });
    }
    
    return yearlyProjections;
  }

  function onSubmit(data: CalculatorInputs) {
    setFinancialResults(data);
    const projectedData = calculateProjections(data);
    setProjected(projectedData);
    
    toast({
      title: "Financial impact calculated",
      description: "Financial projections have been updated based on your inputs.",
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Financial Impact Calculator
          </CardTitle>
          <CardDescription>
            Quantify the business value of DXC solutions for executive audiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="revenueBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Revenue ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Client's current annual revenue
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="revenueGrowth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Growth Impact (%) - {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={30}
                            step={0.5}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Expected revenue growth from DXC solutions
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="costSavings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Cost Savings ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Projected annual operational cost reduction
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productivityGain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Productivity Gain (%) - {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={50}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Projected workforce productivity improvement
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="implementationCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Implementation Cost ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Total cost of implementation
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeToValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time to Value (months) - {field.value}</FormLabel>
                        <FormControl>
                          <Slider
                            min={1}
                            max={24}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Expected time until the solution delivers value
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Calculate Impact</Button>
              </div>
            </form>
          </Form>
          
          {projected.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium">5-Year Financial Impact Projection</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <ChartCard
                  title="Cumulative Financial Impact"
                  description="Projected value over time"
                  data={projected}
                  type="bar"
                  dataKeys={["value"]}
                  colors={["#10b981"]}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Key Financial Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Total 5-Year Impact:</span>
                        <span className="font-bold text-green-600">
                          ${projected.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Average Annual Return:</span>
                        <span className="font-medium">
                          ${Math.round(projected.reduce((acc, curr) => acc + curr.value, 0) / 5).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Implementation Cost:</span>
                        <span className="font-medium">
                          ${financialResults?.implementationCost.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>ROI (5-Year):</span>
                        <span className="font-bold text-green-600">
                          {Math.round((projected.reduce((acc, curr) => acc + curr.value, 0) / 
                            financialResults!.implementationCost) * 100)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
