import type { Transaction, MonthSummary, SurvivalBucket, InsightAlert, CategoryName } from "@/types";

export const MONTHLY_INCOME = 95000;

export const THIS_MONTH_TRANSACTIONS: Transaction[] = [
  // Rent
  { id: "t1", date: "2026-04-01", vendor: "Landlord – Lajpat Nagar", category: "Rent", amount: 28000, paymentMethod: "UPI" },

  // Food Delivery
  { id: "t2", date: "2026-04-02", vendor: "Swiggy", category: "Food Delivery", amount: 520, paymentMethod: "UPI" },
  { id: "t3", date: "2026-04-04", vendor: "Zomato", category: "Food Delivery", amount: 780, paymentMethod: "UPI" },
  { id: "t4", date: "2026-04-07", vendor: "Swiggy", category: "Food Delivery", amount: 340, paymentMethod: "UPI" },
  { id: "t5", date: "2026-04-10", vendor: "Zomato", category: "Food Delivery", amount: 690, paymentMethod: "UPI" },
  { id: "t6", date: "2026-04-14", vendor: "Swiggy", category: "Food Delivery", amount: 460, paymentMethod: "UPI" },
  { id: "t7", date: "2026-04-18", vendor: "Zomato", category: "Food Delivery", amount: 890, paymentMethod: "UPI" },
  { id: "t8", date: "2026-04-22", vendor: "Swiggy", category: "Food Delivery", amount: 940, paymentMethod: "UPI" },

  // Commute
  { id: "t9",  date: "2026-04-01", vendor: "Uber", category: "Commute", amount: 380, paymentMethod: "UPI" },
  { id: "t10", date: "2026-04-02", vendor: "Delhi Metro DMRC", category: "Commute", amount: 80, paymentMethod: "UPI" },
  { id: "t11", date: "2026-04-03", vendor: "Ola", category: "Commute", amount: 240, paymentMethod: "UPI" },
  { id: "t12", date: "2026-04-07", vendor: "Uber", category: "Commute", amount: 420, paymentMethod: "UPI" },
  { id: "t13", date: "2026-04-08", vendor: "Delhi Metro DMRC", category: "Commute", amount: 90, paymentMethod: "UPI" },
  { id: "t14", date: "2026-04-10", vendor: "Ola", category: "Commute", amount: 310, paymentMethod: "UPI" },
  { id: "t15", date: "2026-04-14", vendor: "Uber", category: "Commute", amount: 390, paymentMethod: "UPI" },
  { id: "t16", date: "2026-04-15", vendor: "Delhi Metro DMRC", category: "Commute", amount: 80, paymentMethod: "UPI" },
  { id: "t17", date: "2026-04-17", vendor: "Uber", category: "Commute", amount: 440, paymentMethod: "UPI" },
  { id: "t18", date: "2026-04-21", vendor: "Ola", category: "Commute", amount: 270, paymentMethod: "UPI" },
  { id: "t19", date: "2026-04-23", vendor: "Delhi Metro DMRC", category: "Commute", amount: 90, paymentMethod: "UPI" },
  { id: "t20", date: "2026-04-24", vendor: "Uber", category: "Commute", amount: 360, paymentMethod: "UPI" },

  // Subscriptions
  { id: "t21", date: "2026-04-03", vendor: "Netflix", category: "Subscriptions", amount: 649, paymentMethod: "Card" },
  { id: "t22", date: "2026-04-03", vendor: "Spotify", category: "Subscriptions", amount: 119, paymentMethod: "Card" },
  { id: "t23", date: "2026-04-05", vendor: "Cult.fit Gym", category: "Subscriptions", amount: 1499, paymentMethod: "UPI" },
  { id: "t24", date: "2026-04-06", vendor: "Amazon Prime", category: "Subscriptions", amount: 299, paymentMethod: "Card" },

  // Medical
  { id: "t25", date: "2026-04-09", vendor: "PharmEasy", category: "Medical", amount: 840, paymentMethod: "UPI" },
  { id: "t26", date: "2026-04-19", vendor: "Apollo Pharmacy", category: "Medical", amount: 560, paymentMethod: "UPI" },

  // Dabba/Tiffin
  { id: "t27", date: "2026-04-01", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "t28", date: "2026-04-11", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "t29", date: "2026-04-21", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "t30", date: "2026-04-24", vendor: "Home Kitchen Supply", category: "Dabba/Tiffin", amount: 350, paymentMethod: "Cash" },

  // Miscellaneous
  { id: "t31", date: "2026-04-08", vendor: "Decathlon", category: "Miscellaneous", amount: 1299, paymentMethod: "Card" },
  { id: "t32", date: "2026-04-16", vendor: "Big Bazaar", category: "Miscellaneous", amount: 2100, paymentMethod: "UPI" },
  { id: "t33", date: "2026-04-20", vendor: "Zepto Groceries", category: "Miscellaneous", amount: 780, paymentMethod: "UPI" },
];

