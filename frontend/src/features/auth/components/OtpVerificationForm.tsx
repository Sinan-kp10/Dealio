import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { otpSchema,} from "../schemas/otp.schema";
import OtpInput from "./OTPinput";
import type { OtpVerificationFormProps } from "../types/otp-verification-form.types";
import type { OtpFormData } from "../types/otp.types";
import { handleFormError } from "../../../utils/errorHandler";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

export function OtpVerificationForm({ email, title, countdownKey, onSubmit, onResend,}: OtpVerificationFormProps) {

  const { register, handleSubmit, setValue, setError, formState: { errors, isSubmitting },} = useForm<OtpFormData>({ resolver: zodResolver(otpSchema)})

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
    try {
      await onSubmit(data.otp);
    } catch (error) {
      handleFormError(error, setError, "OTP verification failed");
    }
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc]">
      <div className="relative hidden lg:flex lg:w-1/2 min-h-screen flex-col justify-between p-10 xl:p-14 2xl:p-18 bg-gradient-to-br from-[#081a30] via-[#0c2340] to-[#102e52] text-white overflow-hidden border-r border-[#1a3860]/40 shadow-[4px_0_24px_rgba(12,35,64,0.12)]">
        <div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#4D79A8]/20 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#69ACCC]/15 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-[500px] rounded-full bg-[#69ACCC]/10 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Dealio home"
          >
            <img
              src="/dealio-logo-white.png"
              alt="Dealio"
              className="h-8 xl:h-9 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="relative z-10 my-auto py-10 flex flex-col items-center justify-center">
          <div 
            className="absolute w-80 xl:w-96 h-80 xl:h-96 rounded-full bg-[#69ACCC]/20 blur-3xl pointer-events-none -z-10" 
            aria-hidden="true" 
          />
          <img
            src="/auth-image.png"
            alt="Dealio Secure Verification"
            className="w-full max-w-[440px] xl:max-w-[490px] 2xl:max-w-[540px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.5)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
            loading="eager"
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl xl:text-2xl font-bold text-white tracking-tight leading-snug m-0">
            Secure Verification
          </h2>
          <p className="text-xs xl:text-sm text-slate-300/90 mt-2 leading-relaxed m-0">
            Confirm your credentials and protect your Dealio account with fast, verified authentication.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 md:p-12 xl:p-16 bg-[#f8fafc] overflow-y-auto">
        <div className="w-full max-w-[420px] py-8 my-auto">
          <header className="mb-7">
            <div className="flex lg:hidden justify-center mb-5">
              <Link
                to="/"
                className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]"
                aria-label="Dealio home"
              >
                <img
                  src="/dealio-logo.png"
                  alt="Dealio"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
            </div>
            <h1 className="text-2xl sm:text-[1.85rem] font-extrabold text-[#0e2238] mb-1.5 tracking-[-0.03em] leading-tight text-center lg:text-left">
              {title}
            </h1>
            <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0 text-center lg:text-left">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold text-slate-800 break-all">{email}</span>
            </p>
          </header>

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
                Resend code in {String(countdown).padStart(2, "0")}s
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
      </div>
    </div>
  );
}

export default OtpVerificationForm;
