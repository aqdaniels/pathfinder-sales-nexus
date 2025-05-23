
import {
  BarChart3,
  Brain,
  Building2,
  ChartBar,
  Compass,
  FileCheck,
  FileSpreadsheet,
  Home,
  Library,
  Lightbulb,
  Menu,
  MessageSquareText,
  Mic,
  Scale,
  ScrollText,
  Search,
  Settings,
  Sparkles,
  Star,
  Swords,
  Clock,
  Users,
  Grid2x2,
  BookOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive?: boolean;
};

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  isCollapsed,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-dxc-purple-light/20",
        isActive
          ? "bg-dxc-purple-light/30 text-dxc-purple-dark font-medium"
          : "text-dxc-gray-neutral",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive && "text-dxc-purple")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const sidebarSections = [
  {
    title: "Main",
    items: [
      {
        icon: Home,
        label: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    title: "Client Insights",
    items: [
      {
        icon: Brain,
        label: "Client Intelligence",
        path: "/client-intelligence",
      },
      {
        icon: Mic,
        label: "Meeting Intelligence",
        path: "/meeting-intelligence",
      },
      {
        icon: Users,
        label: "Relationship Network",
        path: "/relationship-network",
      },
    ],
  },
  {
    title: "Growth Opportunities",
    items: [
      {
        icon: ChartBar,
        label: "Growth Analyzer",
        path: "/growth-analyzer",
      },
      {
        icon: Compass,
        label: "Whitespace Explorer",
        path: "/whitespace-explorer",
      },
      {
        icon: ScrollText,
        label: "Portfolio Advisor",
        path: "/portfolio-advisor",
      },
      {
        icon: Building2,
        label: "Value Chain Analysis",
        path: "/value-chain",
      },
    ],
  },
  {
    title: "Competitive Positioning",
    items: [
      {
        icon: Swords,
        label: "Competitive Intelligence",
        path: "/competitive-intel",
      },
      {
        icon: BarChart3,
        label: "Market Position",
        path: "/market-position",
      },
      {
        icon: FileCheck,
        label: "Battlecards",
        path: "/competitive-battlecard",
      },
      {
        icon: Scale,
        label: "SWOT Analysis",
        path: "/swot-analysis",
      },
    ],
  },
  {
    title: "Strategic Planning",
    items: [
      {
        icon: Sparkles,
        label: "Strategy Development",
        path: "/strategy-development",
      },
      {
        icon: MessageSquareText,
        label: "Executive Storytelling",
        path: "/executive-value-storytelling",
      },
      {
        icon: FileSpreadsheet,
        label: "Technology Maturity",
        path: "/technology-maturity-assessment",
      },
      {
        icon: Grid2x2,
        label: "What-If Scenarios",
        path: "/what-if-scenarios",
      },
    ],
  },
  {
    title: "Resources & Knowledge",
    items: [
      {
        icon: Library,
        label: "Knowledge Resources",
        path: "/resources",
      },
      {
        icon: BookOpen,
        label: "Case Studies",
        path: "/case-studies",
      },
      {
        icon: FileText,
        label: "Templates",
        path: "/templates",
      },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-dxc-purple flex items-center justify-center">
              <span className="text-white font-semibold">P</span>
            </div>
            <span className="font-semibold text-lg">Pathfinder</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          <Menu className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col gap-6 px-3 py-4 flex-1 overflow-auto">
        {sidebarSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            {!collapsed && (
              <p className="text-xs font-medium text-gray-500 px-3 mb-1">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isCollapsed={collapsed}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3">
        <SidebarItem
          icon={Settings}
          label="Settings"
          path="/settings"
          isCollapsed={collapsed}
          isActive={location.pathname === "/settings"}
        />
      </div>
    </div>
  );
}
