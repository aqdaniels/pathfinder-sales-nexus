import { useState, useRef, useCallback, useEffect } from 'react';
// Make sure to use named import for ForceGraph2D instead of default import
import { ForceGraph2D } from "react-force-graph";
import { ChevronRight, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Extend the GraphNode interface to include x and y properties
interface GraphNode {
  id: string;
  name: string;
  title: string;
  influence: number;
  group: string;
  decisionMaker: boolean;
  x?: number;  // Add optional x property
  y?: number;  // Add optional y property
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

const initialData: GraphData = {
  nodes: [
    { id: '1', name: 'Alice', title: 'CEO', influence: 0.9, group: 'Management', decisionMaker: true },
    { id: '2', name: 'Bob', title: 'CTO', influence: 0.8, group: 'Technology', decisionMaker: true },
    { id: '3', name: 'Charlie', title: 'Marketing Director', influence: 0.7, group: 'Marketing', decisionMaker: true },
    { id: '4', name: 'Diana', title: 'Sales Manager', influence: 0.6, group: 'Sales', decisionMaker: false },
    { id: '5', name: 'Eve', title: 'Lead Engineer', influence: 0.5, group: 'Technology', decisionMaker: false },
    { id: '6', name: 'Frank', title: 'Sales Rep', influence: 0.4, group: 'Sales', decisionMaker: false },
    { id: '7', name: 'Grace', title: 'Marketing Specialist', influence: 0.3, group: 'Marketing', decisionMaker: false },
  ],
  links: [
    { source: '1', target: '2', strength: 0.8 },
    { source: '1', target: '3', strength: 0.7 },
    { source: '2', target: '5', strength: 0.6 },
    { source: '3', target: '7', strength: 0.5 },
    { source: '4', target: '6', strength: 0.4 },
    { source: '1', target: '4', strength: 0.9 },
  ],
};

const RelationshipNetworkVisualization = () => {
  const [data, setData] = useState<GraphData>(initialData);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [scale, setScale] = useState(1);
  const fgRef = useRef<ForceGraph2D>(null);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleLinkClick = (link: GraphLink) => {
    console.log('Link clicked:', link);
  };

  const highlightNode = (node: GraphNode, autoCenter: boolean = false) => {
    const newHighlightNodes = new Set<string>();
    const newHighlightLinks = new Set<string>();

    if (node) {
      newHighlightNodes.add(node.id);
      data.links.forEach(link => {
        if (link.source === node.id || link.target === node.id) {
          newHighlightLinks.add(`${link.source}-${link.target}`);
          newHighlightNodes.add(link.source as string);
          newHighlightNodes.add(link.target as string);
        }
      });
    }

    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);

    if (autoCenter) {
      // Logic to auto-center the graph on the node
      const distance = 400;
      const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, 0);

      fgRef.current?.cameraPosition(
        { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: 8 }, // z offset
        { x: node.x || 0, y: node.y || 0, z: 0 }, // lookAt target coordinates
        3000
      );
    }
  };

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => prevScale * 1.2);
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => prevScale / 1.2);
  }, []);

  const handleResetZoom = useCallback(() => {
    setScale(1);
  }, []);

  const nodeColor = (node: GraphNode) => {
    if (highlightNodes.has(node.id)) {
      return node.decisionMaker ? 'rgb(255,0,0)' : 'rgba(0,255,0,0.8)';
    } else {
      return node.decisionMaker ? 'red' : 'green';
    }
  };

  const linkColor = (link: GraphLink) => {
    return highlightLinks.has(`${link.source}-${link.target}`) ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)';
  };

  const linkDirectionalParticles = (link: GraphLink) => {
    return highlightLinks.has(`${link.source}-${link.target}`) ? 4 : 0;
  };

  useEffect(() => {
    // Initial auto-centering on the first node
    if (data.nodes.length > 0) {
      highlightNode(data.nodes[0], true);
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relationship Network Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleResetZoom}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            nodeLabel="name"
            nodeVal={node => node.influence * 30}
            nodeColor={nodeColor}
            linkLabel="strength"
            linkWidth={1}
            linkColor={linkColor}
            linkDirectionalParticles={linkDirectionalParticles}
            linkDirectionalParticleWidth={4}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            nodeAutoColorBy="group"
            zoom={scale}
            minZoom={0.3}
            maxZoom={3}
            d3VelocityDecay={0.2}
            d3SimulationAfterStopTicks={150}
            onNodeHover={highlightNode}
            onLinkHover={(link: any) => {
              if (link) {
                setHighlightLinks(new Set([`${link.source.id}-${link.target.id}`]));
              } else {
                setHighlightLinks(new Set());
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1E1E1E',
            }}
          />
        </div>
        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            {selectedNode ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedNode.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Title: {selectedNode.title}</p>
                  <p>Influence: {selectedNode.influence}</p>
                  <p>Group: {selectedNode.group}</p>
                  <p>Decision Maker: {selectedNode.decisionMaker ? 'Yes' : 'No'}</p>
                </CardContent>
              </Card>
            ) : (
              <p>Click on a node to see details.</p>
            )}
          </TabsContent>
          <TabsContent value="analysis">
            <p>Analysis content goes here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RelationshipNetworkVisualization;
