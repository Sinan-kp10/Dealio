import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EnterpriseAvailableQuotationDetailsCard } from "../../components/enterprise/EnterpriseAvailableQuotationDetailsCard";
import { EnterpriseSubmittedProposalCard } from "../../components/enterprise/EnterpriseSubmittedProposalCard";
import { EnterpriseAvailableQuotationDetailsSkeleton } from "../../components/enterprise/EnterpriseAvailableQuotationDetailsSkeleton";
import { getEnterpriseAvailableQuotationDetails } from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { AvailableQuotationDetails } from "../../types/enterprise-available-quotation-details.types";

export function EnterpriseAvailableQuotationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [quotation, setQuotation] = useState<AvailableQuotationDetails | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getEnterpriseAvailableQuotationDetails(id);
      setQuotation(response.data);
    } catch (error) {
      handleApiError(error, "Failed to load quotation details");
      navigate("/enterprise/quotations");
    }
  }, [id, navigate]);

  useEffect(() => {
    let cancelled = false;

    const loadDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getEnterpriseAvailableQuotationDetails(id);
        if (cancelled) return;
        setQuotation(response.data);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load quotation details");
          navigate("/enterprise/quotations");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadDetails();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (loading || !quotation) {
    return (
      <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="h-6 w-44 bg-slate-200/80 rounded-lg animate-pulse" />
        </div>
        <EnterpriseAvailableQuotationDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
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

      <EnterpriseAvailableQuotationDetailsCard quotation={quotation} />

      {quotation.proposal && (
        <EnterpriseSubmittedProposalCard
          proposal={quotation.proposal}
          onWithdrawn={fetchDetails}
        />
      )}
    </div>
  );
}

export default EnterpriseAvailableQuotationDetailsPage;
