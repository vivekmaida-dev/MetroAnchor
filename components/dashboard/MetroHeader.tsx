"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatINR, remainingAfterFixed, remainingColor } from "@/lib/utils";
import { THIS_MONTH_SUMMARY, MONTHLY_INCOME } from "@/lib/mock-data";
import type { Transaction } from "@/types";

interface Props {
  extraTransactions?: Transaction[];
}

export default function MetroHeader({ extraTransactions = [] }: Props) {
  const { byCategory, month } = THIS_MONTH_SUMMARY;

  const extraSpend = extraTransactions.reduce((s, t) => s + t.amount, 0);
  const totalSpend = THIS_MONTH_SUMMARY.totalSpend + extraSpend;

  const remaining = remainingAfterFixed(MONTHLY_INCOME, byCategory) - extraSpend;
  const colorClass = remainingColor(remaining, MONTHLY_INCOME);
  const burnRate = Math.min(Math.round((totalSpend / MONTHLY_INCOME) * 100), 100);

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-0.5">
            {month}
          </p>
          <h1 className="text-white font-bold text-xl">Vivek Maida</h1>
        </div>
        <Avatar className="h-10 w-10 border-2 border-amber-400/30">
          <AvatarFallback className="bg-amber-400/10 text-amber-400 font-bold text-sm">
            VM
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/8">
        <p className="text-slate-400 text-xs font-medium mb-1">
          Available after fixed costs
        </p>
        <p className={`font-black text-4xl tracking-tight mb-1 ${colorClass}`}>
          {formatINR(remaining)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${burnRate}%` }}
            />
          </div>
          <span className="text-slate-400 text-xs whitespace-nowrap">
            {burnRate}% burn rate
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-2">
          Spent {formatINR(totalSpend)} of {formatINR(MONTHLY_INCOME)} income
          {extraTransactions.length > 0 && (
            <span className="text-amber-400 ml-1">
              (+{extraTransactions.length} added by you)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
