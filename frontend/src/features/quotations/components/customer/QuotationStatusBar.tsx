import { useState, useEffect } from "react";
import { Check, Ban, Info } from "lucide-react";
import { formatDate } from "../../../../utils/dateFormatter";
import type { QuotationRequestStatus } from "../../types/quotation.types";

interface QuotationStatusBarProps {
  status: QuotationRequestStatus;
  createdAt: string;
  className?: string;
}

export function QuotationStatusBar({ status, createdAt, className = "" }: QuotationStatusBarProps) {
  const isProposalReceived = status === "PROPOSAL_RECEIVED";
  const isAccepted = status === "ACCEPTED";
  const isPayAdvance = status === "PAY_ADVANCE";
  const isCompleted = status === "COMPLETED";
  const isCancelled = status === "CANCELLED";

  const step1Done = true;
  const step2Done = !isCancelled && (isProposalReceived || isAccepted || isPayAdvance || isCompleted);
  const step3Done = !isCancelled && (isAccepted || isPayAdvance || isCompleted);
  const step4Done = !isCancelled && (isPayAdvance || isCompleted);
  const step5Done = !isCancelled && isCompleted;

  const targetProgress = isCancelled
    ? 100
    : isCompleted
    ? 100
    : isPayAdvance
    ? 87.5
    : isAccepted
    ? 62.5
    : isProposalReceived
    ? 37.5
    : 12.5;

  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(targetProgress);
    }, 50);
    return () => clearTimeout(timer);
  }, [targetProgress]);

  const steps = [
    {
      title: "Request Created",
      subtitle: formatDate(createdAt) || "Sent to verified sellers",
      isDone: step1Done,
    },
    {
      title: "Proposal Received",
      subtitle: isCancelled
        ? "Skipped"
        : isProposalReceived
        ? "Proposals Available"
        : isAccepted || isPayAdvance || isCompleted
        ? "Proposal Accepted"
        : "Awaiting Proposals",
      isDone: step2Done,
    },
    {
      title: "Proposal Accepted",
      subtitle: isCancelled
        ? "Skipped"
        : isAccepted || isPayAdvance || isCompleted
        ? "Proposal accepted"
        : "Accept a proposal",
      isDone: step3Done,
    },
    {
      title: "Pay Advance",
      subtitle: isCancelled
        ? "Skipped"
        : isCompleted
        ? "Advance deposited"
        : isPayAdvance
        ? "Payment in progress"
        : "Lock deal & deposit",
      isDone: step4Done,
    },
    {
      title: isCancelled ? "Cancelled" : "Completed",
      subtitle: isCancelled ? "Request Cancelled" : isCompleted ? "Deal Closed" : "Close the Deal",
      isDone: step5Done,
    },
  ];

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0e2238]">
        <div className="w-7 h-7 rounded-lg bg-[#edf4fb] text-[#2f5581] flex items-center justify-center shrink-0">
          <Info size={15} />
        </div>
        <span>Request Status</span>
      </div>

      <div className="w-full py-2">
        <div className="relative flex items-center justify-between w-full">
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5 right-3.5 sm:left-4 sm:right-4 h-[3px] bg-slate-200 rounded-full pointer-events-none overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isCancelled ? "bg-rose-500" : "bg-emerald-600"
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {/* Step Circles */}
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isCancelStep = isLast && isCancelled;

            return (
              <div
                key={step.title}
                className={`relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                  isCancelStep
                    ? "bg-rose-600 text-white ring-4 ring-rose-100"
                    : step.isDone
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isCancelStep ? (
                  <Ban size={14} strokeWidth={2.5} />
                ) : step.isDone ? (
                  <Check size={15} strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between w-full mt-3">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const isCancelStep = isLast && isCancelled;
            const alignClass = isFirst
              ? "text-left"
              : isLast
              ? "text-right"
              : "text-center";
            const widthClass = isFirst || isLast ? "w-[12.5%]" : "w-[25%]";

            return (
              <div key={step.title} className={`${widthClass} ${alignClass} min-w-0 overflow-visible`}>
                <p
                  className={`text-[11px] sm:text-xs font-bold leading-tight m-0 ${
                    isCancelStep
                      ? "text-rose-700"
                      : step.isDone
                      ? "text-[#0e2238]"
                      : "text-slate-500"
                  }`}
                >
                  {index + 1}. {step.title}
                </p>
                <p
                  className={`text-[10px] sm:text-[11px] mt-1 m-0 leading-tight hidden sm:block ${
                    isCancelStep ? "text-rose-500 font-medium" : "text-slate-400"
                  }`}
                >
                  {step.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuotationStatusBar;
