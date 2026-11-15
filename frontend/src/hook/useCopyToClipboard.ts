import { useState } from "react";
import { toast } from "react-toastify";

export function useCopyToClipboard(timeout = 2000) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (text: string | null | undefined, field: string) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), timeout);
        } catch {
            toast.error("Failed to copy to clipboard");
        }
    };

    return { copiedField, copyToClipboard };
}

export default useCopyToClipboard;
