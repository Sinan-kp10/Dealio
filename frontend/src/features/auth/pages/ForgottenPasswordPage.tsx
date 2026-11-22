import { useForm } from "react-hook-form";
import type { ForgottenPasswordFormData } from "../types/forgottenPassword.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgottenPasswordSchema } from "../schemas/forgottenPassword.schema";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { forgotPassword } from "../services/auth.service";
import { handleFormError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

function ForgottenPasswordPage() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<ForgottenPasswordFormData>({
    resolver: zodResolver(ForgottenPasswordSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ForgottenPasswordFormData) => {
    try {
      await forgotPassword(data);
      toast.success("A password reset code has been sent");
      navigate("/verify-reset-otp", {
        state: {
          email: data.email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      handleFormError(error, setError, "Unable to process your password reset request");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc]">
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
            alt="Dealio Security & Account Recovery"
            className="w-full max-w-[440px] xl:max-w-[490px] 2xl:max-w-[540px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.5)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
            loading="eager"
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl xl:text-2xl font-bold text-white tracking-tight leading-snug m-0">
            Account Recovery & Security
          </h2>
          <p className="text-xs xl:text-sm text-slate-300/90 mt-2 leading-relaxed m-0">
            We will help you reset your password and restore secure access to your Dealio account.
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
              Forgot Password?
            </h1>
            <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0 text-center lg:text-left">
              Enter your registered email address and we'll send you a verification code to reset your password.
            </p>
          </header>

          <form
            className="flex flex-col gap-4 sm:gap-4.5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-800 mb-1.5 block"
              >
                Email Address
              </label>
              <div className="relative flex items-center w-full">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Mail size={18} strokeWidth={1.8} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your registered email address"
                  className={`w-full h-12 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                      : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 mt-2 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <ButtonSpinner />
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6 sm:mt-7 mb-0">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#0e2238] hover:underline transition-colors ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default ForgottenPasswordPage;
