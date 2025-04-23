
import { BarChart3, BriefcaseBusiness, Brain, Swords } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard, ChartData } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopClients } from "@/components/dashboard/TopClients";

// Sample data for charts
const opportunitiesByCategory: ChartData[] = [
  { name: "Client Discovery", value: 35 },
  { name: "Strategy Creation", value: 42 },
  { name: "Competitive Intel", value: 28 },
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
        <h1 className="text-3xl font-bold mb-1">Sales Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of opportunities across client discovery, strategy, and competitive intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Client Discovery"
          value={35}
          change={8}
          icon={Brain}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Strategy Creation"
          value={42}
          change={12}
          icon={BriefcaseBusiness}
          iconColor="text-green-500"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Competitive Intel"
          value={28}
          change={5}
          icon={Swords}
          iconColor="text-purple-500"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title="Overall Win Rate"
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
            title="Opportunities by Category"
            data={opportunitiesByCategory}
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
