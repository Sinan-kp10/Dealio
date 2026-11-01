import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import VerifyEmailStep from "../security/VerifyEmailStep";
import RequestEmailStep from "../security/RequestEmailStep";

export interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEmail: string) => void;
}

export function ChangeEmailModal({ isOpen, onClose, onSuccess }: ChangeEmailModalProps) {
  const [step, setStep] = useState<"REQUEST" | "VERIFY">("REQUEST");
  const [targetEmail, setTargetEmail] = useState("");

  const handleClose = useCallback(() => {
    setStep("REQUEST");
    setTargetEmail("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2238]/60 backdrop-blur-xs"
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
              {step === "REQUEST" ? "Change Email Address" : "Verify New Email"}
            </h2>
            {step === "REQUEST" ? (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your new email address. We'll send a 6-digit verification code to confirm it.
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We sent a 6-digit code to <span className="font-semibold text-slate-800">{targetEmail}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {step === "REQUEST" ? (
          <RequestEmailStep
            onSuccess={(email : string) => {
              setTargetEmail(email);
              setStep("VERIFY");
            }}
            onCancel={handleClose}
          />
        ) : (
          <VerifyEmailStep
            newEmail={targetEmail}
            onSuccess={(email : string) => {
              onSuccess(email);
              handleClose();
            }}
            onCancel={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default ChangeEmailModal;
