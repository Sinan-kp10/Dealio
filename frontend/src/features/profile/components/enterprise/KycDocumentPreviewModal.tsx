import { useState } from "react";
import { Loader2, X } from "lucide-react";

export interface KycDocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  documentType?: string;
}

export default function KycDocumentPreviewModal({
  isOpen,
  onClose,
  imageUrl,
  documentType,
}: KycDocumentPreviewModalProps) {
  const [loading, setLoading] = useState(true);

  if (!isOpen) return null;

  const title = documentType || "Verification Document";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-6 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center w-full h-[50vh] sm:h-[60vh] max-h-[500px] relative">
          {imageUrl ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 size={28} className="animate-spin text-[#204066]" />
                </div>
              )}
              <img
                src={imageUrl}
                alt={title}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                className={`max-h-full max-w-full w-auto h-auto rounded-xl object-contain border border-slate-200/80 shadow-2xs transition-opacity duration-200 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              />
            </>
          ) : (
            <p className="text-sm text-slate-500 py-10">No document available</p>
          )}
        </div>
      </div>
    </div>
  );
}
