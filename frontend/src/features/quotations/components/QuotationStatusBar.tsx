import { Check, Ban, Info } from "lucide-react";
import { formatDate } from "../../../utils/dateFormatter";
import type { QuotationRequestStatus } from "../types/quotation.types";

interface QuotationStatusBarProps {
  status: QuotationRequestStatus;
  createdAt: string;
  className?: string;
}

export function QuotationStatusBar({status,createdAt,className = ""}: QuotationStatusBarProps) {
  const isProposalReceived = status === "PROPOSAL_RECEIVED";
  const isAccepted = status === "ACCEPTED";
  const isCompleted = status === "COMPLETED";
  const isCancelled = status === "CANCELLED";

  const isLine1Done = isProposalReceived || isAccepted || isCompleted;
  const isLine2Done = isAccepted || isCompleted;
  const isLine3Done = isCompleted;

  const steps = [
    {
      step: 1,
      title: "1. Request Created",
      subtitle: formatDate(createdAt) || "Sent to verified sellers",
      isCompleted: true,
      isActive: false,
    },
    {
      step: 2,
      title: "2. Proposal Received",
      subtitle: isCancelled
        ? "Skipped"
        : isProposalReceived
        ? "Proposals Available"
        : isAccepted || isCompleted
        ? "Proposal Accepted"
        : "Awaiting Proposals",
      isCompleted: isAccepted || isCompleted,
      isActive: isProposalReceived,
    },
    {
      step: 3,
      title: "3. Pay Advance",
      subtitle: isCancelled ? "Skipped" : "Lock deal & deposit",
      isCompleted: isCompleted,
      isActive: isAccepted,
    },
    {
      step: 4,
      title: isCancelled ? "4. Cancelled" : "4. Completed",
      subtitle: isCancelled ? "Request Cancelled" : "Close the Deal",
      isCompleted: isCompleted || isCancelled,
      isActive: false,
    },
  ];

  return (
    <div
      className={`lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col justify-between space-y-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
        <Info size={16} className="text-[#2f5581]" />
        <span>Request Status</span>
      </div>

      <div className="w-full py-4 my-auto">
        <div className="flex items-center w-full">
          <div className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-4 ring-emerald-50">
            <Check size={15} strokeWidth={3} />
          </div>

          <div
            className={`flex-1 h-[2.5px] ${
              isCancelled
                ? "bg-rose-500"
                : isLine1Done
                ? "bg-emerald-600"
                : "bg-slate-200"
            }`}
          />

          <div
            className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
              isCancelled
                ? "bg-white border-2 border-slate-300 text-slate-400"
                : isLine2Done
                ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                : isProposalReceived
                ? "bg-[#2f5581] text-white ring-4 ring-[#2f5581]/20"
                : "bg-white border-2 border-slate-300 text-slate-400"
            }`}
          >
            {isLine2Done && !isCancelled ? (
              <Check size={15} strokeWidth={3} />
            ) : (
              2
            )}
          </div>

          <div
            className={`flex-1 h-[2.5px] ${
              isCancelled
                ? "bg-rose-500"
                : isLine2Done
                ? "bg-emerald-600"
                : "bg-slate-200"
            }`}
          />

          <div
            className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              isCancelled
                ? "bg-white border-2 border-slate-300 text-slate-400"
                : isLine3Done
                ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                : isAccepted
                ? "bg-[#2f5581] text-white ring-4 ring-[#2f5581]/20"
                : "bg-white border-2 border-slate-300 text-slate-400"
            }`}
          >
            {isLine3Done && !isCancelled ? <Check size={15} strokeWidth={3} /> : 3}
          </div>

          <div
            className={`flex-1 h-[2.5px] ${
              isCancelled
                ? "bg-rose-500"
                : isLine3Done
                ? "bg-emerald-600"
                : "bg-slate-200"
            }`}
          />

          <div
            className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              isCancelled
                ? "bg-rose-600 text-white ring-4 ring-rose-100 shadow-xs"
                : isCompleted
                ? "bg-emerald-600 text-white ring-4 ring-emerald-50 shadow-xs"
                : "bg-white border-2 border-slate-300 text-slate-400"
            }`}
          >
            {isCancelled ? (
              <Ban size={14} strokeWidth={2.5} />
            ) : isCompleted ? (
              <Check size={15} strokeWidth={3} />
            ) : (
              4
            )}
          </div>
        </div>

        <div className="flex justify-between w-full mt-3">
          <div className="w-1/4 text-left">
            <p className="text-[11px] sm:text-xs font-bold text-emerald-700 m-0 leading-tight">
              1. Request Created
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 m-0 leading-tight">
              {steps[0].subtitle}
            </p>
          </div>

          <div className="w-1/4 text-center">
            <p
              className={`text-[11px] sm:text-xs font-bold m-0 leading-tight ${
                isCancelled
                  ? "text-slate-400"
                  : isLine2Done
                  ? "text-emerald-700"
                  : isProposalReceived
                  ? "text-[#0e2238]"
                  : "text-slate-500"
              }`}
            >
              2. Proposal Received
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 m-0 leading-tight">
              {steps[1].subtitle}
            </p>
          </div>

          <div className="w-1/4 text-center">
            <p
              className={`text-[11px] sm:text-xs font-bold m-0 leading-tight ${
                isCancelled
                  ? "text-slate-400"
                  : isLine3Done
                  ? "text-emerald-700"
                  : isAccepted
                  ? "text-[#0e2238]"
                  : "text-slate-500"
              }`}
            >
              3. Pay Advance
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 m-0 leading-tight">
              {steps[2].subtitle}
            </p>
          </div>

          <div className="w-1/4 text-right">
            <p
              className={`text-[11px] sm:text-xs font-bold m-0 leading-tight ${
                isCancelled
                  ? "text-rose-700"
                  : isCompleted
                  ? "text-emerald-700"
                  : "text-slate-500"
              }`}
            >
              {steps[3].title}
            </p>
            <p
              className={`text-[10px] sm:text-[11px] mt-1 m-0 leading-tight ${
                isCancelled ? "text-rose-500 font-medium" : "text-slate-400"
              }`}
            >
              {steps[3].subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block h-2" />
    </div>
  );
}

export default QuotationStatusBar;
