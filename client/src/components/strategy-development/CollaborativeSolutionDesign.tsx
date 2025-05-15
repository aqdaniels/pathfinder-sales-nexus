
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Layers, 
  PlusCircle, 
  Check, 
  Users, 
  FileText, 
  Copy,
  Save,
  Clipboard,
  LayoutPanelLeft,
  Puzzle,
  Eye,
  Link,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

// Sample solution components
const componentLibrary = [
  {
    id: "comp-1",
    title: "API Gateway",
    category: "Integration",
    description: "Secure gateway for managing API traffic and implementing security policies",
    tags: ["Integration", "Security"],
    connectors: ["REST", "GraphQL", "SOAP"],
    dxcAsset: true
  },
  {
    id: "comp-2",
    title: "Data Lake",
    category: "Data",
    description: "Scalable storage repository for structured and unstructured data",
    tags: ["Data", "Storage", "Analytics"],
    connectors: ["S3", "Blob Storage", "HDFS"],
    dxcAsset: true
  },
  {
    id: "comp-3",
    title: "Intelligent Document Processing",
    category: "AI/ML",
    description: "AI-powered extraction and processing of unstructured documents",
    tags: ["AI/ML", "Automation"],
    connectors: ["REST", "S3", "Database"],
    dxcAsset: true
  },
  {
    id: "comp-4",
    title: "Process Automation Engine",
    category: "Automation",
    description: "Workflow and business process automation platform",
    tags: ["Automation", "Workflow"],
    connectors: ["REST", "SOAP", "Database"],
    dxcAsset: true
  },
  {
    id: "comp-5",
    title: "Customer Portal",
    category: "User Interface",
    description: "Self-service portal for customer interactions and service management",
    tags: ["UI", "Customer Experience"],
    connectors: ["REST", "GraphQL"],
    dxcAsset: false
  },
  {
    id: "comp-6",
    title: "Analytics Dashboard",
    category: "Analytics",
    description: "Interactive visualization of key performance indicators and business metrics",
    tags: ["Analytics", "UI", "Reporting"],
    connectors: ["REST", "Database", "Data Lake"],
    dxcAsset: true
  }
];

// Sample solution configuration
const sampleConfiguration = {
  title: "Insurance Claims Automation Platform",
  description: "End-to-end solution for automating insurance claims processing with AI-powered document extraction, fraud detection, and customer self-service",
  components: [componentLibrary[0], componentLibrary[2], componentLibrary[3], componentLibrary[4], componentLibrary[5]],
  connections: [
    { from: "comp-5", to: "comp-1", label: "REST API" },
    { from: "comp-1", to: "comp-3", label: "REST API" },
    { from: "comp-3", to: "comp-4", label: "Event-based" },
    { from: "comp-4", to: "comp-6", label: "Data events" }
  ],
  requirements: [
    { id: "req-1", text: "Process documents in multiple formats (PDF, TIFF, JPEG)", status: "satisfied" },
    { id: "req-2", text: "Extract data with >95% accuracy", status: "satisfied" },
    { id: "req-3", text: "Complete claims processing within 24 hours", status: "partially-satisfied" },
    { id: "req-4", text: "Support integration with legacy claims systems", status: "satisfied" },
    { id: "req-5", text: "Provide real-time status updates to customers", status: "satisfied" }
  ],
  collaborators: [
    { id: 1, name: "You", role: "Solution Architect", avatar: "" },
    { id: 2, name: "John Smith", role: "Client Stakeholder", avatar: "" },
    { id: 3, name: "Sarah Johnson", role: "Technical Architect", avatar: "" }
  ]
};

