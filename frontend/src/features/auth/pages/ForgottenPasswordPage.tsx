import { useForm } from "react-hook-form";
import type { ForgottenPasswordFormData } from "../types/forgottenPassword.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgottenPasswordSchema } from "../schemas/forgottenPassword.schema";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { forgotPassword } from "../services/auth.service";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/common/ButtonSpinner";

function ForgottenPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<ForgottenPasswordFormData>({ resolver: zodResolver(ForgottenPasswordSchema)})
  const navigate = useNavigate()

  const onSubmit = async(data: ForgottenPasswordFormData) => {
    try {

      await forgotPassword(data)
      toast.success("A password reset code has been sent")
      navigate("/verify-reset-otp", {
        state: {
          email: data.email.trim().toLowerCase(),
        },
      });
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message ?? "Unable to process your password reset request")
      }else{
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

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
            Forgot Password?
          </h1>
          <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0 max-w-[320px] mx-auto">
            Enter your email and we'll send you a code to reset your password.
          </p>
        </header>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-bold text-slate-800 tracking-[0.05em] uppercase mb-2 block"
            >
              EMAIL ADDRESS
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
            className="w-full h-12 mt-6 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
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
            className="font-semibold text-[#2e4d75] hover:text-[#203650] hover:underline transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ForgottenPasswordPage;