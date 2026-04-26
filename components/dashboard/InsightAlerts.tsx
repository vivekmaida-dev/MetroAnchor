"use client";
import { useState } from "react";
import { TrendingUp, CreditCard, Train, X, Bell } from "lucide-react";
import { INSIGHT_ALERTS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, CreditCard, Train,
};

export default function InsightAlerts() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = INSIGHT_ALERTS.filter((a) => !dismissed.has(a.id));

  if (visible.length === 0) {
    return (
      <div className="px-4 pb-4">
        <h2 className="text-white font-semibold text-base mb-3">AI Insights</h2>
        <div className="bg-white/5 rounded-2xl border border-white/8 p-8 text-center">
          <p className="text-slate-500 text-sm">All caught up! No new insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold text-base">AI Insights</h2>
        <span className="text-xs text-slate-500">{visible.length} active</span>
      </div>

      <div className="space-y-3">
        {visible.map((alert) => {
          const Icon = iconMap[alert.icon] || TrendingUp;
          return (
            <div
              key={alert.id}
              className="bg-white/5 border border-white/8 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-amber-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-white font-semibold text-sm leading-tight">
                      {alert.title}
                    </p>
                    <button
                      onClick={() => setDismissed((s) => new Set(s).add(alert.id))}
                      className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">
                    {alert.body}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      Save {formatINR(alert.potentialSaving)}/mo
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDismissed((s) => new Set(s).add(alert.id))}
                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1"
                      >
                        Dismiss
                      </button>
                      <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors px-2 py-1 flex items-center gap-1">
                        <Bell className="h-3 w-3" />
                        Remind me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
