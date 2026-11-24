import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircleMore, Package, IndianRupee, Clock, Truck, ShieldCheck, RotateCcw, Info, Ban, Check, Building2, FileText } from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { CustomerReceivedProposalDetailsSkeleton } from "../../components/customer/CustomerReceivedProposalDetailsSkeleton";
import { formatDate } from "../../../../utils/dateFormatter";
import { getReceivedProposalDetails } from "../../services/quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { ReceivedProposalDetails } from "../../types/customer-received-proposal.types";
import { toast } from "react-toastify";

export function CustomerReceivedProposalDetailsPage() {
  const { quotationId, proposalId } = useParams<{ quotationId: string; proposalId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<ReceivedProposalDetails | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("PENDING");

  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchReceivedProposalDetails = async () => {
      if (!quotationId || !proposalId) return;
      setLoading(true);
      try {
        const response = await getReceivedProposalDetails(quotationId, proposalId);
        if (cancelled) return;
        setProposal(response.data);
        setCurrentStatus(response.data.status);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load proposal details");
          navigate(`/customer/quotations/${quotationId}`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchReceivedProposalDetails();

    return () => {
      cancelled = true;
    };
  }, [quotationId, proposalId, navigate]);

  const handleChat = () => {
    if (!proposal) return;
    toast.info(`Opening secure chat with ${proposal.enterprise.name}...`);
  };

  const handleConfirmDecline = () => {
    if (!proposal) return;
    setCurrentStatus("REJECTED");
    setIsDeclineModalOpen(false);
    toast.info(`Proposal from ${proposal.enterprise.name} declined`);
  };

  const handleConfirmAccept = () => {
    if (!proposal) return;
    setCurrentStatus("ACCEPTED");
    setIsAcceptModalOpen(false);
    toast.success(`Proposal from ${proposal.enterprise.name} accepted!`);
  };

  if (loading || !proposal) {
    return <CustomerReceivedProposalDetailsSkeleton />;
  }

  return (
    <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(`/customer/quotations/${quotationId}`, { state: { tab: "PROPOSALS" } })}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#2f5581] transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft size={16} className="text-slate-500 group-hover:text-[#2f5581]" />
          <span>Back to Quotation Request</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#edf4fb] border border-[#204066]/15 flex items-center justify-center text-[#204066] shrink-0 mt-0.5 shadow-2xs">
              <Building2 size={22} className="text-[#204066]" />
            </div>

            <div className="space-y-1 min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-[#204066] uppercase tracking-wider block">
                Enterprise Proposal Details
              </span>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0 break-words">
                  {proposal.enterprise.name}
                </h1>

                <StatusBadge status={currentStatus} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={handleChat}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0e2238] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <MessageCircleMore size={13} className="text-slate-500" />
              <span>Chat with Enterprise</span>
            </button>

            {currentStatus === "PENDING" && (
              <>
                <button
                  type="button"
                  onClick={() => setIsDeclineModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/90 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <Ban size={13} />
                  <span>Decline</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAcceptModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <Check size={13} strokeWidth={2.4} />
                  <span>Accept Proposal</span>
                </button>
              </>
            )}
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

          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:ml-auto shrink-0 py-1">
            <Clock size={13} className="text-slate-400 shrink-0" />
            <span>Received on {formatDate(proposal.createdAt)}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 text-xs font-bold text-[#0e2238]">
            <FileText size={15} className="text-[#355982] shrink-0" />
            <span>Proposed Item & Scope of Supply</span>
          </div>

          <h3 className="text-sm font-bold text-[#0e2238] m-0">
            {proposal.itemName}
          </h3>

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
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 text-xs font-bold text-[#0e2238]">
              <Info size={15} className="text-[#355982] shrink-0" />
              <span>Additional Notes & Terms</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 whitespace-pre-wrap select-text">
              {proposal.additionalNotes}
            </p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={handleConfirmDecline}
        title="Decline Proposal?"
        message={`Are you sure you want to decline the proposal from "${proposal.enterprise.name}"? This action cannot be undone.`}
      />

      <ConfirmationModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={handleConfirmAccept}
        title="Accept Proposal?"
        message={`Accepting this proposal for ₹${proposal.totalAmount.toLocaleString("en-IN")} will confirm your supplier agreement with "${proposal.enterprise.name}".`}
      />
    </div>
  );
}

export default CustomerReceivedProposalDetailsPage;
