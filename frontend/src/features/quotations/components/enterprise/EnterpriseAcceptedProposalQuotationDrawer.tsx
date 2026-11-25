import { useState, useEffect } from "react";
import {
  X,
  FileText,
  Handshake,
  Tag,
  Package,
  IndianRupee,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  RotateCcw,
  Info,
} from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { EnterpriseAcceptedProposalQuotationDrawerSkeleton } from "./loading/EnterpriseAcceptedProposalQuotationDrawerSkeleton";
import { formatDate, formatTimeAgo } from "../../../../utils/dateFormatter";
import { getEnterpriseAcceptedProposalQuotationDetails } from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { EnterpriseAcceptedProposalQuotationDetails } from "../../types/enterprise-accepted-proposal-details.types";

interface EnterpriseAcceptedProposalQuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
}

type DrawerTab = "QUOTATION" | "PROPOSAL";

export function EnterpriseAcceptedProposalQuotationDrawer({isOpen,onClose,proposalId}: EnterpriseAcceptedProposalQuotationDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>("QUOTATION");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<EnterpriseAcceptedProposalQuotationDetails | null>(null);
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
    setDetails(null);
  }, [proposalId]);

  useEffect(() => {
    if (!isOpen || !proposalId || details) return;

    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getEnterpriseAcceptedProposalQuotationDetails(proposalId);
        if (cancelled) return;
        setDetails(response.data);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load quotation and proposal details");
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
  }, [isOpen, proposalId, details, onClose]);

  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isRendered, onClose]);

  if (!isRendered) return null;

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
            <span className="text-xs sm:text-sm font-bold text-[#0e2238] uppercase tracking-wider truncate">
              Quotation & Proposal Details
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
              title="Close drawer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 sm:px-7 pt-4 pb-1 shrink-0">
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveTab("QUOTATION")}
                className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "QUOTATION"
                    ? "bg-white text-[#0e2238] shadow-xs border border-slate-200/70"
                    : "text-slate-500 hover:text-slate-800 border border-transparent"
                }`}
              >
                <FileText size={15} className={activeTab === "QUOTATION" ? "text-[#2b6cb0] shrink-0" : "text-slate-400 shrink-0"} />
                <span className="truncate">Quotation Details</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("PROPOSAL")}
                className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "PROPOSAL"
                    ? "bg-white text-[#0e2238] shadow-xs border border-slate-200/70"
                    : "text-slate-500 hover:text-slate-800 border border-transparent"
                }`}
              >
                <Handshake size={15} className={activeTab === "PROPOSAL" ? "text-[#2b6cb0] shrink-0" : "text-slate-400 shrink-0"} />
                <span className="truncate">Your Proposal</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 sm:pt-5 space-y-5">
            {loading || !details ? (
              <EnterpriseAcceptedProposalQuotationDrawerSkeleton />
            ) : activeTab === "QUOTATION" ? (
              <div className="space-y-5">
                <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#204066] uppercase tracking-wider block">
                      Customer Quotation Request
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0 break-words">
                      {details.quotation.productName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pt-0.5">
                      <Clock size={12.5} className="text-slate-400 shrink-0" />
                      <span>Requested {formatTimeAgo(details.quotation.createdAt)}</span>
                    </div>
                  </div>
                  <StatusBadge status={details.quotation.status} className="shrink-0 mt-1" />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                    <Tag size={14} className="text-slate-500 shrink-0" />
                    <span>
                      Category: <strong className="font-bold text-slate-900">{details.quotation.category.name}</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                    <Tag size={14} className="text-slate-500 shrink-0" />
                    <span>
                      Subcategory: <strong className="font-bold text-slate-900">{details.quotation.subCategory.name}</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
                    <Package size={14} className="text-blue-600 shrink-0" />
                    <span>
                      Quantity: <strong className="font-extrabold text-[#0e2238]">{details.quotation.quantity} Units</strong>
                    </span>
                  </div>

                  {details.quotation.budget !== null && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
                      <IndianRupee size={14} className="text-emerald-700 shrink-0" />
                      <span>
                        Budget: <strong className="font-extrabold text-emerald-950">₹{details.quotation.budget.toLocaleString("en-IN")}</strong>
                      </span>
                    </div>
                  )}

                  {details.quotation.location && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                      <MapPin size={14} className="text-rose-500 shrink-0" />
                      <span>{details.quotation.location}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
                    <FileText size={15} className="text-[#355982]" />
                    <span>Requirement Description</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap m-0">
                    {details.quotation.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#204066] uppercase tracking-wider block">
                      Your Accepted Proposal
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0 break-words">
                      {details.proposal.itemName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pt-0.5">
                      <Clock size={12.5} className="text-slate-400 shrink-0" />
                      <span>Submitted on {formatDate(details.proposal.createdAt)}</span>
                    </div>
                  </div>
                  <StatusBadge status={details.proposal.status} className="shrink-0 mt-1" />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
                    <Package size={14} className="text-blue-600 shrink-0" />
                    <span>
                      Offered Quantity: <strong className="font-extrabold text-[#0e2238]">{details.proposal.quantity} Units</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                    <IndianRupee size={14} className="text-slate-500 shrink-0" />
                    <span>
                      Unit: <strong className="font-extrabold text-slate-900">₹{details.proposal.unitPrice.toLocaleString("en-IN")}</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/90 text-xs font-semibold">
                    <IndianRupee size={14} className="text-slate-700 shrink-0" />
                    <span>
                      Total: <strong className="font-extrabold text-[#0e2238] text-sm">₹{details.proposal.totalAmount.toLocaleString("en-IN")}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <Truck size={14} className="text-[#355982] shrink-0" />
                      <span>Delivery Timeline</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 break-words">
                      {details.proposal.deliveryTimeline}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>Warranty</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 break-words">
                      {details.proposal.warrantyCoverage}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e2238]">
                      <RotateCcw size={14} className="text-amber-600 shrink-0" />
                      <span>Replacement</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-800 m-0 break-words">
                      {details.proposal.replacementPolicy}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
                    <FileText size={15} className="text-[#355982]" />
                    <span>Offer Description</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap m-0">
                    {details.proposal.description}
                  </p>
                </div>

                {details.proposal.additionalNotes && (
                  <div className="p-4 sm:p-5 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
                      <Info size={15} className="text-[#355982] shrink-0" />
                      <span>Additional Notes</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap m-0">
                      {details.proposal.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseAcceptedProposalQuotationDrawer;
