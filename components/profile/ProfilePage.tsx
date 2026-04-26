"use client";
import { useState } from "react";
import { User, MapPin, Wallet, Target, CheckCircle, Edit3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatINR } from "@/lib/utils";

interface ProfileData {
  name: string;
  city: string;
  monthlyIncome: string;
  savingsGoal: string;
  upiId: string;
  employer: string;
}

const DEFAULT: ProfileData = {
  name: "Vivek Maida",
  city: "Delhi NCR",
  monthlyIncome: "95000",
  savingsGoal: "20",
  upiId: "vivek@upi",
  employer: "Tech Company",
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(DEFAULT);
  const [saved, setSaved] = useState(false);

  function startEdit() { setDraft({ ...profile }); setEditing(true); setSaved(false); }

  function saveEdit() {
    setProfile({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function cancelEdit() { setEditing(false); }

  const income = parseInt(profile.monthlyIncome) || 0;
  const goalAmt = Math.round(income * (parseInt(profile.savingsGoal) || 0) / 100);

  return (
    <div className="px-4 pt-5 pb-8 max-w-lg mx-auto">
      {/* Avatar + name hero */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <Avatar className="h-20 w-20 border-2 border-amber-400/40">
          <AvatarFallback className="bg-amber-400/10 text-amber-400 font-bold text-2xl">
            {initials(profile.name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-white font-bold text-xl">{profile.name}</h2>
          <div className="flex items-center justify-center gap-1 mt-1">
            <MapPin className="h-3 w-3 text-slate-500" />
            <span className="text-slate-400 text-sm">{profile.city}</span>
          </div>
        </div>

        {!editing && (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition-colors"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Profile
          </button>
        )}

        {saved && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <CheckCircle className="h-3.5 w-3.5" />
            Profile saved
          </div>
        )}
      </div>

      {/* Summary cards (read-only, derived from profile) */}
      {!editing && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-slate-400 text-xs">Monthly Income</span>
            </div>
            <p className="text-white font-bold text-lg">{formatINR(income)}</p>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-slate-400 text-xs">Savings Goal</span>
            </div>
            <p className="text-white font-bold text-lg">{profile.savingsGoal}%</p>
            <p className="text-slate-500 text-xs mt-0.5">{formatINR(goalAmt)}/mo</p>
          </div>
        </div>
      )}

      {/* Read-only info */}
      {!editing && (
        <div className="bg-white/5 border border-white/8 rounded-2xl divide-y divide-white/5 mb-6">
          {[
            { icon: User, label: "Full Name", value: profile.name },
            { icon: MapPin, label: "City", value: profile.city },
            { icon: Wallet, label: "UPI ID", value: profile.upiId },
            { icon: Target, label: "Employer", value: profile.employer },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3">
              <Icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-slate-500 text-xs">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 space-y-4">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">Edit Details</p>

          {[
            { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
            { key: "city", label: "City", placeholder: "e.g. Delhi NCR", type: "text" },
            { key: "employer", label: "Employer", placeholder: "Company name", type: "text" },
            { key: "upiId", label: "UPI ID", placeholder: "yourname@upi", type: "text" },
            { key: "monthlyIncome", label: "Monthly In-Hand Income (₹)", placeholder: "95000", type: "number" },
            { key: "savingsGoal", label: "Savings Goal (% of income)", placeholder: "20", type: "number" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</Label>
              <Input
                type={type}
                placeholder={placeholder}
                value={draft[key as keyof ProfileData]}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-amber-400/50 rounded-xl h-11"
              />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              onClick={saveEdit}
              className="flex-1 h-11 rounded-xl bg-amber-400 text-[#0f1117] font-bold text-sm hover:bg-amber-300 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="h-11 px-5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* UPI linking teaser */}
      <div className="bg-amber-400/5 border border-amber-400/15 rounded-2xl p-4 flex items-start gap-3">
        <div className="h-8 w-8 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Wallet className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <p className="text-amber-400 text-sm font-semibold">UPI Auto-import coming soon</p>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
            Link your UPI ID to auto-pull transactions from Swiggy, Uber, and more. No manual entry needed.
          </p>
        </div>
      </div>
    </div>
  );
}
