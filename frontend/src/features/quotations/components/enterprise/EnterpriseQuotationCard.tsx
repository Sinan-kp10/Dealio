import { useNavigate } from "react-router-dom";
import { Tag, Package, Clock, Eye, MessageCircleMore } from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import type { EnterpriseQuotationListItem } from "../../types/enterprise-quotation.types";
import { formatTimeAgo } from "../../../../utils/dateFormatter";

interface EnterpriseQuotationCardProps {
  item: EnterpriseQuotationListItem;
  onChat: (item: EnterpriseQuotationListItem) => void;
}

export function EnterpriseQuotationCard({ item, onChat }: EnterpriseQuotationCardProps) {
  const navigate = useNavigate();
  const isCancelled = item.status === "CANCELLED";
  const isClosed = item.status === "CLOSED";
  const isInactive = isCancelled || isClosed;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${isInactive ? "opacity-90" : "hover:border-slate-300 hover:shadow-md"} transition-all flex flex-col justify-between space-y-4`}>
      <div className="space-y-3.5">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2.5">
            <h2
              onClick={() => !isInactive && navigate(`/enterprise/quotations/${item.id}`)}
              className={`text-base font-bold text-[#0e2238] tracking-tight line-clamp-2 leading-snug m-0 flex-1 ${isInactive ? "" : "hover:text-[#355982] cursor-pointer"} transition-colors`}
              title={item.productName}
            >
              {item.productName}
            </h2>
            <StatusBadge status={item.status} className="shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Clock size={12.5} className="text-slate-500 shrink-0" />
            <span>Received {formatTimeAgo(item.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80 text-xs font-semibold">
            <Tag size={12} className="text-slate-500 shrink-0" />
            <span className="truncate max-w-[130px]">{item.subCategory.name}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
            <Package size={12} className="text-blue-600 shrink-0" />
            <span>{item.quantity} Units</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 m-0">
          {item.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100">
        {isCancelled ? (
          <div className="w-full py-2.5 px-3 rounded-xl bg-rose-50/80 border border-rose-200/70 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2">
            <span>Cancelled by Customer</span>
          </div>
        ) : isClosed ? (
          <div className="w-full py-2.5 px-3 rounded-xl bg-slate-100/90 border border-slate-200/90 text-slate-600 text-xs font-semibold flex items-center justify-center gap-2">
            <span>Quotation Closed by Customer</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChat(item)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-300 hover:border-slate-400 active:scale-[0.99] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <MessageCircleMore size={14} className="text-slate-600 shrink-0" />
              <span>Chat</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/enterprise/quotations/${item.id}`)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.99] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Eye size={14} />
              <span>View Details</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnterpriseQuotationCard;
