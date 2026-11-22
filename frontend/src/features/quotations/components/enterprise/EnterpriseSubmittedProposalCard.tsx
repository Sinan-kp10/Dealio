import {Trash2,Package,IndianRupee,FileText,Truck,ShieldCheck,RotateCcw,Info} from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { formatDate } from "../../../../utils/dateFormatter";
import type { EnterpriseProposalDetails } from "../../types/enterprise-proposal.types";

interface EnterpriseSubmittedProposalCardProps {
  proposal: EnterpriseProposalDetails;
  onDeleteProposal?: () => void;
}

export function EnterpriseSubmittedProposalCard({proposal,onDeleteProposal}: EnterpriseSubmittedProposalCardProps) {
  const handleDelete = () => {
    if (onDeleteProposal) {
      onDeleteProposal();
      return;
    }
    toast.info("Proposal deletion requested");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
      <div className="pb-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0 break-words">
                {proposal.itemName}
              </h2>
              <StatusBadge status={proposal.status} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#355982]">Your Submitted Proposal</span>
              <span>•</span>
              <span>Submitted on {formatDate(proposal.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center self-start sm:self-center">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/90 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <Trash2 size={13} />
            <span>Delete Proposal</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
          <Package size={14} className="text-blue-600 shrink-0" />
          <span>
            Offered Quantity: <strong className="font-extrabold text-[#0e2238]">{proposal.quantity} Units</strong>
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
          <IndianRupee size={14} className="text-slate-500 shrink-0" />
          <span>
            Unit Price: <strong className="font-extrabold text-slate-900">₹{proposal.unitPrice.toLocaleString("en-IN")}</strong>
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/80 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
          <IndianRupee size={14} className="text-emerald-700 shrink-0" />
          <span>
            Total Offer:{" "}
            <strong className="font-extrabold text-emerald-950 text-sm">
              ₹{proposal.totalAmount.toLocaleString("en-IN")}
            </strong>
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
          <FileText size={16} className="text-[#355982]" />
          <span>Proposal Description & Inclusions</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 whitespace-pre-wrap select-text">
          {proposal.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
            <Truck size={14} className="text-[#355982] shrink-0" />
            <span>Delivery Timeline</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 m-0 break-words">
            {proposal.deliveryTimeline}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>Warranty Coverage</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 m-0 break-words">
            {proposal.warrantyCoverage}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
            <RotateCcw size={14} className="text-amber-600 shrink-0" />
            <span>Replacement Policy</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 m-0 break-words">
            {proposal.replacementPolicy}
          </p>
        </div>
      </div>

      {proposal.additionalNotes && (
        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
            <Info size={15} className="text-[#355982]" />
            <span>Additional Notes</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 whitespace-pre-wrap select-text">
            {proposal.additionalNotes}
          </p>
        </div>
      )}
    </div>
  );
}

export default EnterpriseSubmittedProposalCard;
