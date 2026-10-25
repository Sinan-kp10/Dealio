import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import type { VerifyOtpRequest } from "../types/otp.types";
import { resendEmailOtp, verifyCustomerOtp, verifyEnterpriseOtp } from "../services/auth.service";
import OtpVerificationForm from "../components/OtpVerificationForm";
import { useEffect } from "react";
import { OTP_COUNTDOWN_KEYS } from "../utils/otp-countdown-keys";
import { isRegistrationVerificationState } from "../utils/registration-verification-state";

function OtpVerificationPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state;
    const isValidState = isRegistrationVerificationState(state);

    useEffect(() => {
        if (!isValidState) {
            navigate("/not-found", { replace: true });
        }
    }, [isValidState, navigate])

    if (!isValidState) {
        return null
    }

    const { email, role } = state;

    const onSubmit = async (otp: string) => {
        const payload: VerifyOtpRequest = {email,otp};

        try {
            if (role === "CUSTOMER") {
                await verifyCustomerOtp(payload);
            } else {
                await verifyEnterpriseOtp(payload);
            }

            toast.success("Email verified successfully!")

            navigate("/login", { replace: true })

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "OTP verification failed")
            } else {
                toast.error("Something went wrong. Please try again");
            }
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await resendEmailOtp({ email });
            toast.success(response.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to resend OTP. Please try again.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)] p-4 sm:p-6 md:p-8 box-border">
            <OtpVerificationForm
                email={email}
                title="Verify Your Email"
                countdownKey= {`${OTP_COUNTDOWN_KEYS.REGISTRATION}:${email.trim().toLowerCase()}`}
                onSubmit={onSubmit}
                onResend={handleResendOtp}
            />
        </main>
    );
}

export default OtpVerificationPage;