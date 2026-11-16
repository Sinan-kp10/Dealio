import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";
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
            navigate("/login", { replace: true });
        }
    }, [isValidState, navigate])

    if (!isValidState) {
        return null
    }

    const { email, role } = state;

    const onSubmit = async (otp: string) => {
        const payload: VerifyOtpRequest = {email,otp};

        if (role === "CUSTOMER") {
            await verifyCustomerOtp(payload);
        } else {
            await verifyEnterpriseOtp(payload);
        }

        toast.success("Email verified successfully!")
        navigate("/login", { replace: true })
    };

    const handleResendOtp = async () => {
        try {
            const response = await resendEmailOtp({ email, purpose: "REGISTRATION" });
            toast.success(response.message);
        } catch (error) {
            handleApiError(error, "Failed to resend OTP. Please try again.");
        }
    }

    return (
        <main className="min-h-screen w-full">
            <OtpVerificationForm
                email={email}
                title="Verify Your Email"
                countdownKey={`${OTP_COUNTDOWN_KEYS.REGISTRATION}:${email.trim().toLowerCase()}`}
                onSubmit={onSubmit}
                onResend={handleResendOtp}
            />
        </main>
    );
}

export default OtpVerificationPage;