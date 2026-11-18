import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Layers, Tag, Package, IndianRupee, MapPin, Ban, Loader2 } from "lucide-react";
import { QuotationStatusBadge } from "../../components/QuotationStatusBadge";
import { QuotationStatusBar } from "../../components/QuotationStatusBar";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { getCustomerQuotationDetails } from "../../services/quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import { formatDate } from "../../../../utils/dateFormatter";
import type { QuotationDetails } from "../../types/quotation-details";
import { toast } from "react-toastify";

export function CustomerQuotationDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
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
    setIsCancelling(true);
    try {
      setQuotation((prev) => (prev ? { ...prev, status: "CANCELLED" } : prev));
      setIsCancelModal(false);
      toast.success("Quotation request cancelled successfully");
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

  const isCancellable =
    quotation.status === "PENDING" || quotation.status === "PROPOSAL_RECEIVED";

  const hasBudget = quotation.budget !== null && quotation.budget > 0;
  const hasLocation = Boolean(quotation.location && quotation.location.trim().length > 0);
  const formattedQuantity = String(quotation.quantity).padStart(2, "0");

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
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2238] tracking-tight m-0">
                Quotation Request Details
              </h1>
              <div className="hidden sm:block text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
                <span>Created on {formatDate(quotation.createdAt)}</span>
              </div>
            </div>

            {isCancellable && (
              <div className="hidden sm:block self-center">
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

          <div className="flex sm:hidden items-center justify-between gap-2 mt-2 pt-1">
            <span className="text-xs text-slate-500 font-normal">
              Created on {formatDate(quotation.createdAt)}
            </span>

            {isCancellable && (
              <button
                type="button"
                onClick={() => setIsCancelModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <Ban size={12} strokeWidth={2.2} />
                <span>Cancel Request</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e2238]">
                  <FileText size={16} className="text-[#2f5581]" />
                  <span>Request Information</span>
                </div>
                <QuotationStatusBadge status={quotation.status} />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight leading-tight m-0">
                {quotation.productName}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0 whitespace-pre-wrap">
                {quotation.description}
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 space-y-3.5">
              <div className="hidden sm:flex items-stretch w-full divide-x divide-slate-200/80">
                <div className="flex-1 min-w-0 pr-4 first:pl-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Package size={13} className="text-[#2f5581] shrink-0" />
                    <span className="truncate">Quantity</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#0e2238] m-0 mt-1">
                    {formattedQuantity}
                  </p>
                </div>

                <div className="flex-1 min-w-0 px-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Layers size={13} className="text-[#2f5581] shrink-0" />
                    <span className="truncate">Category</span>
                  </div>
                  <p
                    className="text-xs sm:text-sm font-bold text-[#0e2238] m-0 mt-1 truncate"
                    title={quotation.category.name}
                  >
                    {quotation.category.name}
                  </p>
                </div>

                <div className="flex-1 min-w-0 px-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Tag size={13} className="text-[#2f5581] shrink-0" />
                    <span className="truncate">Subcategory</span>
                  </div>
                  <p
                    className="text-xs sm:text-sm font-bold text-[#0e2238] m-0 mt-1 truncate"
                    title={quotation.subCategory.name}
                  >
                    {quotation.subCategory.name}
                  </p>
                </div>

                {hasBudget && (
                  <div className="flex-1 min-w-0 pl-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <IndianRupee size={13} className="text-[#2f5581] shrink-0" />
                      <span className="truncate">Budget</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#0e2238] m-0 mt-1 truncate">
                      ₹{quotation.budget?.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:hidden gap-3.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Package size={13} className="text-[#2f5581]" />
                    <span>Quantity</span>
                  </div>
                  <p className="text-xs font-bold text-[#0e2238] m-0">
                    {formattedQuantity}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Layers size={13} className="text-[#2f5581]" />
                    <span>Category</span>
                  </div>
                  <p className="text-xs font-bold text-[#0e2238] m-0 truncate">
                    {quotation.category.name}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Tag size={13} className="text-[#2f5581]" />
                    <span>Subcategory</span>
                  </div>
                  <p className="text-xs font-bold text-[#0e2238] m-0 truncate">
                    {quotation.subCategory.name}
                  </p>
                </div>

                {hasBudget && (
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <IndianRupee size={13} className="text-[#2f5581]" />
                      <span>Budget</span>
                    </div>
                    <p className="text-xs font-bold text-[#0e2238] m-0">
                      ₹{quotation.budget?.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>

              {hasLocation && (
                <div className="pt-3 border-t border-slate-100 flex items-start gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 shrink-0 mt-0.5">
                    <MapPin size={13} className="text-[#2f5581]" />
                    <span>Delivery Location:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0e2238] m-0 leading-relaxed">
                    {quotation.location}
                  </p>
                </div>
              )}
            </div>
          </div>

          <QuotationStatusBar
            status={quotation.status}
            createdAt={quotation.createdAt}
          />
        </div>
      </div>

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
