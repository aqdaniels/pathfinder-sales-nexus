
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  Users,
  User,
  Building,
  Star,
  Download,
  Share2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RelationshipInsights } from "../client-intelligence/dashboard/RelationshipInsights";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NetworkControls() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Network Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Find stakeholder..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilter(!showFilter)}
              className={showFilter ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {showFilter && (
            <div className="p-3 border rounded-md space-y-3 animate-fade-in">
              <div className="space-y-2">
                <label className="text-xs font-medium">Department</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All departments</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Stakeholder Type</label>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="cursor-pointer bg-green-50">
                    <ThumbsUp className="mr-1 h-3 w-3 text-green-500" />
                    Champions
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <ThumbsUp className="mr-1 h-3 w-3 text-blue-500" />
                    Advocates
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <ThumbsDown className="mr-1 h-3 w-3 text-red-500" />
                    Detractors
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
                    Gaps
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Influence Level</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All levels</SelectItem>
                      <SelectItem value="high">High (80%+)</SelectItem>
                      <SelectItem value="medium">Medium (50-79%)</SelectItem>
                      <SelectItem value="low">Low (Below 50%)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button size="sm" className="w-full mt-1">Apply Filters</Button>
            </div>
          )}
          
          <Tabs defaultValue="legend">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="legend">Legend</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="paths">Paths</TabsTrigger>
            </TabsList>
            
            <TabsContent value="legend" className="space-y-3 pt-2">
              <div className="space-y-1">
                <h4 className="text-xs font-medium">Stakeholder Types</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Champion</span>
                    </div>
                    <span className="text-muted-foreground">Strong advocate</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Advocate</span>
                    </div>
                    <span className="text-muted-foreground">Supporter</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Detractor</span>
                    </div>
                    <span className="text-muted-foreground">Opposed</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Gap</span>
                    </div>
                    <span className="text-muted-foreground">No engagement</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Declining</span>
                    </div>
                    <span className="text-muted-foreground">Worsening</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium">Connection Types</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-px bg-gray-900"></div>
                      <span>Reporting</span>
                    </div>
                    <span className="text-muted-foreground">Direct report</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-px bg-gray-900 border-dashed border-t border-gray-900"></div>
                      <span>Collaboration</span>
                    </div>
                    <span className="text-muted-foreground">Works together</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium">Node Size</h4>
                <p className="text-xs text-muted-foreground">
                  Larger nodes indicate higher influence within the organization.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-700"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="pt-2">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium">Organization Overview</h4>
                    <Badge variant="outline" className="text-xs">Acme Corp</Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Total stakeholders</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Departments</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Decision makers</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Avg. sentiment</span>
                      <span className="font-medium">67%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-2">Stakeholder Breakdown</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500" style={{ width: "20%" }}></div>
                        <div className="h-full bg-blue-500" style={{ width: "25%" }}></div>
                        <div className="h-full bg-gray-400" style={{ width: "30%" }}></div>
                        <div className="h-full bg-yellow-500" style={{ width: "10%" }}></div>
                        <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
                        <div className="h-full bg-orange-500" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Champions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Advocates</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span>Neutral</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Declining</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Detractors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>Gaps</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-1">
                  <h4 className="text-xs font-medium mb-2">Relationship Strength</h4>
                  <div className="flex items-center text-xs text-muted-foreground justify-between">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full mt-1"></div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Average relationship strength: <span className="font-medium">Medium</span>
                  </p>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full mt-1">
                  <Download className="mr-2 h-3 w-3" />
                  Export insights
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="paths" className="pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md">
                  <h4 className="text-xs font-medium flex items-center mb-1">
                    <Star className="h-3 w-3 mr-1" />
                    Path to Decision Maker
                  </h4>
                  <p className="text-xs">
                    You're just 2 connections away from <span className="font-medium">Sarah Chen (CTO)</span>
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>You</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Michael Rivera</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>James Wilson</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Sarah Chen</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                    Highlight Path
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-1">Find Connection Path</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger className="w-full text-xs h-8">
                        <SelectValue placeholder="From (Start)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="you">You</SelectItem>
                          <SelectItem value="michael">Michael Rivera</SelectItem>
                          <SelectItem value="john">John Smith</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger className="w-full text-xs h-8">
                        <SelectValue placeholder="To (Target)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="sarah">Sarah Chen</SelectItem>
                          <SelectItem value="lisa">Lisa Williams</SelectItem>
                          <SelectItem value="michelle">Michelle Banks</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    <Button size="sm" className="w-full">Find Path</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-1">Key Relationship Paths</h4>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      <Building className="mr-2 h-3 w-3" />
                      Technology approval path
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      <Building className="mr-2 h-3 w-3" />
                      Budget decision path
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      <Building className="mr-2 h-3 w-3" />
                      Implementation team path
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Key Stakeholders Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Key Stakeholders</span>
            <Badge variant="outline" className="font-normal">5 Total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="h-[400px] overflow-y-auto pr-1">
            <RelationshipInsights limit={5} />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      
      <div className="pt-2">
        <div className="bg-purple-50 border border-purple-100 rounded-md p-3">
          <div className="flex items-center gap-2">
            <div className="bg-purple-200 rounded-full p-1.5">
              <Star className="h-4 w-4 text-dxc-purple" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Did you know?</h4>
              <p className="text-xs text-muted-foreground">
                You can save this organizational view to your opportunity in Salesforce with a single click.
              </p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="w-full mt-2">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
