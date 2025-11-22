import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "trade" | "alert" | "achievement";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}

export const RecentActivity = () => {
  const activities: Activity[] = [
    {
      id: "1",
      type: "trade",
      title: "Avoided Panic Sell",
      description: "AI detected fear-based selling pattern and sent nudge",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: "2",
      type: "alert",
      title: "Overconfidence Alert",
      description: "Trading volume exceeded your normal pattern by 40%",
      timestamp: "5 hours ago",
      status: "warning",
    },
    {
      id: "3",
      type: "achievement",
      title: "7-Day Discipline Streak",
      description: "Maintained emotional control for a full week",
      timestamp: "1 day ago",
      status: "success",
    },
    {
      id: "4",
      type: "trade",
      title: "Revenge Trading Prevented",
      description: "Stopped you from making emotional trade after loss",
      timestamp: "2 days ago",
      status: "info",
    },
  ];

  const getIcon = (type: string, status: string) => {
    if (status === "success") return <TrendingUp className="h-4 w-4 text-success" />;
    if (status === "warning") return <AlertCircle className="h-4 w-4 text-warning" />;
    return <TrendingDown className="h-4 w-4 text-chart-3" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-success/20 text-success border-success/30";
      case "warning":
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
    }
  };

  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors animate-slide-in"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <div className="mt-1">{getIcon(activity.type, activity.status)}</div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{activity.title}</h3>
                <Badge variant="outline" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
