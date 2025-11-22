import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Shield, AlertTriangle } from "lucide-react";

interface MetricData {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const PsychologyMetrics = () => {
  const metrics: MetricData[] = [
    {
      label: "Emotional Control",
      value: 85,
      icon: <Brain className="h-4 w-4" />,
      color: "from-primary to-chart-1",
    },
    {
      label: "Risk Management",
      value: 92,
      icon: <Shield className="h-4 w-4" />,
      color: "from-success to-chart-5",
    },
    {
      label: "Discipline Score",
      value: 78,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "from-chart-3 to-secondary",
    },
    {
      label: "Bias Awareness",
      value: 88,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "from-warning to-chart-4",
    },
  ];

  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-xl font-bold text-foreground mb-6">Trading Psychology Metrics</h2>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="space-y-2 animate-slide-in"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 bg-gradient-to-br ${metric.color} rounded-lg text-white`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
              </div>
              <span className="text-sm font-bold text-primary">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">Great progress!</span> Your emotional control
          has improved by 12% this month.
        </p>
      </div>
    </Card>
  );
};
