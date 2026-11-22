import { useEffect } from "react";
import { X, FileText, Package, IndianRupee, MapPin } from "lucide-react";

export interface CustomerRequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: {
    productName: string;
    quantity: number;
    budget?: number | null;
    location?: string | null;
    description: string;
  };
}

export function CustomerRequirementsModal({isOpen,onClose,quotation}: CustomerRequirementsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0e2238]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-requirements-title"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#edf4fb] text-[#1e3a5f] flex items-center justify-center shrink-0">
              <FileText size={16} className="text-[#355982]" />
            </div>
            <div className="min-w-0">
              <h3
                id="customer-requirements-title"
                className="text-sm sm:text-base font-bold text-[#0e2238] m-0 truncate"
              >
                Customer Requirements
              </h3>
              <span className="text-xs text-slate-400 block truncate">
                Inquiry reference specifications
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              Product Requested
            </span>
            <h4 className="text-base font-bold text-[#0e2238] mt-0.5 m-0 break-words">
              {quotation.productName}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100/90">
              <span className="text-[11px] font-semibold text-[#1e3a5f] flex items-center gap-1.5">
                <Package size={13} className="text-blue-600 shrink-0" />
                <span>Quantity</span>
              </span>
              <span className="text-sm font-extrabold text-[#0e2238] block mt-1 truncate">
                {quotation.quantity} Units
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                <IndianRupee size={13} className="text-emerald-700 shrink-0" />
                <span>Budget</span>
              </span>
              {quotation.budget && quotation.budget > 0 ? (
                <span className="text-sm font-bold text-emerald-950 block mt-1 truncate">
                  ₹{quotation.budget.toLocaleString("en-IN")}
                </span>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-slate-500 block mt-1 truncate">
                  Not Specified
                </span>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-500 shrink-0" />
                <span>Location</span>
              </span>
              {quotation.location && quotation.location.trim().length > 0 ? (
                <span className="text-sm font-bold text-slate-800 block mt-1 truncate">
                  {quotation.location}
                </span>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-slate-500 block mt-1 truncate">
                  Not Specified
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#0e2238] block">
              Customer Specifications & Notes:
            </span>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar select-text">
              {quotation.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRequirementsModal;
