interface VerificationState {
    email: string;
    role: "ENTERPRISE_MANAGER" | "CUSTOMER";
}

interface ResetOtpLocationState {
    email: string;
}

export function isRegistrationVerificationState( state: unknown,): state is VerificationState {

    if (typeof state !== "object" || state === null) {
        return false;
    }

    if (!("email" in state) || !("role" in state)) {
        return false;
    }

    return (
        typeof state.email === "string" && state.email.trim().length > 0 &&(state.role === "CUSTOMER" || state.role === "ENTERPRISE_MANAGER")
    );
}

export function isPassswordResetOtpState(state: unknown): state is ResetOtpLocationState {
    if (typeof state !== "object" || state === null || !("email" in state)) {
        return false;
    }

    return typeof state.email === "string" && state.email.trim().length > 0;
}