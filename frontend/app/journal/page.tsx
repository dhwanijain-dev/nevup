'use client'
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChartLineMultiple } from "@/components/chart-line-multiple";
import { Slider } from "@/components/ui/slider";
import { useRef, useState } from "react";

export default function Journal() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderValue = sliderRef.current?.getAttribute("aria-valuenow");
  const calendarData = [
    { day: 1, week: 1, amount: null },
    { day: 2, week: 1, amount: null },
    { day: 3, week: 2, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: true },
    { day: 4, week: 2, amount: null },
    { day: 5, week: 2, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: true },
    { day: 6, week: 2, amount: null },
    { day: 7, week: 2, amount: null },
    { day: 8, week: 2, amount: null },
    { day: 9, week: 3, amount: null },
    { day: 10, week: 3, amount: null },
    { day: 11, week: 3, amount: null },
    { day: 12, week: 3, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: false },
    { day: 13, week: 3, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: true },
    { day: 14, week: 3, amount: null },
    { day: 15, week: 3, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: true },
    { day: 16, week: 4, amount: null },
    { day: 17, week: 4, amount: "$344", trades: 3, percent: "0.00% 33.33%", positive: true },
  ];

  const stats = [
    { label: "Biggest Win", value: "6.36%" },
    { label: "Positive Days", value: "6.36%" },
    { label: "Avg Positive Day", value: "6.36%" },
    { label: "Negative Days", value: "6.36%" },
    { label: "Avg Negative Days", value: "6.36%" },
  ];
  const [balance, setBalance] = useState<number>(49440);
  const [equity, setEquity] = useState<number>(49440);


  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="gradient-border p-6 mb-6 rounded-xl">
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { label: "Average Win", value: "$11.40", change: "+0.56%", positive: true },
                { label: "Average Loss", value: "-$11.40", change: "+0.56%", positive: false },
                { label: "Win Ratio", value: "57%", change: "+0.56%", positive: true },
                { label: "Profit Factor", value: "0.46564", change: "+0.56%", positive: true },
              ].map((stat) => (
                <div key={stat.label} className="text-center border border-muted-foreground p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={cn("text-2xl font-bold mb-1", stat.positive ? "text-success" : "text-destructive")}>
                    {stat.value}
                  </p>
                  <p className={cn("text-xs", stat.positive ? "text-success" : "text-destructive")}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

                          <ChartLineMultiple />

          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="col-span-2 p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-primary" />
                  <span className="font-semibold">Today</span>
                  <ChevronRight className="w-5 h-5 cursor-pointer hover:text-primary" />
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Monthly stats: </span>
                  <span className="text-success">$5,13k</span>
                  <span className="text-muted-foreground ml-2">13 days</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarData.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-lg p-2 text-center relative",
                      item.amount
                        ? item.positive
                          ? "bg-success/20 border-2 border-success"
                          : "bg-destructive/20 border-2 border-destructive"
                        : "bg-muted/10"
                    )}
                  >
                    {item.amount && (
                      <>
                        <div className="text-xs font-medium mb-1">{item.day}</div>
                        <div className="text-sm font-bold">{item.amount}</div>
                        <div className="text-xs text-muted-foreground">{item.trades} Trades</div>
                        <div className="text-xs mt-1">{item.percent}</div>
                      </>
                    )}
                    {!item.amount && item.day && (
                      <div className="text-xs text-muted-foreground">{item.day}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                {[1, 2, 3, 4].map((week) => (
                  <div key={week}>
                    <p className="text-xs text-muted-foreground mb-1">Week {week}</p>
                    <p className="text-lg font-bold text-success">$344.00</p>
                    <p className="text-xs text-muted-foreground">0 days</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-4">Balance Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between gap-2 text-xs text-muted-foreground mb-2">
                      <span>$49,440 min</span>
                      <Slider  defaultValue={[balance]} min={49440}  max={54400} step={1} ref={sliderRef} />
                      <span>$5,440 max</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                    <p className="text-lg font-bold text-primary mt-2">${balance}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-4">Equity Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between gap-2 text-xs text-muted-foreground mb-2">
                      <span>$49,440 min</span>
                      <Slider defaultValue={[equity]} min={49440}  max={5440} step={1} ref={sliderRef} />

                      <span>$5,440 max</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                    <p className="text-lg font-bold text-primary mt-2">${sliderValue}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-4">Account Analysis</h3>
                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="text-success font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
