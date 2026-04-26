"use client";
import { useState } from "react";
import { Plus, X, IndianRupee } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { Transaction, CategoryName, PaymentMethod } from "@/types";

const CATEGORIES: CategoryName[] = [
  "Rent", "Food Delivery", "Commute", "Subscriptions", "Medical", "Dabba/Tiffin", "Miscellaneous",
];
const METHODS: PaymentMethod[] = ["UPI", "Card", "Cash", "NetBanking"];

interface Props {
  onAdd: (txn: Transaction) => void;
}

export default function AddExpenseModal({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryName>("Miscellaneous");
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  function reset() {
    setVendor(""); setAmount(""); setCategory("Miscellaneous");
    setMethod("UPI"); setDate(new Date().toISOString().split("T")[0]); setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vendor.trim()) return setError("Vendor name is required.");
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return setError("Enter a valid amount.");

    onAdd({
      id: `u_${Date.now()}`,
      date,
      vendor: vendor.trim(),
      category,
      amount: amt,
      paymentMethod: method,
    });
    reset();
    setOpen(false);
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6 h-14 w-14 rounded-full bg-amber-400 text-[#0f1117] shadow-lg shadow-amber-400/30 flex items-center justify-center hover:bg-amber-300 active:scale-95 transition-all"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
        <DialogContent className="bg-[#161b27] border border-white/10 text-white rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between mb-1">
              <DialogTitle className="text-white font-bold text-lg">Add Expense</DialogTitle>
              <button onClick={() => { setOpen(false); reset(); }} className="text-slate-500 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-slate-500 text-xs">New entries appear instantly in your feed.</p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Vendor */}
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">Vendor / Payee</Label>
              <Input
                placeholder="e.g. Swiggy, DMRC, Netflix"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-11"
              />
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">Amount (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                  type="number"
                  placeholder="0"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-11 pl-8"
                />
              </div>
            </div>

            {/* Category + Method row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as CategoryName)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-amber-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2535] border-white/10 text-white rounded-xl">
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="focus:bg-white/10 focus:text-white">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">Payment</Label>
                <Select value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-amber-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2535] border-white/10 text-white rounded-xl">
                    {METHODS.map((m) => (
                      <SelectItem key={m} value={m} className="focus:bg-white/10 focus:text-white">{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-11 [color-scheme:dark]"
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-amber-400 text-[#0f1117] font-bold text-sm hover:bg-amber-300 active:scale-[0.98] transition-all mt-2"
            >
              Add Expense
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
