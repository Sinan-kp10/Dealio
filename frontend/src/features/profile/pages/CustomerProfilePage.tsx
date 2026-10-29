import { useEffect, useState } from "react";
import type { CustomerProfile } from "../types/customer.profile";
import { getCustomerProfile } from "../services/profile.service";
import axios from "axios";
import { toast } from "react-toastify";
import { Camera, Trash2, SquarePen, User, Phone, Calendar, Lock, Mail, BadgeCheck,
} from "lucide-react";

function CustomerProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let cancelled = false
        const fetchCustomerProfile = async() => {
            setLoading(true)
            try {

                const response = await getCustomerProfile()
                if (!cancelled) {
                    setProfile(response);
                }
                
            } catch (error) {
                if (cancelled) return
                
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message ?? "Unable to load profile");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }finally{
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        void fetchCustomerProfile()
        return () => {
            cancelled = true
        }
    },[])

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

  return (
    <div className="w-full space-y-6 pb-12">
      {loading ? (
        <p>loading...</p>
      ) : (
        profile && (
          <>
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
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer shrink-0"
                >
                  <SquarePen size={15} className="text-slate-600" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Name <span className="text-slate-400">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                    <User size={16} className="text-slate-400 shrink-0" />
                    <span className="truncate">{profile.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs">
                    <Phone size={16} className="text-slate-400 shrink-0" />
                    <span className="truncate text-slate-700">
                      {profile.phone || "Not provided"}
                    </span>
                  </div>
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
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-800 shadow-2xs min-w-0">
                      <span className="truncate">{profile.email}</span>
                      <Lock size={15} className="text-slate-400 shrink-0 ml-2" />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Mail size={15} className="text-slate-600" />
                      <span>Change Email</span>
                    </button>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Email updates require verification to maintain quotation and contract security.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Password &amp; Security
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage your account password and security credentials to keep your account safe.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <Lock size={15} className="text-slate-600" />
                <span>Change Password</span>
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CustomerProfilePage;
