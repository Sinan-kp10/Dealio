import { useLocation, useNavigate } from "react-router-dom"
import { isPassswordResetOtpState } from "../utils/registration-verification-state";
import { useEffect } from "react";
import { resendEmailOtp, verifyPasswordResetOtp } from "../services/auth.service";
import { toast } from "react-toastify";
import axios from "axios";
import OtpVerificationForm from "../components/OtpVerificationForm";
import { OTP_COUNTDOWN_KEYS } from "../utils/otp-countdown-keys";

function VerifyPasswordResetOtpPage(){

    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state;
    const isValidState = isPassswordResetOtpState(state)

    useEffect(() => {
        if (!isValidState) {
            navigate("/not-found", { replace: true });
        }
    }, [isValidState, navigate]);

    if (!isValidState) {
        return null;
    }
    const { email } = state;


    const onSubmit = async(otp : string) => {

        try {

            const response = await verifyPasswordResetOtp({ email , otp})
            toast.success(response.message)

            navigate("/reset-password", {
                replace: true,
                state: {
                    resetToken: response.data.resetToken,
                },
            })

        } catch (error) {

             if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "OTP verification failed")
            } else {
                toast.error("Something went wrong. Please try again");
            }
        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await resendEmailOtp({email, purpose: "PASSWORD_RESET" })

            toast.success(response.message)

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to resend OTP");
            } else {
                toast.error("Something went wrong. Please try again");
            }
        }
    }


    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)] p-4 sm:p-6 md:p-8 box-border">
            <OtpVerificationForm
                email={email}
                title="Verify Reset Code"
                countdownKey={`${OTP_COUNTDOWN_KEYS.PASSWORD_RESET}:${email.trim().toLowerCase()}`}
                onSubmit={onSubmit}
                onResend={handleResendOtp}
            />
        </main>
    );

}

export default VerifyPasswordResetOtpPage