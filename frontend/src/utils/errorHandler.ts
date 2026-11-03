import axios from "axios";
import { toast } from "react-toastify";

export function getErrorMessage(error: unknown,fallbackMessage = "Something went wrong. Please try again"): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? fallbackMessage;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return fallbackMessage;
}

export function handleApiError(error: unknown,fallbackMessage?: string): void {
    toast.error(getErrorMessage(error, fallbackMessage));
}
