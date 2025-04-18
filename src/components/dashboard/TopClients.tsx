
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, TrendingUp } from "lucide-react";

type Client = {
  id: string;
  name: string;
  industry: string;
  opportunities: number;
  revenue: string;
  growth: number;
  logo?: string;
  initials: string;
};

const clients: Client[] = [
  {
    id: "1",
    name: "Acme Corporation",
    industry: "Manufacturing",
    opportunities: 5,
    revenue: "$2.4M",
    growth: 12,
    initials: "AC",
  },
  {
    id: "2",
    name: "GlobalTech Industries",
    industry: "Technology",
    opportunities: 3,
    revenue: "$1.8M",
    growth: 8,
    initials: "GT",
  },
  {
    id: "3",
    name: "BankCo Financial",
    industry: "Finance",
    opportunities: 4,
    revenue: "$3.2M",
    growth: 15,
    initials: "BC",
  },
  {
    id: "4",
    name: "MediHealth Systems",
    industry: "Healthcare",
    opportunities: 2,
    revenue: "$1.5M",
    growth: 6,
    initials: "MH",
  },
];

export function TopClients() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Top Clients</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={client.logo} />
                  <AvatarFallback className="bg-dxc-gray-soft text-dxc-purple-dark">
                    {client.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {client.industry}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="font-medium">{client.revenue}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {client.growth}%
                  </div>
                </div>
                <Badge variant="outline" className="ml-2">
                  {client.opportunities} Opps
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button variant="outline" className="w-full" size="sm">
          View All Clients <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
