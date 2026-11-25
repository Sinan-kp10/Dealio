import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EnterpriseAcceptedProposalOverviewCard } from "../../components/enterprise/EnterpriseAcceptedProposalOverviewCard";
import { EnterpriseAcceptedProposalPaymentCard } from "../../components/enterprise/EnterpriseAcceptedProposalPaymentCard";
import { EnterpriseAcceptedProposalDetailsSkeleton } from "../../components/enterprise/loading/EnterpriseAcceptedProposalDetailsSkeleton";
import { getEnterpriseAcceptedProposalDetails } from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { EnterpriseAcceptedProposalDetails } from "../../types/enterprise-accepted-proposal-details.types";

export function EnterpriseAcceptedProposalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<EnterpriseAcceptedProposalDetails | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getEnterpriseAcceptedProposalDetails(id);
        if (cancelled) return;
        setProposal(response.data);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load accepted proposal details");
          navigate("/enterprise/accepted-requests");
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
  }, [id, navigate]);

  if (loading || !proposal) {
    return (
      <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-200/80 rounded-lg animate-pulse" />
        </div>
        <EnterpriseAcceptedProposalDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/enterprise/accepted-requests")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#355982] transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft size={16} className="text-slate-500 group-hover:text-[#355982]" />
          <span>Back to Accepted Requests</span>
        </button>
      </div>

      <EnterpriseAcceptedProposalOverviewCard proposal={proposal} />

      <EnterpriseAcceptedProposalPaymentCard proposal={proposal} />
    </div>
  );
}

export default EnterpriseAcceptedProposalDetailsPage;
