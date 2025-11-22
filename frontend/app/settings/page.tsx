'use client'
import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">Application settings coming soon</p>
        </div>
      </div>
    </div>
  );
}
