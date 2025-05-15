
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download, RefreshCw } from "lucide-react";

const swotData = {
  title: "Acme Corporation - SWOT Analysis",
  date: "April 17, 2025",
  strengths: [
    {
      text: "Strong market presence in manufacturing sector",
      confidence: 92,
      source: "Market Analysis",
    },
    {
      text: "Established distribution network across North America",
      confidence: 88,
      source: "Client Meeting",
    },
    {
      text: "Experienced leadership team with industry expertise",
      confidence: 85,
      source: "Client Profile",
    },
    {
      text: "Proprietary production technology",
      confidence: 78,
      source: "Technical Assessment",
    },
  ],
  weaknesses: [
    {
      text: "Aging IT infrastructure limiting operational efficiency",
      confidence: 94,
      source: "Technical Assessment",
    },
    {
      text: "Data silos preventing unified customer view",
      confidence: 90,
      source: "Client Meeting",
    },
    {
      text: "Manual business processes increasing operational costs",
      confidence: 86,
      source: "Process Analysis",
    },
    {
      text: "Limited digital customer engagement capabilities",
      confidence: 82,
      source: "Market Analysis",
    },
  ],
  opportunities: [
    {
      text: "Cloud migration to modernize infrastructure and reduce costs",
      confidence: 96,
      source: "Technical Assessment",
    },
    {
      text: "Implement data platform for unified analytics capabilities",
      confidence: 92,
      source: "Client Meeting",
    },
    {
      text: "Process automation to improve operational efficiency",
      confidence: 88,
      source: "Process Analysis",
    },
    {
      text: "Digital customer experience transformation",
      confidence: 85,
      source: "Market Analysis",
    },
  ],
  threats: [
    {
      text: "Increasing competition from digital-native market entrants",
      confidence: 84,
      source: "Market Analysis",
    },
    {
      text: "Rising cybersecurity threats and compliance requirements",
      confidence: 82,
      source: "Security Assessment",
    },
    {
      text: "Supply chain disruptions impacting production capabilities",
      confidence: 76,
      source: "Industry Report",
    },
    {
      text: "Talent shortage for specialized technical roles",
      confidence: 72,
      source: "HR Assessment",
    },
  ],
  insights: [
    "Legacy infrastructure and data silos represent critical barriers to growth",
    "Cloud migration and data platform present highest-value modernization opportunities",
    "Process automation would address core operational inefficiency challenges",
    "Digital customer experience transformation aligns with market trends and competitive pressures",
  ],
  recommendations: [
    {
      title: "Cloud Infrastructure Modernization",
      description: "Migrate legacy systems to cloud-based architecture",
      value: "High",
      timeframe: "12-18 months",
      alignment: "Addresses key weaknesses and threats",
    },
    {
      title: "Enterprise Data Platform",
      description: "Implement unified data analytics and customer insights platform",
      value: "High",
      timeframe: "8-12 months",
      alignment: "Leverages strengths while addressing weaknesses",
    },
    {
      title: "Process Automation Initiative",
      description: "Deploy automation across core business processes",
      value: "Medium",
      timeframe: "6-9 months",
      alignment: "Directly targets operational inefficiencies",
    },
  ],
};

export function SwotAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{swotData.title}</h2>
          <p className="text-muted-foreground">
            Generated on {swotData.date} · AI-powered analysis based on client data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-50/50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-800">Strengths</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {swotData.strengths.map((item, i) => (
                <li key={i} className="flex justify-between bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium text-green-800">{item.text}</p>
                    <p className="text-xs text-muted-foreground">Source: {item.source}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    {item.confidence}%
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-800">Weaknesses</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {swotData.weaknesses.map((item, i) => (
                <li key={i} className="flex justify-between bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium text-red-800">{item.text}</p>
                    <p className="text-xs text-muted-foreground">Source: {item.source}</p>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                    {item.confidence}%
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {swotData.opportunities.map((item, i) => (
                <li key={i} className="flex justify-between bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium text-blue-800">{item.text}</p>
                    <p className="text-xs text-muted-foreground">Source: {item.source}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {item.confidence}%
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-amber-50/50 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-amber-800">Threats</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {swotData.threats.map((item, i) => (
                <li key={i} className="flex justify-between bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium text-amber-800">{item.text}</p>
                    <p className="text-xs text-muted-foreground">Source: {item.source}</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {item.confidence}%
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dxc-purple/30 bg-dxc-purple-light/5">
        <CardHeader>
          <CardTitle className="text-lg text-dxc-purple-dark">Key Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {swotData.insights.map((insight, i) => (
              <li key={i} className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-dxc-purple-light/50 text-dxc-purple-dark flex items-center justify-center text-xs mr-2 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-medium text-dxc-purple-dark">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {swotData.recommendations.map((rec, i) => (
              <div key={i} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{rec.title}</h3>
                  <Badge
                    className={`ml-2 ${rec.value === "High" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-green-100 text-green-800 border-green-200"}`}
                  >
                    {rec.value} Value
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{rec.description}</p>
                <div className="flex flex-wrap justify-between text-sm">
                  <span className="text-muted-foreground">
                    Timeframe: <span className="font-medium">{rec.timeframe}</span>
                  </span>
                  <span className="text-muted-foreground">
                    SWOT Alignment: <span className="font-medium">{rec.alignment}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-4 py-3">
          <Button className="w-full">
            Generate Action Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
