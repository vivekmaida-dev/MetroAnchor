"use client";
import { Bell, Anchor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f1117]/90 backdrop-blur border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Anchor className="text-amber-400 h-5 w-5" strokeWidth={2.5} />
          <span className="font-bold text-white tracking-tight text-lg">
            Metro<span className="text-amber-400">Anchor</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-medium px-2 py-0.5">
            Delhi NCR
          </Badge>
          <button className="relative p-1.5 rounded-full hover:bg-white/5 transition-colors">
            <Bell className="h-4.5 w-4.5 text-slate-300" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-amber-400 rounded-full border border-[#0f1117]" />
          </button>
        </div>
      </div>
    </header>
  );
}
