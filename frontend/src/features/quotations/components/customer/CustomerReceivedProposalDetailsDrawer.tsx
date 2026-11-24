import { useState, useEffect } from "react";
import { X, MessageCircleMore, Package, IndianRupee, Clock, Truck, ShieldCheck, RotateCcw, Info, Check, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { formatDate } from "../../../../utils/dateFormatter";
import { getReceivedProposalDetails, acceptReceivedProposal } from "../../services/quotation.service";
import { CustomerReceivedProposalDetailsSkeleton } from "./loading/CustomerReceivedProposalDetailsSkeleton";
import { handleApiError } from "../../../../utils/errorHandler";
import type { ReceivedProposalDetails } from "../../types/customer-received-proposal.types";

interface CustomerReceivedProposalDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quotationId: string;
  proposalId: string | null;
  onProposalAccepted?: () => void;
}

export function CustomerReceivedProposalDetailsDrawer({isOpen,onClose,quotationId,proposalId,onProposalAccepted}: CustomerReceivedProposalDetailsDrawerProps) {
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<ReceivedProposalDetails | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("PENDING");
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    } else if (isRendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 240);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (!isOpen || !quotationId || !proposalId) return;

    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getReceivedProposalDetails(quotationId, proposalId);
        if (cancelled) return;
        setProposal(response.data);
        setCurrentStatus(response.data.status);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load proposal details");
          onClose();
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [isOpen, quotationId, proposalId, onClose]);

  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isAcceptModalOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isRendered, onClose, isAcceptModalOpen]);

  if (!isRendered) return null;

  const handleChat = () => {
    if (!proposal) return;
    toast.info(`Opening secure chat with ${proposal.enterprise.name}...`);
  };

  const handleConfirmAccept = async () => {
    if (!proposal || !quotationId || !proposalId) return;
    setIsAccepting(true);
    try {
      await acceptReceivedProposal(quotationId, proposalId);
      setCurrentStatus("ACCEPTED");
      setIsAcceptModalOpen(false);
      toast.success(`Proposal from ${proposal.enterprise.name} accepted!`);
      onProposalAccepted?.();
      onClose();
    } catch (error) {
      handleApiError(error, "Failed to accept proposal, please try again");
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs ${
          isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
        }`}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6 md:pl-10 pointer-events-none">
        <div
          className={`w-screen max-w-full sm:max-w-2xl md:max-w-3xl bg-white shadow-2xl flex flex-col border-l border-slate-200 pointer-events-auto ${
            isClosing ? "animate-drawer-out" : "animate-drawer-in"
          }`}
        >
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200/90 flex items-center justify-between gap-3 bg-[#f8fafc] shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#0e2238] uppercase tracking-wider truncate">
                Proposal Details
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
              title="Close drawer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 space-y-5">
            {loading || !proposal ? (
              <CustomerReceivedProposalDetailsSkeleton />
            ) : (
              <>
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#204066] uppercase tracking-wider block">
                      Submitted by
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0 break-words">
                        {proposal.enterprise.name}
                      </h2>
                      <StatusBadge status={currentStatus} />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pt-0.5">
                      <Clock size={12.5} className="text-slate-400 shrink-0" />
                      <span>Received on {formatDate(proposal.createdAt)}</span>
                    </div>
                  </div>

                  {proposal.quotationStatus !== "CANCELLED" && (
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                      <button
                        type="button"
                        onClick={handleChat}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0e2238] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <MessageCircleMore size={13} className="text-slate-500" />
                        <span>Chat</span>
                      </button>

                      {(proposal.quotationStatus === "PENDING" || proposal.quotationStatus === "PROPOSAL_RECEIVED") && currentStatus === "PENDING" && (
                        <button
                          type="button"
                          onClick={() => setIsAcceptModalOpen(true)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                        >
                          <Check size={13} strokeWidth={2.4} />
                          <span>Accept</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
                    <Package size={14} className="text-blue-600 shrink-0" />
                    <span>
                      Quantity: <strong className="font-extrabold text-[#0e2238]">{proposal.quantity} Units</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                    <IndianRupee size={14} className="text-slate-500 shrink-0" />
                    <span>
                      Unit: <strong className="font-extrabold text-slate-900">₹{proposal.unitPrice.toLocaleString("en-IN")}</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/80 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
                    <IndianRupee size={14} className="text-emerald-700 shrink-0" />
                    <span>
                      Total:{" "}
                      <strong className="font-extrabold text-emerald-950 text-sm">
                        ₹{proposal.totalAmount.toLocaleString("en-IN")}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <Truck size={14} className="text-[#355982] shrink-0" />
                      <span>Delivery Timeline</span>
                    </div>
                    <p
                      className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 truncate"
                      title={proposal.deliveryTimeline}
                    >
                      {proposal.deliveryTimeline}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>Warranty</span>
                    </div>
                    <p
                      className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 truncate"
                      title={proposal.warrantyCoverage}
                    >
                      {proposal.warrantyCoverage}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <RotateCcw size={14} className="text-amber-600 shrink-0" />
                      <span>Replacement</span>
                    </div>
                    <p
                      className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 truncate"
                      title={proposal.replacementPolicy}
                    >
                      {proposal.replacementPolicy}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 text-xs font-bold text-[#0e2238]">
                    <FileText size={15} className="text-[#355982] shrink-0" />
                    <span>Description</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0e2238] m-0">
                    {proposal.itemName}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 whitespace-pre-wrap select-text">
                    {proposal.description}
                  </p>
                </div>

                {proposal.additionalNotes && (
                  <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 text-xs font-bold text-[#0e2238]">
                      <Info size={15} className="text-[#355982] shrink-0" />
                      <span>Additional Notes</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 whitespace-pre-wrap select-text">
                      {proposal.additionalNotes}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {proposal && (
        <ConfirmationModal
          isOpen={isAcceptModalOpen}
          onClose={() => !isAccepting && setIsAcceptModalOpen(false)}
          onConfirm={handleConfirmAccept}
          loading={isAccepting}
          title="Accept Proposal?"
          message={`Accepting this proposal for ₹${proposal.totalAmount.toLocaleString("en-IN")} will confirm your supplier agreement with "${proposal.enterprise.name}".`}
        />
      )}
    </div>
  );
}

export default CustomerReceivedProposalDetailsDrawer;
