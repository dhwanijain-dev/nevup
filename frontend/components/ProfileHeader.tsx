import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Brain } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileHeaderProps {
  name: string;
  account: string;
  avatar?: string;
  tradingLevel: string;
  confidenceScore: number;
}

export const ProfileHeader = ({
  name,
  account,
  avatar,
  tradingLevel,
  confidenceScore,
}: ProfileHeaderProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = confidenceScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= confidenceScore) {
        setAnimatedScore(confidenceScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [confidenceScore]);

  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur-sm animate-fade-in">
      <div className="flex items-start gap-6">
        <div className="relative animate-slide-in">
          <Avatar className="h-24 w-24 border-2 border-primary animate-pulse-glow">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
            <Brain className="h-4 w-4" />
          </div>
        </div>

        <div className="flex-1 space-y-3 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{name}</h1>
            <p className="text-muted-foreground">Account: {account}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <Award className="h-3 w-3 mr-1" />
              {tradingLevel}
            </Badge>
            <Badge variant="outline" className="border-success/30 text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active Trader
            </Badge>
          </div>

          <div className="flex items-center gap-3 animate-counter-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-muted-foreground">Confidence Score</span>
                <span className="text-2xl font-bold text-primary">{animatedScore}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                  style={{ width: `${animatedScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
