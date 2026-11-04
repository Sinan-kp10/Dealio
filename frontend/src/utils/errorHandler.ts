import axios from "axios";
import { toast } from "react-toastify";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

export function getErrorMessage( error: unknown, fallbackMessage = "Something went wrong. Please try again"): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? fallbackMessage;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return fallbackMessage;
}

export function handleApiError( error: unknown, fallbackMessage?: string): void {
    toast.error(getErrorMessage(error, fallbackMessage));
}

export function handleFormError<T extends FieldValues>(error: unknown,setError: UseFormSetError<T>,fallbackMessage?: string): void {
    if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as {
            field?: string;
            message?: string;
        };

        if (data.field) {
            setError(data.field as Path<T>, {
                type: "server",
                message: data.message ?? fallbackMessage ?? "Invalid value",
            });
            return;
        }
    }

    handleApiError(error, fallbackMessage);
}
