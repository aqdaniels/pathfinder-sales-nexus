
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, Presentation, FileCheck, BadgeHelp } from "lucide-react";

export function DeliveryCoaching() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Presentation className="mr-2 h-5 w-5" />
            Presentation Delivery Coaching
          </CardTitle>
          <CardDescription>
            Guidance to effectively deliver your executive value story
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="keypoints" className="space-y-4">
            <TabsList>
              <TabsTrigger value="keypoints">Key Points</TabsTrigger>
              <TabsTrigger value="questions">Anticipated Questions</TabsTrigger>
              <TabsTrigger value="visuals">Visual Aids</TabsTrigger>
              <TabsTrigger value="followup">Follow-up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="keypoints">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Emphasize These Key Points
                  </CardTitle>
                  <CardDescription>
                    Critical elements to highlight during your presentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Opening (2 minutes)</h3>
                      <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                        <li>Start with a compelling business insight relevant to the executive's priorities</li>
                        <li>Immediately establish the business connection, not technology</li>
                        <li>Preview the key business outcomes you'll demonstrate</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Business Context (3 minutes)</h3>
                      <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                        <li>Demonstrate understanding of their industry challenges and trends</li>
                        <li>Reference relevant benchmarks and competitive pressures</li>
                        <li>Connect to specific strategic initiatives they've communicated</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Value Proposition (5 minutes)</h3>
                      <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                        <li>Focus on business transformation, not technology implementation</li>
                        <li>Quantify financial impact with clear, credible metrics</li>
                        <li>Highlight risk reduction and competitive advantage</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Proof Points (3 minutes)</h3>
                      <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                        <li>Share relevant success stories from similar organizations</li>
                        <li>Emphasize measured results, not promised outcomes</li>
                        <li>Connect case studies directly to their situation</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Call to Action (2 minutes)</h3>
                      <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                        <li>Propose clear, specific next steps</li>
                        <li>Focus on low-risk, high-value starting points</li>
                        <li>Connect immediate actions to long-term vision</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BadgeHelp className="mr-2 h-4 w-4" />
                    Anticipated Questions & Responses
                  </CardTitle>
                  <CardDescription>
                    Prepare for likely executive questions with these structured responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="question-1">
                      <AccordionTrigger className="text-base font-medium">
                        "What makes this different from what we've tried before?"
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Recommended Response</h4>
                                <p className="text-muted-foreground">
                                  "Unlike previous initiatives that focused on [specific limitation], our approach addresses [key differentiator] through [unique methodology]. We've helped similar organizations achieve [specific outcome] where previous attempts stalled because we combine [technology advantage] with [business process insight] and [change management approach]."
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Supporting Evidence</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Reference specific case study where we succeeded after others failed</li>
                              <li>Highlight unique IP or accelerators that didn't exist previously</li>
                              <li>Mention industry analyst recognition of our differentiated approach</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="question-2">
                      <AccordionTrigger className="text-base font-medium">
                        "How confident are you in these financial projections?"
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Recommended Response</h4>
                                <p className="text-muted-foreground">
                                  "These projections are based on [data source] and validated against [benchmark source]. We've applied a [X%] conservative adjustment to account for implementation variables. We've achieved similar or better results with [reference client] who had comparable [industry/size/complexity]. I'm confident enough that I'd be willing to discuss outcome-based metrics as part of our agreement."
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Supporting Evidence</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Detailed ROI methodology documentation</li>
                              <li>Sensitivity analysis showing different scenarios</li>
                              <li>Performance metrics from similar implementations</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="question-3">
                      <AccordionTrigger className="text-base font-medium">
                        "What are the biggest risks we should be concerned about?"
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Recommended Response</h4>
                                <p className="text-muted-foreground">
                                  "The three most important risk factors are: First, [organizational change risk] which we mitigate through [specific approach]. Second, [technical integration risk] which we address by [technical strategy]. Third, [timeline risk] which we manage through [methodology element]. We've developed this risk management approach based on lessons learned from over [X] similar implementations."
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Supporting Evidence</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Risk register with mitigation strategies</li>
                              <li>Change management and governance framework</li>
                              <li>Examples of successful risk mitigation from similar projects</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="question-4">
                      <AccordionTrigger className="text-base font-medium">
                        "Why should we do this now instead of waiting?"
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Recommended Response</h4>
                                <p className="text-muted-foreground">
                                  "Every [time period] of delay costs approximately [quantified opportunity cost] in [specific metrics]. Beyond direct financial impact, market trends show [competitive threat] accelerating, with [specific competitors] already implementing similar initiatives. Our analysis shows your [key metric] could [positive/negative outcome] by [percentage] within [timeframe] if action is [taken/not taken] now."
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Supporting Evidence</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Opportunity cost calculation methodology</li>
                              <li>Competitive intelligence on industry adoption rates</li>
                              <li>Trend analysis showing widening performance gap over time</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="visuals">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Presentation className="mr-2 h-4 w-4" />
                    Visual Aid Recommendations
                  </CardTitle>
                  <CardDescription>
                    Effective visualization approaches for executive presentations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Executive Dashboard View</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Create a one-page visual summary of the entire business case with these elements:
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Current vs. future state indicators for 3-5 key metrics</li>
                        <li>Timeline showing key milestones and value realization points</li>
                        <li>Financial summary with ROI, payback period, and 3-year projection</li>
                        <li>Risk/benefit quadrant positioning the initiative</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Data Visualization Principles</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Use no more than 2-3 visuals per executive-level slide</li>
                        <li>Focus on outcome metrics rather than activity metrics</li>
                        <li>Remove all non-essential elements from charts</li>
                        <li>Use consistent color coding (red/amber/green) across all visuals</li>
                        <li>Include benchmark comparisons wherever possible</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Effective Chart Types</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-1">For Financial Impact</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            <li>Waterfall charts for cost/benefit analysis</li>
                            <li>Area charts for cumulative benefit over time</li>
                            <li>Stacked bar charts for multiple value streams</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">For Strategic Impact</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            <li>2x2 matrices for strategic positioning</li>
                            <li>Radar charts for capability enhancement</li>
                            <li>Timeline visualizations for transformation journey</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="followup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Follow-up Recommendations
                  </CardTitle>
                  <CardDescription>
                    Effective next steps and follow-up strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Within 24 Hours</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Send concise email summary with 3 key points and visual dashboard</li>
                        <li>Provide answers to any questions that required follow-up</li>
                        <li>Share any additional success stories mentioned during the discussion</li>
                        <li>Propose specific next steps and request feedback</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Within One Week</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Schedule follow-up meeting with expanded stakeholder group</li>
                        <li>Provide more detailed implementation approach document</li>
                        <li>Share relevant thought leadership content on key topics discussed</li>
                        <li>Introduce subject matter experts for specific areas of interest</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Executive Summary Template</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Include these sections in your follow-up executive summary:
                      </p>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Business context and strategic drivers (1 paragraph)</li>
                        <li>Value proposition with quantified outcomes (3-5 bullet points)</li>
                        <li>Implementation approach overview (1 paragraph)</li>
                        <li>Financial summary with key metrics (1 visual)</li>
                        <li>Clear recommended next steps with timeline (3-4 bullet points)</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
