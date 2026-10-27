import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { otpSchema,} from "../schemas/otp.schema";
import OtpInput from "./OTPinput";
import type { OtpVerificationFormProps } from "../types/otp-verification-form.types";
import type { OtpFormData } from "../types/otp.types";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

export function OtpVerificationForm({ email, title, countdownKey, onSubmit, onResend,}: OtpVerificationFormProps) {

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting },} = useForm<OtpFormData>({ resolver: zodResolver(otpSchema)})

  const [countdown, setCountdown] = useState(() => {
    const storedExpiry = sessionStorage.getItem(countdownKey);

    if (storedExpiry === null) {
      const expiry = Date.now() + 60 * 1000;
      sessionStorage.setItem(countdownKey, String(expiry));
      return 60;
    }

    return Math.max(0, Math.ceil((Number(storedExpiry) - Date.now()) / 1000))
  })

  const [isResending, setIsResending] = useState(false);

  const handleFormSubmit = async (data: OtpFormData) => {
    await onSubmit(data.otp);
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    try {

      await onResend();
      const expiry = Date.now() + 60 * 1000;
      sessionStorage.setItem(countdownKey, String(expiry));
      setCountdown(60);

    } catch {
      // Error is handled in onResend
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = window.setTimeout(() => {
      setCountdown(() => {
        const storedExpiry = sessionStorage.getItem(countdownKey);

        if (storedExpiry === null) return 0;

        return Math.max( 0,Math.ceil((Number(storedExpiry) - Date.now()) / 1000))
      });
    }, 1000)

    return () => window.clearTimeout(timer);
  }, [countdown, countdownKey]);

  return (
    <div className="w-full max-w-[440px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_20px_45px_-15px_rgba(15,30,60,0.08),0_0_1px_rgba(15,30,60,0.06)] border border-slate-200/70 p-5 sm:p-8 md:p-9">
      <header className="text-center mb-6">
        <Link
          to="/"
          className="inline-flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Dealio home"
        >
          <img
            src="/dealio-logo.png"
            alt="Dealio"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>
        <h1 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#0e2238] mb-1.5 tracking-[-0.03em] leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0">
          Enter the 6-digit code sent to your email.
        </p>
      </header>

      <div className="flex items-center justify-center gap-2.5 py-2.5 sm:py-3 px-3 sm:px-4 bg-[#f0f6fc] border border-[#e2eaf3] rounded-2xl mb-6 max-w-full">
        <Mail
          size={17}
          className="text-[#355982] shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs sm:text-sm text-slate-600 m-0 truncate">
          Sent to <span className="font-semibold text-slate-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <input type="hidden" {...register("otp")} />
        <div className="mb-2">
          <OtpInput
            onChange={(val) =>
              setValue("otp", val, {
                shouldValidate: !!errors.otp || val.length === 6,
              })
            }
            hasError={!!errors.otp}
          />
        </div>

        {errors.otp && (
          <p className="text-red-500 text-[0.8125rem] text-center mt-2 mb-0 leading-[1.35] font-medium">
            {errors.otp.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 mt-6 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <ButtonSpinner />
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6 mb-0">
        Didn't receive the code?{" "}
        {countdown > 0 ? (
          <span className="text-slate-500 font-medium">
            Resend code in {String(countdown).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold text-[#2e4d75] hover:text-[#203650] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>
    </div>
  );
}

export default OtpVerificationForm;
