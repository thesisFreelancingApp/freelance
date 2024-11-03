import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils-cn";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold mt-2">{value}</h3>
        </div>
        <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trend && (
          <span
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
        <span className="text-sm text-gray-600">{description}</span>
      </div>
    </Card>
  );
};

export default StatsCard;