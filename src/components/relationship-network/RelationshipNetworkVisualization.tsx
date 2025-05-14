import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  ZoomIn,
  ZoomOut,
  MessageSquare,
  Calendar,
  Building,
  AlertTriangle,
  Star,
} from "lucide-react";

// Define the graph data structure 
type NodeType = "executive" | "director" | "manager" | "individual" | "external";
type StakeholderType = "champion" | "advocate" | "detractor" | "gap" | "declining" | "neutral";

interface GraphNode {
  id: string;
  name: string;
  role: string;
  department: string;
  stakeholderType: StakeholderType;
  nodeType: NodeType;
  influence: number;
  sentiment: number;
  avatar?: string;
  // Add x and y properties that are required by ForceGraph2D
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: "reporting" | "collaboration" | "influence";
  strength: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export function RelationshipNetworkVisualization() {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [
      // Sample data based on existing stakeholder data
      { id: "1", name: "John Smith", role: "CIO", department: "IT", stakeholderType: "champion", nodeType: "executive", influence: 90, sentiment: 88 },
      { id: "2", name: "Sarah Johnson", role: "Digital Transformation Lead", department: "IT", stakeholderType: "advocate", nodeType: "director", influence: 75, sentiment: 76 },
      { id: "3", name: "Michael Chen", role: "IT Director", department: "IT", stakeholderType: "declining", nodeType: "director", influence: 80, sentiment: 62 },
      { id: "4", name: "Lisa Williams", role: "CFO", department: "Finance", stakeholderType: "gap", nodeType: "executive", influence: 95, sentiment: 0 },
      { id: "5", name: "Robert Taylor", role: "Infrastructure Manager", department: "IT", stakeholderType: "detractor", nodeType: "manager", influence: 65, sentiment: 35 },
      { id: "6", name: "Amanda Lopez", role: "CTO", department: "Technology", stakeholderType: "neutral", nodeType: "executive", influence: 88, sentiment: 70 },
      { id: "7", name: "David Washington", role: "Security Lead", department: "IT Security", stakeholderType: "advocate", nodeType: "director", influence: 72, sentiment: 80 },
      { id: "8", name: "Elena Petrov", role: "Data Science Lead", department: "Analytics", stakeholderType: "neutral", nodeType: "manager", influence: 68, sentiment: 65 },
      { id: "9", name: "Carlos Mendez", role: "Application Development Manager", department: "IT", stakeholderType: "champion", nodeType: "manager", influence: 60, sentiment: 85 },
      { id: "10", name: "Michelle Banks", role: "COO", department: "Operations", stakeholderType: "neutral", nodeType: "executive", influence: 92, sentiment: 50 },
      { id: "11", name: "James Wilson", role: "Technical Advisor", department: "Technology", stakeholderType: "advocate", nodeType: "director", influence: 78, sentiment: 75 },
      { id: "12", name: "Sarah Chen", role: "CTO", department: "Technology", stakeholderType: "champion", nodeType: "executive", influence: 95, sentiment: 90 },
    ],
    links: [
      { source: "1", target: "2", type: "reporting", strength: 1 },
      { source: "1", target: "3", type: "reporting", strength: 1 },
      { source: "1", target: "5", type: "reporting", strength: 0.8 },
      { source: "3", target: "5", type: "reporting", strength: 1 },
      { source: "3", target: "9", type: "reporting", strength: 1 },
      { source: "2", target: "7", type: "collaboration", strength: 0.7 },
      { source: "6", target: "8", type: "reporting", strength: 1 },
      { source: "6", target: "11", type: "reporting", strength: 1 },
      { source: "10", target: "6", type: "collaboration", strength: 0.6 },
      { source: "4", target: "10", type: "collaboration", strength: 0.8 },
      { source: "12", target: "11", type: "reporting", strength: 1 },
      { source: "11", target: "8", type: "collaboration", strength: 0.7 },
      { source: "7", target: "9", type: "collaboration", strength: 0.5 },
    ]
  });

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [showNodeDialog, setShowNodeDialog] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const graphRef = useRef<any>();
  
  // Function to handle node click
  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    setShowNodeDialog(true);
    if (graphRef.current) {
      // Since we've added x and y to the GraphNode interface, this is now type-safe
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(1.5, 1000);
    }
  };
  
  // Function to get node color based on stakeholder type
  const getNodeColor = (node: GraphNode) => {
    const typeColors = {
      champion: "#22c55e", // green
      advocate: "#3b82f6", // blue
      detractor: "#ef4444", // red
      gap: "#f97316", // orange
      declining: "#eab308", // yellow
      neutral: "#8e9196" // gray
    };
    return typeColors[node.stakeholderType];
  };

  // Function to get node size based on influence
  const getNodeSize = (node: GraphNode) => {
    return 5 + (node.influence / 10);
  };

  useEffect(() => {
    // Show initial guidance tooltip after a delay
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* The network visualization */}
      <div className="h-full w-full">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: any) => `${node.name} - ${node.role}`}
          nodeColor={(node: any) => getNodeColor(node)}
          nodeRelSize={6}
          nodeVal={(node: any) => getNodeSize(node)}
          linkWidth={(link: any) => link.strength * 2}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.25}
          cooldownTicks={100}
          onNodeClick={(node: any) => handleNodeClick(node)}
        />
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 flex gap-2 p-2 bg-background/90 rounded-lg border shadow-sm">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => graphRef.current?.zoomOut()}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => graphRef.current?.zoomIn()}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => graphRef.current?.centerAt()}
        >
          <Users className="h-4 w-4" />
        </Button>
      </div>

      {/* Contextual help tooltip */}
      {showTooltip && (
        <div className="absolute top-4 left-4 max-w-xs p-4 bg-background rounded-lg shadow-lg border animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Search className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h4 className="font-medium text-sm">You're seeing the executive level</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Zoom in to explore specific departments or zoom out for the complete picture.
              </p>
              <p className="text-xs text-primary mt-3 font-medium">
                Click on any person to see their profile and connections.
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2" 
            onClick={() => setShowTooltip(false)}
          >
            Got it
          </Button>
        </div>
      )}

      {/* Decision maker discovery alert */}
      <div className="absolute top-4 right-4 max-w-xs">
        <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            We've highlighted potential decision-makers for your Custom Applications solution. 
            <span className="font-medium block mt-1">Sarah Chen, CTO,</span> appears to be the primary decision-maker.
          </AlertDescription>
        </Alert>
      </div>

      {/* Node detail dialog */}
      <Dialog open={showNodeDialog} onOpenChange={setShowNodeDialog}>
        <DialogContent className="max-w-2xl">
          {selectedNode && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedNode.name}</h2>
                  <p className="text-muted-foreground">{selectedNode.role}, {selectedNode.department}</p>
                </div>
                <Badge 
                  className={
                    selectedNode.stakeholderType === 'champion' || selectedNode.stakeholderType === 'advocate' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : selectedNode.stakeholderType === 'detractor' 
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : selectedNode.stakeholderType === 'gap' 
                      ? 'bg-orange-100 text-orange-800 border-orange-200' 
                      : selectedNode.stakeholderType === 'declining'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }
                >
                  {selectedNode.stakeholderType.charAt(0).toUpperCase() + selectedNode.stakeholderType.slice(1)}
                </Badge>
              </div>
              
              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="connections">Connections</TabsTrigger>
                  <TabsTrigger value="approach">Approach Strategy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <h3 className="text-sm font-medium">Influence Level</h3>
                          </div>
                          <span className="text-lg font-bold">{selectedNode.influence}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedNode.influence > 80 ? 'Key decision maker' : 
                            selectedNode.influence > 60 ? 'Strong influence' : 'Moderate influence'}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <h3 className="text-sm font-medium">Sentiment</h3>
                          </div>
                          <span className="text-lg font-bold">{selectedNode.sentiment}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedNode.sentiment > 80 ? 'Very positive' : 
                            selectedNode.sentiment > 60 ? 'Positive' : 
                            selectedNode.sentiment > 40 ? 'Neutral' : 
                            selectedNode.sentiment > 20 ? 'Concerning' : 'Negative'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {selectedNode.name === "Sarah Chen" && (
                    <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <span className="font-medium">Good news!</span> You're just 2 connections away from Sarah Chen. 
                        Your contact Michael Rivera has worked directly with her technical advisor, James Wilson.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommended Conversation Starters</h3>
                    <ul className="space-y-2">
                      {selectedNode.stakeholderType === "champion" && (
                        <>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">1</span>
                            Ask about recent cloud security initiatives and how they're affecting development timelines
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">2</span>
                            Share the case study from another client who successfully implemented a similar digital transformation
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">3</span>
                            Follow up on the AI application interests mentioned in the last meeting
                          </li>
                        </>
                      )}
                      
                      {selectedNode.stakeholderType === "detractor" && (
                        <>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">1</span>
                            Address concerns about job security post-migration
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">2</span>
                            Discuss transition plan and team upskilling opportunities
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">3</span>
                            Share success stories of infrastructure teams post-cloud adoption
                          </li>
                        </>
                      )}

                      {(selectedNode.stakeholderType !== "champion" && selectedNode.stakeholderType !== "detractor") && (
                        <>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">1</span>
                            Discuss how our solutions align with their department goals
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">2</span>
                            Ask about their role in the upcoming digital transformation initiative
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <span className="bg-muted-foreground/20 text-muted-foreground font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">3</span>
                            Share relevant industry trends that might interest them
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="connections" className="space-y-4">
                  <Alert className="bg-gray-50 border-gray-200">
                    <Users className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Showing immediate connections for {selectedNode.name}.
                      Double-click on any connection to center the network view on them.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    {graphData.links
                      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                      .map((link, i) => {
                        const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                        const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                        if (!connectedNode) return null;
                        
                        return (
                          <div key={i} className="p-3 hover:bg-muted/50 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getNodeColor(connectedNode) }}></div>
                              <div>
                                <p className="font-medium text-sm">{connectedNode.name}</p>
                                <p className="text-xs text-muted-foreground">{connectedNode.role}</p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                            </Badge>
                          </div>
                        );
                      })
                    }
                  </div>
                </TabsContent>
                
                <TabsContent value="approach" className="space-y-4">
                  {selectedNode.name === "Sarah Chen" && (
                    <>
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <Star className="h-4 w-4" />
                        <AlertDescription>
                          <span className="font-medium">Approach Strategy: </span>
                          For approaching Sarah Chen, we recommend focusing on technical innovation and ROI. 
                          Recent conversations show her team is concerned about legacy system reliability and integration challenges.
                        </AlertDescription>
                      </Alert>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Opportunity Alignment</h3>
                        <p className="text-sm text-muted-foreground">
                          The organizational structure suggests a matrix approach to technology decisions. 
                          Your Custom Applications solution aligns with both the CTO's modernization initiative 
                          and the COO's efficiency targets.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <Button variant="outline" size="sm" className="justify-start">
                            <Building className="mr-2 h-4 w-4" />
                            View CTO modernization initiative
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            <Building className="mr-2 h-4 w-4" />
                            View COO efficiency targets
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Team Collaboration</h3>
                        <div className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm">
                            David from your team has already connected with 3 people in this organization.
                          </p>
                          <Button variant="ghost" size="sm" className="mt-2">
                            See David's connections
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedNode.name !== "Sarah Chen" && (
                    <div className="space-y-4">
                      <div className="p-6 text-center">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50" />
                        <h3 className="mt-2 font-medium">No approach strategy available</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Approach strategies are generated for key decision makers and influencers.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Generate strategy
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Person
                </Button>
                <Button variant="outline" size="sm">
                  Next Person
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
