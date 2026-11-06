import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { verifyPhoneOtpSchema, type VerifyPhoneOtpFormData } from "../../schema/verify-phone-otp.schema";
import { resendPhoneOtp, verifyPhoneOtp } from "../../services/users-account-settings.service";
import { handleApiError, handleFormError } from "../../../../utils/errorHandler";
import OtpInput from "../../../auth/components/OTPinput";
import ButtonSpinner from "../../../../components/common/loading/ButtonSpinner";


interface VerifyPhoneStepProps {
  phone: string;
  onSuccess: (verifiedPhone: string) => void;
  onCancel: () => void;
}

export function VerifyPhoneStep({ phone, onSuccess, onCancel }: VerifyPhoneStepProps) {
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const { handleSubmit, setValue, setError, formState: { errors, isSubmitting }, } = useForm<VerifyPhoneOtpFormData>({ resolver: zodResolver(verifyPhoneOtpSchema)});

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const onSubmit = async (data: VerifyPhoneOtpFormData) => {
    try {
      const response = await verifyPhoneOtp({ otp: data.otp });
      const updatedPhone = response.data?.phone || phone;
      toast.success("Phone number verified successfully");
      onSuccess(updatedPhone);
    } catch (error) {
      handleFormError(error, setError, "Invalid verification code");
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);

    try {
      const response = await resendPhoneOtp();
      toast.success(response.message || "Verification code resent");
      setCountdown(60);
    } catch (error) {
      handleApiError(error, "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  };

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
          {isSubmitting ? <ButtonSpinner size="sm" /> : "Verify & Save Phone"}
        </button>
      </div>
    </form>
  );
}

export default VerifyPhoneStep;

