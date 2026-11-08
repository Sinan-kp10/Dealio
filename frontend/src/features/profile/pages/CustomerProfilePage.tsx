import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CustomerProfile, UpdateCustomerProfile } from "../types/customer.profile.types";
import { getCustomerProfile, updateCustomerProfile } from "../services/customer-profile.service";
import { handleApiError, handleFormError } from "../../../utils/errorHandler";
import { formatDate } from "../../../utils/dateFormatter";
import { toast } from "react-toastify";
import {Camera, Trash2, SquarePen, User,Phone,Mail,Calendar,BadgeCheck,X,Check,Loader2,Plus} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomerProfileSchema } from "../schemas/update-customer-profile.schema";
import useAuthStore from "../../../stores/auth.store";
import CustomerProfileSkeleton from "../components/CustomerProfileSkeleton";
import ProfilePictureModal from "../components/ProfilePictureModal";
import { removeProfilePicture } from "../services/profile.service";

function CustomerProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isRemovingPhoto, setIsRemovingPhoto] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const setUser = useAuthStore((state) => state.setUser)
  const currentUser = useAuthStore((state) => state.user)
  const {register,handleSubmit,reset,setError,formState: { errors, isSubmitting }} = useForm<UpdateCustomerProfile>({resolver: zodResolver(updateCustomerProfileSchema)})

  useEffect(() => {
    let cancelled = false;
    const fetchCustomerProfile = async () => {
      setLoading(true);
      try {
        const response = await getCustomerProfile();
        if (!cancelled) {
          setProfile(response);
          setImageLoadError(false);
          reset({
            name: response.name,
          });
        }
      } catch (error) {
        if (cancelled) return;

        handleApiError(error, "Unable to load profile");
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
      });
    }
    setUpdateMode(true);
  };

  const handleCancelEdit = () => {
    if (profile) {
      reset({
        name: profile.name,
      });
    }
    setUpdateMode(false);
  };

  const onSubmit = async (data: UpdateCustomerProfile) => {
    try {
      await updateCustomerProfile({ name: data.name });

      const updatedName = data.name?.trim() || (profile ? profile.name : "");

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: updatedName,
            }
          : null
      );

      if (currentUser && data.name?.trim()) {
        setUser({
          ...currentUser,
          name: updatedName,
        });
      }

      toast.success("Profile updated successfully");
      setUpdateMode(false);
    } catch (error) {
      handleFormError(error, setError, "Unable to update profile. Please try again");
    }
  };

  const handleRemovePhoto = async () => {
    if (!profile?.profilePictureKey || isRemovingPhoto) return;
    try {
      setIsRemovingPhoto(true);
      const response = await removeProfilePicture();
      toast.success(response.message || "Profile picture removed successfully");
      setProfile((prev) => (prev ? { ...prev, profilePictureKey: null } : null));
      setImageLoadError(false);
    } catch (error) {
      handleApiError(error, "Failed to remove profile picture");
    } finally {
      setIsRemovingPhoto(false);
    }
  };

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
            {profile.profilePictureKey && !imageLoadError ? (
              <img
                src={profile.profilePictureKey}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={() => setImageLoadError(true)}
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
            onClick={() => setIsPhotoModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <Camera size={16} className="text-slate-600" />
            <span>{profile.profilePictureKey ? "Update Photo" : "Upload Photo"}</span>
          </button>
          <button
            type="button"
            disabled={!profile.profilePictureKey || isRemovingPhoto}
            onClick={handleRemovePhoto}
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 border border-rose-200/80 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-2xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRemovingPhoto ? (
              <Loader2 size={16} className="animate-spin text-rose-600" />
            ) : (
              <Trash2 size={16} className="text-rose-600" />
            )}
            <span>{isRemovingPhoto ? "Removing..." : "Remove"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="pb-5 border-b border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Account Information
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your basic personal profile details.
          </p>
        </div>

        <form id="customer-profile-form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
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
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 h-8 px-3 bg-[#2e4d75] hover:bg-[#233b5c] text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check size={13} />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleCancelEdit}
                      className="inline-flex items-center justify-center h-8 w-8 border border-slate-200/90 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
                      title="Cancel"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <User size={16} className="text-slate-400 shrink-0" />
                    <span className="truncate">{profile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleEnterEditMode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white border border-slate-200/90 rounded-lg transition-colors shadow-2xs cursor-pointer shrink-0"
                  >
                    <SquarePen size={14} className="text-slate-600" />
                    <span>Edit</span>
                  </button>
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
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate text-slate-700">
                    {profile.phone || "Not provided"}
                  </span>
                </div>
                {profile.phone ? (
                  <div className="flex items-center gap-2 shrink-0">
                    {profile.phoneVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                        <BadgeCheck size={13} />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                        Unverified
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/customer/settings")}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white border border-slate-200/90 rounded-lg transition-colors shadow-2xs cursor-pointer shrink-0"
                  >
                    <Plus size={14} className="text-slate-600" />
                    <span>Add Phone Number</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate text-slate-700">{profile.email}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                  <BadgeCheck size={13} />
                  Verified
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                Email updates require verification to maintain quotation and contract security.
              </p>
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
          </div>
        </form>
      </div>

      <ProfilePictureModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoUrl={profile.profilePictureKey}
        onSuccess={(newPhotoUrl) => {
          setProfile((prev) => (prev ? { ...prev, profilePictureKey: newPhotoUrl } : null));
          setImageLoadError(false);
        }}
      />
    </div>
  );
}

export default CustomerProfilePage;
