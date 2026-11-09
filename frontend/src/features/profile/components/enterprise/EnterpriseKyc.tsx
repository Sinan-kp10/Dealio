import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, ChevronDown, Loader2, SquarePen, Upload, X } from "lucide-react";
import { CreateEnterpriseKycSchema } from "../../schemas/enterpise-kyc.schema";
import { BUSINESS_TYPE_LABELS, DOCUMENT_TYPE_LABELS, type ActiveKycRecord, type BaseKycRecord, type CreateEnterpriseKycFormData, type KycRequestRecord } from "../../types/enterprise-kyc.types";
import { addKycDetails, getKycDetails, updateKycDetails } from "../../services/enterprise-profile.service";
import { handleApiError, handleFormError } from "../../../../utils/errorHandler";
import KycDocumentModal from "./KycDocumentModal";
import KycDocumentPreviewModal from "./KycDocumentPreviewModal";

function EnterpriseKyc() {
    const [kyc, setKyc] = useState<ActiveKycRecord | null>(null);
    const [pendingKyc, setPendingtKyc] = useState<KycRequestRecord | null>(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const { register, handleSubmit, reset, setValue, setError, formState: { errors, isSubmitting },} = useForm<CreateEnterpriseKycFormData>({  resolver: zodResolver(CreateEnterpriseKycSchema)});

    useEffect(() => {
        let cancelled = false;
        const fetchKycDetails = async () => {
        try {
            setLoading(true);

            const response = await getKycDetails();
            if (!cancelled) {
                const active = response.data.activeKyc;
                const pending = response.data.pendingRequest;
                setKyc(active);
                setPendingtKyc(pending);
                const current: BaseKycRecord | null = active || pending;
                if (current) {
                    reset({
                        businessType: current.businessType,
                        fullLegalName: current.fullLegalName,
                        documentType: current.documentType,
                        image: current.documentUrl || undefined,
                    });
                }
            }
        } catch (error) {
            handleApiError(error, "unable to load kyc details");
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
        };

        void fetchKycDetails();
        return () => {
            cancelled = true;
        };
    }, [reset]);

    const isPendingReview = pendingKyc?.status === "PENDING";
    const canEdit = !isPendingReview;
    const displayKyc: BaseKycRecord | null = kyc || pendingKyc;

    const handleEnterEditMode = () => {
        if (!canEdit) return;
        const recordToEdit: BaseKycRecord | null = kyc || pendingKyc;
        if (recordToEdit) {
            reset({
                businessType: recordToEdit.businessType,
                fullLegalName: recordToEdit.fullLegalName,
                documentType: recordToEdit.documentType,
                image: recordToEdit.documentUrl || undefined,
            });
        }
        setDocumentFile(null);
        setUpdateMode(true);
    };

    const handleCancelEdit = () => {
        const recordToEdit = kyc || pendingKyc;
        if (recordToEdit) {
            reset({
                businessType: recordToEdit.businessType,
                fullLegalName: recordToEdit.fullLegalName,
                documentType: recordToEdit.documentType,
                image: recordToEdit.documentUrl || undefined,
            });
        } else {
            reset({
                businessType: undefined,
                fullLegalName: "",
                documentType: undefined,
                image: undefined,
            });
        }
        setDocumentFile(null);
        setUpdateMode(false);
    };

    const onSubmit = async (data : CreateEnterpriseKycFormData) => {
        try {
            const payload = {
                businessType: data.businessType,
                fullLegalName: data.fullLegalName,
                documentType: data.documentType,
                ...(documentFile ? { image: documentFile } : {}),
            };

            if (kyc) {
                await updateKycDetails(payload);
            } else {
                await addKycDetails(payload);
            }

            const response = await getKycDetails();
            setKyc(response.data.activeKyc);
            setPendingtKyc(response.data.pendingRequest);
            setDocumentFile(null);
            setUpdateMode(false);
        } catch (error) {
            handleFormError(error, setError, "unable to update kyc details");
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
                {pendingKyc?.rejectionReason && (<p className="text-xs sm:text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{pendingKyc.rejectionReason}</p>)}
                {isPendingReview && (<p className="text-xs sm:text-sm text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 mt-2">Your KYC verification request is already under review. Please wait until admin responds</p>)}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center justify-between gap-3 sm:gap-4 pb-2 flex-wrap sm:flex-nowrap">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        KYC & Business Verification
                    </h3>

                    {!updateMode ? (
                        canEdit && (
                            <button
                                type="button"
                                onClick={handleEnterEditMode}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
                            >
                                <SquarePen size={15} className="text-slate-600" />
                                <span>Edit</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                            Business Type
                        </label>
                        {updateMode ? (
                            <div>
                                <div className="relative">
                                    <select
                                        disabled={isSubmitting}
                                        {...register("businessType")}
                                        className={`w-full h-11 px-3.5 pr-10 bg-white border rounded-xl text-sm font-medium text-slate-900 focus:outline-none appearance-none cursor-pointer transition-all ${
                                            errors.businessType
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                                : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                        }`}
                                    >
                                        <option value="">Select business type</option>
                                        <option value="PRIVATE_LIMITED">Private Limited Company (Pvt Ltd)</option>
                                        <option value="PUBLIC_LIMITED">Public Limited Company</option>
                                        <option value="LLP">Limited Liability Partnership (LLP)</option>
                                        <option value="PARTNERSHIP">Partnership Firm</option>
                                        <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                {errors.businessType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between px-3.5 h-11 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                                <span className="truncate">{displayKyc?.businessType ? BUSINESS_TYPE_LABELS[displayKyc.businessType] : "Not provided"}</span>
                                <ChevronDown size={16} className="text-slate-400 shrink-0" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                            Full Legal Name
                        </label>
                        {updateMode ? (
                            <div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    placeholder="Enter full legal name"
                                    {...register("fullLegalName")}
                                    className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                                        errors.fullLegalName
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                            : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                    }`}
                                />
                                {errors.fullLegalName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullLegalName.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center px-3.5 h-11 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs truncate">
                                {displayKyc?.fullLegalName || "Not provided"}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                            Identification Document Type
                        </label>
                        {updateMode ? (
                            <div>
                                <div className="relative">
                                    <select
                                        disabled={isSubmitting}
                                        {...register("documentType")}
                                        className={`w-full h-11 px-3.5 pr-10 bg-white border rounded-xl text-sm font-medium text-slate-900 focus:outline-none appearance-none cursor-pointer transition-all ${
                                            errors.documentType
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                                                : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                                        }`}
                                    >
                                        <option value="">Select document type</option>
                                        <option value="GST_CERTIFICATE">Certificate of Incorporation (MCA)</option>
                                        <option value="PAN_CARD">PAN Card</option>
                                        <option value="AADHAAR">Aadhaar Card</option>
                                        <option value="PASSPORT">Passport</option>
                                        <option value="VOTER_ID">Voter ID</option>
                                        <option value="DRIVING_LICENCE">Driving Licence</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                {errors.documentType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.documentType.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between px-3.5 h-11 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                                <span className="truncate">{displayKyc?.documentType ? DOCUMENT_TYPE_LABELS[displayKyc.documentType] : "Not provided"}</span>
                                <ChevronDown size={16} className="text-slate-400 shrink-0" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                            Upload Verification Document
                        </label>
                        {updateMode ? (
                            <div>
                                <div className={`flex items-center justify-between px-3.5 h-11 bg-white border rounded-xl text-sm gap-2 transition-all ${
                                    errors.image
                                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/10"
                                        : "border-slate-200/90 focus-within:border-[#204066] focus-within:ring-2 focus-within:ring-[#204066]/10"
                                }`}>
                                    <span className={`truncate text-xs sm:text-sm font-medium ${
                                        documentFile || displayKyc?.documentUrl ? "text-slate-800" : "text-slate-500"
                                    }`}>
                                        {documentFile ? documentFile.name : (displayKyc?.documentUrl ? "Current document uploaded" : "No file chosen")}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => setIsDocModalOpen(true)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                                    >
                                        <Upload size={13} />
                                        <span>{documentFile ? "Change" : "Choose File"}</span>
                                    </button>
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center px-3.5 h-11 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                                {displayKyc?.documentUrl ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsPreviewModalOpen(true)}
                                        className="text-[#204066] hover:text-[#173252] hover:underline font-semibold cursor-pointer truncate"
                                    >
                                        View Document
                                    </button>
                                ) : (
                                    <span className="text-slate-500">Not provided</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <KycDocumentModal
                isOpen={isDocModalOpen}
                onClose={() => setIsDocModalOpen(false)}
                onConfirm={(file) => {
                    setDocumentFile(file);
                    setValue("image", file, { shouldValidate: true });
                }}
            />

            <KycDocumentPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                imageUrl={displayKyc?.documentUrl || null}
                documentType={displayKyc?.documentType ? DOCUMENT_TYPE_LABELS[displayKyc.documentType] : undefined}
            />
        </div>
    )
}

export default EnterpriseKyc;