import { useEffect, useState } from "react";
import type { EnterpriseProfile } from "../types/enterprise-profile.types";
import { handleApiError } from "../../../utils/errorHandler";
import { getEnterpriseProfile } from "../services/enterprise-profile.service";
import EnterpriseProfileSkeleton from "../components/loading/EnterpriseProfileSkeleton";
import { toast } from "react-toastify";
import { Camera, Trash2, BadgeCheck, Briefcase, IdCard, Landmark, Loader2, Clock } from "lucide-react";
import ProfilePictureModal from "../components/profile-picture/ProfilePictureModal";
import { removeProfilePicture } from "../services/profile.service";
import useAuthStore from "../../../stores/auth.store";
import EnterpriseInformation from "../components/enterprise/EnterpriseInformation";
import EnterpriseKyc from "../components/enterprise/EnterpriseKyc";
import EnterpriseBankRecord from "../components/enterprise/EnterpriseBankRecord";
import TabStatusBadge, { type VerificationStatus } from "../components/enterprise/TabStatusBadge";

type EnterpriseTab = "enterprise" | "kyc" | "bank";

function EnterpriseProfilePage() {
  const [profile, setProfile] = useState<EnterpriseProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<EnterpriseTab>("enterprise");
  const [kycStatus, setKycStatus] = useState<VerificationStatus>("LOADING");
  const [bankRecordStatus, setBankRecordStatus] = useState<VerificationStatus>("LOADING");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isRemovingPhoto, setIsRemovingPhoto] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchEnterpriseProfile = async () => {
      setLoading(true);
      try {
        const response = await getEnterpriseProfile();

        if (!cancelled) {
          setProfile(response);
          setImageLoadError(false);
          const { user: authUser, setUser: setAuthUser } = useAuthStore.getState();
          if (authUser && authUser.profilePictureUrl !== response.profilePictureKey) {
            setAuthUser({
              ...authUser,
              profilePictureUrl: response.profilePictureKey,
            });
          }
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

    void fetchEnterpriseProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemovePhoto = async () => {
    if (!profile?.profilePictureKey || isRemovingPhoto) return;
    try {
      setIsRemovingPhoto(true);
      const response = await removeProfilePicture();
      toast.success(response.message || "Profile picture removed successfully");
      setProfile((prev) => (prev ? { ...prev, profilePictureKey: null } : null));
      setImageLoadError(false);
      const { user: authUser, setUser: setAuthUser } = useAuthStore.getState();
      if (authUser) {
        setAuthUser({
          ...authUser,
          profilePictureUrl: null,
        });
      }
    } catch (error) {
      handleApiError(error, "Failed to remove profile picture");
    } finally {
      setIsRemovingPhoto(false);
    }
  };

  if (loading) {
    return <EnterpriseProfileSkeleton />;
  }

  return (
    <div className="w-full space-y-6 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#d6e5f1] bg-[#eef4fa] flex items-center justify-center shrink-0 shadow-xs">
            {profile?.profilePictureKey && !imageLoadError ? (
              <img
                src={profile.profilePictureKey}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={() => setImageLoadError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#eef4fa] flex items-center justify-center">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#204066]"
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
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                {profile?.enterpriseName}
              </h2>
              {profile?.status === "APPROVED" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shadow-2xs">
                  <BadgeCheck
                    size={14}
                    strokeWidth={2.2}
                    className="shrink-0 text-[#22a06b]"
                  />
                  <span>Approved</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fffbeb] text-[#d97706] border border-[#d97706]/20 shadow-2xs">
                  <Clock
                    size={14}
                    strokeWidth={2.2}
                    className="shrink-0 text-[#d97706]"
                  />
                  <span>Pending</span>
                </span>
              )}
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
            <span>{profile?.profilePictureKey ? "Update Photo" : "Upload Photo"}</span>
          </button>
          <button
            type="button"
            disabled={!profile?.profilePictureKey || isRemovingPhoto}
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

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-7">
        <div className="bg-[#f0f4f9] p-1.5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 border border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveTab("enterprise")}
            className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "enterprise"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900 border border-transparent"
            }`}
          >
            <Briefcase size={16} className={activeTab === "enterprise" ? "text-slate-700 shrink-0" : "text-slate-500 shrink-0"} />
            <span className="truncate">Enterprise Information</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kyc")}
            className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "kyc"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-semibold"
                : "text-slate-600 hover:text-slate-900 border border-transparent"
            }`}
          >
            <IdCard size={16} className={activeTab === "kyc" ? "text-slate-700 shrink-0" : "text-slate-500 shrink-0"} />
            <span className="truncate">KYC Verification</span>
            <TabStatusBadge status={kycStatus} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "bank"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-semibold"
                : "text-slate-600 hover:text-slate-900 border border-transparent"
            }`}
          >
            <Landmark size={16} className={activeTab === "bank" ? "text-slate-700 shrink-0" : "text-slate-500 shrink-0"} />
            <span className="truncate">Bank & Settlement Details</span>
            <TabStatusBadge status={bankRecordStatus} />
          </button>
        </div>

        <div className={activeTab === "enterprise" ? "block" : "hidden"}>
          <EnterpriseInformation
            profile={profile}
            onProfileUpdated={(updated) => setProfile(updated)}
          />
        </div>

        <div className={activeTab === "kyc" ? "block" : "hidden"}>
          <EnterpriseKyc onStatusChange={setKycStatus} />
        </div>

        <div className={activeTab === "bank" ? "block" : "hidden"}>
          <EnterpriseBankRecord onStatusChange={setBankRecordStatus} />
        </div>
      </div>

      <ProfilePictureModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoUrl={profile?.profilePictureKey}
        onSuccess={(newPhotoUrl) => {
          setProfile((prev) => (prev ? { ...prev, profilePictureKey: newPhotoUrl } : null));
          setImageLoadError(false);
          const { user: authUser, setUser: setAuthUser } = useAuthStore.getState();
          if (authUser) {
            setAuthUser({
              ...authUser,
              profilePictureUrl: newPhotoUrl,
            });
          }
        }}
      />
    </div>
  );
}

export default EnterpriseProfilePage;
