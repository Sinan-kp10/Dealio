import { X } from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure?",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="text-center pt-1 px-4">
          <h3 className="text-lg font-bold text-[#0E2238] m-0">
            {title}
          </h3>
          {message && (
            <p className="text-sm text-slate-500 mt-2 mb-0 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#355982] hover:bg-[#294668] active:bg-[#203650] rounded-xl transition-colors shadow-xs cursor-pointer text-center"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
