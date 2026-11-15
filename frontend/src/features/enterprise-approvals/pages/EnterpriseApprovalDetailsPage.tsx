import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { getEnterpriseApprovalDetails } from "../services/enterprise-approvals.service";
import type { EnterpriseApprovalDetailsDto } from "../types/enterprise-approval-details.types";
import EnterpriseInfoApprovalCard  from "../components/EnterpriseInfoApprovalCard";
import { KycApprovalCard } from "../components/KycApprovalCard";
import { BankDetailsApprovalCard } from "../components/BankDetailsApprovalCard";
import { EnterpriseApprovalDetailsSkeleton } from "../components/EnterpriseApprovalDetailsSkeleton";
import { handleApiError } from "../../../utils/errorHandler";

export function EnterpriseApprovalDetailsPage() {
    const { enterpriseId } = useParams<{ enterpriseId: string }>();
    const navigate = useNavigate();
    const [details, setDetails] = useState<EnterpriseApprovalDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (!enterpriseId) return;

        let cancelled = false;

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await getEnterpriseApprovalDetails(enterpriseId);
                if (cancelled) return;
                setDetails(response.data);
            } catch (err) {
                if (cancelled) return;
                handleApiError(err, "Failed to load enterprise approval details");
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
    }, [enterpriseId, refreshKey]);

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="w-full space-y-6">
            <div>
                <button
                    type="button"
                    onClick={() => navigate("/admin/enterprise-approvals")}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#204066] transition-colors mb-3 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Enterprise Approvals</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
                            Enterprise Approval Details
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            Review and verify company credentials, business KYC documents, and settlement accounts.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
                    >
                        <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <EnterpriseApprovalDetailsSkeleton />
            ) : details ? (
                <div className="space-y-6">
                    <EnterpriseInfoApprovalCard
                        companyInfo={details.companyInfo}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        <KycApprovalCard
                            kyc={details.kyc}
                            enterpriseId={enterpriseId}
                        />

                        <BankDetailsApprovalCard
                            bankAccount={details.bankAccount}
                            enterpriseId={enterpriseId}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default EnterpriseApprovalDetailsPage;