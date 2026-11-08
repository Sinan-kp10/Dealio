import React, { useState, useRef, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { X, Upload, AlertCircle, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "react-toastify";
import { updateProfilePicture } from "../services/profile.service";
import { handleApiError } from "../../../utils/errorHandler";
import { getCroppedImg } from "../utils/cropImage";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPhotoUrl: string) => void;
  currentPhotoUrl?: string | null;
}

export default function ProfilePictureModal({isOpen,onClose,onSuccess,currentPhotoUrl}: ProfilePictureModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setSelectedFile(null);
    setImageSrc(null);
    setErrorMessage(null);
    setIsUploading(false);
    setIsDragOver(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [imageSrc]);

  const handleClose = useCallback(() => {
    if (isUploading) return;
    resetState();
    onClose();
  }, [isUploading, resetState, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isUploading) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isUploading, handleClose]);

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
      setErrorMessage("File size exceeds 5 MB. Please select a smaller image.");
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
    if (!isUploading) {
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

    if (isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedPhoto = async () => {
    if (!imageSrc || !croppedAreaPixels || !selectedFile) return;

    try {
      setIsUploading(true);

      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        selectedFile.name || "profile-picture.jpg",
        selectedFile.type || "image/jpeg"
      );

      const response = await updateProfilePicture(croppedFile);
      toast.success(response.message || "Profile picture updated successfully");
      onSuccess(response.data.profilePictureUrl);
      handleClose();
    } catch (error) {
      handleApiError(error, "Failed to upload profile picture");
    } finally {
      setIsUploading(false);
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
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {imageSrc
                ? "Crop & Adjust Photo"
                : currentPhotoUrl
                ? "Update Profile Photo"
                : "Upload Profile Photo"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {imageSrc
                ? "Drag to reposition and use the slider to zoom."
                : "JPG, PNG or WebP. Maximum size 5 MB."}
            </p>
          </div>

          <button
            type="button"
            disabled={isUploading}
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isUploading}
        />

        <div className="py-5 space-y-4">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {imageSrc ? (
            <div className="space-y-4">
              <div className="relative w-full h-64 sm:h-72 bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="flex items-center gap-3 px-2">
                <ZoomOut size={16} className="text-slate-400 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  disabled={isUploading}
                  aria-label="Zoom photo"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#244673]"
                />
                <ZoomIn size={16} className="text-slate-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="truncate max-w-[200px]">
                  {selectedFile?.name}
                </span>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#244673] hover:underline cursor-pointer disabled:opacity-50"
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
              className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragOver
                  ? "border-[#244673] bg-[#244673]/5 scale-[0.99]"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <div className="w-13 h-13 rounded-full bg-[#eef4fa] text-[#244673] flex items-center justify-center mb-3">
                <Upload size={24} />
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

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={isUploading}
            onClick={handleClose}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!imageSrc || isUploading || Boolean(errorMessage)}
            onClick={handleSaveCroppedPhoto}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#244673] hover:bg-[#1a3456] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading && <ButtonSpinner />}
            <span>{isUploading ? "Saving..." : "Save Photo"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
