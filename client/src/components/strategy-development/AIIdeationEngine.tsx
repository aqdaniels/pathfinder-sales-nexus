
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { 
  Sparkles, 
  Brain, 
  RefreshCw, 
  Layers, 
  PlusCircle,
  Star,
  Scale,
  FileCheck,
  ArrowRight,
  Check,
  Download,
  Copy
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Sample ideation data
const sampleIdeas = [
  {
    id: 1,
    title: "Cloud-Native Application Modernization",
    description: "Platform for transitioning legacy applications to cloud-native architecture using containerization, microservices, and CI/CD pipelines.",
    businessValue: [
      "Reduce infrastructure costs by 35%",
      "Decrease time-to-market for new features by 60%",
      "Improve system reliability with 99.9% uptime guarantee"
    ],
    relevantAssets: ["DXC Platform X", "API Factory", "Intelligent Automation Studio"],
    industryRelevance: ["Banking", "Insurance", "Healthcare", "Manufacturing"],
    confidence: 87,
    tags: ["Modernization", "Cloud", "DevOps"]
  },
  {
    id: 2,
    title: "Intelligent Document Processing Solution",
    description: "AI-powered system that extracts, classifies, and processes data from unstructured documents with minimal human intervention.",
    businessValue: [
      "Reduce manual processing costs by 75%",
      "Improve data accuracy by 95%",
      "Process documents 24x7 with consistent quality"
    ],
    relevantAssets: ["DXC Document AI", "Machine Learning Studio", "Process Analytics Suite"],
    industryRelevance: ["Insurance", "Finance", "Legal", "Healthcare"],
    confidence: 92,
    tags: ["AI/ML", "Automation", "Analytics"]
  },
  {
    id: 3,
    title: "Predictive Maintenance Platform",
    description: "IoT-based system that monitors equipment health, predicts failures, and schedules maintenance to prevent costly downtime.",
    businessValue: [
      "Reduce unplanned downtime by 40%",
      "Extend equipment lifespan by 25%",
      "Optimize maintenance resource allocation"
    ],
    relevantAssets: ["DXC IoT Hub", "Predictive Analytics Engine", "Field Service Optimization"],
    industryRelevance: ["Manufacturing", "Energy", "Transportation", "Utilities"],
    confidence: 84,
    tags: ["IoT", "Analytics", "Automation"]
  }
];

export function AIIdeationEngine() {
  const [clientContext, setClientContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [innovation, setInnovation] = useState(70);
  const [practicality, setPracticality] = useState(80);
  const [generatedIdeas, setGeneratedIdeas] = useState(sampleIdeas);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [activeTab, setActiveTab] = useState("idea-generation");

  const generateIdeas = () => {
    setIsGenerating(true);
    
    // Simulate idea generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      // In a real implementation, this would call an AI service
    }, 2500);
  };

  const handleSelectIdea = (idea) => {
    setSelectedIdea(idea);
    setActiveTab("idea-details");
  };

  const handleCreateVariant = () => {
    // This would generate a variation of the selected idea
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In a real implementation, this would call an AI service
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="idea-generation">Idea Generation</TabsTrigger>
          <TabsTrigger value="idea-details">Idea Details</TabsTrigger>
          <TabsTrigger value="saved-ideas">Saved Ideas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="idea-generation" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Client context input */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Client Context</CardTitle>
                <CardDescription>
                  Provide details about the client and their challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Challenge</label>
                    <Textarea 
                      placeholder="Describe the client's primary business challenges and objectives..."
                      value={clientContext}
                      onChange={(e) => setClientContext(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Constraints</label>
                    <Textarea 
                      placeholder="Describe any technical, budget, timeline, or organizational constraints..."
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Generation parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Generation Parameters</CardTitle>
                <CardDescription>
                  Adjust settings to tailor idea generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="flex justify-between">
                      <span className="text-sm font-medium">Innovation Level</span>
                      <span className="text-sm">{innovation}%</span>
                    </label>
                    <Slider
                      value={[innovation]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(values) => setInnovation(values[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative</span>
                      <span>Disruptive</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex justify-between">
                      <span className="text-sm font-medium">Practicality</span>
                      <span className="text-sm">{practicality}%</span>
                    </label>
                    <Slider
                      value={[practicality]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(values) => setPracticality(values[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conceptual</span>
                      <span>Implementable</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Industry Focus</label>
                    <div className="flex flex-wrap gap-2">
                      {["Healthcare", "Banking", "Insurance", "Manufacturing", "Retail", "Transportation"].map(industry => (
                        <Badge key={industry} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                          {industry}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="cursor-pointer">
                        <PlusCircle className="h-3 w-3 mr-1" />
                        <span>Add</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generateIdeas} 
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Ideas
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Generated ideas */}
          <Card>
            <CardHeader>
              <CardTitle>
                Generated Solution Concepts
                {isGenerating && (
                  <Badge variant="outline" className="ml-2 bg-yellow-50">
                    <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                    Generating
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                AI-powered solution concepts based on client context
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedIdeas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="mx-auto h-12 w-12 opacity-20 mb-3" />
                  <p>No ideas generated yet. Provide client context and generate ideas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {generatedIdeas.map(idea => (
                    <Card 
                      key={idea.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow border-2"
                      onClick={() => handleSelectIdea(idea)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {idea.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-1">Confidence:</span>
                            <span className="font-medium">{idea.confidence}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {idea.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Layers className="h-4 w-4 mr-1" />
                            <span>{idea.relevantAssets.length} DXC assets</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="idea-details" className="space-y-6">
          {selectedIdea ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedIdea.title}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {selectedIdea.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </Button>
                      <Button size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        Save Idea
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Solution Description</h3>
                      <p className="text-gray-600">{selectedIdea.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Business Value</h3>
                        <ul className="space-y-2">
                          {selectedIdea.businessValue.map((value, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>{value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Industry Relevance</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedIdea.industryRelevance.map((industry, idx) => (
                            <Badge key={idx} variant="outline">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">DXC Assets & IP</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedIdea.relevantAssets.map((asset, idx) => (
                          <Card key={idx} className="bg-gray-50">
                            <CardContent className="p-3 flex items-center">
                              <FileCheck className="h-5 w-5 text-primary mr-2" />
                              <span className="text-sm">{asset}</span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Pros</h3>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600">
                            • Leverages existing DXC capabilities and accelerators
                          </li>
                          <li className="text-sm text-gray-600">
                            • Addresses immediate pain points while enabling future growth
                          </li>
                          <li className="text-sm text-gray-600">
                            • Proven approach with reference implementations
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Cons</h3>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600">
                            • Requires organizational change management
                          </li>
                          <li className="text-sm text-gray-600">
                            • Initial investment needed before full ROI is realized
                          </li>
                          <li className="text-sm text-gray-600">
                            • May require integration with legacy systems
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Variants</CardTitle>
                    <CardDescription>
                      Create alternative versions of this solution concept
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleCreateVariant}
                        >
                          <Scale className="mr-2 h-4 w-4" />
                          Lower Cost Version
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleCreateVariant}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Premium Version
                        </Button>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleCreateVariant}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Alternative Approach
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>
                      Share or continue working with this solution concept
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Continue to Solution Design
                      </Button>
                      
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        
                        <Button variant="outline" className="flex-1">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy to Clipboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Select an idea from the generation tab to view details</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved-ideas">
          <div className="text-center py-12 text-gray-500">
            <Star className="mx-auto h-12 w-12 opacity-20 mb-3" />
            <p>Your saved ideas will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