export const LAST_MONTH_TRANSACTIONS: Transaction[] = [
  { id: "lm1", date: "2026-03-01", vendor: "Landlord – Lajpat Nagar", category: "Rent", amount: 28000, paymentMethod: "UPI" },
  { id: "lm2", date: "2026-03-03", vendor: "Swiggy", category: "Food Delivery", amount: 620, paymentMethod: "UPI" },
  { id: "lm3", date: "2026-03-06", vendor: "Zomato", category: "Food Delivery", amount: 880, paymentMethod: "UPI" },
  { id: "lm4", date: "2026-03-09", vendor: "Swiggy", category: "Food Delivery", amount: 410, paymentMethod: "UPI" },
  { id: "lm5", date: "2026-03-13", vendor: "Zomato", category: "Food Delivery", amount: 750, paymentMethod: "UPI" },
  { id: "lm6", date: "2026-03-17", vendor: "Swiggy", category: "Food Delivery", amount: 390, paymentMethod: "UPI" },
  { id: "lm7", date: "2026-03-22", vendor: "Zomato", category: "Food Delivery", amount: 1170, paymentMethod: "UPI" },
  { id: "lm8", date: "2026-03-01", vendor: "Uber", category: "Commute", amount: 340, paymentMethod: "UPI" },
  { id: "lm9", date: "2026-03-04", vendor: "Delhi Metro DMRC", category: "Commute", amount: 80, paymentMethod: "UPI" },
  { id: "lm10", date: "2026-03-07", vendor: "Ola", category: "Commute", amount: 270, paymentMethod: "UPI" },
  { id: "lm11", date: "2026-03-11", vendor: "Uber", category: "Commute", amount: 310, paymentMethod: "UPI" },
  { id: "lm12", date: "2026-03-14", vendor: "Delhi Metro DMRC", category: "Commute", amount: 80, paymentMethod: "UPI" },
  { id: "lm13", date: "2026-03-18", vendor: "Ola", category: "Commute", amount: 290, paymentMethod: "UPI" },
  { id: "lm14", date: "2026-03-21", vendor: "Uber", category: "Commute", amount: 360, paymentMethod: "UPI" },
  { id: "lm15", date: "2026-03-25", vendor: "Delhi Metro DMRC", category: "Commute", amount: 80, paymentMethod: "UPI" },
  { id: "lm16", date: "2026-03-28", vendor: "Uber", category: "Commute", amount: 400, paymentMethod: "UPI" },
  { id: "lm17", date: "2026-03-03", vendor: "Netflix", category: "Subscriptions", amount: 649, paymentMethod: "Card" },
  { id: "lm18", date: "2026-03-03", vendor: "Spotify", category: "Subscriptions", amount: 119, paymentMethod: "Card" },
  { id: "lm19", date: "2026-03-05", vendor: "Cult.fit Gym", category: "Subscriptions", amount: 1499, paymentMethod: "UPI" },
  { id: "lm20", date: "2026-03-06", vendor: "Amazon Prime", category: "Subscriptions", amount: 299, paymentMethod: "Card" },
  { id: "lm21", date: "2026-03-10", vendor: "PharmEasy", category: "Medical", amount: 420, paymentMethod: "UPI" },
  { id: "lm22", date: "2026-03-01", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "lm23", date: "2026-03-11", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "lm24", date: "2026-03-21", vendor: "Sharma Tiffin Service", category: "Dabba/Tiffin", amount: 800, paymentMethod: "UPI" },
  { id: "lm25", date: "2026-03-05", vendor: "Zepto Groceries", category: "Miscellaneous", amount: 920, paymentMethod: "UPI" },
  { id: "lm26", date: "2026-03-15", vendor: "Big Bazaar", category: "Miscellaneous", amount: 1800, paymentMethod: "UPI" },
];

