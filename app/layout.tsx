import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MetroAnchor — Metro Expense Intelligence",
  description: "Track your urban spending like a Delhi pro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0f1117] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
