import { useState } from "react";
import { IdCard, FileText, ExternalLink, Check, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { BUSINESS_TYPE_LABELS, DOCUMENT_TYPE_LABELS } from "../../../constants/enterprise.constants";
import type { EnterpriseKycApprovalDto } from "../types/enterprise-approval-details.types";
import ReasonModal from "../../../components/common/ReasonModal/ReasonModel";

interface KycApprovalCardProps {
    kyc: EnterpriseKycApprovalDto | null;
    enterpriseId?: string;
}

export function KycApprovalCard({ kyc, enterpriseId }: KycApprovalCardProps) {
    const [statusOverride, setStatusOverride] = useState<"PENDING" | "VERIFIED" | "REJECTED" | null>(null);
    const [rejectionReasonOverride, setRejectionReasonOverride] = useState<string | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const currentStatus = statusOverride ?? kyc?.status;
    const currentRejectionReason = rejectionReasonOverride ?? kyc?.rejectionReason ?? null;
    const isPending = currentStatus === "PENDING";

    const handleViewDocument = () => {
        if (kyc?.documentUrl) {
            window.open(kyc.documentUrl, "_blank", "noopener,noreferrer");
        }
    };

    const handleVerify = async () => {
        setIsActionLoading(true);
        try {
            setStatusOverride("VERIFIED");
            toast.info(`KYC verification action will be wired for ${enterpriseId || "enterprise"}`);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleConfirmReject = async (reason: string) => {
        setIsActionLoading(true);
        try {
            setStatusOverride("REJECTED");
            setRejectionReasonOverride(reason);
            setIsRejectModalOpen(false);
            toast.info(`Rejected KYC (${enterpriseId || ""}) with reason: "${reason}"`);
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#edf4fb] text-[#204066] flex items-center justify-center shrink-0">
                            <IdCard size={19} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0">
                            KYC Verification
                        </h2>
                    </div>

                    {kyc && (
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                            {isPending ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsRejectModalOpen(true)}
                                        disabled={isActionLoading}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        <X size={13} strokeWidth={2.4} />
                                        <span>Reject</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleVerify}
                                        disabled={isActionLoading}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e6f7ed] text-[#0d9444] border border-[#0d9444]/30 hover:bg-[#d8f3e3] transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        <Check size={13} strokeWidth={2.4} />
                                        <span>Verify</span>
                                    </button>
                                </>
                            ) : currentStatus === "REJECTED" ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                                    <X size={13} strokeWidth={2.5} />
                                    <span>Rejected</span>
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                                    <Check size={13} strokeWidth={2.5} />
                                    <span>Verified</span>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {currentRejectionReason && (
                    <div className={`mt-5 flex items-start gap-2.5 p-3.5 rounded-xl border text-xs sm:text-sm ${
                        currentStatus === "REJECTED"
                            ? "bg-red-50/80 border-red-200 text-red-800"
                            : "bg-amber-50/80 border-amber-200 text-amber-900"
                    }`}>
                        <AlertCircle size={18} className={`shrink-0 mt-0.5 ${
                            currentStatus === "REJECTED" ? "text-red-600" : "text-amber-600"
                        }`} />
                        <div className="leading-relaxed">
                            <span className="font-semibold">
                                {currentStatus === "REJECTED" ? "Rejection Reason: " : "Previous Rejection Reason: "}
                            </span>
                            <span className="font-normal">"{currentRejectionReason}"</span>
                        </div>
                    </div>
                )}

                {!kyc ? (
                    <div className="flex-1 mt-5 rounded-xl border border-dashed border-slate-200 bg-[#f8fafc] p-8 text-center flex flex-col items-center justify-center">
                        <h4 className="text-sm font-semibold text-slate-700 m-0">
                            Not submitted yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1.5 max-w-xs text-center">
                            The enterprise has not submitted KYC verification documents yet.
                        </p>
                    </div>
                ) : (
                    <div className="mt-5 space-y-4">
                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Business Type
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                                {BUSINESS_TYPE_LABELS[kyc.businessType] || kyc.businessType}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Full Legal Name
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                                {kyc.legalName}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Identification Document Type
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                                {DOCUMENT_TYPE_LABELS[kyc.documentType] || kyc.documentType}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Verification Document
                            </label>
                            <div className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-red-100/70 text-red-600 flex items-center justify-center shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-slate-900 truncate m-0">
                                            {DOCUMENT_TYPE_LABELS[kyc.documentType] || kyc.documentType}
                                        </p>
                                        <p className="text-[11px] text-slate-500 m-0">Document Attachment</p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleViewDocument}
                                    disabled={!kyc.documentUrl}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs self-start sm:self-auto shrink-0"
                                >
                                    <ExternalLink size={13} />
                                    <span>View</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isRejectModalOpen && (
                <ReasonModal
                    title="Reject KYC Verification"
                    description="Please state the reason for rejecting this KYC verification request."
                    onClose={() => setIsRejectModalOpen(false)}
                    onConfirm={handleConfirmReject}
                />
            )}
        </div>
    );
}

export default KycApprovalCard;

