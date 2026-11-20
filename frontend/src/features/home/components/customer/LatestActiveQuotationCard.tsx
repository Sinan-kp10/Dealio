import { Fragment } from "react";
import { Eye, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { formatDate } from "../../../../utils/dateFormatter";
import type { CustomerRecentQuotationItem } from "../../types/customer/customer-home.types";

interface LatestActiveQuotationCardProps {
  quotation: CustomerRecentQuotationItem;
}

export function LatestActiveQuotationCard({ quotation }: LatestActiveQuotationCardProps) {
  const navigate = useNavigate();

  const isProposalReceived = quotation.status === "PROPOSAL_RECEIVED";
  const isAccepted = quotation.status === "ACCEPTED";
  const isPayAdvance = quotation.status === "PAY_ADVANCE";
  const isCompleted = quotation.status === "COMPLETED";

  const step1Done = true;
  const step2Done = isAccepted || isPayAdvance || isCompleted;
  const step2Active = isProposalReceived;
  const step3Done = isAccepted || isPayAdvance || isCompleted;
  const step3Active = false;
  const step4Done = isCompleted;
  const step4Active = isAccepted || isPayAdvance;
  const step5Done = isCompleted;

  const isLine1Done = isProposalReceived || isAccepted || isPayAdvance || isCompleted;
  const isLine2Done = isAccepted || isPayAdvance || isCompleted;
  const isLine3Done = isPayAdvance || isCompleted;
  const isLine4Done = isCompleted;

  const steps = [
    {
      title: "Request Created",
      subtitle: formatDate(quotation.createdAt) || "Sent to verified sellers",
      isDone: step1Done,
      isActive: false,
      isLineDone: isLine1Done,
    },
    {
      title: "Proposal Received",
      subtitle: isProposalReceived
        ? "Proposals Available"
        : isAccepted || isPayAdvance || isCompleted
        ? "Proposal Accepted"
        : "Awaiting Proposals",
      isDone: step2Done,
      isActive: step2Active,
      isLineDone: isLine2Done,
    },
    {
      title: "Proposal Accepted",
      subtitle: isAccepted || isPayAdvance || isCompleted ? "Proposal accepted" : "Accept a proposal",
      isDone: step3Done,
      isActive: step3Active,
      isLineDone: isLine3Done,
    },
    {
      title: "Pay Advance",
      subtitle: isCompleted
        ? "Advance paid"
        : isPayAdvance
        ? "Payment in progress"
        : "Lock proposal & deposit",
      isDone: step4Done,
      isActive: step4Active,
      isLineDone: isLine4Done,
    },
    {
      title: "Completed",
      subtitle: isCompleted ? "Request completed" : "Close the Request",
      isDone: step5Done,
      isActive: false,
      isLineDone: false,
    },
  ];

  return (
    <section className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0">
          Latest Active Quotation
        </h2>
        <span className="text-xs sm:text-sm text-slate-500 font-normal">
          Tracking your current active quotation request
        </span>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0e2238] tracking-tight m-0">
                {quotation.productName}
              </h3>
              <StatusBadge status={quotation.status} />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1.5 font-normal">
              <span>Requested: {formatDate(quotation.createdAt)}</span>
              <span>•</span>
              <span>Qty: {String(quotation.quantity).padStart(2, "0")} Units</span>
              <span>•</span>
              <span>{quotation.category.name}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/customer/quotations/${quotation.id}`)}
            className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1e3a5f] bg-[#edf4fb] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <Eye size={14} className="text-[#1e3a5f]" />
            <span>View Details</span>
            <ArrowRight size={14} className="text-[#1e3a5f]" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
            <span>Purchase Progress Tracker</span>
          </div>

          <div className="w-full py-2">
            <div className="flex items-center w-full">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <Fragment key={step.title}>
                    <div
                      className={`relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                        step.isDone
                          ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                          : step.isActive
                          ? "bg-[#2f5581] text-white ring-4 ring-[#2f5581]/20"
                          : "bg-white border-2 border-slate-300 text-slate-400"
                      }`}
                    >
                      {step.isDone ? <Check size={15} strokeWidth={3} /> : index + 1}
                    </div>

                    {!isLast && (
                      <div
                        className={`flex-1 h-[2.5px] transition-colors ${
                          step.isLineDone ? "bg-emerald-600" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="flex justify-between w-full mt-3">
              {steps.map((step, index) => {
                const isFirst = index === 0;
                const isLast = index === steps.length - 1;
                const alignClass = isFirst
                  ? "text-left"
                  : isLast
                  ? "text-right"
                  : "text-center";
                const widthClass = isFirst || isLast ? "w-[17%]" : "w-[22%]";

                return (
                  <div key={step.title} className={`${widthClass} ${alignClass} min-w-0`}>
                    <p
                      className={`text-[11px] sm:text-xs font-bold leading-tight m-0 ${
                        step.isDone || step.isActive ? "text-[#0e2238]" : "text-slate-500"
                      }`}
                    >
                      {index + 1}. {step.title}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 m-0 leading-tight hidden sm:block">
                      {step.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestActiveQuotationCard;
