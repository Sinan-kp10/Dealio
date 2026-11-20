import { useEffect } from "react";
import { X, FileText } from "lucide-react";

export interface QuotationDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  description: string;
}

export function QuotationDescriptionModal({isOpen,onClose,productName,description}: QuotationDescriptionModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0E2238]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="specifications-modal-title"
        className="w-full max-w-xl md:max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] sm:max-h-[82vh] overflow-hidden relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white shrink-0">
          <div className="space-y-1 min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#edf4fb] flex items-center justify-center text-[#204066] shrink-0">
                <FileText size={15} />
              </div>
              <h3
                id="specifications-modal-title"
                className="text-base sm:text-lg font-bold text-[#0E2238] m-0 truncate"
              >
                Requirement Specifications
              </h3>
            </div>
            <p className="text-xs text-slate-500 m-0 truncate pl-9 font-medium">
              {productName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar overscroll-contain">
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal m-0 whitespace-pre-wrap select-text">
              {description}
            </p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50/50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1e3a5f] hover:bg-[#152a45] rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuotationDescriptionModal;
