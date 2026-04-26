"use client";
import dynamic from "next/dynamic";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { THIS_MONTH_SUMMARY, LAST_MONTH_SUMMARY, CATEGORY_COLORS, MONTHLY_INCOME } from "@/lib/mock-data";
import { formatINR, pct, momDelta } from "@/lib/utils";
import type { CategoryName } from "@/types";

const DonutChart = dynamic(() => import("./DonutChart"), { ssr: false });

const CATEGORIES: CategoryName[] = [
  "Rent", "Food Delivery", "Commute", "Subscriptions", "Medical", "Dabba/Tiffin", "Miscellaneous",
];

function MomArrow({ delta }: { delta: number }) {
  if (delta > 0) return <ArrowUp className="h-3 w-3 text-red-400 inline" />;
  if (delta < 0) return <ArrowDown className="h-3 w-3 text-emerald-400 inline" />;
  return <Minus className="h-3 w-3 text-slate-400 inline" />;
}

export default function BudgetShield() {
  const { byCategory, totalSpend } = THIS_MONTH_SUMMARY;
  const lastCat = LAST_MONTH_SUMMARY.byCategory;

  const pieData = CATEGORIES.map((cat) => ({
    name: cat,
    value: byCategory[cat] || 0,
    color: CATEGORY_COLORS[cat],
  })).filter((d) => d.value > 0);

  return (
    <div className="px-4 pb-4">
      <h2 className="text-white font-semibold text-base mb-3">Budget Shield</h2>

      <div className="bg-white/5 rounded-2xl border border-white/8 p-4 mb-3">
        <DonutChart data={pieData} total={totalSpend} />
      </div>

      <div className="space-y-2">
        {pieData.map(({ name, value, color }) => {
          const delta = momDelta(value, lastCat[name as CategoryName] || 0);
          return (
            <div
              key={name}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 border border-white/5"
            >
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-slate-300 text-sm flex-1">{name}</span>
              <span className="text-slate-400 text-xs">{pct(value, MONTHLY_INCOME)}%</span>
              <span className="text-white text-sm font-medium w-20 text-right">{formatINR(value)}</span>
              <span className={`text-xs w-10 text-right flex items-center justify-end gap-0.5 ${delta > 0 ? "text-red-400" : delta < 0 ? "text-emerald-400" : "text-slate-400"}`}>
                <MomArrow delta={delta} />
                {Math.abs(delta)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
