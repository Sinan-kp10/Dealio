import { useNavigate } from "react-router-dom";
import {MessageCircleMore, Package, Clock, Truck, Eye, } from "lucide-react";
import { toast } from "react-toastify";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";
import { formatTimeAgo } from "../../../../utils/dateFormatter";
import type { CustomerReceivedProposal } from "../../types/customer-proposal.types";

interface CustomerReceivedProposalCardProps {
  proposal: CustomerReceivedProposal;
}

export function CustomerReceivedProposalCard({proposal}: CustomerReceivedProposalCardProps) {
  const navigate = useNavigate();
  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Opening secure chat with ${proposal.enterprise.name}...`);
  };

  const handleViewDetails = () => {
    navigate(`/customer/quotations/${proposal.quotationId}/proposals/${proposal.id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  onClick={handleViewDetails}
                  className="text-sm font-extrabold text-[#0e2238] hover:text-[#355982] transition-colors truncate block cursor-pointer"
                  title={proposal.enterprise.name}
                >
                  {proposal.enterprise.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
                <Clock size={11.5} className="text-slate-400 shrink-0" />
                <span>Received {formatTimeAgo(proposal.createdAt)}</span>
              </div>
            </div>
          </div>

          <StatusBadge status={proposal.status} className="shrink-0" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">Total Offer</span>
            <span className="text-[11px] font-medium text-slate-400">
              ₹{proposal.unitPrice.toLocaleString("en-IN")} / unit
            </span>
          </div>

          <div className="flex items-baseline gap-1 text-emerald-900">
            <span className="text-xl sm:text-2xl font-black text-emerald-900 tracking-tight">
              ₹{proposal.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
            <Package size={12} className="text-blue-600 shrink-0" />
            <span>{proposal.quantity} Units</span>
          </div>

      
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
              <Truck size={12} className="text-emerald-700 shrink-0" />
              <span className="truncate max-w-[125px]">{proposal.deliveryTimeline}</span>
            </div>
          
        </div>

        <div className="space-y-1">
          <p className="text-xs font-bold text-[#0e2238] m-0 truncate">
            {proposal.itemName}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 m-0">
            {proposal.description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={handleChat}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-300 hover:border-slate-400 active:scale-[0.99] rounded-xl transition-all cursor-pointer shadow-2xs"
        >
          <MessageCircleMore size={14} className="text-slate-600 shrink-0" />
          <span>Chat</span>
        </button>

        <button
          type="button"
          onClick={handleViewDetails}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.99] rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Eye size={14} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}

export default CustomerReceivedProposalCard;
