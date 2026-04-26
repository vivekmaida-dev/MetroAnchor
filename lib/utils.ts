import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategoryName } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function pct(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function momDelta(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function remainingAfterFixed(income: number, byCategory: Record<CategoryName, number>): number {
  const fixed = (byCategory["Rent"] || 0) + (byCategory["Subscriptions"] || 0);
  return income - fixed;
}

export function remainingColor(remaining: number, income: number): string {
  const ratio = remaining / income;
  if (ratio > 0.25) return "text-emerald-400";
  if (ratio > 0.1) return "text-amber-400";
  return "text-red-400";
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
