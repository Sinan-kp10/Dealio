import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Layers,
  Tag,
  Package,
  IndianRupee,
  MapPin,
  Ban,
  ExternalLink,
  Handshake,
  MessageCircleMore,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { QuotationStatusBar } from "../../components/customer/QuotationStatusBar";
import { QuotationDescriptionModal } from "../../components/QuotationDescriptionModal";
import { CustomerReceivedProposalsSection } from "../../components/customer/CustomerReceivedProposalsSection";
import { CustomerQuotationDetailsSkeleton } from "../../components/customer/loading/CustomerQuotationDetailsSkeleton";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import { cancelCustomerQuotation, getCustomerQuotationDetails } from "../../services/quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import { formatDate } from "../../../../utils/dateFormatter";
import type { QuotationDetails } from "../../types/quotation-details";

export function CustomerQuotationDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const isProposalsTab = location.state?.tab === "PROPOSALS";
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [quotation, setQuotation] = useState<QuotationDetails | null>(null);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "PROPOSALS">(
    isProposalsTab ? "PROPOSALS" : "OVERVIEW"
  );
  const [isOtherTabLoaded, setIsOtherTabLoaded] = useState(isProposalsTab);

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

  const handleProposalAccepted = () => {
    setQuotation((prev) =>
      prev
        ? {
            ...prev,
            status: "ACCEPTED",
            acceptedAt: new Date().toISOString(),
          }
        : prev
    );
  };

  if (loading || !quotation) {
    return <CustomerQuotationDetailsSkeleton />;
  }

  const isCancellable = quotation.status === "PENDING" || quotation.status === "PROPOSAL_RECEIVED";
  const isAccepted = quotation.status === "ACCEPTED";

  const hasBudget = quotation.budget !== null && quotation.budget !== undefined
  const hasLocation = Boolean(quotation.location);
  const formattedQuantity = String(quotation.quantity).padStart(2, "0");

  const isLongDescription =
    quotation.description.length > 140 || quotation.description.split("\n").length > 2;

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
            className="text-slate-500 group-hover:text-[#2f5581]"
          />
          <span>Back to Quotation Requests</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          {isAccepted && (
            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => toast.info("Opening secure chat with seller...")}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <MessageCircleMore size={13} className="text-slate-500" />
                <span>Chat with Seller</span>
              </button>

              <button
                type="button"
                onClick={() => toast.info("Proceeding to payment checkout...")}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] border border-[#284566] rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <CreditCard size={13} />
                <span>Proceed to Payment</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

        {isCancellable && (
          <div className="flex sm:hidden pt-2 border-t border-slate-100">
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

        <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 -mb-5 sm:-mb-6 pt-1 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("OVERVIEW")}
            className={`inline-flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "OVERVIEW"
                ? "border-[#204066] text-[#204066]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText size={16} />
            <span>Quotation Overview</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("PROPOSALS");
              setIsOtherTabLoaded(true);
            }}
            className={`inline-flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "PROPOSALS"
                ? "border-[#204066] text-[#204066]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Handshake size={16} />
            <span>Received Proposals</span>
          </button>
        </div>
      </div>

      <div className={activeTab === "OVERVIEW" ? "space-y-6" : "hidden"}>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50/70 text-indigo-900 border border-indigo-100/90 text-xs font-semibold">
              <Layers size={14} className="text-indigo-600 shrink-0" />
              <span>
                Category: <strong className="font-bold text-indigo-950 capitalize">{quotation.category.name}</strong>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
              <Tag size={14} className="text-slate-500 shrink-0" />
              <span>
                Subcategory: <strong className="font-bold text-slate-900 capitalize">{quotation.subCategory.name}</strong>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
              <Package size={14} className="text-blue-600 shrink-0" />
              <span>
                Quantity: <strong className="font-extrabold text-[#0e2238]">{formattedQuantity} Units</strong>
              </span>
            </div>

            {hasBudget && (
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

            {hasLocation && (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8fafc] text-slate-700 border border-slate-200/90 text-xs font-semibold">
                <MapPin size={14} className="text-slate-500 shrink-0" />
                <span>
                  Location: <strong className="font-bold text-slate-800">{quotation.location}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 border-l-[3.5px] border-l-[#355982] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-[#355982] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#0e2238]">
                  Requirement Specifications
                </span>
              </div>

              <p
                onClick={() => isLongDescription && setIsDescriptionModalOpen(true)}
                className={`text-xs sm:text-sm text-slate-700 leading-relaxed font-normal m-0 whitespace-pre-wrap select-text line-clamp-2 ${
                  isLongDescription ? "cursor-pointer hover:text-slate-900" : ""
                }`}
                title={isLongDescription ? "Click to view full specifications" : undefined}
              >
                {quotation.description}
              </p>
            </div>

            {isLongDescription && (
              <button
                type="button"
                onClick={() => setIsDescriptionModalOpen(true)}
                className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#355982] hover:text-[#0e2238] bg-white hover:bg-slate-100 border border-slate-200/90 rounded-lg cursor-pointer transition-colors shrink-0 shadow-2xs"
              >
                <span>View Full Specifications</span>
                <ExternalLink size={12} />
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 sm:p-6 shadow-2xs">
            <QuotationStatusBar
              status={quotation.status}
              createdAt={quotation.createdAt}
              acceptedAt={quotation.acceptedAt}
              cancelledAt={quotation.cancelledAt}
              paidAt={quotation.paidAt}
              completedAt={quotation.completedAt}
            />
          </div>
        </div>
      </div>
      
      {isOtherTabLoaded && (
        <div className={activeTab === "PROPOSALS" ? "block" : "hidden"}>
          <CustomerReceivedProposalsSection
            quotationId={quotation.id}
            onProposalAccepted={handleProposalAccepted}
          />
        </div>
      )} 

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
