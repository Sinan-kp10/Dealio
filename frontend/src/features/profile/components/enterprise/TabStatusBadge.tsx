import { AlertCircle, BadgeCheck, Clock, Loader2 } from "lucide-react";

export type VerificationStatus = "LOADING" | "PENDING" | "VERIFIED" | "REQUIRED";

interface TabStatusBadgeProps {
  status: VerificationStatus;
}

export function TabStatusBadge({ status }: TabStatusBadgeProps) {
  switch (status) {
    case "LOADING":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-400 border border-slate-200/60 shrink-0">
          <Loader2 size={11} className="animate-spin text-slate-400" />
          <span className="text-[10px]">Loading...</span>
        </span>
      );

    case "PENDING":
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#fffbeb] text-[#d97706] border border-[#d97706]/20 shrink-0">
          <Clock size={12} strokeWidth={2.2} />
          <span>Pending</span>
        </span>
      );

    case "VERIFIED":
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shrink-0">
          <BadgeCheck size={12} strokeWidth={2.5} />
          <span>Verified</span>
        </span>
      );

    case "REQUIRED":
    default:
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/80 shrink-0">
          <AlertCircle size={12} strokeWidth={2.2} />
          <span>Required</span>
        </span>
      );
  }
}

export default TabStatusBadge;

