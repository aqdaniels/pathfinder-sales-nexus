
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ValueProposition() {
  const valuePoints = [
    {
      title: "Enterprise-Grade Solutions",
      description:
        "Proven track record of delivering and managing complex enterprise solutions",
    },
    {
      title: "Industry Expertise",
      description:
        "Deep vertical knowledge and experience across multiple industries",
    },
    {
      title: "Global Reach",
      description:
        "24/7 support and service delivery capabilities across all major regions",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Value Proposition</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {valuePoints.map((point) => (
          <Card key={point.title}>
            <CardHeader>
              <CardTitle className="text-lg">{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
