import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight } from "lucide-react";
import { otpSchema, type OtpFormData } from "../schemas/otp.schema";
import { toast } from "react-toastify";
import type { VerifyOtpRequest } from "../types/otp.types";
import { verifyCustomerOtp, verifyEnterpriseOtp } from "../services/auth.service";
import axios from "axios";
import OtpInput from "../components/OTPinput";

function OtpVerificationPage() {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting },} = useForm<OtpFormData>({ resolver: zodResolver(otpSchema)})

    const location = useLocation()
    const navigate = useNavigate()

    const verificationState = location.state as | {email : string, role : "ENTERPRISE_MANAGER" | "CUSTOMER" } | null

    const email = verificationState?.email
    const role = verificationState?.role


    const onSubmit = async(data: OtpFormData) => {

        if (!email || !role) {
            toast.error("Please register again.");
            navigate( role === "ENTERPRISE_MANAGER" ? "/register/enterprise" : "/register/customer", { replace: true });
            return;
        }

        const payload : VerifyOtpRequest = {
            email,
            otp : data.otp
        }

        try {

            if (role === "CUSTOMER") {

                await verifyCustomerOtp(payload)
            } else {

                await verifyEnterpriseOtp(payload)
            }

            toast.success("Email verified successfully!")
            navigate("/login", { replace: true })
            
        } catch (error) {

            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message ?? "OTP verification failed. Please try again.";
                toast.error(message)
            }else{

                toast.error("Something went wrong. Please try again.");
            }
        }
        
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)] p-4 sm:p-6 md:p-8 box-border">
            <div className="w-full max-w-[440px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_20px_45px_-15px_rgba(15,30,60,0.08),0_0_1px_rgba(15,30,60,0.06)] border border-slate-200/70 p-6 sm:p-8 md:p-9">
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
                        Verify Your Email
                    </h1>
                    <p className="text-sm sm:text-[0.9375rem] text-slate-500 leading-relaxed m-0">
                        Enter the 6-digit code sent to your email.
                    </p>
                </header>

                <div className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#f0f6fc] border border-[#e2eaf3] rounded-2xl mb-6">
                    <Mail size={17} className="text-[#355982] shrink-0" aria-hidden="true" />
                    <p className="text-sm text-slate-600 m-0 truncate">
                        Sent to <span className="font-semibold text-slate-900">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input type="hidden" {...register("otp")} />
                    <div className="mb-2">
                        <OtpInput
                            onChange={(val) => setValue("otp", val, { shouldValidate: !!errors.otp || val.length === 6 })}
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
                        <span>Verify & Continue</span>
                        <ArrowRight size={18} aria-hidden="true" />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500 m-0">
                    Didn't receive the code? Resend code in{" "}
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Resend OTP clicked");
                        }}
                        className="font-semibold text-[#0e2238] hover:text-[#2e4d75] hover:underline cursor-pointer transition-colors border-0 bg-transparent p-0"
                    >
                        00:26
                    </button>
                </p>
            </div>
        </main>
    );
}

export default OtpVerificationPage;