import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
import { verifyEmailChangeSchema, type VerifyEmailChangeFormData } from "../schema/verify-email-change.schema";
import OtpInput from "../../auth/components/OTPinput";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";
import { resendEmailChangeOtp, verifyEmailChange } from "../services/users-account-settings.service";

interface VerifyEmailStepProps {
  newEmail: string;
  onSuccess: (newEmail: string) => void;
  onCancel: () => void;
}

export function VerifyEmailStep({ newEmail, onSuccess, onCancel }: VerifyEmailStepProps) {
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const {handleSubmit, setValue, formState: { errors, isSubmitting }} = useForm<VerifyEmailChangeFormData>({resolver: zodResolver(verifyEmailChangeSchema)});

  useEffect(() => {

    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000)

    return () => clearInterval(timer)

  }, [countdown]);

  const onSubmit = async (data: VerifyEmailChangeFormData) => {
    try {

      const response = await verifyEmailChange({ otp: data.otp });
      const updatedEmail = response.data?.email || newEmail;
      toast.success("Email changed successfully");
      onSuccess(updatedEmail)

    } catch (error) {

      handleApiError(error, "Invalid verification code");
    }
  };

  const handleResend = async () => {

    if (countdown > 0 || isResending) return
    setIsResending(true);

    try {

      const response = await resendEmailChangeOtp();
      toast.success(response.message || "Verification code resent");
      setCountdown(60)

    } catch (error) {

      handleApiError(error, "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-5">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2 text-center">
          Enter 6-Digit Verification Code
        </label>

        <OtpInput
          onChange={(val) => setValue("otp", val, { shouldValidate: true })}
          hasError={Boolean(errors.otp)}
        />

        {errors.otp && (
          <p className="text-red-500 text-[0.8125rem] mt-2.5 text-center leading-[1.35] font-medium">
            {errors.otp.message}
          </p>
        )}
      </div>

      <div className="text-center pt-1">
        <p className="text-xs sm:text-sm text-slate-500">
          Didn't receive the code?{" "}
          {countdown > 0 ? (
            <span className="font-semibold text-slate-700">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              disabled={isResending || isSubmitting}
              onClick={handleResend}
              className="font-semibold text-[#2e4d75] hover:underline cursor-pointer disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          )}
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 sm:pt-5 border-t border-slate-100">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full sm:w-auto min-w-[170px] h-10 px-5 bg-[#2e4d75] hover:bg-[#233b5c] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center disabled:opacity-65 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <ButtonSpinner size="sm" /> : "Verify & Update Email"}
        </button>
      </div>
    </form>
  );
}

export default VerifyEmailStep;

