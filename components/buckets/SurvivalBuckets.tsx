"use client";
import { Zap } from "lucide-react";
import { SURVIVAL_BUCKETS } from "@/lib/mock-data";
import { formatINR, pct } from "@/lib/utils";

const colorMap = {
  green: { bar: "bg-emerald-400", badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  amber: { bar: "bg-amber-400", badge: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  red: { bar: "bg-red-400", badge: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function SurvivalBuckets() {
  return (
    <div className="px-4 pb-4">
      <h2 className="text-white font-semibold text-base mb-3">Survival Buckets</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SURVIVAL_BUCKETS.map((bucket) => {
          const fill = pct(bucket.currentAmount, bucket.targetAmount);
          const toGo = bucket.targetAmount - bucket.currentAmount;
          const colors = colorMap[bucket.color];

          return (
            <div
              key={bucket.id}
              className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{bucket.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{bucket.description}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                  {fill}%
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">{formatINR(bucket.currentAmount)}</span>
                  <span className="text-slate-600">{formatINR(bucket.targetAmount)}</span>
                </div>
                {/* Custom progress bar with color */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${colors.bar}`}
                    style={{ width: `${fill}%` }}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1.5">
                  {formatINR(toGo)} to go
                </p>
              </div>

              <button className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold hover:bg-amber-400/20 transition-colors">
                <Zap className="h-3.5 w-3.5" />
                Auto-save ₹500 this week
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
