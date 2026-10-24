interface VerificationState {
    email: string;
    role: "ENTERPRISE_MANAGER" | "CUSTOMER";
}

export function isVerificationState( state: unknown,): state is VerificationState {

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