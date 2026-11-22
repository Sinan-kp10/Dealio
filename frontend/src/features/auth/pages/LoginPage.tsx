import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginSchema } from "../schemas/login.schema";
import type { LoginFromData } from "../types/login.type";
import { login } from "../services/auth.service";
import axios from "axios";
import { handleFormError, getErrorMessage } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/common/loading/ButtonSpinner";
import useAuthStore from "../../../stores/auth.store";

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFromData>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const onSubmit = async (data: LoginFromData) => {
        try {
            const response = await login(data);
            const user = response.data?.user;
            setUser(user);

            toast.success("Successfully logged in!");

            switch (user.role) {
                case "ADMIN":
                    navigate("/admin");
                    break;

                case "ENTERPRISE_MANAGER":
                    navigate("/enterprise");
                    break;

                case "CUSTOMER":
                    navigate("/customer");
                    break;

                default:
                    navigate("/login");
                    break;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                navigate("/account-suspended", {
                    state: {
                        reason: getErrorMessage(error, "Your account has been suspended by the administration"),
                    },
                });
                return;
            }
            handleFormError(error, setError, "Login failed. Please try again");
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
                        alt="Dealio Secure Login"
                        className="w-full max-w-[440px] xl:max-w-[490px] 2xl:max-w-[540px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.5)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
                        loading="eager"
                    />
                </div>

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-xl xl:text-2xl font-bold text-white tracking-tight leading-snug m-0">
                        The Smarter Way to Connect & Deal
                    </h2>
                    <p className="text-xs xl:text-sm text-slate-300/90 mt-2 leading-relaxed m-0">
                        Connecting customers with verified enterprises for structured quotations, competitive proposals, and secure deals.
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
                            Welcome Back
                        </h1>
                        <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0 text-center lg:text-left">
                            Log in to your Dealio account.
                        </p>
                    </header>

                    <form className="flex flex-col gap-4 sm:gap-4.5" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-800 mb-1.5 block">
                                Email
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
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-800 block">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs sm:text-[13px] font-medium text-[#2e4d75] hover:text-[#203650] hover:underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative flex items-center w-full">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                    <Lock size={18} />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
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

                        <button
                            type="submit"
                            className="w-full h-12 mt-2 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ButtonSpinner />
                            ) : (
                                <>
                                    <span>Log In</span>
                                    <ArrowRight size={18} aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-7 text-center">
                        <p className="text-sm text-slate-500 mb-3">
                            New to Dealio?
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                            <Link
                                to="/register/customer"
                                className="inline-flex items-center justify-center px-4 py-2 sm:px-4.5 sm:py-2.5 text-sm font-medium text-[#0e2238] bg-white border border-[#cfdbe7] rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-[#0e2238] transition-all duration-150 shadow-xs"
                            >
                                Join as a Customer
                            </Link>
                            <Link
                                to="/register/enterprise"
                                className="inline-flex items-center justify-center px-4 py-2 sm:px-4.5 sm:py-2.5 text-sm font-medium text-[#0e2238] bg-white border border-[#cfdbe7] rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-[#0e2238] transition-all duration-150 shadow-xs"
                            >
                                Join as an Enterprise
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
