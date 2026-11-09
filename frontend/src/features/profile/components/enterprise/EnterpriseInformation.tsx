import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {SquarePen,Mail,BadgeCheck,Phone,ChevronDown,Check,X,Loader2,Building2,User,Info,} from "lucide-react";
import type {EnterpriseProfile,UpdateEnterpriseDetails,CategoryOption,} from "../../types/enterprise-profile.types";
import { getEnterpriseCategories, updateEnterpriseDetails,} from "../../services/enterprise-profile.service";
import { UpdateEnterpriseDetailsSchema } from "../../schemas/update-enterprise-details.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { handleApiError, handleFormError } from "../../../../utils/errorHandler";
import useAuthStore from "../../../../stores/auth.store";

interface EnterpriseInformationProps {
  profile: EnterpriseProfile | null;
  onProfileUpdated?: (updated: EnterpriseProfile) => void;
}

const MAX_SUBCATEGORIES = 6;

export default function EnterpriseInformation({profile,onProfileUpdated,}: EnterpriseInformationProps) {
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const {register,handleSubmit,reset,control,setValue,setError,formState: { errors, isSubmitting },} = useForm<UpdateEnterpriseDetails>({resolver: zodResolver(UpdateEnterpriseDetailsSchema)});

  const selectedCategoryId = useWatch({ control, name: "categoryId" });
  const selectedSubcategoryIds = useWatch({ control, name: "subcategoryIds" }) || [];

  const availableSubcategories = categories.find((cat) => cat.id === selectedCategoryId)?.subcategories || [];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getEnterpriseCategories();
        setCategories(data);
      } catch (error) {
        handleApiError(error, "Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    void fetchCategories();
  }, []);

  const resetForm = () => {
    if (!profile) return;
    reset({
      enterpriseName: profile.enterpriseName || "",
      contactPerson: profile.name || "",
      categoryId: profile.category?.id,
      description: profile.description || "",
      subcategoryIds: profile.subcategories?.map((s) => s.id) || [],
    });
  };

  const handleEnterEditMode = () => {
    resetForm();
    setUpdateMode(true);
  };

  const handleCancelEdit = () => {
    resetForm();
    setUpdateMode(false);
  };

  const handleCategoryChange = (newCategoryId: string) => {
    setValue("categoryId", newCategoryId || undefined, { shouldValidate: true });
    setValue("subcategoryIds", [], { shouldValidate: true });
  };

  const handleToggleSubcategory = (subcategoryId: string) => {
    const isSelected = selectedSubcategoryIds.includes(subcategoryId);
    if (isSelected) {
      setValue(
        "subcategoryIds",
        selectedSubcategoryIds.filter((id) => id !== subcategoryId),
        { shouldValidate: true }
      );
    } else {
      if (selectedSubcategoryIds.length >= MAX_SUBCATEGORIES) {
        toast.info(`You can select up to ${MAX_SUBCATEGORIES} subcategories`);
        return;
      }
      setValue("subcategoryIds", [...selectedSubcategoryIds, subcategoryId], {shouldValidate: true})
    }
  };

  const onSubmit = async (data: UpdateEnterpriseDetails) => {
    try {
      const updatedProfile = await updateEnterpriseDetails({
        enterpriseName: data.enterpriseName,
        contactPerson: data.contactPerson,
        categoryId: data.categoryId,
        description: data.description || null,
        subcategoryIds: data.subcategoryIds || [],
      });

      toast.success("Enterprise details updated successfully");

      const { user: authUser, setUser: setAuthUser } = useAuthStore.getState();
      if (authUser && data.contactPerson) {
        setAuthUser({ ...authUser, name: data.contactPerson });
      }

      onProfileUpdated?.(updatedProfile);
      setUpdateMode(false);
    } catch (error) {
      handleFormError(error, setError, "Failed to update enterprise details. Please try again");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 pb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Enterprise Information
          </h3>

          {!updateMode ? (
            <button
              type="button"
              onClick={handleEnterEditMode}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <SquarePen size={15} className="text-slate-600" />
              <span>Edit</span>
            </button>
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
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Enterprise Name
            </label>
            {updateMode ? (
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Building2 size={16} />
                  </span>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Enter enterprise name"
                    {...register("enterpriseName")}
                    className={`w-full h-11 pl-10 pr-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.enterpriseName
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                        : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                    }`}
                  />
                </div>
                {errors.enterpriseName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.enterpriseName.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                {profile?.enterpriseName || "Not provided"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Contact Person
            </label>
            {updateMode ? (
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Enter contact person name"
                    {...register("contactPerson")}
                    className={`w-full h-11 pl-10 pr-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.contactPerson
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                        : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
                    }`}
                  />
                </div>
                {errors.contactPerson && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactPerson.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                {profile?.name || "Not provided"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs opacity-90">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <span className="truncate text-slate-700">
                  {profile?.email}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                <BadgeCheck size={13} />
                Verified
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
              Email updates require verification in Settings to maintain quotation and contract security.
            </p>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs opacity-90">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone size={16} className="text-slate-400 shrink-0" />
                <span className="truncate text-slate-700">
                  {profile?.phone || "Not provided"}
                </span>
              </div>
              {profile?.phone ? (
                profile.phoneVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                    <BadgeCheck size={13} />
                    Verified
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                      Unverified
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/enterprise/settings")}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 bg-white border border-slate-200/90 rounded-lg shadow-2xs cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/enterprise/settings")}
                  className="inline-flex items-center px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 bg-white border border-slate-200/90 rounded-lg shadow-2xs cursor-pointer"
                >
                  Add Phone
                </button>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
              Phone verification ensures urgent quotation notifications reach your enterprise promptly.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Business Category & Subcategories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Category
            </label>
            {updateMode ? (
              <div>
                <div className="relative">
                  <select
                    disabled={isSubmitting || loadingCategories}
                    value={selectedCategoryId || ""}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full h-11 pl-4 pr-10 bg-white border border-slate-200/90 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10 appearance-none cursor-pointer transition-all disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingCategories ? "Loading categories..." : "Select a business category"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={16} />
                  </span>
                </div>
                {errors.categoryId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                <span>{profile?.category?.name || "Not selected"}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            )}
          </div>

          {!updateMode && (
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Subcategory{" "}
                <span className="text-slate-400 font-normal normal-case">
                  (Multiple allowed)
                </span>
              </label>
              <div className="p-2 min-h-[46px] bg-[#f6f8fb] border border-slate-200/90 rounded-xl flex flex-wrap gap-2 items-center shadow-2xs">
                {profile?.subcategories && profile.subcategories.length > 0 ? (
                  profile.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-3 py-1 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs"
                    >
                      {sub.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 px-2 py-1">
                    No subcategories selected
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {updateMode && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subcategories{" "}
                <span className="text-slate-400 font-normal normal-case">
                  (Choose up to {MAX_SUBCATEGORIES})
                </span>
              </label>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  selectedSubcategoryIds.length >= MAX_SUBCATEGORIES
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {selectedSubcategoryIds.length} / {MAX_SUBCATEGORIES} Selected
              </span>
            </div>

            {!selectedCategoryId ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                <Info size={15} className="text-slate-400 shrink-0" />
                <span>Please select a business category above to see and select available subcategories.</span>
              </div>
            ) : availableSubcategories.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                No active subcategories available under this category.
              </div>
            ) : (
              <div className="p-3 bg-[#f6f8fb] border border-slate-200/90 rounded-xl flex flex-wrap gap-2 items-center">
                {availableSubcategories.map((sub) => {
                  const isSelected = selectedSubcategoryIds.includes(sub.id);
                  const isLimitReached =
                    !isSelected && selectedSubcategoryIds.length >= MAX_SUBCATEGORIES;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      disabled={isSubmitting || isLimitReached}
                      onClick={() => handleToggleSubcategory(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#204066] text-white border border-[#204066] shadow-xs hover:bg-[#183250]"
                          : isLimitReached
                          ? "bg-white/60 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-50"
                          : "bg-white text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      {isSelected && <Check size={13} strokeWidth={2.5} />}
                      <span>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.subcategoryIds && (
              <p className="text-red-500 text-xs mt-1">
                {errors.subcategoryIds.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Description
        </h3>

        {updateMode ? (
          <div>
            <textarea
              rows={4}
              maxLength={1000}
              disabled={isSubmitting}
              placeholder="Provide a brief overview of your business, key capabilities, or services..."
              {...register("description")}
              className={`w-full p-3.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all resize-y ${
                errors.description
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                  : "border-slate-200/90 focus:border-[#204066] focus:ring-2 focus:ring-[#204066]/10"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm text-slate-700 leading-relaxed shadow-2xs min-h-[96px] whitespace-pre-line">
            {profile?.description || "No description provided yet."}
          </div>
        )}
      </div>
    </form>
  );
}
