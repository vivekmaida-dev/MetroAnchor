"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { THIS_MONTH_TRANSACTIONS, CATEGORY_COLORS } from "@/lib/mock-data";
import { formatINR, formatShortDate } from "@/lib/utils";
import type { CategoryName, Transaction } from "@/types";

const FILTERS: Array<{ label: string; value: CategoryName | "All" }> = [
  { label: "All", value: "All" },
  { label: "Food", value: "Food Delivery" },
  { label: "Commute", value: "Commute" },
  { label: "Subs", value: "Subscriptions" },
  { label: "Medical", value: "Medical" },
];

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
      <div className="h-9 w-9 rounded-xl bg-white/10 flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-white/10 rounded w-32" />
        <div className="h-2.5 bg-white/10 rounded w-20" />
      </div>
      <div className="h-3 bg-white/10 rounded w-16" />
    </div>
  );
}

function VendorAvatar({ vendor, category, isNew }: { vendor: string; category: CategoryName; isNew?: boolean }) {
  const initials = vendor.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const color = CATEGORY_COLORS[category];
  return (
    <div className="relative flex-shrink-0">
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs"
        style={{ background: color + "22", border: `1px solid ${color}44` }}
      >
        <span style={{ color }}>{initials}</span>
      </div>
      {isNew && (
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-amber-400 rounded-full border border-[#0f1117]" />
      )}
    </div>
  );
}

interface Props {
  extraTransactions?: Transaction[];
}

export default function TransactionFeed({ extraTransactions = [] }: Props) {
  const [activeFilter, setActiveFilter] = useState<CategoryName | "All">("All");
  const [loading] = useState(false);

  const allTransactions = [
    ...extraTransactions,
    ...THIS_MONTH_TRANSACTIONS,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered =
    activeFilter === "All"
      ? allTransactions
      : allTransactions.filter((t) => t.category === activeFilter);

  const newIds = new Set(extraTransactions.map((t) => t.id));

  return (
    <div className="pb-4">
      <div className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-white font-semibold text-base">Transactions</h2>
        <span className="text-slate-500 text-xs">{filtered.length} entries</span>
      </div>

      <div className="px-4 mb-3 flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeFilter === value
                ? "bg-amber-400 text-[#0f1117] border-amber-400"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl mx-4 overflow-hidden divide-y divide-white/5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          : filtered.map((txn) => (
              <div
                key={txn.id}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${newIds.has(txn.id) ? "bg-amber-400/5" : ""}`}
              >
                <VendorAvatar vendor={txn.vendor} category={txn.category} isNew={newIds.has(txn.id)} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{txn.vendor}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge
                      className="text-[10px] px-1.5 py-0 border-0 font-medium"
                      style={{
                        background: CATEGORY_COLORS[txn.category] + "22",
                        color: CATEGORY_COLORS[txn.category],
                      }}
                    >
                      {txn.category}
                    </Badge>
                    <span className="text-slate-600 text-[10px]">{txn.paymentMethod}</span>
                    {newIds.has(txn.id) && (
                      <span className="text-amber-400 text-[10px] font-semibold">NEW</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-semibold text-sm">−{formatINR(txn.amount)}</p>
                  <p className="text-slate-600 text-[10px] mt-0.5">{formatShortDate(txn.date)}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
