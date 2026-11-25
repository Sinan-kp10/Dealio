import { IndianRupee, Wallet, Clock, Landmark, ShieldCheck } from "lucide-react";
import { formatDate } from "../../../../utils/dateFormatter";
import type { EnterpriseAcceptedProposalDetails } from "../../types/enterprise-accepted-proposal-details.types";

interface EnterpriseAcceptedProposalPaymentCardProps {
  proposal: EnterpriseAcceptedProposalDetails;
}

export function EnterpriseAcceptedProposalPaymentCard({
  proposal,
}: EnterpriseAcceptedProposalPaymentCardProps) {
  const isAccepted = proposal.status === "ACCEPTED";
  const balanceRemaining = Math.max(0, proposal.totalAmount - proposal.customerPaidAmount);
  const paymentPercentage =
    proposal.totalAmount > 0
      ? Math.min(100, Math.round((proposal.customerPaidAmount / proposal.totalAmount) * 100))
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0e2238] m-0">
            Deal Payment & Settlement Breakdown
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 m-0">
            Track customer payment progress and admin payout release for this proposal.
          </p>
        </div>

        {isAccepted && (
          <span className="self-start sm:self-center inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-md border bg-amber-50 text-amber-700 border-amber-200/80">
            Awaiting Customer Payment
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Deal Amount</span>
            <IndianRupee size={14} className="text-slate-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#0e2238] tracking-tight m-0">
            ₹{proposal.totalAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-500 m-0">
            {proposal.quantity} Units × ₹{proposal.unitPrice.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Customer Paid</span>
            <Wallet size={14} className="text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#0e2238] tracking-tight m-0">
            ₹{proposal.customerPaidAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-500 m-0">
            {proposal.paidAt ? `Paid on ${formatDate(proposal.paidAt)}` : "No payment received yet"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Customer Balance Due</span>
            <Clock size={14} className="text-amber-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#0e2238] tracking-tight m-0">
            ₹{balanceRemaining.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-500 m-0">
            {balanceRemaining === 0 ? "Fully paid by customer" : "Remaining amount due"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#edf5fd]/60 border border-[#b8d6f2]/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1d4d7c]">
            <span>Released by Admin</span>
            <Landmark size={14} className="text-[#2b6cb0]" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#0e2238] tracking-tight m-0">
            ₹{proposal.enterprisePayoutAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-[#1d4d7c]/80 m-0">
            {isAccepted ? "Customer has not paid yet" : "Managed via platform escrow"}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#0e2238]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#355982]" />
            Customer Payment Coverage
          </span>
          <span>{paymentPercentage}% Paid</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#355982] rounded-full transition-all duration-700"
            style={{ width: `${paymentPercentage}%` }}
          />
        </div>
        <p className="text-[11.5px] text-slate-500 m-0 leading-relaxed">
          Customer payments are received securely by the platform administration and transferred directly to your enterprise bank account once verified.
        </p>
      </div>
    </div>
  );
}

export default EnterpriseAcceptedProposalPaymentCard;