export function CollaborativeSolutionDesign() {
  const [activeTab, setActiveTab] = useState("solution-canvas");
  const [configuration, setConfiguration] = useState(sampleConfiguration);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  
  const filteredComponents = componentLibrary.filter(component => 
    component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddComponent = (component) => {
    if (!configuration.components.some(c => c.id === component.id)) {
      setConfiguration({
        ...configuration,
        components: [...configuration.components, component]
      });
    }
  };
  
  const handleRemoveComponent = (componentId) => {
    setConfiguration({
      ...configuration,
      components: configuration.components.filter(c => c.id !== componentId),
      connections: configuration.connections.filter(
        conn => conn.from !== componentId && conn.to !== componentId
      )
    });
  };
  
  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="solution-canvas">Solution Canvas</TabsTrigger>
          <TabsTrigger value="component-library">Component Library</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solution-canvas" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Solution header and collaboration */}
            <Card className="col-span-12">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input 
                        value={configuration.title} 
                        className="text-xl font-bold border-none p-0 h-auto focus-visible:ring-0 max-w-md" 
                        onChange={(e) => setConfiguration({...configuration, title: e.target.value})}
                      />
                      <Badge>Draft</Badge>
                    </div>
                    <Textarea 
                      value={configuration.description} 
                      className="border-none p-0 min-h-0 focus-visible:ring-0 resize-none text-gray-500 text-sm max-w-lg" 
                      onChange={(e) => setConfiguration({...configuration, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 mr-4">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">Collaborators</span>
                    </div>
                    <div className="flex -space-x-2">
                      {configuration.collaborators.map(collaborator => (
                        <Avatar key={collaborator.id} className="border-2 border-white">
                          <AvatarFallback>
                            {collaborator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      <Button variant="outline" size="icon" className="rounded-full ml-2 border-dashed">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Solution canvas */}
            <Card className="col-span-9 min-h-[60vh]">
              <CardHeader className="p-4 pb-2">
                <CardTitle>Solution Architecture</CardTitle>
                <CardDescription>
                  Drag components and create connections to build your solution
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 relative">
                {/* Simplified diagram visualization */}
                <div className="min-h-[500px] bg-gray-50 rounded-md border border-dashed border-gray-300 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                  
                  <div className="text-center text-gray-500">
                    <LayoutPanelLeft className="h-16 w-16 mx-auto opacity-20 mb-3" />
                    <p className="mb-1">Solution visualization would be rendered here</p>
                    <p className="text-sm">Drag components from the sidebar to get started</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Components in solution */}
            <div className="col-span-3 space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>Solution Components</CardTitle>
                  <CardDescription>
                    {configuration.components.length} components in this solution
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    {configuration.components.map(component => (
                      <div 
                        key={component.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSelectComponent(component)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm">{component.title}</div>
                            <div className="text-xs text-gray-500">{component.category}</div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveComponent(component.id);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        </div>
                        <div className="mt-1 flex gap-1">
                          {component.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {component.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{component.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  
                  <div className="p-3 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("component-library")}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Component
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>Connection Types</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 text-blue-500" />
                        <span>REST API</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">4</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 text-green-500" />
                        <span>Event-based</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 text-purple-500" />
                        <span>Database</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">1</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 text-orange-500" />
                        <span>File Transfer</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">0</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Component Details Dialog */}
          {selectedComponent && (
            <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{selectedComponent.title}</DialogTitle>
                  <DialogDescription>
                    {selectedComponent.category}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{selectedComponent.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Connectors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.connectors.map(connector => (
                        <Badge key={connector} variant="outline" className="bg-white">
                          {connector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedComponent.dxcAsset && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex items-center text-blue-700 font-medium mb-1">
                        <Puzzle className="h-4 w-4 mr-2" />
                        DXC Asset
                      </div>
                      <p className="text-sm text-blue-600">
                        This component is part of the DXC intellectual property portfolio
                        and can be deployed with accelerated implementation times.
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
        
        <TabsContent value="component-library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Browse and select pre-built solution components
              </CardDescription>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search components..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {filteredComponents.map(component => (
                  <Card key={component.id} className="border">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{component.title}</CardTitle>
                        {component.dxcAsset && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">DXC</Badge>
                        )}
                      </div>
                      <CardDescription>{component.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {component.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSelectComponent(component)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAddComponent(component)}
                          disabled={configuration.components.some(c => c.id === component.id)}
                        >
                          {configuration.components.some(c => c.id === component.id) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <PlusCircle className="h-4 w-4 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Requirements</CardTitle>
              <CardDescription>
                Track solution alignment with client requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  {configuration.requirements.map(req => (
                    <div key={req.id} className="flex items-start p-3 border rounded-md">
                      <Checkbox 
                        id={req.id} 
                        className="mt-0.5 mr-3" 
                        checked={req.status === "satisfied"}
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={req.id} 
                          className="text-sm font-medium cursor-pointer flex items-center"
                        >
                          {req.text}
                          {req.status === "partially-satisfied" && (
                            <Badge className="ml-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                              Partially Satisfied
                            </Badge>
                          )}
                          {req.status === "satisfied" && (
                            <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                              Satisfied
                            </Badge>
                          )}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input placeholder="Add a new requirement..." className="flex-1" />
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Requirements Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Total Requirements</span>
                        <Badge variant="outline">{configuration.requirements.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Satisfied</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {configuration.requirements.filter(r => r.status === "satisfied").length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Partially Satisfied</span>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          {configuration.requirements.filter(r => r.status === "partially-satisfied").length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Not Satisfied</span>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          {configuration.requirements.filter(r => !["satisfied", "partially-satisfied"].includes(r.status)).length}
                        </Badge>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between items-center font-medium">
                        <span>Overall Coverage</span>
                        <span className="text-green-600">80%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solution Validation</CardTitle>
              <CardDescription>
                Validate your solution against constraints and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex items-center text-green-700 font-medium mb-2">
                      <Check className="h-5 w-5 mr-2" />
                      Functional Validation
                    </div>
                    <p className="text-sm text-green-600 mb-2">
                      Solution satisfies 80% of functional requirements
                    </p>
                    <Button variant="outline" size="sm" className="text-green-700 bg-green-100 hover:bg-green-200 border-green-200">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-center text-yellow-700 font-medium mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      Technical Validation
                    </div>
                    <p className="text-sm text-yellow-600 mb-2">
                      2 component compatibility warnings detected
                    </p>
                    <Button variant="outline" size="sm" className="text-yellow-700 bg-yellow-100 hover:bg-yellow-200 border-yellow-200">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex items-center text-blue-700 font-medium mb-2">
                      <FileText className="h-5 w-5 mr-2" />
                      Documentation
                    </div>
                    <p className="text-sm text-blue-600 mb-2">
                      75% of required documentation complete
                    </p>
                    <Button variant="outline" size="sm" className="text-blue-700 bg-blue-100 hover:bg-blue-200 border-blue-200">
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-base">Validation Checks</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start p-3 border rounded-md bg-green-50 border-green-200">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Component Connectivity</div>
                        <p className="text-sm text-gray-600">All components properly connected with appropriate interfaces</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border rounded-md bg-green-50 border-green-200">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Requirement Coverage</div>
                        <p className="text-sm text-gray-600">Solution addresses 80% of client requirements (4/5)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border rounded-md bg-yellow-50 border-yellow-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mt-0.5 mr-3">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <div>
                        <div className="font-medium text-sm">Component Compatibility</div>
                        <p className="text-sm text-gray-600">IDP component may require additional connectors for Document Storage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border rounded-md bg-yellow-50 border-yellow-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mt-0.5 mr-3">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <div>
                        <div className="font-medium text-sm">Performance Validation</div>
                        <p className="text-sm text-gray-600">Solution may not meet 24-hour processing requirement at peak loads</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border rounded-md bg-green-50 border-green-200">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Security Validation</div>
                        <p className="text-sm text-gray-600">Solution meets security requirements and best practices</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    <Clipboard className="mr-2 h-4 w-4" />
                    Export Validation Report
                  </Button>
                  <Button>
                    <Check className="mr-2 h-4 w-4" />
                    Finalize Solution
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
