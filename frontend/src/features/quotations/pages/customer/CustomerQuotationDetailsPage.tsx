import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {ArrowLeft,FileText,Layers,Tag,Package,IndianRupee,MapPin,Ban,Loader2,ExternalLink,ShieldCheck,} from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { QuotationStatusBar } from "../../components/QuotationStatusBar";
import { QuotationDescriptionModal } from "../../components/QuotationDescriptionModal";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { cancelCustomerQuotation, getCustomerQuotationDetails } from "../../services/quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import { formatDate } from "../../../../utils/dateFormatter";
import type { QuotationDetails } from "../../types/quotation-details";

export function CustomerQuotationDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [quotation, setQuotation] = useState<QuotationDetails | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchQuotationsDetails = async () => {
      setLoading(true);
      try {
        const response = await getCustomerQuotationDetails(id);
        if (cancelled) return;
        setQuotation(response.data);
      } catch (error) {
        if (cancelled) return;
        handleApiError(error, "Failed to load quotation details");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchQuotationsDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleConfirmCancel = async () => {
    if (!id) return;
    setIsCancelling(true);

    try {

      await cancelCustomerQuotation(id)
      setQuotation((prev) => (prev ? { ...prev, status: "CANCELLED" } : prev));
      setIsCancelModal(false);
      
    } catch (error) {
      handleApiError(error, "Failed to cancel quotation request, please try again");
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading || !quotation) {
    return (
      <div className="w-full flex items-center justify-center py-24">
        <Loader2 size={36} strokeWidth={2.2} className="animate-spin text-[#2f5581]" />
      </div>
    );
  }

  const isCancellable = quotation.status === "PENDING" || quotation.status === "PROPOSAL_RECEIVED";

  const hasBudget = quotation.budget !== null && quotation.budget > 0;
  const hasLocation = Boolean(quotation.location && quotation.location.trim().length > 0);
  const formattedQuantity = String(quotation.quantity).padStart(2, "0");

  const overviewItemCount = 3 + (hasBudget ? 1 : 0) + (hasLocation ? 1 : 0);
  const isLongDescription =
    quotation.description.length > (overviewItemCount <= 3 ? 120 : overviewItemCount === 4 ? 160 : 200) ||
    quotation.description.split("\n").length > 2;

  const descriptionClampClass =
    overviewItemCount <= 3
      ? "line-clamp-3 sm:line-clamp-4"
      : overviewItemCount === 4
      ? "line-clamp-4 sm:line-clamp-5"
      : "line-clamp-5 sm:line-clamp-6";

  return (
    <div className="w-full space-y-4 pb-16 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/customer/quotations")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#2f5581] transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-[#2f5581]"
          />
          <span>Back to Quotation Requests</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 sm:pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0">
                  {quotation.productName}
                </h1>
                <StatusBadge status={quotation.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
                <span>Created on {formatDate(quotation.createdAt)}</span>
              </div>
            </div>

            {isCancellable && (
              <div className="hidden sm:block self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCancelModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                >
                  <Ban size={13} strokeWidth={2.2} />
                  <span>Cancel Request</span>
                </button>
              </div>
            )}
          </div>

          {isCancellable && (
            <div className="flex sm:hidden mt-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCancelModal(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <Ban size={12} strokeWidth={2.2} />
                <span>Cancel Request</span>
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 sm:p-6 shadow-2xs">
          <QuotationStatusBar
            status={quotation.status}
            createdAt={quotation.createdAt}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/70 text-xs sm:text-sm font-bold text-[#0e2238]">
                <Layers size={15} className="text-[#2f5581]" />
                <span>Quotation Overview</span>
              </div>

              <div className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Package size={14} className="text-[#2f5581]" />
                    <span>Quantity</span>
                  </div>
                  <span className="font-bold text-[#0e2238]">{formattedQuantity} Units</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Layers size={14} className="text-[#2f5581]" />
                    <span>Category</span>
                  </div>
                  <span
                    className="font-bold text-[#0e2238] capitalize truncate max-w-[55%]"
                    title={quotation.category.name}
                  >
                    {quotation.category.name}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Tag size={14} className="text-[#2f5581]" />
                    <span>Subcategory</span>
                  </div>
                  <span
                    className="font-bold text-[#0e2238] capitalize truncate max-w-[55%]"
                    title={quotation.subCategory.name}
                  >
                    {quotation.subCategory.name}
                  </span>
                </div>

                {hasBudget && (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <IndianRupee size={14} className="text-[#2f5581]" />
                      <span>Budget</span>
                    </div>
                    <span className="font-bold text-[#0e2238]">
                      ₹{quotation.budget?.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {hasLocation && (
                  <div className="flex items-start justify-between py-2 gap-2">
                    <div className="flex items-center gap-2 text-slate-600 font-medium shrink-0 mt-0.5">
                      <MapPin size={14} className="text-[#2f5581]" />
                      <span>Delivery Location</span>
                    </div>
                    <span
                      className="font-semibold text-[#0e2238] text-right truncate max-w-[60%]"
                      title={quotation.location || undefined}
                    >
                      {quotation.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/70 text-xs sm:text-sm font-bold text-[#0e2238]">
              <FileText size={15} className="text-[#2f5581]" />
              <span>Requirement Specifications</span>
            </div>

            <div className="pt-2 flex-1 flex flex-col justify-between">
              <p
                onClick={() => isLongDescription && setIsDescriptionModalOpen(true)}
                className={`text-xs sm:text-sm text-slate-700 leading-relaxed font-normal m-0 whitespace-pre-wrap select-text ${descriptionClampClass} ${
                  isLongDescription ? "cursor-pointer hover:text-slate-900" : ""
                }`}
                title={isLongDescription ? "Click to view full specifications" : undefined}
              >
                {quotation.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-medium min-h-[22px]">
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <ShieldCheck size={13} className="text-[#2f5581]" />
                  Verified Request
                </span>
                {isLongDescription && (
                  <button
                    type="button"
                    onClick={() => setIsDescriptionModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f5581] hover:text-[#0e2238] hover:underline cursor-pointer transition-colors"
                  >
                    <span>View Full Specifications</span>
                    <ExternalLink size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuotationDescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        productName={quotation.productName}
        description={quotation.description}
      />

      <ConfirmationModal
        isOpen={isCancelModal}
        onClose={() => setIsCancelModal(false)}
        onConfirm={handleConfirmCancel}
        loading={isCancelling}
        title="Cancel Quotation Request?"
        message="Are you sure you want to cancel this quotation request? This action cannot be undone."
      />
    </div>
  );
}

export default CustomerQuotationDetailsPage;
