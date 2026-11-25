import { useState } from "react";
import {Trash2,Package,IndianRupee,FileText,Truck,ShieldCheck,RotateCcw,Info,Clock} from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { QuotationDescriptionModal } from "../QuotationDescriptionModal";
import { formatDate } from "../../../../utils/dateFormatter";
import { withdrawEnterpriseProposal } from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { EnterpriseProposalDetails } from "../../types/enterprise-proposal.types";
import { useNavigate } from "react-router-dom";

interface EnterpriseSubmittedProposalCardProps {
  proposal: EnterpriseProposalDetails;
  onWithdrawn?: () => void;
}

export function EnterpriseSubmittedProposalCard({ proposal, onWithdrawn }: EnterpriseSubmittedProposalCardProps) {
  const navigate = useNavigate()
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      await withdrawEnterpriseProposal(proposal.id);
      toast.success("Proposal withdrawn successfully");
      setIsWithdrawModalOpen(false);
      onWithdrawn?.();
    } catch (error) {
      handleApiError(error, "Failed to withdraw proposal");
      navigate("/enterprise/quotations");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
            <div className="space-y-1 min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-[#204066] uppercase tracking-wider block">
                Your Submitted Proposal
              </span>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0 break-words">
                  {proposal.itemName}
                </h2>
                <StatusBadge status={proposal.status} />
              </div>
            </div>
          </div>

          {proposal.status === "PENDING" && (
            <div className="flex items-center self-start sm:self-center w-full sm:w-auto justify-end sm:justify-start">
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/90 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Trash2 size={13} />
                <span>Withdraw Proposal</span>
              </button>
            </div>
          )}
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

          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:ml-auto shrink-0 py-1">
            <Clock size={13} className="text-slate-400 shrink-0" />
            <span>Submitted on {formatDate(proposal.createdAt)}</span>
          </div>
        </div>

        <div
          onClick={() => setIsDescriptionOpen(true)}
          className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] hover:bg-[#f3f6fa] hover:border-slate-300 p-4 sm:p-5 space-y-2 transition-all cursor-pointer group"
          title="Click to view full description"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238] group-hover:text-[#355982] transition-colors min-w-0">
              <FileText size={15} className="text-[#355982] shrink-0" />
              <span className="truncate">Proposal Description & Inclusions</span>
            </div>
            <span className="text-[11px] font-bold text-[#355982] group-hover:text-[#0e2238] flex items-center gap-1 shrink-0">
              <span>View details</span>
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 line-clamp-2">
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
          <div
            onClick={() => setIsNotesOpen(true)}
            className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] hover:bg-[#f3f6fa] hover:border-slate-300 p-4 sm:p-5 space-y-2 transition-all cursor-pointer group"
            title="Click to view full additional notes"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238] group-hover:text-[#355982] transition-colors min-w-0">
                <Info size={15} className="text-[#355982] shrink-0" />
                <span className="truncate">Additional Notes</span>
              </div>
              <span className="text-[11px] font-bold text-[#355982] group-hover:text-[#0e2238] flex items-center gap-1 shrink-0">
                <span>View details</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 line-clamp-2">
              {proposal.additionalNotes}
            </p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isWithdrawModalOpen}
        onClose={() => {
          if (!isWithdrawing) setIsWithdrawModalOpen(false);
        }}
        onConfirm={handleWithdraw}
        title="Withdraw Proposal?"
        message="Are you sure you want to withdraw this proposal? This action cannot be undone, and the proposal cannot be restored once withdrawn."
        loading={isWithdrawing}
      />

      <QuotationDescriptionModal
        isOpen={isDescriptionOpen}
        onClose={() => setIsDescriptionOpen(false)}
        productName={proposal.itemName}
        title="Proposal Description & Inclusions"
        description={proposal.description}
      />

      {proposal.additionalNotes && (
        <QuotationDescriptionModal
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
          productName={proposal.itemName}
          title="Additional Notes"
          description={proposal.additionalNotes}
        />
      )}
    </div>
  );
}

export default EnterpriseSubmittedProposalCard;
