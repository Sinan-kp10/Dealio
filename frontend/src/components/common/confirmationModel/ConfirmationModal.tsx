import { AlertCircle, X } from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "Are you sure?"}: ConfirmationModalProps){
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 relative"onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer">
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertCircle size={22} />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-lg font-bold text-[#0E2238] m-0">
              {title}
            </h3>
            {message && (
              <p className="text-sm text-slate-500 mt-1.5 mb-0 leading-relaxed">
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
            Cancel
          </button>

          <button type="button"onClick={onConfirm}className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors shadow-sm cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
