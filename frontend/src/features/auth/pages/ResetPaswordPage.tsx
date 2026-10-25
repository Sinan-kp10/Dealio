import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../schemas/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ResetPasswordFormData } from "../types/resetPassword.types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../services/auth.service";
import axios from "axios";
import ButtonSpinner from "../../../components/common/ButtonSpinner";

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<ResetPasswordFormData>({ resolver: zodResolver(resetPasswordSchema)})

  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as { resetToken?: string } | null;
  const resetToken = state?.resetToken

  useEffect(() => {
    if (!resetToken) {
      navigate("/not-found", { replace: true });
    }
  }, [resetToken, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetToken) {
      toast.error("Invalid or expired password reset session.");
      return;
    }

    try {
      const response = await resetPassword({
        resetToken,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success(response.message);
      navigate("/login", { replace: true })

    } catch (error) {
      if (axios.isAxiosError(error)) {

        toast.error(error.response?.data?.message ?? "Unable to reset your password")
      } else {

        toast.error("Something went wrong. Please try again");
      }
    }
  };

  if (!resetToken) {
    return null;
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)] p-4 sm:p-6 md:p-8 box-border">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_20px_45px_-15px_rgba(15,30,60,0.08),0_0_1px_rgba(15,30,60,0.06)] border border-slate-200/70 p-6 sm:p-8 md:p-9">
        <header className="text-center mb-6 sm:mb-7">
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
            Reset Password
          </h1>
          <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0">
            Create a new password for your account.
          </p>
        </header>

        <form className="flex flex-col gap-4 sm:gap-4.5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-slate-800 mb-1.5 block">New Password</label>

            <div className="relative flex items-center w-full">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center"aria-hidden="true">
                <Lock size={18} strokeWidth={1.8} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your new password"
                className={`w-full h-12 pl-11 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                  errors.password? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12": "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
                {...register("password")}
              />

              <button type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#355982] focus-visible:outline-offset-2"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (<EyeOff size={18} strokeWidth={1.8} />) : (<Eye size={18} strokeWidth={1.8} />)}
              </button>
            </div>

            {errors.password && (<p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">{errors.password.message}</p>)}

          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800 mb-1.5 block">Confirm Password</label>

            <div className="relative flex items-center w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                <ShieldCheck size={18} strokeWidth={1.8} />
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your new password"
                className={`w-full h-12 pl-11 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                  errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12": "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                }`}
                {...register("confirmPassword")}
              />

              <button type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#355982] focus-visible:outline-offset-2"
                onClick={() => setConfirmShowPassword((prev) => !prev)}
                aria-label={ showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (<EyeOff size={18} strokeWidth={1.8} />) : (<Eye size={18} strokeWidth={1.8} />)}
              </button>
            </div>
            {errors.confirmPassword && (<p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">{errors.confirmPassword.message}</p>)}
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full h-12 mt-2 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <ButtonSpinner />
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>

          <Link to="/login"
            className="w-full h-12 flex items-center justify-center text-[0.95rem] font-semibold text-[#2e4d75] bg-white border border-[#cfdbe7] rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 shadow-xs"
          >
            Back
          </Link>
        </form>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