function sumByCategory(txns: Transaction[]): Record<CategoryName, number> {
  const result: Record<CategoryName, number> = {
    Rent: 0, "Food Delivery": 0, Commute: 0, Subscriptions: 0,
    Medical: 0, "Dabba/Tiffin": 0, Miscellaneous: 0,
  };
  txns.forEach((t) => { result[t.category] = (result[t.category] || 0) + t.amount; });
  return result;
}

export const THIS_MONTH_SUMMARY: MonthSummary = {
  month: "April 2026",
  totalSpend: THIS_MONTH_TRANSACTIONS.reduce((s, t) => s + t.amount, 0),
  income: MONTHLY_INCOME,
  byCategory: sumByCategory(THIS_MONTH_TRANSACTIONS),
  transactions: THIS_MONTH_TRANSACTIONS,
};

export const LAST_MONTH_SUMMARY: MonthSummary = {
  month: "March 2026",
  totalSpend: LAST_MONTH_TRANSACTIONS.reduce((s, t) => s + t.amount, 0),
  income: MONTHLY_INCOME,
  byCategory: sumByCategory(LAST_MONTH_TRANSACTIONS),
  transactions: LAST_MONTH_TRANSACTIONS,
};

export const SURVIVAL_BUCKETS: SurvivalBucket[] = [
  {
    id: "b1", name: "Emergency Fund", targetAmount: 15000, currentAmount: 9200,
    color: "amber", description: "3-month safety net",
  },
  {
    id: "b2", name: "Rent Buffer", targetAmount: 5000, currentAmount: 4100,
    color: "green", description: "Cover next month's rent",
  },
  {
    id: "b3", name: "Medical Buffer", targetAmount: 3000, currentAmount: 780,
    color: "red", description: "Out-of-pocket health costs",
  },
];

export const INSIGHT_ALERTS: InsightAlert[] = [
  {
    id: "i1", type: "lifestyle-creep", icon: "TrendingUp", dismissed: false,
    title: "Lifestyle Creep Alert",
    body: "Your food delivery spend is up 34% vs last month (₹4,200 → ₹5,620). Your dabba vendor costs ₹3,100 less monthly for similar coverage.",
    potentialSaving: 3100,
  },
  {
    id: "i2", type: "subscription", icon: "CreditCard", dismissed: false,
    title: "Subscription Audit",
    body: "You have 4 active subscriptions totalling ₹2,566/month. You haven't used Spotify in 18 days — that's ₹119 burning silently.",
    potentialSaving: 418,
  },
  {
    id: "i3", type: "commute", icon: "Train", dismissed: false,
    title: "Commute Spike Detected",
    body: "Tuesday/Thursday Uber spend is 2.4× your Metro days. Shifting 2 days/week to Delhi Metro saves ~₹1,800/month.",
    potentialSaving: 1800,
  },
];

export const CATEGORY_COLORS: Record<CategoryName, string> = {
  Rent: "#6366f1",
  "Food Delivery": "#f59e0b",
  Commute: "#10b981",
  Subscriptions: "#8b5cf6",
  Medical: "#ef4444",
  "Dabba/Tiffin": "#06b6d4",
  Miscellaneous: "#94a3b8",
};
