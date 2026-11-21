import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft,Tag,Package,IndianRupee,MapPin,Clock,MessageCircleMore,Ban,Send,FileText,Loader2,ExternalLink,} from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { QuotationDescriptionModal } from "../../components/QuotationDescriptionModal";
import {getEnterpriseQuotationDetails,markQuotationNotInterested} from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import { formatDate, formatTimeAgo } from "../../../../utils/dateFormatter";
import type { EnterpriseQuotationDetails } from "../../types/enterprise-quotation-details.types";

export function EnterpriseQuotationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isNotInterestedModalOpen, setIsNotInterestedModalOpen] = useState(false);
  const [isNotInterestedLoading, setIsNotInterestedLoading] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [quotation, setQuotation] = useState<EnterpriseQuotationDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getEnterpriseQuotationDetails(id);
        if (cancelled) return;
        setQuotation(response.data);
      } catch (error) {
        if (cancelled) return;
        handleApiError(error, "Failed to load quotation details");
        navigate("/enterprise/quotations");
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
  }, [id, navigate]);

  const handleConfirmNotInterested = async () => {
    if (!id) return;
    setIsNotInterestedLoading(true);
    try {
      await markQuotationNotInterested(id);
      toast.success("Quotation marked as not interested");
      setIsNotInterestedModalOpen(false);
      navigate("/enterprise/quotations");
    } catch (error) {
      handleApiError(error, "Failed to mark quotation as not interested");
    } finally {
      setIsNotInterestedLoading(false);
    }
  };

  const handleChat = () => {
    if (!quotation) return;
    toast.info(`Opening secure chat with buyer for "${quotation.productName}"...`);
  };

  if (loading || !quotation) {
    return (
      <div className="w-full flex items-center justify-center py-24">
        <Loader2 size={36} strokeWidth={2.2} className="animate-spin text-[#355982]" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 pb-16 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/enterprise/quotations")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#355982] transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft size={16} className="text-slate-500 group-hover:text-[#355982]" />
          <span>Back to Quotation Requests</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0">
                {quotation.productName}
              </h1>
              <StatusBadge status={quotation.status} />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock size={13.5} className="text-slate-500 shrink-0" />
              <span>Received {formatTimeAgo(quotation.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap sm:flex-nowrap">
            {!quotation.proposal && (
              <button
                type="button"
                onClick={() => setIsNotInterestedModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Ban size={13} strokeWidth={2.2} />
                <span>Not Interested</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleChat}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0e2238] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <MessageCircleMore size={14} className="text-slate-500" />
              <span>Chat with Buyer</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/enterprise/quotations/${quotation.id}/proposal`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <Send size={13} />
              <span>{quotation.proposal ? "Update Proposal" : "Send Proposal"}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
            <Tag size={14} className="text-slate-500 shrink-0" />
            <span>
              Subcategory: <strong className="font-bold text-slate-900">{quotation.subCategory.name}</strong>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
            <Package size={14} className="text-blue-600 shrink-0" />
            <span>
              Quantity: <strong className="font-extrabold text-[#0e2238]">{quotation.quantity} Units</strong>
            </span>
          </div>

          {quotation.budget && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
              <IndianRupee size={14} className="text-emerald-700 shrink-0" />
              <span>
                Budget:{" "}
                <strong className="font-extrabold text-emerald-950">
                  ₹{quotation.budget?.toLocaleString("en-IN")}
                </strong>
              </span>
            </div>
          )}

          {quotation.location && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8fafc] text-slate-700 border border-slate-200/90 text-xs font-semibold">
              <MapPin size={14} className="text-slate-500 shrink-0" />
              <span>
                Location:{" "}
                <strong className="font-bold text-slate-800">{quotation.location}</strong>
              </span>
            </div>
          )}
        </div>


        <div
          onClick={() => setIsDescriptionModalOpen(true)}
          className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] hover:bg-[#f3f6fa] hover:border-slate-300 p-5 sm:p-6 space-y-3 cursor-pointer transition-all group"
          title="Click to view full specifications"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238] group-hover:text-[#355982] transition-colors">
              <FileText size={16} className="text-[#355982]" />
              <span>Customer Requirements & Specifications</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDescriptionModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#355982] group-hover:text-[#0e2238] bg-white group-hover:bg-[#edf4fb] border border-slate-200/60 rounded-lg cursor-pointer transition-colors shrink-0 shadow-2xs"
            >
              <span>View Specifications</span>
              <ExternalLink size={12} />
            </button>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 m-0 line-clamp-3 whitespace-pre-wrap select-text">
            {quotation.description}
          </p>
        </div>

        {quotation.proposal && (
          <div className="rounded-2xl border border-sky-200/90 bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-indigo-50/30 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#355982] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Send size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0e2238] m-0">
                    Your Submitted Proposal
                  </h3>
                  <span className="text-xs text-slate-500">
                    Submitted {formatDate(quotation.proposal.createdAt)}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/90 text-xs font-semibold">
                <Clock size={12} className="text-amber-600" />
                <span>
                  {quotation.proposal.status === "PENDING"
                    ? "Awaiting Buyer Decision"
                    : quotation.proposal.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/95 border border-sky-100/90 shadow-2xs">
                <span className="text-[11px] font-medium text-slate-500 block">Offered Item Title</span>
                <span className="font-bold text-slate-800 block mt-1 truncate">
                  {quotation.proposal.itemName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/95 border border-sky-100/90 shadow-2xs">
                <span className="text-[11px] font-medium text-slate-500 block">Total Proposal Amount</span>
                <span className="text-base sm:text-lg font-extrabold text-[#355982] tracking-tight">
                  ₹{quotation.proposal.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {quotation.proposal.termsAndConditions && (
              <div className="p-3.5 rounded-xl bg-white/90 border border-sky-100/80 text-xs space-y-1">
                <span className="text-xs font-bold text-slate-700 block">
                  Commercial Terms & Conditions:
                </span>
                <p className="text-slate-600 m-0 leading-relaxed text-xs whitespace-pre-wrap">
                  {quotation.proposal.termsAndConditions}
                </p>
              </div>
            )}

            {quotation.proposal.description && (
              <div className="p-3.5 rounded-xl bg-white/90 border border-sky-100/80 text-xs space-y-1">
                <span className="text-xs font-bold text-slate-700 block">
                  Proposal Notes & Scope:
                </span>
                <p className="text-slate-600 m-0 leading-relaxed text-xs whitespace-pre-wrap">
                  {quotation.proposal.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isNotInterestedModalOpen}
        onClose={() => setIsNotInterestedModalOpen(false)}
        onConfirm={handleConfirmNotInterested}
        loading={isNotInterestedLoading}
        title="Mark as Not Interested?"
        message="Are you sure you want to mark this quotation as not interested? You will not be able to restore or submit a proposal for this quotation request again."
      />

      <QuotationDescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        productName={quotation.productName}
        description={quotation.description}
      />
    </div>
  );
}

export default EnterpriseQuotationDetailsPage;
