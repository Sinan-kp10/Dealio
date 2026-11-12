import { useCallback, useEffect, useState } from "react";
import { AlertCircle, Check, ChevronDown, Clock, Copy, Loader2, Plus, ShieldCheck, SquarePen, X } from "lucide-react";
import type { ActiveBankRecord, BankRecordRequest, BaseBankRecord, CreateEnterpriseBankRecordFormData } from "../../types/enterprise-bank-record.types";
import { BANK_ACCOUNT_TYPE_LABELS } from "../../types/enterprise-bank-record.types";
import { handleApiError, handleFormError } from "../../../../utils/errorHandler";
import { addBankRecord, getBankRecord, updateBankRecord } from "../../services/enterprise-profile.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEnterpriseBankRecordSchema } from "../../schemas/enterprise-bank.record.schema";
import ConfirmationModal from "../../../../components/common/confirmationModel/ConfirmationModal";
import useCopyToClipboard from "../../../../hook/useCopyToClipboard";

interface EnterpriseBankRecordProps {
    onStatusChange?: (status: "PENDING" | "VERIFIED" | "REQUIRED") => void;
}

function EnterpriseBankRecord({ onStatusChange }: EnterpriseBankRecordProps = {}) {
    const [bankRecord, setBankRecord] = useState<ActiveBankRecord | null>(null);
    const [pendingBankRecord, setPendingBankRecord] = useState<BankRecordRequest | null>(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { copiedField, copyToClipboard } = useCopyToClipboard();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const {register,handleSubmit,reset,setError,formState: { errors, isSubmitting }} = useForm<CreateEnterpriseBankRecordFormData>({resolver: zodResolver(CreateEnterpriseBankRecordSchema)})

    const resetForm = useCallback((record: BaseBankRecord | null) => {
        if (record) {
            reset({
                accountHolderName: record.AccountHolderName,
                bankAccountNumber: record.BankAccountNumber,
                ifscCode: record.ifscCode,
                accountType: (record.accountType as "CURRENT" | "SAVINGS") || undefined,
                upiId: record.upiId || "",
            });
        } else {
            reset({
                accountHolderName: "",
                bankAccountNumber: "",
                ifscCode: "",
                accountType: undefined,
                upiId: "",
            });
        }
    }, [reset]);

    useEffect(() => {
        let cancelled = false;
        const fetchBankRecord = async () => {
            try {
                setLoading(true);

                const response = await getBankRecord();
                if (!cancelled) {
                    const active = response.data.activeBankRecord;
                    const pending = response.data.pendingRequest;
                    setBankRecord(active);
                    setPendingBankRecord(pending);
                    resetForm(active || pending);
                    onStatusChange?.(pending?.status === "PENDING" ? "PENDING" : active ? "VERIFIED" : "REQUIRED");
                }
            } catch (error) {
                handleApiError(error, "unable to load bank record");
                onStatusChange?.("REQUIRED");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchBankRecord();
        return () => {
            cancelled = true;
        };
    }, [resetForm, onStatusChange]);

    const isPendingReview = pendingBankRecord?.status === "PENDING";
    const canEdit = !isPendingReview;
    const displayRecord: BaseBankRecord | null = bankRecord || pendingBankRecord;

    const handleEnterEditMode = () => {
        if (!canEdit) return;
        resetForm(bankRecord || pendingBankRecord);
        setUpdateMode(true);
    };

    const handleCancelEdit = () => {
        resetForm(bankRecord || pendingBankRecord);
        setUpdateMode(false);
    };

    const onSubmit = async (data: CreateEnterpriseBankRecordFormData) => {
        try {
            const response = bankRecord ? await updateBankRecord(data) : await addBankRecord(data);
            setPendingBankRecord(response.data);
            setUpdateMode(false);
            setIsConfirmModalOpen(false);
            onStatusChange?.("PENDING");
        } catch (error) {
            handleFormError(error, setError, "unable to update bank record");
            setIsConfirmModalOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="py-12 flex items-center justify-center text-slate-500">
                <Loader2 size={24} className="animate-spin text-[#204066]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                {pendingBankRecord?.rejectionReason && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700">
                        <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
                        <p className="leading-relaxed">
                            <span className="font-semibold text-red-800">Your bank details verification was rejected by admin. </span>
                            <span>Reason: </span>
                            <span className="font-medium text-red-900">"{pendingBankRecord.rejectionReason}". </span>
                        </p>
                    </div>
                )}
                {isPendingReview && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 mt-2">
                        <Clock size={18} className="shrink-0 text-amber-600 mt-0.5" />
                        <p className="leading-relaxed">
                            Your bank account verification request is under review. Please wait until admin responds.
                        </p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(() => setIsConfirmModalOpen(true))} className="space-y-4">
                <div className="flex items-center justify-between gap-3 sm:gap-4 pb-2 flex-wrap sm:flex-nowrap">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                            Bank & Settlement Details
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            Official bank account for receiving customer deal settlements, security deposits, and platform payouts.
                        </p>
                    </div>

                    {!updateMode ? (
                        canEdit && (
                            <button
                                type="button"
                                onClick={handleEnterEditMode}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
                            >
                                {displayRecord ? (
                                    <>
                                        <SquarePen size={15} className="text-slate-600" />
                                        <span>Edit</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={15} className="text-slate-600" />
                                        <span>Add Bank Details</span>
                                    </>
                                )}
                            </button>
                        )
                    ) : (
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-1 px-3 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                            >
                                <X size={15} />
                                <span>Cancel</span>
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#204066] hover:bg-[#173252] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Account Holder Name
                        </label>
                        {updateMode ? (
                            <div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder="Enter account holder name"
                                    {...register("accountHolderName")}
                                    className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                                        errors.accountHolderName
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                            : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                    }`}
                                />
                                {errors.accountHolderName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.accountHolderName.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-11 px-4 bg-[#f0f4f9] border border-slate-200/80 rounded-xl text-sm font-medium text-slate-900 flex items-center shadow-2xs">
                                <span className="truncate">{displayRecord?.AccountHolderName || "Not provided"}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Bank Account Number
                        </label>
                        {updateMode ? (
                            <div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder="Enter bank account number"
                                    {...register("bankAccountNumber")}
                                    className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                                        errors.bankAccountNumber
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                            : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                    }`}
                                />
                                {errors.bankAccountNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.bankAccountNumber.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-11 px-4 bg-[#f0f4f9] border border-slate-200/80 rounded-xl text-sm font-medium text-slate-900 flex items-center justify-between shadow-2xs">
                                <span className="truncate font-medium">{displayRecord?.BankAccountNumber || "Not provided"}</span>
                                {displayRecord?.BankAccountNumber && (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(displayRecord.BankAccountNumber, "accountNumber")}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer shrink-0 ml-2"
                                    >
                                        {copiedField === "accountNumber" ? (
                                            <>
                                                <Check size={13} className="text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} className="text-slate-500" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            IFSC Code
                        </label>
                        {updateMode ? (
                            <div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder="e.g. HDFC0001234"
                                    {...register("ifscCode")}
                                    className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 uppercase placeholder:text-slate-400 placeholder:normal-case focus:outline-none transition-all ${
                                        errors.ifscCode
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                            : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                    }`}
                                />
                                {errors.ifscCode && (
                                    <p className="text-red-500 text-xs mt-1">{errors.ifscCode.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-11 px-4 bg-[#f0f4f9] border border-slate-200/80 rounded-xl text-sm font-bold text-slate-900 flex items-center justify-between shadow-2xs tracking-wide">
                                <span className="truncate">{displayRecord?.ifscCode ? displayRecord.ifscCode.toUpperCase() : "Not provided"}</span>
                                {displayRecord?.ifscCode && (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(displayRecord.ifscCode.toUpperCase(), "ifscCode")}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer shrink-0 ml-2 font-normal tracking-normal"
                                    >
                                        {copiedField === "ifscCode" ? (
                                            <>
                                                <Check size={13} className="text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} className="text-slate-500" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            Account Type
                        </label>
                        {updateMode ? (
                            <div>
                                <div className="relative">
                                    <select
                                        disabled={isSubmitting}
                                        {...register("accountType")}
                                        className={`w-full h-11 px-3.5 pr-10 bg-white border rounded-xl text-sm font-medium text-slate-900 focus:outline-none appearance-none cursor-pointer transition-all ${
                                            errors.accountType
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                                : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                        }`}
                                    >
                                        <option value="">Select account type</option>
                                        <option value="CURRENT">Current Account</option>
                                        <option value="SAVINGS">Savings Account</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                {errors.accountType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.accountType.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-11 px-4 bg-[#f0f4f9] border border-slate-200/80 rounded-xl text-sm font-medium text-slate-700 flex items-center justify-between shadow-2xs">
                                <span>
                                    {displayRecord?.accountType
                                        ? BANK_ACCOUNT_TYPE_LABELS[displayRecord.accountType] || displayRecord.accountType
                                        : "Not provided"}
                                </span>
                                <ChevronDown size={18} className="text-slate-400 shrink-0" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-500 mb-1.5">
                            UPI ID {updateMode && <span className="text-xs text-slate-400 font-normal">(Optional)</span>}
                        </label>
                        {updateMode ? (
                            <div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder="e.g. enterprise@okhdfcbank"
                                    {...register("upiId")}
                                    className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                                        errors.upiId
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                            : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                    }`}
                                />
                                {errors.upiId && (
                                    <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-11 px-4 bg-[#f0f4f9] border border-slate-200/80 rounded-xl text-sm font-medium text-slate-900 flex items-center justify-between shadow-2xs">
                                <span className="truncate">{displayRecord?.upiId || "Not provided"}</span>
                                {displayRecord?.upiId && (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(displayRecord.upiId!, "upiId")}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer shrink-0 ml-2"
                                    >
                                        {copiedField === "upiId" ? (
                                            <>
                                                <Check size={13} className="text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} className="text-slate-500" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5 self-end min-h-[44px] h-11 md:pl-7">
                        <ShieldCheck size={18} className="text-[#204066] shrink-0" />
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            All payments from customer deals are directly credited to this account.
                        </p>
                    </div>
                </div>
            </form>

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleSubmit(onSubmit)}
                loading={isSubmitting}
                title="Confirm Bank Details Submission"
                message="Once submitted, your bank account verification request will be under review and you cannot edit these details until the administrator responds. Are you sure you want to proceed?"
            />
        </div>
    );
}

export default EnterpriseBankRecord;
