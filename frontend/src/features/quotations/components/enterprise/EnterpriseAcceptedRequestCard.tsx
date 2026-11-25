import { useNavigate } from "react-router-dom";
import { Clock, Package, Truck, MessageCircleMore, Eye } from "lucide-react";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { formatTimeAgo } from "../../../../utils/dateFormatter";
import type { EnterpriseAcceptedRequestListItem } from "../../types/enterprise-accepted-request.types";

interface EnterpriseAcceptedRequestCardProps {
  item: EnterpriseAcceptedRequestListItem;
  onChat?: (item: EnterpriseAcceptedRequestListItem) => void;
}

export function EnterpriseAcceptedRequestCard({ item, onChat }: EnterpriseAcceptedRequestCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h3
              onClick={() => navigate(`/enterprise/accepted-requests/${item.id}`)}
              className="text-sm font-extrabold text-[#0e2238] hover:text-[#355982] transition-colors truncate cursor-pointer m-0"
              title={item.productName}
            >
              {item.productName}
            </h3>

            <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
              <Clock size={11.5} className="text-slate-400 shrink-0" />
              <span>Accepted {formatTimeAgo(item.acceptedAt)}</span>
            </div>
          </div>

          <StatusBadge status={item.status} className="shrink-0" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">Agreed Deal Value</span>
            <span className="text-[11px] font-medium text-slate-400">
              ₹{item.unitPrice.toLocaleString("en-IN")} / unit
            </span>
          </div>

          <div className="flex items-baseline gap-1 text-[#0e2238]">
            <span className="text-xl sm:text-2xl font-black text-[#0e2238] tracking-tight">
              ₹{item.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
            <Package size={12} className="text-blue-600 shrink-0" />
            <span>{item.quantity} Units</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
            <Truck size={12} className="text-emerald-700 shrink-0" />
            <span className="truncate max-w-[130px]">{item.deliveryTimeline}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 m-0">
          {item.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChat?.(item);
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#1d4d7c] bg-[#edf5fd] hover:bg-[#e2f0fc] border border-[#b8d6f2] hover:border-[#9ec4ec] active:scale-[0.99] rounded-xl transition-all cursor-pointer shadow-2xs"
        >
          <MessageCircleMore size={14} className="text-[#2b6cb0] shrink-0" />
          <span>Chat</span>
        </button>

        <button
          type="button"
          onClick={() => navigate(`/enterprise/accepted-requests/${item.id}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.99] rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <Eye size={14} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}

export default EnterpriseAcceptedRequestCard;
