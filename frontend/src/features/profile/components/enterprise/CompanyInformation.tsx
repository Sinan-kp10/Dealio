import { useNavigate } from "react-router-dom";
import { SquarePen, Mail, BadgeCheck, Phone, ChevronDown } from "lucide-react";
import type { EnterpriseProfile } from "../../types/enterprise-profile.types";

interface CompanyInformationProps {
  profile: EnterpriseProfile | null;
  onEdit?: () => void;
}

export default function CompanyInformation({ profile, onEdit }: CompanyInformationProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-7">
      {/* Section 1: Company Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 pb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Company Information
          </h3>
          <button
            type="button"
            onClick={onEdit}
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
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <span className="truncate text-slate-700">
                  {profile?.email || "company@example.com"}
                </span>
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
            <label className="block text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              PHONE NUMBER
            </label>
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fb] border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone size={16} className="text-slate-400 shrink-0" />
                <span className="truncate text-slate-700">
                  {profile?.phone || "Not provided"}
                </span>
              </div>
              {profile?.phone ? (
                <div className="flex items-center gap-2 shrink-0">
                  {profile?.phoneVerified ? (
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white border border-slate-200/90 rounded-lg transition-colors shadow-2xs cursor-pointer shrink-0"
                      >
                        <span>Verify</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/enterprise/settings")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white border border-slate-200/90 rounded-lg transition-colors shadow-2xs cursor-pointer shrink-0"
                >
                  <span>Add Phone</span>
                </button>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
              Phone verification ensures urgent quotation notifications reach your enterprise promptly.
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
  );
}

