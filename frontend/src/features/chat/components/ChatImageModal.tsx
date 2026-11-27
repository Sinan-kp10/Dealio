import { useEffect, useState } from "react";
import { Download, X, ZoomIn, ZoomOut } from "lucide-react";

interface ChatImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.5;

export function ChatImageModal({ imageUrl, onClose }: ChatImageModalProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(MAX_SCALE, prev + SCALE_STEP));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(MIN_SCALE, prev - SCALE_STEP));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `dealio-chat-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div
        className="flex items-center justify-end gap-2 p-3 sm:p-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={scale <= MIN_SCALE}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={scale >= MAX_SCALE}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Download image"
        >
          <Download size={18} />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close preview"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center p-4 overflow-auto">
        <img
          src={imageUrl}
          alt="Chat attachment preview"
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => (prev === 1 ? 2 : 1));
          }}
          style={{ transform: `scale(${scale})` }}
          className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-200 cursor-zoom-in select-none"
        />
      </div>
    </div>
  );
}

export default ChatImageModal;
