import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { createSubCategorySchema } from "../schemas/create-sub-category.schema";
import { handleFormError } from "../../../utils/errorHandler";
import { createSubCategory } from "../sevices/category-management.service";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";
import type { CreateSubCategoryInput } from "../types/sub-category";

export interface SubCategoryModalProps {
    isOpen: boolean;
    categories?: { id: string; name: string }[];
    onSuccess: () => void;
    onCancel: () => void;
}

function SubCategoryFormModal({isOpen,categories = [],onCancel,onSuccess,}: SubCategoryModalProps) {
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting }} = useForm<CreateSubCategoryInput>({resolver: zodResolver(createSubCategorySchema)})

    useEffect(() => {
        if (isOpen) {
            reset({
                categoryId: "",
                subCategoryName: "",
                status: "ACTIVE",
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: CreateSubCategoryInput) => {
        try {
            await createSubCategory({
                categoryId: data.categoryId,
                subCategoryName: data.subCategoryName.trim(),
                status: data.status,
            });

            toast.success(`Subcategory '${data.subCategoryName.trim()}' created successfully`);
            reset();
            onSuccess();
        } catch (error) {
            handleFormError(error, setError, "Failed to create subcategory");
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            reset();
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs transition-opacity"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !isSubmitting) {
                    handleClose();
                }
            }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="sub-category-modal-title"
        >
            <div
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-7 relative transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                        <h2
                            id="sub-category-modal-title"
                            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight m-0"
                        >
                            Add Subcategory
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 m-0">
                            Add a new subcategory and assign it to a parent category.
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleClose}
                        aria-label="Close modal"
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 pt-5">
                    <div>
                        <label
                            htmlFor="parentCategorySelect"
                            className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                            Parent Category
                        </label>
                        <div className="relative">
                            <select
                                id="parentCategorySelect"
                                disabled={isSubmitting}
                                {...register("categoryId")}
                                className={`w-full h-11 pl-3.5 pr-10 bg-white border rounded-lg text-sm text-slate-800 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] transition-colors cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed ${
                                    errors.categoryId
                                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                        : "border-slate-200/90"
                                }`}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={16}
                                className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                        {errors.categoryId && (
                            <p className="text-xs text-red-600 font-medium mt-1.5 m-0">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="subCategoryName"
                            className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                            Subcategory Name
                        </label>
                        <input
                            id="subCategoryName"
                            type="text"
                            autoFocus
                            disabled={isSubmitting}
                            placeholder="e.g. Smart TVs, Laptops"
                            {...register("subCategoryName")}
                            className={`w-full h-11 px-3.5 bg-white border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:cursor-not-allowed ${
                                errors.subCategoryName
                                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                    : "border-slate-200/90 focus:border-[#355982] focus:ring-[#355982]/20"
                            }`}
                        />
                        {errors.subCategoryName && (
                            <p className="text-xs text-red-600 font-medium mt-1.5 m-0">
                                {errors.subCategoryName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="subCategoryStatus"
                            className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                            Status
                        </label>
                        <div className="relative">
                            <select
                                id="subCategoryStatus"
                                disabled={isSubmitting}
                                {...register("status")}
                                className="w-full h-11 pl-3.5 pr-10 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] transition-colors cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                        {errors.status && (
                            <p className="text-xs text-red-600 font-medium mt-1.5 m-0">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleClose}
                            className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-[130px] h-10 px-5 bg-[#244673] hover:bg-[#1b3557] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <ButtonSpinner size="sm" />
                            ) : (
                                "Add Subcategory"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SubCategoryFormModal;
