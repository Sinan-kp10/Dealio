import { useEffect, useState } from "react";
import type { EnterpriseProfile } from "../types/enterprise-profile.types";
import axios from "axios";
import { toast } from "react-toastify";
import { getEnterpriseProfile } from "../services/enterprise-profile.service";
import EnterpriseProfileSkeleton from "../components/EnterpriseProfileSkeleton";
import {Camera,Trash2,SquarePen,Lock,Calendar,BadgeCheck,Briefcase,ShieldCheck,Landmark,ChevronDown} from "lucide-react";

function EnterpriseProfilePage(){
    const [profile, setProfile] = useState<EnterpriseProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        let cancelled = false

        const fetchEnterpriseProfile = async()=> {
            setLoading(true)
            try {

                const response = await getEnterpriseProfile()

                if(!cancelled){
                    setProfile(response)
                }

                
            } catch (error) {
                if (cancelled) return;

                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message ?? "Unable to load profile");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }finally{
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void fetchEnterpriseProfile()

        return () => {cancelled = true}
    }, [])

    const formatDate = (date?: Date | string) =>
        date ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) : ""

  if (loading) {
    return <EnterpriseProfileSkeleton />;
  }

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 1. Header / Top Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#d6e5f1] bg-[#eef4fa] flex items-center justify-center shrink-0 shadow-xs">
            {profile?.profilePictureKey ? (
              <img
                src={profile.profilePictureKey}
                alt={profile.name}
                className="w-full h-full object-cover"
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
                {profile?.enterpriseName || "ABC Technologies"}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shadow-2xs">
                <BadgeCheck size={14} strokeWidth={2.2} className="shrink-0 text-[#22a06b]" />
                <span>
                  {profile?.status
                    ? profile.status.charAt(0).toUpperCase() + profile.status.slice(1).toLowerCase()
                    : "Approved"}
                </span>
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

      {/* 2. Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-7">
        {/* Navigation Tabs Pill Bar */}
        <div className="bg-[#f0f4f9] p-1.5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 border border-slate-200/60">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-semibold shadow-xs border border-slate-200/60 cursor-pointer"
          >
            <Briefcase size={16} className="text-slate-700 shrink-0" />
            <span className="truncate">Company Information</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-slate-600 hover:text-slate-900 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <ShieldCheck size={16} className="text-slate-500 shrink-0" />
            <span className="truncate">KYC & Verification</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shrink-0">
              <BadgeCheck size={12} strokeWidth={2.5} />
              <span>Verified</span>
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-slate-600 hover:text-slate-900 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <Landmark size={16} className="text-slate-500 shrink-0" />
            <span className="truncate">Bank & Settlement Details</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf8f1] text-[#22a06b] border border-[#22a06b]/20 shrink-0">
              <BadgeCheck size={12} strokeWidth={2.5} />
              <span>Verified</span>
            </span>
          </button>
        </div>

        {/* Section 1: Company Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 pb-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Company Information
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <SquarePen size={15} className="text-slate-600" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                ENTERPRISE NAME
              </label>
              <div className="flex items-center px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                {profile?.enterpriseName || "ABC Technologies"}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                CONTACT PERSON
              </label>
              <div className="flex items-center px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                {profile?.name || "John Thomas"}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                BUSINESS EMAIL
              </label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                <span className="truncate">{profile?.email || "company@example.com"}</span>
                <Lock size={15} className="text-slate-400 shrink-0 ml-2" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                Email updates require verification to maintain quotation and contract security.
              </p>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                ACCOUNT CREATED
              </label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                <span className="truncate">{formatDate(profile?.createdAt) || "02 Nov 2026"}</span>
                <Calendar size={16} className="text-slate-400 shrink-0 ml-2" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                Account registration date is verified and permanently linked to your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Business Category */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Business Category
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                CATEGORY
              </label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
                <span>{profile?.category?.name || "Electronics"}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                SUBCATEGORY{" "}
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
                  <>
                    <span className="px-3 py-1 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                      Mobile Phones & Accessories
                    </span>
                    <span className="px-3 py-1 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                      Laptops & Computers
                    </span>
                    <span className="px-3 py-1 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                      Commercial Hardware Deployments
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Company Description */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Company Description
          </h3>

          <div className="p-4 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm text-slate-700 leading-relaxed shadow-2xs min-h-[96px] whitespace-pre-line">
            {profile?.description ||
              "Authorized enterprise distributor and technology solution provider specializing in commercial electronics, smartphones, and corporate hardware deployments."}
          </div>
        </div>
      </div>

    </div>
  );
}

export default EnterpriseProfilePage;
