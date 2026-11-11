import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { PendingEnterprise } from "../types/enterprise-approvals.types";

interface EnterpriseApprovalCardProps {
    enterprise: PendingEnterprise;
}

export function EnterpriseApprovalCard({ enterprise }: EnterpriseApprovalCardProps) {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate m-0" title={enterprise.enterpriseName}>
                        {enterprise.enterpriseName}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fffbeb] text-[#d97706] border border-[#d97706]/20 shadow-2xs shrink-0">
                        <Clock size={12} strokeWidth={2.2} />
                        <span>Pending Request</span>
                    </span>
                </div>

                <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-3.5 mt-4 grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500 block truncate">
                            Contact Person
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate mt-0.5" title={enterprise.contactPerson}>
                            {enterprise.contactPerson || "—"}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500 block truncate">
                            Phone Number
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate mt-0.5" title={enterprise.phone ?? ""}>
                            {enterprise.phone || "—"}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500 block truncate">
                            Business Email
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate mt-0.5" title={enterprise.email}>
                            {enterprise.email || "—"}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500 block truncate">
                            Category
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate mt-0.5" title={enterprise.categoryName ?? ""}>
                            {enterprise.categoryName || "Uncategorized"}
                        </span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => navigate(`/admin/enterprise-approvals/${enterprise.id}`)}
                className="w-full mt-4 py-2.5 px-4 bg-[#204066] hover:bg-[#173252] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
            >
                <span>View Details</span>
                <ArrowRight size={15} />
            </button>
        </div>
    );
}

export default EnterpriseApprovalCard;

