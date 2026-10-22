import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Building2, User, Mail, Phone, Lock, ShieldCheck, Eye, EyeOff, ArrowRight,} from "lucide-react";

import { enterpriseSignupSchema } from "../schemas/enterpriseSignup.schema";
import type { EnterpriseSignupFormData } from "../types/enterpriseSignup.types";
import { registerEnterprise } from "../services/auth.service";
import { toast } from "react-toastify";
import axios from "axios";

export function EnterpriseSignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<EnterpriseSignupFormData>({ resolver: zodResolver(enterpriseSignupSchema)});

    const onSubmit = async (data: EnterpriseSignupFormData) => {
        setLoading(true)

        try {

            await registerEnterprise({
                companyName : data.companyName,
                contactPersonName : data.contactPersonName,
                email : data.email,
                phone : data.phone,
                password : data.password,
                confirmPassword : data.confirmPassword
            })

            toast.success("Enterprise registered successfully!")
            navigate("/login")
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message ?? "Registration failed. Please try again."
                toast.error(message)
            }else{
                toast.error("Something went wrong. Please try again.");
            }
        }finally{
            setLoading(false)
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
                        Are you a customer?
                    </span>
                    <Link
                        to="/register/customer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#355982] bg-transparent border border-slate-300 rounded-lg px-2.5 sm:px-3.5 py-1.5 transition-all duration-200 hover:bg-[#eef4fa] hover:border-[#355982] hover:text-[#203650] hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 whitespace-nowrap"
                    >
                        Join as Customer
                    </Link>
                </div>
            </header>

            <div className="flex-1 flex items-start sm:items-center justify-center w-full px-4 sm:px-6 md:px-8 py-3 pb-8 sm:pb-10">
                <div className="w-full max-w-[760px] bg-white rounded-[20px] sm:rounded-[28px] shadow-[0_20px_45px_-15px_rgba(15,30,60,0.08),0_0_1px_rgba(15,30,60,0.06)] border border-slate-200/70 p-5 sm:p-8 md:p-10">
                    <header className="text-center mb-6 sm:mb-8">
                        <h1 className="text-[1.5rem] sm:text-[1.85rem] font-extrabold text-[#0e2238] mb-2 tracking-[-0.03em] leading-tight">
                            Create Your Enterprise Account
                        </h1>
                        <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0">
                            Register your enterprise to get started with Dealio.
                        </p>
                    </header>

                    <form
                        className="flex flex-col gap-4 sm:gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-4.5">
                            <div className="form-group">
                                <label
                                    htmlFor="companyName"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Company Name
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <Building2 size={18} />
                                    </span>
                                    <input
                                        id="companyName"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Enter your company name"
                                        className={`input-field ${errors.companyName ? "input-field-error" : ""}`}
                                        {...register("companyName")}
                                    />
                                </div>
                                {errors.companyName && (
                                    <p className="field-error">
                                        {errors.companyName.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="contactPersonName"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Contact Person Name
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <User size={18} />
                                    </span>
                                    <input
                                        id="contactPersonName"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter contact person's name"
                                        className={`input-field ${errors.contactPersonName ? "input-field-error" : ""}`}
                                        {...register("contactPersonName")}
                                    />
                                </div>
                                {errors.contactPersonName && (
                                    <p className="field-error">
                                        {errors.contactPersonName.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="email"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Work Email
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter your work email address"
                                        className={`input-field ${errors.email ? "input-field-error" : ""}`}
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="field-error">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="phone"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Phone
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <Phone size={18} />
                                    </span>
                                    <input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        maxLength={10}
                                        placeholder="Enter 10-digit mobile number"
                                        className={`input-field ${errors.phone ? "input-field-error" : ""}`}
                                        {...register("phone")}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="field-error">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Password
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Create a password"
                                        className={`input-field input-field-has-toggle ${errors.password ? "input-field-error" : ""}`}
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        className="input-toggle-btn"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (<p className="field-error">{errors.password.message}</p>)}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block"
                                >
                                    Confirm Password
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon-left" aria-hidden="true">
                                        <ShieldCheck size={18} />
                                    </span>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Confirm your password"
                                        className={`input-field input-field-has-toggle ${errors.confirmPassword ? "input-field-error" : ""}`}
                                        {...register("confirmPassword")}
                                    />
                                    <button
                                        type="button"
                                        className="input-toggle-btn"
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
                                    <p className="field-error">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 mt-1 sm:mt-2 bg-[#2e4d75] hover:not-disabled:bg-[#233b5c] text-white border-0 rounded-xl text-[0.95rem] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(46,77,117,0.3)] hover:not-disabled:shadow-[0_6px_18px_rgba(46,77,117,0.35)] hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={loading || isSubmitting}
                        >
                            {isSubmitting ? (
                                "Creating account..."
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