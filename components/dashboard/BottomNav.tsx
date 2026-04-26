"use client";
import { LayoutDashboard, ShieldCheck, Archive, Lightbulb, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "shield", label: "Shield", icon: ShieldCheck },
  { id: "buckets", label: "Buckets", icon: Archive },
  { id: "insights", label: "Insights", icon: Lightbulb },
  { id: "profile", label: "Profile", icon: UserCircle },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1117]/95 backdrop-blur border-t border-white/5 md:hidden">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all",
              active === id
                ? "text-amber-400"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={active === id ? 2.5 : 2} />
            <span className="text-[9px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
