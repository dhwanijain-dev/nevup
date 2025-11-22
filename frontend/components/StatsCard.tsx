import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  delay = 0,
  prefix = "",
  suffix = "",
}: StatsCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isPositive = change && change > 0;
  const changeColor = isPositive ? "text-success" : "text-destructive";

  return (
    <Card
      className={`p-6 border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 hover:border-primary/50 transition-all duration-300 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {change !== undefined && (
          <span className={`text-sm font-medium ${changeColor}`}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">
          {prefix}
          {value}
          {suffix}
        </p>
      </div>
    </Card>
  );
};
