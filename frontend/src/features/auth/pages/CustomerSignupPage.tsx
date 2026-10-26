import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CustomerSignupFormData } from "../types/customerSignup.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSignupSchema } from "../schemas/customerSignup.schema";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { registerCustomer } from "../services/auth.service";
import { toast } from "react-toastify";
import axios from "axios";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";

export function CustomerSignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<CustomerSignupFormData>({ resolver: zodResolver(customerSignupSchema)});

    const onSubmit = async (data: CustomerSignupFormData) => {

        try {
            await registerCustomer({
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            })

            toast.success("OTP sent successfully!");
            navigate("/verify-email", {
                state: {
                    email: data.email.trim().toLowerCase(),
                    role: "CUSTOMER",
                },
            });
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Registration failed. Please try again")
            }else {
                toast.error("Something went wrong. Please try again.");
            }
        }

    };

    return (
        <main className="min-h-screen w-full flex flex-col bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)] box-border">
            <header className="w-full flex items-center justify-between z-10 px-4 sm:px-6 md:px-10 lg:px-14 py-3.5 sm:py-5">
                <Link
                    to="/"
                    className="inline-flex items-center transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    aria-label="Dealio home"
                >
                    <img
                        src="/dealio-logo.png"
                        alt="Dealio"
                        className="h-7 sm:h-[30px] md:h-[34px] w-auto object-contain"
                    />
                </Link>
                <div className="flex items-center gap-2 sm:gap-3.5">
                    <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
                        Selling with Dealio?
                    </span>
                    <Link
                        to="/register/enterprise"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#355982] bg-transparent border border-slate-300 rounded-lg px-2.5 sm:px-3.5 py-1.5 transition-all duration-200 hover:bg-[#eef4fa] hover:border-[#355982] hover:text-[#203650] hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 whitespace-nowrap"
                    >
                        Join as Enterprise
                    </Link>
                </div>
            </header>

            <div className="flex-1 flex items-start sm:items-center justify-center w-full px-4 sm:px-6 md:px-8 py-3 pb-8 sm:pb-10">
                <div className="w-full max-w-[480px] bg-white rounded-[20px] sm:rounded-[28px] shadow-[0_20px_45px_-15px_rgba(15,30,60,0.08),0_0_1px_rgba(15,30,60,0.06)] border border-slate-200/70 p-5 sm:p-7 md:p-9">
                    <header className="text-center mb-6 sm:mb-7">
                        <h1 className="text-[1.45rem] sm:text-[1.75rem] font-extrabold text-[#0e2238] mb-2 tracking-[-0.03em] leading-tight">
                            Create Your Account
                        </h1>
                        <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0">
                            Get quotes from verified enterprises.
                        </p>
                    </header>

                    <form className="flex flex-col gap-4 sm:gap-[1.15rem]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-semibold text-slate-800 mb-1.5 block">
                                Full Name
                            </label>
                            <div className="relative flex items-center w-full">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                    <User size={18} />
                                </span>
                                <input
                                    id="name"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    className={`w-full h-12 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border-[1.5px] rounded-xl box-border font-inherit transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none ${
                                        errors.name
                                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                                            : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                                    }`}
                                    {...register("name")}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-[0.8125rem] mt-1.5 mb-0 leading-[1.35] font-medium">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-800 mb-1.5 block">
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
                                    placeholder="Enter your email address"
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
                            <label htmlFor="password" className="text-sm font-semibold text-slate-800 mb-1.5 block">
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
                            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800 mb-1.5 block">
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
                                    placeholder="Confirm your password"
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

                        <button
                            type="submit"
                            className="w-full h-12 mt-1.5 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ButtonSpinner />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={18} aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6 mb-0">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-[#0e2238] font-semibold ml-1 transition-opacity duration-150 hover:opacity-80 hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default CustomerSignupPage;
