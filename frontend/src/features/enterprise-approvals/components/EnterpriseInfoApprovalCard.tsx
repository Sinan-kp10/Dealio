import { Building2, ShieldCheck, ShieldAlert } from "lucide-react";
import type { EnterpriseCompanyInfoDto } from "../types/enterprise-approval-details.types";

interface CompanyInfoApprovalCardProps {
    companyInfo: EnterpriseCompanyInfoDto;
}

function EnterpriseInfoApprovalCard({ companyInfo }: CompanyInfoApprovalCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
            <div className="flex items-center gap-2.5 pb-5 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#edf4fb] text-[#204066] flex items-center justify-center shrink-0">
                    <Building2 size={19} />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0">
                    Company Information
                </h2>
            </div>

            <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Enterprise Name
                        </label>
                        <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                            {companyInfo.enterpriseName}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Contact Person
                        </label>
                        <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                            {companyInfo.contactPerson}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Business Email
                        </label>
                        <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                            {companyInfo.email}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Phone Number
                        </label>
                        <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 flex items-center justify-between">
                            <span className="truncate">{companyInfo.phone || "—"}</span>
                            {companyInfo.phone && (
                                companyInfo.phoneVerified ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                                        <ShieldCheck size={12} />
                                        <span>Verified</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                                        <ShieldAlert size={12} />
                                        <span>Unverified</span>
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Category
                        </label>
                        <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                            {companyInfo.category?.name || "Uncategorized"}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Subcategory <span className="text-slate-400 font-normal">(Multiple allowed)</span>
                        </label>
                        <div className="w-full min-h-[42px] bg-[#f8fafc] border border-slate-200/90 rounded-xl p-2 flex flex-wrap items-center gap-1.5">
                            {companyInfo.subcategories.length > 0 ? (
                                companyInfo.subcategories.map((sub) => (
                                    <span
                                        key={sub.id}
                                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                                    >
                                        {sub.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-slate-400 px-1.5">No subcategories selected</span>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                        Company Description
                    </label>
                    <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 text-sm text-slate-800 leading-relaxed min-h-[72px] break-words whitespace-pre-wrap">
                        {companyInfo.description || "No description provided."}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnterpriseInfoApprovalCard
