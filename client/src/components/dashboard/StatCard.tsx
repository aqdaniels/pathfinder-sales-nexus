
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-dxc-purple",
  iconBgColor = "bg-dxc-purple-light/30",
}: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {typeof change !== "undefined" && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                change >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {change >= 0 ? "+" : ""}
              {change}% from last period
            </p>
          )}
        </div>
        <div className={cn("p-2 rounded-md", iconBgColor)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}
