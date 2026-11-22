import { useState } from "react";
import { FileText, Package, IndianRupee, MapPin } from "lucide-react";
import { QuotationDescriptionModal } from "../QuotationDescriptionModal";
import type { EnterpriseQuotationDetails } from "../../types/enterprise-quotation-details.types";

export interface EnterpriseBuyerRequestSnapshotCardProps {
  quotation: EnterpriseQuotationDetails;
  className?: string;
}

export function EnterpriseBuyerRequestSnapshotCard({ quotation, className = "" }: EnterpriseBuyerRequestSnapshotCardProps) {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  return (
    <>
      <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 ${className}`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#edf4fb] text-[#1e3a5f] flex items-center justify-center font-bold text-xs shrink-0">
              <FileText size={15} className="text-[#355982]" />
            </div>
            <h2 className="text-sm font-bold text-[#0e2238] m-0 truncate">
              Buyer Request Snapshot
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full shrink-0 shadow-2xs">
            Inquiry Overview
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Package size={14} />
              </div>
              <div className="min-w-0">
                <span className="text-slate-500 text-[11px] font-medium block">
                  Quantity
                </span>
                <span className="font-extrabold text-[#0e2238] text-sm mt-0.5 block truncate">
                  {quotation.quantity} Units
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <IndianRupee size={14} />
              </div>
              <div className="min-w-0">
                <span className="text-slate-500 text-[11px] font-medium block">
                  Buyer Budget
                </span>
                <span className="font-extrabold text-[#0e2238] text-sm mt-0.5 block truncate">
                  {quotation.budget && quotation.budget > 0 ? `₹${quotation.budget.toLocaleString("en-IN")}` : "Flexible"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2.5 px-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2 text-xs min-w-0">
            <MapPin size={13.5} className="text-slate-500 shrink-0" />
            <span className="text-slate-500 text-[11px] font-medium shrink-0">Delivery Location:</span>
            <span className="font-semibold text-slate-800 truncate">
              {quotation.location || "Not specified by buyer"}
            </span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsDescriptionModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsDescriptionModalOpen(true);
              }
            }}
            className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer group space-y-1.5"
            title="Click to view full specifications"
          >
            <div className="flex items-center justify-between pointer-events-none gap-2">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 min-w-0 truncate">
                <FileText size={12} className="text-[#355982] shrink-0" />
                <span className="truncate">Customer Specifications</span>
              </span>
              <span className="text-[11px] font-bold text-[#355982] group-hover:text-[#204066] flex items-center gap-1 shrink-0">
                <span>View full specifications</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 group-hover:text-slate-800 line-clamp-2 leading-relaxed m-0 transition-colors pointer-events-none">
              {quotation.description || "No specific instructions provided."}
            </p>
          </div>
        </div>
      </div>

      <QuotationDescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        productName={quotation.productName}
        description={quotation.description}
      />
    </>
  );
}

export default EnterpriseBuyerRequestSnapshotCard;
