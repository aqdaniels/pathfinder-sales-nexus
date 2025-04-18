
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Copy, Download, FileText, Link, MessageSquare, RotateCcw, Share2, Star, Users2 } from "lucide-react";

const knowledgeSharingData = {
  templates: [
    {
      id: "t1",
      title: "Value-Based Manufacturing Pitch",
      description: "Framework for positioning DXC solutions to manufacturing executives",
      creator: "Lisa Williams",
      rating: 4.8,
      downloads: 142,
      created: "Mar 15, 2025",
      tags: ["Manufacturing", "Executive", "Value"],
    },
    {
      id: "t2",
      title: "Cloud Migration ROI Calculator",
      description: "Interactive tool to demonstrate ROI for cloud transformations",
      creator: "David Parker",
      rating: 4.6,
      downloads: 98,
      created: "Apr 2, 2025",
      tags: ["Cloud", "ROI", "Calculator"],
    },
    {
      id: "t3",
      title: "Supply Chain Resilience Assessment",
      description: "Framework for evaluating and improving supply chain resilience",
      creator: "Michael Johnson",
      rating: 4.5,
      downloads: 76,
      created: "Mar 28, 2025",
      tags: ["Supply Chain", "Resilience", "Assessment"],
    },
  ],
  bestPractices: [
    {
      id: "bp1",
      title: "Opening executive conversations effectively",
      description: "How to establish credibility and rapport within the first 5 minutes",
      formats: ["Video", "Checklist"],
      contributor: "Jennifer Lee",
      likes: 87,
    },
    {
      id: "bp2",
      title: "Handling budget objections",
      description: "Techniques for reframing cost discussions to value-based decisions",
      formats: ["Guide", "Examples"],
      contributor: "Robert Chen",
      likes: 64,
    },
    {
      id: "bp3", 
      title: "Connecting technical capabilities to business outcomes",
      description: "How to translate features into meaningful business results",
      formats: ["Framework", "Examples"],
      contributor: "Sarah Miller",
      likes: 92,
    },
  ],
  collaborations: [
    {
      id: "c1",
      title: "Acme Corp - CIO Vision Meeting",
      description: "Preparation and insights for upcoming CIO discussion",
      contributors: ["Lisa Williams", "David Parker", "Michael Johnson"],
      created: "Apr 18, 2025",
      activity: "Updated 2 hours ago",
    },
    {
      id: "c2",
      title: "Manufacturing Sector Growth Strategy",
      description: "Collaborative initiative to expand manufacturing client base",
      contributors: ["Lisa Williams", "Jennifer Lee", "Sarah Miller"],
      created: "Apr 10, 2025",
      activity: "Updated 3 days ago",
    },
  ],
  recentActivities: [
    {
      action: "downloaded",
      item: "Supply Chain Resilience Assessment",
      user: "David Parker",
      time: "2 hours ago",
    },
    {
      action: "shared",
      item: "Value-Based Manufacturing Pitch",
      user: "Lisa Williams",
      time: "Yesterday",
    },
    {
      action: "contributed to",
      item: "Acme Corp - CIO Vision Meeting",
      user: "Michael Johnson",
      time: "Yesterday",
    },
    {
      action: "liked",
      item: "Connecting technical capabilities to business outcomes",
      user: "Sarah Miller",
      time: "2 days ago",
    },
    {
      action: "created",
      item: "Cloud Migration ROI Calculator",
      user: "David Parker",
      time: "Apr 2, 2025",
    },
  ],
};

export function KnowledgeSharing() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="templates">Meeting Templates</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="collaboration">Team Collaboration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knowledgeSharingData.templates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Download className="h-4 w-4 mr-2" />
                    <span>{template.downloads} downloads</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs bg-muted">
                        {template.creator.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{template.creator}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-dxc-purple" /> Create New Template
              </CardTitle>
              <CardDescription>
                Transform your successful meetings into reusable templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-muted/50 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
                  <RotateCcw className="h-10 w-10 text-dxc-purple/60 mb-3" />
                  <h3 className="font-medium mb-1">From Past Meeting</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert a successful meeting into a reusable template
                  </p>
                </Card>
                
                <Card className="p-4 bg-muted/50 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
                  <BookOpen className="h-10 w-10 text-dxc-purple/60 mb-3" />
                  <h3 className="font-medium mb-1">From Scratch</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new template with custom structure and content
                  </p>
                </Card>
                
                <Card className="p-4 bg-muted/50 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
                  <Copy className="h-10 w-10 text-dxc-purple/60 mb-3" />
                  <h3 className="font-medium mb-1">Duplicate Existing</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with an existing template and customize it
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="best-practices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {knowledgeSharingData.bestPractices.map((practice) => (
              <Card key={practice.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{practice.title}</CardTitle>
                  <CardDescription>{practice.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {practice.formats.map((format, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs bg-muted">
                        {practice.contributor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{practice.contributor}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="text-sm">{practice.likes}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="p-4 bg-muted/50 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors h-full">
              <MessageSquare className="h-10 w-10 text-dxc-purple/60 mb-3" />
              <h3 className="font-medium mb-1">Share Your Best Practice</h3>
              <p className="text-sm text-muted-foreground">
                Contribute your knowledge to help the team succeed
              </p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="collaboration" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {knowledgeSharingData.collaborations.map((collab) => (
              <Card key={collab.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{collab.title}</span>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Link className="h-4 w-4" />
                      Open
                    </Button>
                  </CardTitle>
                  <CardDescription>{collab.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-2 mr-3">
                      {collab.contributors.map((contributor, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-dxc-purple text-white">
                            {contributor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {collab.contributors.length} contributors
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground flex justify-between border-t pt-3">
                  <div>Created on {collab.created}</div>
                  <div>{collab.activity}</div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="p-5 bg-muted/50 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
              <Users2 className="h-10 w-10 text-dxc-purple/60 mb-3" />
              <h3 className="font-medium mb-1">Start New Collaboration</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Create a shared workspace for your team
              </p>
              <Button>
                Create Workspace
              </Button>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Team knowledge sharing activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeSharingData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-muted-foreground/20">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="text-dxc-purple">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
