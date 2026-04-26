"use client";
import { useState } from "react";
import TopNav from "@/components/dashboard/TopNav";
import BottomNav from "@/components/dashboard/BottomNav";
import MetroHeader from "@/components/dashboard/MetroHeader";
import BudgetShield from "@/components/shield/BudgetShield";
import SurvivalBuckets from "@/components/buckets/SurvivalBuckets";
import InsightAlerts from "@/components/dashboard/InsightAlerts";
import TransactionFeed from "@/components/dashboard/TransactionFeed";
import MonthComparison from "@/components/dashboard/MonthComparison";
import AddExpenseModal from "@/components/dashboard/AddExpenseModal";
import ProfilePage from "@/components/profile/ProfilePage";
import { UserCircle } from "lucide-react";
import type { Transaction } from "@/types";

const SIDEBAR_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "shield", label: "Budget Shield" },
  { id: "buckets", label: "Survival Buckets" },
  { id: "insights", label: "AI Insights" },
  { id: "profile", label: "Profile" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);

  function handleAddExpense(txn: Transaction) {
    setUserTransactions((prev) => [txn, ...prev]);
    setActiveTab("dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      {/* Beta banner */}
      <div className="bg-amber-400/10 border-b border-amber-400/15 py-2 px-4 text-center">
        <p className="text-amber-400 text-xs font-medium">
          MetroAnchor Beta — Your data stays on your device. UPI linking coming soon.
        </p>
      </div>

      <TopNav />

      <div className="flex flex-1 max-w-5xl mx-auto w-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-52 flex-shrink-0 pt-6 px-3 gap-1 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          {SIDEBAR_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === id
                  ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {id === "profile" && <UserCircle className="h-4 w-4" />}
              {label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 pb-24 md:pb-8 overflow-x-hidden">
          {activeTab === "dashboard" && (
            <>
              <MetroHeader extraTransactions={userTransactions} />
              <InsightAlerts />
              <MonthComparison />
              <TransactionFeed extraTransactions={userTransactions} />
            </>
          )}
          {activeTab === "shield" && (
            <div className="pt-5">
              <BudgetShield />
            </div>
          )}
          {activeTab === "buckets" && (
            <div className="pt-5">
              <SurvivalBuckets />
            </div>
          )}
          {activeTab === "insights" && (
            <div className="pt-5">
              <InsightAlerts />
            </div>
          )}
          {activeTab === "profile" && (
            <div className="pt-5">
              <ProfilePage />
            </div>
          )}
        </main>
      </div>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Global FAB — hidden on profile tab */}
      {activeTab !== "profile" && (
        <AddExpenseModal onAdd={handleAddExpense} />
      )}
    </div>
  );
}
