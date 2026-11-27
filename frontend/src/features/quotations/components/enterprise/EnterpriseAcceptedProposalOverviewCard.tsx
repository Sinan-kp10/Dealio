import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircleMore, Check, Clock, User, CheckCircle2, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { EnterpriseAcceptedProposalQuotationDrawer } from "./EnterpriseAcceptedProposalQuotationDrawer";
import { formatDate } from "../../../../utils/dateFormatter";
import type { EnterpriseAcceptedProposalDetails } from "../../types/enterprise-accepted-proposal-details.types";

interface EnterpriseAcceptedProposalOverviewCardProps {
  proposal: EnterpriseAcceptedProposalDetails;
}

export function EnterpriseAcceptedProposalOverviewCard({proposal}: EnterpriseAcceptedProposalOverviewCardProps) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isAccepted = proposal.status === "ACCEPTED";
  const isPaid = proposal.status === "PAID";
  const isCompleted = proposal.status === "COMPLETED";

  const targetProgress = isCompleted ? 100 : isPaid ? 50 : isAccepted ? 16.5 : 0;
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(targetProgress);
    }, 50);
    return () => clearTimeout(timer);
  }, [targetProgress]);

  const steps = [
    {
      title: "Proposal Accepted",
      mobileTitle: "Accepted",
      subtitle: formatDate(proposal.acceptedAt) || "Deal confirmed",
      isDone: true,
    },
    {
      title: "Customer Payment",
      mobileTitle: "Payment",
      subtitle: proposal.paidAt
        ? formatDate(proposal.paidAt)
        : isPaid || isCompleted
        ? "Payment received"
        : "Awaiting customer payment",
      isDone: isPaid || isCompleted,
    },
    {
      title: "Deal Fulfillment",
      mobileTitle: "Fulfillment",
      subtitle: isCompleted
        ? "Deal fulfilled"
        : isPaid
        ? "Ready for fulfillment"
        : "Pending payment",
      isDone: isCompleted,
    },
    {
      title: "Completed",
      mobileTitle: "Completed",
      subtitle: proposal.completedAt ? formatDate(proposal.completedAt) : "Deal closure",
      isDone: isCompleted,
    },
  ];

  const handleChat = () => {
    navigate(`/enterprise/chat?targetId=${proposal.customerId}`);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
      <div className="pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <span className="text-[11px] sm:text-xs font-bold text-[#204066] uppercase tracking-wider block">
            Accepted Proposal Overview
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0 break-words">
              {proposal.productName}
            </h1>
            <StatusBadge status={proposal.status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <Clock size={12.5} className="text-slate-400" />
              Accepted on {formatDate(proposal.acceptedAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <User size={12.5} className="text-slate-400" />
              {proposal.customer.name}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0e2238] bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <span>View Quotation & Proposal</span>
            <ArrowUpRight size={13.5} className="text-slate-500" />
          </button>

          <button
            type="button"
            onClick={handleChat}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1d4d7c] bg-[#edf5fd] hover:bg-[#e2f0fc] border border-[#b8d6f2] hover:border-[#9ec4ec] rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <MessageCircleMore size={13.5} className="text-[#2b6cb0]" />
            <span>Chat with Customer</span>
          </button>
        </div>
      </div>

      <div
        className={`p-4 rounded-xl border flex items-start gap-3 ${
          isCompleted
            ? "bg-teal-50/70 border-teal-200/80 text-teal-900"
            : isPaid
            ? "bg-indigo-50/70 border-indigo-200/80 text-indigo-900"
            : "bg-emerald-50/70 border-emerald-200/80 text-emerald-900"
        }`}
      >
        <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-bold m-0">
            {isCompleted
              ? "Deal Completed & Settled"
              : isPaid
              ? "Payment Received by Administration"
              : "Proposal Accepted — Awaiting Customer Payment"}
          </p>
          <p className="text-xs opacity-90 m-0 leading-relaxed">
            {isCompleted
              ? "This deal has been completed and the administration has transferred the payout to your enterprise bank account."
              : isPaid
              ? "Customer payment has been received by the administration and will be transferred to your enterprise bank account once verified."
              : "Your proposal won this quotation! Once the customer completes payment to the platform, you will be notified to proceed with the deal."}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs sm:text-sm font-bold text-[#0e2238]">
          Deal Progress Tracker
        </div>

        <div className="w-full py-2">
          <div className="relative flex items-center justify-between w-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-3.5 right-3.5 sm:left-4 sm:right-4 h-[3px] bg-slate-200 rounded-full pointer-events-none overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out bg-emerald-600"
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                  step.isDone
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-50"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {step.isDone ? <Check size={15} strokeWidth={3} /> : index + 1}
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full mt-3">
            {steps.map((step, index) => {
              const isFirst = index === 0;
              const isLast = index === steps.length - 1;
              const alignClass = isFirst ? "text-left" : isLast ? "text-right" : "text-center";
              const widthClass = isFirst || isLast ? "w-[22%] md:w-[18%]" : "w-[28%] md:w-[32%]";

              return (
                <div key={step.title} className={`${widthClass} ${alignClass} min-w-0 overflow-visible`}>
                  <p
                    className={`text-[10px] md:text-xs font-bold leading-tight m-0 ${
                      step.isDone ? "text-[#0e2238]" : "text-slate-500"
                    }`}
                  >
                    <span className="md:hidden">{step.mobileTitle}</span>
                    <span className="hidden md:inline">
                      {index + 1}. {step.title}
                    </span>
                  </p>
                  <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 m-0 leading-tight hidden md:block">
                    {step.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      <EnterpriseAcceptedProposalQuotationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        proposalId={proposal.id}
      />
    </>
  );
}

export default EnterpriseAcceptedProposalOverviewCard;
