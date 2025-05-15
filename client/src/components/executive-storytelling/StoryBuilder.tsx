
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, PenLine, PresentationIcon, BriefcaseIcon } from "lucide-react";
import { FinancialImpactCalculator } from "./FinancialImpactCalculator";
import { useToast } from "@/hooks/use-toast";

const storySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  clientName: z.string().min(1, { message: "Client name is required." }),
  industry: z.string().min(1, { message: "Industry is required." }),
  situation: z.string().min(10, { message: "Situation must be at least 10 characters." }),
  complication: z.string().min(10, { message: "Complication must be at least 10 characters." }),
  resolution: z.string().min(10, { message: "Resolution must be at least 10 characters." }),
  businessOutcomes: z.string().min(10, { message: "Business outcomes must be at least 10 characters." }),
});

export function StoryBuilder() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("situation");
  
  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      clientName: "",
      industry: "",
      situation: "",
      complication: "",
      resolution: "",
      businessOutcomes: "",
    },
  });

  function onSubmit(values: z.infer<typeof storySchema>) {
    console.log(values);
    toast({
      title: "Story draft saved",
      description: "Your executive story has been saved successfully.",
    });
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scr" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scr">
            <FileText className="h-4 w-4 mr-2" />
            Situation-Complication-Resolution
          </TabsTrigger>
          <TabsTrigger value="financial">
            <PresentationIcon className="h-4 w-4 mr-2" />
            Financial Impact
          </TabsTrigger>
          <TabsTrigger value="success">
            <BriefcaseIcon className="h-4 w-4 mr-2" />
            Success Stories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scr">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenLine className="mr-2 h-5 w-5" />
                Story Framework
              </CardTitle>
              <CardDescription>
                Build your executive story using the Situation-Complication-Resolution framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Story Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a compelling title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Client organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Client industry or vertical" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Tabs defaultValue={activeSection} onValueChange={setActiveSection}>
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="situation">Situation</TabsTrigger>
                      <TabsTrigger value="complication">Complication</TabsTrigger>
                      <TabsTrigger value="resolution">Resolution</TabsTrigger>
                      <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="situation">
                      <FormField
                        control={form.control}
                        name="situation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Situation</FormLabel>
                            <FormDescription>
                              Describe the client's current business context and environment
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Current state of the client's business, strategic initiatives, and market position..." 
                                className="min-h-[200px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="complication">
                      <FormField
                        control={form.control}
                        name="complication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Challenges & Complications</FormLabel>
                            <FormDescription>
                              Outline the challenges, pain points, and business hurdles the client faces
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Specific challenges, business implications, market pressures, and potential risks..." 
                                className="min-h-[200px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="resolution">
                      <FormField
                        control={form.control}
                        name="resolution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>DXC Resolution</FormLabel>
                            <FormDescription>
                              Explain how DXC solutions address the challenges and create value
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="How DXC solutions uniquely solve the business challenges, our approach, key differentiators..." 
                                className="min-h-[200px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="outcomes">
                      <FormField
                        control={form.control}
                        name="businessOutcomes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Outcomes</FormLabel>
                            <FormDescription>
                              Quantify the expected business impact and measurable results
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Specific measurable outcomes, KPIs, ROI metrics, strategic advantages..." 
                                className="min-h-[200px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button">Preview</Button>
                    <Button type="submit">Save Draft</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial">
          <FinancialImpactCalculator />
        </TabsContent>
        
        <TabsContent value="success">
          <Card>
            <CardHeader>
              <CardTitle>Success Story Integration</CardTitle>
              <CardDescription>
                Add relevant case studies and success stories to strengthen your narrative
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Success story integration coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
