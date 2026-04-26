"use client";
import dynamic from "next/dynamic";
import { THIS_MONTH_SUMMARY, LAST_MONTH_SUMMARY } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import type { CategoryName } from "@/types";

const BarChartClient = dynamic(() => import("./BarChartClient"), { ssr: false });

const CATEGORIES: CategoryName[] = [
  "Food Delivery", "Commute", "Subscriptions", "Medical", "Dabba/Tiffin", "Miscellaneous",
];

const SHORT_LABELS: Record<CategoryName, string> = {
  Rent: "Rent",
  "Food Delivery": "Food",
  Commute: "Travel",
  Subscriptions: "Subs",
  Medical: "Medical",
  "Dabba/Tiffin": "Dabba",
  Miscellaneous: "Other",
};

export default function MonthComparison() {
  const thisMonth = THIS_MONTH_SUMMARY.byCategory;
  const lastMonth = LAST_MONTH_SUMMARY.byCategory;

  const data = CATEGORIES.map((cat) => ({
    name: SHORT_LABELS[cat],
    "Apr 2026": thisMonth[cat] || 0,
    "Mar 2026": lastMonth[cat] || 0,
  }));

  const delta = THIS_MONTH_SUMMARY.totalSpend - LAST_MONTH_SUMMARY.totalSpend;
  const isOver = delta > 0;

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold text-base">Month vs Month</h2>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
          isOver
            ? "text-red-400 bg-red-400/10 border-red-400/20"
            : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
        }`}>
          {isOver ? "+" : "−"}{formatINR(Math.abs(delta))} vs last month
        </span>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <BarChartClient data={data} />
      </div>
    </div>
  );
}
