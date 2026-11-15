import { useState } from "react";
import { Landmark, Copy, Check, X, AlertCircle } from "lucide-react";
import { BANK_ACCOUNT_TYPE_LABELS } from "../../../constants/enterprise.constants";
import type { EnterpriseBankAccountApprovalDto } from "../types/enterprise-approval-details.types";
import ReasonModal from "../../../components/common/ReasonModal/ReasonModel";
import ConfirmationModal from "../../../components/common/confirmationModel/ConfirmationModal";
import { rejectEnterpriseBankRecord, verifyEnterpriseBankRecord } from "../services/enterprise-approvals.service";
import { handleApiError } from "../../../utils/errorHandler";
import useCopyToClipboard from "../../../hook/useCopyToClipboard";

interface BankDetailsApprovalCardProps {
    bankAccount: EnterpriseBankAccountApprovalDto | null;
    enterpriseId?: string;
}

export function BankDetailsApprovalCard({ bankAccount, enterpriseId }: BankDetailsApprovalCardProps) {
    const { copiedField, copyToClipboard } = useCopyToClipboard();
    const [statusOverride, setStatusOverride] = useState<"PENDING" | "VERIFIED" | "REJECTED" | null>(null);
    const [rejectionReasonOverride, setRejectionReasonOverride] = useState<string | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const currentStatus = statusOverride ?? bankAccount?.status;
    const currentRejectionReason = rejectionReasonOverride ?? bankAccount?.rejectionReason ?? null;
    const isPending = currentStatus === "PENDING";

    const handleConfirmVerify = async () => {
        if (!enterpriseId) return;
        setIsActionLoading(true);
        try {
            await verifyEnterpriseBankRecord(enterpriseId);
            setStatusOverride("VERIFIED");
            setIsVerifyModalOpen(false);
        } catch (error) {
            handleApiError(error, "Failed to verify bank details");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleConfirmReject = async (reason: string) => {
        if (!enterpriseId) return;
        setIsActionLoading(true);
        try {
            await rejectEnterpriseBankRecord(enterpriseId, reason);
            setStatusOverride("REJECTED");
            setRejectionReasonOverride(reason);
            setIsRejectModalOpen(false);
        } catch (error) {
            handleApiError(error, "Failed to reject bank details");
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
                            <Landmark size={19} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0">
                            Bank & Settlement Details
                        </h2>
                    </div>

                    {bankAccount && (
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
                                        onClick={() => setIsVerifyModalOpen(true)}
                                        disabled={isActionLoading}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e6f7ed] text-[#0d9444] border border-[#0d9444]/30 hover:bg-[#d8f3e3] transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        <Check size={13} strokeWidth={2.4} />
                                        <span>Verify</span>
                                    </button>
                                </>
                            ) : currentStatus === "REJECTED" ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                                    <span>Rejected</span>
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
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

                {!bankAccount ? (
                    <div className="flex-1 mt-5 rounded-xl border border-dashed border-slate-200 bg-[#f8fafc] p-8 text-center flex flex-col items-center justify-center">
                        <h4 className="text-sm font-semibold text-slate-700 m-0">
                            Not submitted yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1.5 max-w-xs text-center">
                            The enterprise has not submitted bank and settlement details yet.
                        </p>
                    </div>
                ) : (
                    <div className="mt-5 space-y-4">
                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Account Holder Name
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                                {bankAccount.accountHolderName || "—"}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                Bank Account Number
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 flex items-center justify-between gap-2">
                                <span className="font-mono tracking-wide truncate">{bankAccount.accountNumber || "—"}</span>
                                {bankAccount.accountNumber && (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(bankAccount.accountNumber, "Account Number")}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#204066] border border-slate-300 hover:border-slate-400 bg-white px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-2xs shrink-0"
                                    >
                                        {copiedField === "Account Number" ? (
                                            <>
                                                <Check size={12} className="text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={12} />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                    IFSC Code
                                </label>
                                <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 flex items-center justify-between gap-2">
                                    <span className="font-mono tracking-wider">{bankAccount.ifscCode || "—"}</span>
                                    {bankAccount.ifscCode && (
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(bankAccount.ifscCode, "IFSC Code")}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#204066] border border-slate-300 hover:border-slate-400 bg-white px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-2xs shrink-0"
                                        >
                                            {copiedField === "IFSC Code" ? (
                                                <>
                                                    <Check size={12} className="text-emerald-600" />
                                                    <span className="text-emerald-600">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={12} />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                    Account Type
                                </label>
                                <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 truncate">
                                    {BANK_ACCOUNT_TYPE_LABELS[bankAccount.accountType] || bankAccount.accountType}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                                UPI ID
                            </label>
                            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 flex items-center justify-between gap-2">
                                <span className="truncate">{bankAccount.upiId || "—"}</span>
                                {bankAccount.upiId && (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(bankAccount.upiId, "UPI ID")}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#204066] border border-slate-300 hover:border-slate-400 bg-white px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-2xs shrink-0"
                                    >
                                        {copiedField === "UPI ID" ? (
                                            <>
                                                <Check size={12} className="text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={12} />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isVerifyModalOpen && (
                <ConfirmationModal
                    isOpen={isVerifyModalOpen}
                    title="Verify Bank & Settlement Details?"
                    message="Are you sure you want to verify and activate this bank account for future settlements?"
                    loading={isActionLoading}
                    onClose={() => setIsVerifyModalOpen(false)}
                    onConfirm={handleConfirmVerify}
                />
            )}

            {isRejectModalOpen && (
                <ReasonModal
                    title="Reject Bank & Settlement Details"
                    description="Please provide a reason for rejecting this bank detail"
                    onClose={() => setIsRejectModalOpen(false)}
                    onConfirm={handleConfirmReject}
                />
            )}
        </div>
    );
}

export default BankDetailsApprovalCard;

