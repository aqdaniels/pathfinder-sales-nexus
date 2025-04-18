
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CompetitorMatrix() {
  const features = [
    {
      name: "Cloud Infrastructure",
      dxc: "Enterprise-grade, fully managed",
      competitor: "Limited management options",
    },
    {
      name: "Security Services",
      dxc: "Zero-trust architecture, 24/7 monitoring",
      competitor: "Basic security features",
    },
    {
      name: "Implementation Timeline",
      dxc: "4-6 weeks average",
      competitor: "8-12 weeks average",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Feature Comparison Matrix</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            <TableHead>DXC Offering</TableHead>
            <TableHead>Competitor Offering</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell>{feature.dxc}</TableCell>
              <TableCell>{feature.competitor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
