export type PaymentMethod = "UPI" | "Card" | "Cash" | "NetBanking";

export type CategoryName =
  | "Rent"
  | "Food Delivery"
  | "Commute"
  | "Subscriptions"
  | "Medical"
  | "Dabba/Tiffin"
  | "Miscellaneous";

export interface Transaction {
  id: string;
  date: string; // ISO date string
  vendor: string;
  category: CategoryName;
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface Category {
  name: CategoryName;
  color: string;
  icon: string;
  budget?: number;
}

export interface SurvivalBucket {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  color: "green" | "amber" | "red";
  description: string;
}

export interface MonthSummary {
  month: string; // "April 2026"
  totalSpend: number;
  income: number;
  byCategory: Record<CategoryName, number>;
  transactions: Transaction[];
}

export interface InsightAlert {
  id: string;
  type: "lifestyle-creep" | "subscription" | "commute" | "saving";
  icon: string;
  title: string;
  body: string;
  potentialSaving: number;
  dismissed: boolean;
}
