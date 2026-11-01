import { useEffect, useState } from "react";
import type { CustomerProfile, UpdateCustomerProfile } from "../types/customer.profile.types";
import { getCustomerProfile, updateCustomerProfile } from "../services/profile.service";
import axios from "axios";
import { toast } from "react-toastify";
import {Camera, Trash2, SquarePen, User,Phone,Calendar,Lock,Mail,BadgeCheck,X,Check,Loader2} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomerProfileSchema } from "../schemas/update-customer-profile.schema";
import useAuthStore from "../../auth/stores/auth.store";
import CustomerProfileSkeleton from "../components/loading/CustomerProfileSkeleton";
import ChangePasswordModal from "../components/models/ChangePasswordModal";

function CustomerProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const currentUser = useAuthStore((state) => state.user);

  const {register,handleSubmit,reset,formState: { errors, isSubmitting }} = useForm<UpdateCustomerProfile>({resolver: zodResolver(updateCustomerProfileSchema)})

  useEffect(() => {
    let cancelled = false;
    const fetchCustomerProfile = async () => {
      setLoading(true);
      try {
        const response = await getCustomerProfile();
        if (!cancelled) {
          setProfile(response);
          reset({
            name: response.name,
            phone: response.phone ?? "",
          });
        }
      } catch (error) {
        if (cancelled) return;

        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? "Unable to load profile");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchCustomerProfile();
    return () => {
      cancelled = true;
    };
  }, [reset]);

  const handleEnterEditMode = () => {
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone ?? "",
      });
    }
    setUpdateMode(true);
  };

  const handleCancelEdit = () => {
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone ?? "",
      });
    }
    setUpdateMode(false);
  };

  const onSubmit = async (data: UpdateCustomerProfile) => {
    try {
      await updateCustomerProfile(data);

      const updatedName = data.name?.trim() || (profile ? profile.name : "");
      const updatedPhone = data.phone?.trim() || null;

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: updatedName,
              phone: updatedPhone,
            }
          : null
      )

      if (currentUser && data.name?.trim()) {
        setUser({
          ...currentUser,
          name: updatedName,
        })
      }

      toast.success("Profile updated successfully");
      setUpdateMode(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Unable to update profile. Please try again"
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return <CustomerProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="w-full py-16 text-center text-slate-500">
        Profile data is unavailable. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-[#d6e5f1] bg-[#eef4fa] flex items-center justify-center shrink-0 shadow-xs">
            {profile.profilePictureKey ? (
              <img
                src={profile.profilePictureKey}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#eef4fa] flex items-center justify-center">
                <svg
                  className="w-8 h-8 sm:w-9 sm:h-9 text-[#204066]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                {profile.name}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shadow-2xs">
                <BadgeCheck size={14} strokeWidth={2.2} className="shrink-0 text-[#22a06b]" />
                <span>Approved</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              JPG, PNG or WebP. Maximum size 5 MB.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <Camera size={16} className="text-slate-600" />
            <span>Change Photo</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 border border-rose-200/80 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-2xs cursor-pointer"
          >
            <Trash2 size={16} className="text-rose-600" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Account Information
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your basic personal profile details.
            </p>
          </div>
          {!updateMode ? (
            <button
              onClick={handleEnterEditMode}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <SquarePen size={15} className="text-slate-600" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
              >
                <X size={15} className="text-slate-500" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                form="customer-profile-form"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2e4d75] hover:bg-[#233b5c] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
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

        <form id="customer-profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
            <div>
              <label
                htmlFor="profile-name"
                className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
              >
                Name
              </label>
              {updateMode ? (
                <div>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                      <User size={18} />
                    </span>
                    <input
                      id="profile-name"
                      type="text"
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                      autoFocus
                      {...register("name")}
                      className={`w-full h-11 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                          : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                  <User size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate">{profile.name}</span>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
              >
                Phone Number
              </label>
              {updateMode ? (
                <div>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                      <Phone size={18} />
                    </span>
                    <input
                      id="profile-phone"
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      disabled={isSubmitting}
                      {...register("phone")}
                      className={`w-full h-11 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                          : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate text-slate-700">
                    {profile.phone || "Not provided"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Account Created
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                <span className="truncate">{formatDate(profile.createdAt)}</span>
                <Calendar size={16} className="text-slate-400 shrink-0 ml-2" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                Account registration date is verified and permanently linked to your profile.
              </p>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                <span className="truncate">{profile.email}</span>
                <Lock size={15} className="text-slate-400 shrink-0 ml-2" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                Email updates require verification to maintain quotation and contract security.
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="pb-5 border-b border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Account Security
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your email address, password, and security credentials to keep your account safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              Email Address
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {profile.email}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-44 px-4 py-2 sm:py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Mail size={16} className="text-slate-600" />
            <span>Change Email</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              Password
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Set a unique password to protect your account credentials.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-44 px-4 py-2 sm:py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Lock size={16} className="text-slate-600" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}

export default CustomerProfilePage;
