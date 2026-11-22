import { Eye, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { formatDate } from "../../../../utils/dateFormatter";
import type { CustomerRecentQuotationItem } from "../../types/customer/customer-home.types";

interface RecentQuotationCardProps {
  quotation: CustomerRecentQuotationItem;
}

export function RecentQuotationCard({ quotation }: RecentQuotationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <h3
            className="text-base sm:text-[17px] font-bold text-[#0e2238] tracking-tight truncate leading-snug flex-1 min-w-0"
            title={quotation.productName}
          >
            {quotation.productName}
          </h3>
          <div className="shrink-0">
            <StatusBadge status={quotation.status} />
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {quotation.description}
        </p>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block">Category</span>
            <span className="font-semibold text-slate-800 truncate block">
              {quotation.category.name}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block">Sub Category</span>
            <span className="font-semibold text-slate-800 truncate block">
              {quotation.subCategory.name}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block">Quantity</span>
            <span className="font-semibold text-slate-800">
              {String(quotation.quantity).padStart(2, "0")} Units
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block">Requested</span>
            <span className="font-semibold text-slate-800">
              {formatDate(quotation.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate(`/customer/quotations/${quotation.id}`)}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-[13px] font-semibold text-[#1e3a5f] bg-[#edf4fb] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-xl transition-colors cursor-pointer active:scale-[0.99]"
        >
          <Eye size={14} className="text-[#1e3a5f]" />
          <span>View Details</span>
          <ChevronRight size={14} className="text-[#1e3a5f] ml-auto" />
        </button>
      </div>
    </div>
  );
}

export default RecentQuotationCard;
