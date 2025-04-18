
import { BarChart3, BriefcaseBusiness, LayoutGrid, MapPin, Users, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard, ChartData } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopClients } from "@/components/dashboard/TopClients";

// Sample data for charts
const opportunitiesByPractice: ChartData[] = [
  { name: "Custom Apps", value: 32 },
  { name: "SAP", value: 28 },
  { name: "Enterprise & Cloud", value: 45 },
  { name: "Data & AI", value: 35 },
];

const opportunitiesByStage: ChartData[] = [
  { name: "Discovery", value: 25 },
  { name: "Qualification", value: 18 },
  { name: "Solution Dev", value: 12 },
  { name: "Proposal", value: 8 },
  { name: "Negotiation", value: 5 },
];

const revenueByMonth: ChartData[] = [
  { name: "Jan", value: 1.2 },
  { name: "Feb", value: 1.8 },
  { name: "Mar", value: 2.3 },
  { name: "Apr", value: 2.5 },
  { name: "May", value: 2.8 },
  { name: "Jun", value: 3.2 },
  { name: "Jul", value: 3.5 },
  { name: "Aug", value: 3.2 },
  { name: "Sep", value: 3.8 },
  { name: "Oct", value: 4.2 },
  { name: "Nov", value: 4.5 },
  { name: "Dec", value: 4.8 },
];

const Index = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-1">Sales Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your portfolio performance, opportunities, and client insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Active Opportunities"
          value={124}
          change={8}
          icon={Zap}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-100"
        />
        <StatCard
          title="Pipeline Value"
          value="$34.8M"
          change={12}
          icon={BriefcaseBusiness}
          iconColor="text-green-500"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Active Clients"
          value={48}
          change={5}
          icon={Users}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Win Rate"
          value="68%"
          change={3}
          icon={BarChart3}
          iconColor="text-dxc-purple"
          iconBgColor="bg-dxc-purple-light/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue Trend"
            description="Monthly revenue in millions ($)"
            data={revenueByMonth}
            type="line"
            height={250}
          />
        </div>
        <div>
          <ChartCard
            title="Opportunities by Practice"
            data={opportunitiesByPractice}
            type="pie"
            height={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <TopClients />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
