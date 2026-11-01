import { useState, useEffect, useCallback } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ChangeCustomerPassword } from "../../types/customer.profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../schemas/change-password.schema";
import { changePassword } from "../../services/profile.service";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../../components/common/loading/ButtonSpinner";

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {register,handleSubmit,reset,formState: { errors, isSubmitting }} = useForm<ChangeCustomerPassword>({resolver: zodResolver(changePasswordSchema)})

  const handleClose = useCallback(() => {

    if (isSubmitting) return;
    reset();
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose()

  },[isSubmitting, reset, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, isSubmitting, handleClose]);

  const onSubmit = async (data: ChangeCustomerPassword) => {
    try {

      await changePassword(data);
      toast.success("Password updated successfully");
      handleClose()

    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Unable to change password");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };

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
              Change Password
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your current password and choose a secure new password.
            </p>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 pt-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Current Password
            </label>
            <div className="relative flex items-center w-full">
              <input
                type={showCurrentPassword ? "text" : "password"}
                disabled={isSubmitting}
                {...register("currentPassword")}
                placeholder="Enter current password"
                className={`w-full h-11 pl-4 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border rounded-xl transition-all placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed ${
                  errors.currentPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200/90 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 disabled:opacity-50"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-[0.8125rem] mt-1.5 leading-[1.35] font-medium">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              New Password
            </label>
            <div className="relative flex items-center w-full">
              <input
                type={showNewPassword ? "text" : "password"}
                disabled={isSubmitting}
                {...register("newPassword")}
                placeholder="Enter new password (min. 6 characters)"
                className={`w-full h-11 pl-4 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border rounded-xl transition-all placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed ${
                  errors.newPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200/90 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 disabled:opacity-50"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-[0.8125rem] mt-1.5 leading-[1.35] font-medium">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative flex items-center w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                disabled={isSubmitting}
                {...register("confirmPassword")}
                placeholder="Re-enter new password"
                className={`w-full h-11 pl-4 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border rounded-xl transition-all placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                    : "border-slate-200/90 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 disabled:opacity-50"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[0.8125rem] mt-1.5 leading-[1.35] font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 sm:pt-5 border-t border-slate-100">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full sm:w-auto min-w-[130px] h-10 px-5 bg-[#2e4d75] hover:bg-[#233b5c] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <ButtonSpinner size="sm" /> : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

