import React, { useState, useRef, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point, Size } from "react-easy-crop";
import { X, Upload, AlertCircle, RefreshCw, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import { getCroppedImg } from "../../utils/cropImage";
import { handleApiError } from "../../../../utils/errorHandler";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ID_CARD_ASPECT = 1.6

export interface KycDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

export default function KycDocumentModal({ isOpen, onClose, onConfirm }: KycDocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropSize, setCropSize] = useState<Size | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const computeLargeCropSize = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const availWidth = rect.width * 0.92;
    const availHeight = rect.height * 0.90;

    let targetWidth = availWidth;
    let targetHeight = targetWidth / ID_CARD_ASPECT;

    if (targetHeight > availHeight) {
      targetHeight = availHeight;
      targetWidth = targetHeight * ID_CARD_ASPECT;
    }

    setCropSize({
      width: Math.round(targetWidth),
      height: Math.round(targetHeight),
    });
  }, []);

  useEffect(() => {
    if (!imageSrc || !containerRef.current) return;

    computeLargeCropSize();

    const resizeObserver = new ResizeObserver(() => {
      computeLargeCropSize();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [imageSrc, computeLargeCropSize]);

  const resetState = useCallback(() => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setSelectedFile(null);
    setImageSrc(null);
    setErrorMessage(null);
    setIsProcessing(false);
    setIsDragOver(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropSize(undefined);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [imageSrc]);

  const handleClose = useCallback(() => {
    if (isProcessing) return;
    resetState();
    onClose();
  }, [isProcessing, resetState, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isProcessing) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isProcessing, handleClose]);

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const validateAndSelectFile = (file: File) => {
    setErrorMessage(null);

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setErrorMessage("Invalid file type. Only JPG, PNG, and WebP images are allowed.");
      setSelectedFile(null);
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
        setImageSrc(null);
      }
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size exceeds 5 MB. Please select a smaller size image.");
      setSelectedFile(null);
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
        setImageSrc(null);
      }
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isProcessing) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (isProcessing) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSubmitCropped = async () => {
    if (!imageSrc || !croppedAreaPixels || !selectedFile) return;

    try {
      setIsProcessing(true);
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        selectedFile.name || "kyc-document.jpg",
        selectedFile.type || "image/jpeg"
      );

      onConfirm(croppedFile);
      handleClose();
    } catch (error) {
      handleApiError(error, "Failed to crop document image");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {imageSrc ? "Crop & Adjust Document" : "Upload Verification Document"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {imageSrc
                ? "Position your document inside the crop area. Use slider to zoom."
                : "JPG, PNG or WebP. Maximum size 5 MB."}
            </p>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isProcessing}
        />

        <div className="py-3 space-y-3">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {imageSrc ? (
            <div className="space-y-3">
              <div
                ref={containerRef}
                className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-xl overflow-hidden shadow-inner"
              >
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={ID_CARD_ASPECT}
                  cropSize={cropSize}
                  cropShape="rect"
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="flex items-center gap-3 px-1 pt-0.5">
                <ZoomOut size={15} className="text-slate-400 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.02}
                  value={zoom}
                  disabled={isProcessing}
                  aria-label="Zoom document"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#204066]"
                />
                <ZoomIn size={15} className="text-slate-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                <span className="truncate max-w-[240px] font-medium">{selectedFile?.name}</span>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#204066] hover:underline cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={13} />
                  <span>Choose another</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-7 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragOver
                  ? "border-[#204066] bg-[#204066]/5 scale-[0.99]"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-[#eef4fa] text-[#204066] flex items-center justify-center mb-2.5">
                <Upload size={20} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                JPG, PNG or WebP (max 5 MB)
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleClose}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!imageSrc || isProcessing || Boolean(errorMessage)}
            onClick={handleSubmitCropped}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 bg-[#204066] hover:bg-[#173252] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing && <Loader2 size={14} className="animate-spin" />}
            <span>{isProcessing ? "Processing..." : "Submit"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
