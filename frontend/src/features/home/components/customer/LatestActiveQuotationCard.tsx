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
  const isCompleted = quotation.status === "COMPLETED";

  const isLine1Done = isProposalReceived || isAccepted || isCompleted;
  const isLine2Done = isAccepted || isCompleted;
  const isLine3Done = isCompleted;

  const steps = [
    {
      step: 1,
      title: "1. Request Created",
      subtitle: formatDate(quotation.createdAt) || "Sent to verified sellers",
      isCompleted: true,
      isActive: false,
    },
    {
      step: 2,
      title: "2. Quotes Received",
      subtitle: isProposalReceived
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
      subtitle: "Lock proposal & deposit",
      isCompleted: isCompleted,
      isActive: isAccepted,
    },
    {
      step: 4,
      title: "4. Completed",
      subtitle: "Close the Request",
      isCompleted: isCompleted,
      isActive: false,
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
        {/* Header row: Product name, specs & View Details button */}
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

        {/* Purchase Progress Tracker */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
            Purchase Progress Tracker
          </span>

          <div className="w-full py-2">
            <div className="flex items-center w-full">
              {/* Step 1 Circle */}
              <div className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-4 ring-emerald-50">
                <Check size={15} strokeWidth={3} />
              </div>

              {/* Line 1 */}
              <div
                className={`flex-1 h-[2.5px] ${
                  isLine1Done ? "bg-emerald-600" : "bg-slate-200"
                }`}
              />

              {/* Step 2 Circle */}
              <div
                className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                  isLine2Done
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                    : isProposalReceived
                    ? "bg-[#2f5581] text-white ring-4 ring-[#2f5581]/20"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isLine2Done ? <Check size={15} strokeWidth={3} /> : 2}
              </div>

              {/* Line 2 */}
              <div
                className={`flex-1 h-[2.5px] ${
                  isLine2Done ? "bg-emerald-600" : "bg-slate-200"
                }`}
              />

              {/* Step 3 Circle */}
              <div
                className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  isLine3Done
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                    : isAccepted
                    ? "bg-[#2f5581] text-white ring-4 ring-[#2f5581]/20"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isLine3Done ? <Check size={15} strokeWidth={3} /> : 3}
              </div>

              {/* Line 3 */}
              <div
                className={`flex-1 h-[2.5px] ${
                  isLine3Done ? "bg-emerald-600" : "bg-slate-200"
                }`}
              />

              {/* Step 4 Circle */}
              <div
                className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  isCompleted
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-50 shadow-xs"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? <Check size={15} strokeWidth={3} /> : 4}
              </div>
            </div>

            {/* Labels under circles */}
            <div className="grid grid-cols-4 gap-2 mt-3 pt-1">
              {steps.map((st) => (
                <div key={st.step} className="flex flex-col">
                  <span
                    className={`text-xs font-bold ${
                      st.isCompleted
                        ? "text-emerald-700"
                        : st.isActive
                        ? "text-[#2f5581]"
                        : "text-slate-600"
                    }`}
                  >
                    {st.title}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {st.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestActiveQuotationCard;
