'use client'
import { ProfileHeader } from "@/components/ProfileHeader";
import { PsychologyMetrics } from "@/components/PsychologyMetrics";
import { RecentActivity } from "@/components/RecentActivity";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { DollarSign, TrendingUp, Target, Zap } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-bacDecision Conf.

50% from yesterday

kground p-6">
      <Sidebar/>  

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          name="James Raymond"
          account="4453728992"
          tradingLevel="Advanced Trader"
          confidenceScore={87}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Portfolio Balance" 
            value="623,098.17"
            prefix="$"
            change={12.5}
            icon={DollarSign}
            delay={100}
          />
          <StatsCard
            title="Available Funds"
            value="122,912.50"
            prefix="$"
            change={5.2}
            icon={Zap}
            delay={200}
          />
          <StatsCard
            title="Win Rate"
            value="68.5"
            suffix="%"
            change={3.8}
            icon={Target}
            delay={300}
          />
          <StatsCard
            title="Monthly Return"
            value="21.7"
            suffix="%"
            change={8.4}
            icon={TrendingUp}
            delay={400}
          />
        </div>

        {/* Psychology Metrics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PsychologyMetrics />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Profile;
