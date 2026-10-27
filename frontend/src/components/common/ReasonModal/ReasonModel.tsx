import { useState } from "react";
import { X } from "lucide-react";
import { reasonSchema } from "./reason.schema";
import ButtonSpinner from "../loading/ButtonSpinner";

export interface ReasonModalProps {
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: (reason: string) => Promise<void> | void;
}

function ReasonModal({ title, description, onClose, onConfirm}: ReasonModalProps) {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const result = reasonSchema.safeParse(reason);

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Invalid reason.");
            return;
        }

        setError("");
        try {
            setLoading(true);
            await onConfirm(result.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            <div role="dialog" aria-modal="true" aria-labelledby="reason-modal-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 id="reason-modal-title" className="text-lg font-bold text-[#0F1D2F]">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {description}
                        </p>
                    </div>

                    <button type="button" onClick={onClose} disabled={loading} aria-label="Close modal" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="reason-modal-input" className="mb-2 block text-sm font-semibold text-slate-700">
                        Reason
                    </label>

                    <textarea id="reason-modal-input" value={reason} disabled={loading}
                        onChange={(event) => {
                            setReason(event.target.value);
                            if (error) setError("");
                        }}
                        placeholder="Enter a reason..."
                        rows={4}
                        maxLength={500}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                            error ? "reason-modal-error" : undefined
                        }
                        className={`w-full resize-y rounded-lg border p-3 text-sm text-slate-700 outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-slate-200 focus:border-[#355982] focus:ring-2 focus:ring-[#355982]/20"
                        }`}
                    />

                    <div className="mt-1 flex justify-between gap-3">
                        {error ? (
                            <p
                                id="reason-modal-error"
                                role="alert"
                                className="text-xs text-red-600 font-medium"
                            >
                                {error}
                            </p>
                        ) : (
                            <span />
                        )}

                        <span className="text-xs text-slate-400">
                            {reason.length}/500
                        </span>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} disabled={loading} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancel
                        </button>

                        <button type="submit" disabled={loading} className="min-w-[84px] h-[38px] flex items-center justify-center rounded-lg bg-[#e04f5f] px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed transition-all">
                            {loading ? <ButtonSpinner size="sm" /> : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReasonModal;
