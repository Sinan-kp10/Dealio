import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Info, MapPin, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { createQuotationFormSchema, type CreateQuotationFormData } from "../../schemas/create-quotation-request.schema";
import { createQuotationRequest } from "../../services/quotation.service";
import useCategoryStore from "../../../../stores/category.store";
import { handleFormError } from "../../../../utils/errorHandler";

export function CreateQuotationPage() {
  const navigate = useNavigate();
  const categories = useCategoryStore((state) => state.categories);

  const {register,handleSubmit,control,setValue,setError,formState: { errors, isSubmitting }} = useForm<CreateQuotationFormData>({resolver: zodResolver(createQuotationFormSchema)})

  const selectedCategoryId = useWatch({ control, name: "categoryId", defaultValue: "" })
  const selectedSubCategoryId = useWatch({ control, name: "subCategoryId", defaultValue: "" })
  const availableSubcategories = categories.find((cat) => cat.id === selectedCategoryId)?.subcategories || [];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("categoryId", e.target.value, { shouldValidate: true });
    setValue("subCategoryId", "", { shouldValidate: false });
  };

  const onSubmit = async (data: CreateQuotationFormData) => {
    try {
      const response = await createQuotationRequest({
        productName: data.productName,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        quantity: parseInt(data.quantity, 10),
        budget: data.budget ? parseInt(data.budget, 10) : null,
        location: data.location?.trim() || null,
        description: data.description,
      });

      toast.success(response.message || "Quotation request submitted successfully");
      navigate("/customer/quotations");
    } catch (error) {
      handleFormError(error, setError, "Failed to create quotation request");
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/85 p-6 sm:p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 sm:space-y-7">
        <div>
          <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
            Create Quotation Request
          </h1>
          <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
            Tell us what you are looking for, and receive competitive structured quotations from vetted suppliers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-7"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="productName"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              {...register("productName")}
              placeholder="What product are you looking for"
              className={`w-full h-11 px-3.5 sm:px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all hover:border-slate-300 focus:outline-none ${
                errors.productName
                  ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                  : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
              }`}
            />
            {errors.productName ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.productName.message}</p>
            ) : (
              <p className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
                <Info size={13} className="text-slate-400 shrink-0" />
                <span>Enter any descriptive product name for your request</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                {...register("categoryId")}
                value={selectedCategoryId}
                onChange={handleCategoryChange}
                className={`w-full h-11 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm bg-white border rounded-xl appearance-none cursor-pointer transition-all hover:border-slate-300 focus:outline-none ${
                  errors.categoryId
                    ? "border-red-500 text-slate-700 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200 text-slate-700 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            {errors.categoryId ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.categoryId.message}</p>
            ) : (
              <p className="text-[11.5px] text-slate-400">
                Classifies your quotation request for accurate vendor routing
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="subCategory"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Sub Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="subCategory"
                {...register("subCategoryId")}
                value={selectedSubCategoryId}
                onChange={(e) => setValue("subCategoryId", e.target.value, { shouldValidate: true })}
                disabled={!selectedCategoryId || availableSubcategories.length === 0}
                className={`w-full h-11 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm border rounded-xl appearance-none transition-all focus:outline-none ${
                  !selectedCategoryId || availableSubcategories.length === 0
                    ? "bg-slate-50/70 border-slate-200 text-slate-400 cursor-not-allowed"
                    : errors.subCategoryId
                    ? "bg-white border-red-500 text-slate-700 hover:border-slate-300 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12 cursor-pointer"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12 cursor-pointer"
                }`}
              >
                <option value="" disabled>
                  {!selectedCategoryId ? "Select a category first" : availableSubcategories.length === 0? "No subcategories available": "Please select a subcategory"}
                </option>
                {availableSubcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  !selectedCategoryId ? "text-slate-300" : "text-slate-400"
                }`}
              />
            </div>
            {errors.subCategoryId ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.subCategoryId.message}</p>
            ) : (
              <p className="text-[11.5px] text-slate-400">
                Specific sub category for specialized supplier matching
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="quantity"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="quantity"
                type="text"
                {...register("quantity")}
                placeholder="Enter quantity"
                className={`w-full h-11 pl-3.5 sm:pl-4 pr-16 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all hover:border-slate-300 focus:outline-none ${
                  errors.quantity
                    ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-md pointer-events-none">
                UNITS
              </span>
            </div>
            {errors.quantity ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.quantity.message}</p>
            ) : (
              <p className="text-[11.5px] text-slate-400">How many units do you need?</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label htmlFor="budget" className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]">
                Budget
              </label>
              <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Optional</span>
            </div>
            <input
              id="budget"
              type="text"
              {...register("budget")}
              placeholder="Enter your budget"
              className={`w-full h-11 px-3.5 sm:px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all hover:border-slate-300 focus:outline-none ${
                errors.budget
                  ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                  : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
              }`}
            />
            {errors.budget ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.budget.message}</p>
            ) : (
              <p className="text-[11.5px] text-slate-400">Your estimated budget for this request.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label htmlFor="location" className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]">
                Location
              </label>
              <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Optional</span>
            </div>
            <div className="relative">
              <MapPin
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="location"
                type="text"
                {...register("location")}
                placeholder="Enter your preferred location (e.g. New York, USA or Kozhikode, Kerala)"
                className={`w-full h-11 pl-10 pr-3.5 sm:pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all hover:border-slate-300 focus:outline-none ${
                  errors.location
                    ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              />
            </div>
            {errors.location ? (
              <p className="text-[11.5px] text-red-500 font-medium">{errors.location.message}</p>
            ) : (
              <p className="text-[11.5px] text-slate-400">
                Specify a preferred location if relevant to your request.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
          >
            Description / Detailed Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            placeholder="Describe the product you are looking for, including specifications, color, material, size, model, brand, or any other requirements."
            className={`w-full p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl resize-y transition-all leading-relaxed hover:border-slate-300 focus:outline-none ${
              errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
            }`}
          />
          {errors.description ? (
            <p className="text-[11.5px] text-red-500 font-medium">{errors.description.message}</p>
          ) : (
            <p className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
              <Info size={13} className="text-slate-400 shrink-0" />
              <span>Add as much detail as needed so sellers can provide accurate quotations.</span>
            </p>
          )}
        </div>

        <div className="!mt-3.5 sm:!mt-4 pt-0 flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1e3a5f] hover:bg-[#152a45] rounded-xl transition-all shadow-sm cursor-pointer active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Quotation Request</span>
                <ChevronRight size={16} strokeWidth={2.4} />
              </>
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default CreateQuotationPage;
