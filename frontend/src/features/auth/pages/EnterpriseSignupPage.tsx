import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Building2, User, Mail, Phone, Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";

import { enterpriseSignupSchema } from "../schemas/enterpriseSignup.schema";
import type { EnterpriseSignupFormData } from "../types/enterpriseSignup.types";
import { registerEnterprise } from "../services/auth.service";
import { toast } from "react-toastify";
import { handleFormError } from "../../../utils/errorHandler";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

export function EnterpriseSignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EnterpriseSignupFormData>({
        resolver: zodResolver(enterpriseSignupSchema),
    });

    const onSubmit = async (data: EnterpriseSignupFormData) => {
        setLoading(true);

        try {
            await registerEnterprise({
                enterpriseName: data.enterpriseName,
                contactPersonName: data.contactPersonName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });

            toast.success("OTP sent successfully!");
            navigate("/verify-email", {
                state: {
                    email: data.email.trim().toLowerCase(),
                    role: "ENTERPRISE_MANAGER",
                },
            });
        } catch (error) {
            handleFormError(error, setError, "Registration failed. Please try again");
        } finally {
            setLoading(false);
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
                        src="/enterprise-signup-image.png"
                        alt="Enterprise Signup"
                        className="w-full max-w-[420px] xl:max-w-[460px] 2xl:max-w-[500px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.5)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
                        loading="eager"
                    />
                </div>

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-xl xl:text-2xl font-bold text-white tracking-tight leading-snug m-0">
                        Grow Your Enterprise with Dealio
                    </h2>
                    <p className="text-xs xl:text-sm text-slate-300/90 mt-2 leading-relaxed m-0">
                        Receive verified customer requests, submit competitive proposals, and scale your sales pipeline.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 md:p-12 xl:p-16 bg-[#f8fafc] overflow-y-auto">
                <div className="w-full max-w-[560px] py-8 my-auto">
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
                            Create Your Enterprise Account
                        </h1>
                        <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0 text-center lg:text-left">
                            Register your enterprise to start receiving quotation requests.
                        </p>
                    </header>

                    <form
                        className="flex flex-col gap-4 sm:gap-4.5"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-x-5 sm:gap-y-4">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="enterpriseName"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Enterprise Name
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <Building2 size={18} />
                                    </span>
                                    <input
                                        id="enterpriseName"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Enter enterprise name"
                                        className={`w-full h-12 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                            errors.enterpriseName
                                                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                        }`}
                                        {...register("enterpriseName")}
                                    />
                                </div>
                                {errors.enterpriseName && (
                                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                        {errors.enterpriseName.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="contactPersonName"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Contact Person Name
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <User size={18} />
                                    </span>
                                    <input
                                        id="contactPersonName"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter contact person"
                                        className={`w-full h-12 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                            errors.contactPersonName
                                                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                        }`}
                                        {...register("contactPersonName")}
                                    />
                                </div>
                                {errors.contactPersonName && (
                                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                        {errors.contactPersonName.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Email Address
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter email address"
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

                            <div className="flex flex-col">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Phone Number
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <Phone size={18} />
                                    </span>
                                    <input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        maxLength={10}
                                        placeholder="10-digit number"
                                        className={`w-full h-12 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                            errors.phone
                                                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                        }`}
                                        {...register("phone")}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Password
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Create a password"
                                        className={`w-full h-12 pl-11 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                            errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                        }`}
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#355982] focus-visible:outline-offset-2"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-semibold text-slate-800 mb-1.5 block"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                        <ShieldCheck size={18} />
                                    </span>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        className={`w-full h-12 pl-11 pr-11 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                            errors.confirmPassword
                                                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                                : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                        }`}
                                        {...register("confirmPassword")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#355982] focus-visible:outline-offset-2"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 mt-2 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={loading || isSubmitting}
                        >
                            {loading || isSubmitting ? (
                                <ButtonSpinner />
                            ) : (
                                <>
                                    <span>Create Enterprise Account</span>
                                    <ArrowRight size={18} aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-5 sm:mt-6 mb-0">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-[#0e2238] font-semibold ml-1.5 transition-opacity duration-150 hover:opacity-80 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default EnterpriseSignupPage;
