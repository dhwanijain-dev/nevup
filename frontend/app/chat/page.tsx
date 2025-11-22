'use client';
import { useState } from "react";
import { Send, Mic, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/Sidebar";
import ChatSidebar from "@/components/ChatSidebar"

export default function Chat() {
  const [messages] = useState([
    {
      role: "user",
      content: "I'm feeling a bit nervous about my NVDA position after yesterday's drop.",
    },
    {
      role: "assistant",
      content: `Current State of AI:
• Lack of Subjective Experience: Presently, AI lacks the capacity for subjective experience. While AI can process vast amounts of information and perform complex tasks, it doesn't have personal experiences or emotions.
• Mimicking Human Behavior: Some AI systems are designed to mimic human behavior, including aspects of creativity and association, but this mimicry doesn't equate to actual dreaming.`,
    },
    {
      role: "user",
      content: "That's helpful. Can you analyze my risk level if I add to my position at the current price?",
    },
    {
      role: "assistant",
      content: `I understand. Based on your trading history, you tend to make better decisions when you:
• Set predefined exit points regardless of market movement.
• Reduce position sizes by 15% when feeling anxious.
• Consider the weekly timeframe before making daily decisions.`,
    },
  ]);

  const recentChats = [
    "Design Meetup Invitation..",
    "Upgrade Plan Content..",
    "Dashboard Overview Content..",
    "Minimalist Brand Content",
    "Open Banking Overview..",
  ];

  const suggestedPrompts = [
    "How can I develop a more consistent risk assessment framework?",
    "What systems can I put in place to reduce impulsive decisions?",
    "How do I typically respond under stress, and why?",
    "What risks am I underestimating or ignoring?",
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 ml-2  flex">
        <ChatSidebar recent={recentChats} />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length > 0 ? (
              messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                    {message.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-primary-foreground text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-2xl rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-muted text-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-primary-foreground text-xs">
                        ML
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="max-w-2xl w-full space-y-4">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="w-full p-4 text-left rounded-lg bg-card border border-border hover:border-primary transition-colors text-sm text-muted-foreground hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>

          <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-center bg-input rounded-full px-4 py-3 border border-border focus-within:border-primary transition-colors">
              <button className="text-muted-foreground hover:text-foreground">
                <Plus className="w-5 h-5" />
              </button>
              <Input
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
              <button className="text-muted-foreground hover:text-foreground">
                <Mic className="w-5 h-5" />
              </button>
              <Button
                size="icon"
                className="rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
