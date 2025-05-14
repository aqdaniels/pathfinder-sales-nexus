
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileUp, 
  Users, 
  Play, 
  Calendar,
  ChevronRight,
  Upload
} from "lucide-react";

interface OnboardingWelcomeProps {
  onComplete: () => void;
}

export function OnboardingWelcome({ onComplete }: OnboardingWelcomeProps) {
  const [activeTab, setActiveTab] = useState<string>("welcome");
  const [showTour, setShowTour] = useState(false);
  
  const handleOptionSelect = (tab: string) => {
    setActiveTab(tab);
    if (tab === "tour") {
      setShowTour(true);
    }
    if (tab !== "welcome") {
      // Any tab selection other than welcome should proceed to the next step
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={handleOptionSelect} className="w-full">
          <TabsContent value="welcome" className="mt-0">
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto bg-dxc-purple/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-dxc-purple" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome to Pathfinder's Organizational Intelligence!
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover the connections that matter most in your client's organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto py-8 flex-col gap-4 justify-center"
                  onClick={() => handleOptionSelect("explore")}
                >
                  <Users className="h-10 w-10 text-dxc-purple opacity-80" />
                  <div className="text-left space-y-1">
                    <div className="font-medium">Explore a recent client organization</div>
                    <p className="text-sm text-muted-foreground">
                      View existing organizational data
                    </p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto py-8 flex-col gap-4 justify-center"
                  onClick={() => handleOptionSelect("import")}
                >
                  <FileUp className="h-10 w-10 text-dxc-purple opacity-80" />
                  <div className="text-left space-y-1">
                    <div className="font-medium">Import new organizational data</div>
                    <p className="text-sm text-muted-foreground">
                      Upload and analyze client structure
                    </p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto py-8 flex-col gap-4 justify-center"
                  onClick={() => handleOptionSelect("tour")}
                >
                  <Play className="h-10 w-10 text-dxc-purple opacity-80" />
                  <div className="text-left space-y-1">
                    <div className="font-medium">See a guided tour of key features</div>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use organizational intelligence
                    </p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto py-8 flex-col gap-4 justify-center"
                  onClick={() => handleOptionSelect("meetings")}
                >
                  <Calendar className="h-10 w-10 text-dxc-purple opacity-80" />
                  <div className="text-left space-y-1">
                    <div className="font-medium">Get recommendations for upcoming meetings</div>
                    <p className="text-sm text-muted-foreground">
                      Prepare with tailored insights
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tour" className="mt-0">
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-green-700" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Let's uncover the hidden connections!
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This quick tour will show you how to map decision-makers, find influence paths, and identify your best opportunities.
                </p>
              </div>
              
              <Button onClick={onComplete} className="mt-4">
                Start Tour
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="mt-0">
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-700" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Your organizational insights start here!
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Upload your client's structure and transform scattered contacts into a powerful relationship map.
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 max-w-xl mx-auto">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">Drag files here or click to browse</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Support for CSV, Excel, or import directly from CRM
                  </p>
                  <Button variant="outline" className="mt-4">
                    Browse files
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Add other tabs for explore and meetings options */}
        </Tabs>
      </CardContent>
    </Card>
  );
}
