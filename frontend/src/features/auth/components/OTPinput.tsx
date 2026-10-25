import { useRef, useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";

interface OTPinputProps {
    onChange: (value: string) => void;
    hasError?: boolean;
}

const OTP_LENGTH = 6;

export function OtpInput({ onChange, hasError = false }: OTPinputProps) {
    const [digits, setDigits] = useState<string[]>(
        Array(OTP_LENGTH).fill(""),
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const updateDigits = (nextDigits: string[]) => {
        setDigits(nextDigits);
        onChange(nextDigits.join(""));
    };

    const handleChange = (index: number, value: string) => {
        const clean = value.replace(/\D/g, "");

        if (clean.length > 1) {
            const pastedDigits = clean
                .slice(0, OTP_LENGTH - index)
                .split("");

            const nextDigits = [...digits];

            pastedDigits.forEach((digit, offset) => {
                nextDigits[index + offset] = digit;
            });

            updateDigits(nextDigits);

            const nextIndex = Math.min(
                index + pastedDigits.length,
                OTP_LENGTH - 1,
            );

            inputRefs.current[nextIndex]?.focus();
            return;
        }

        const nextDigits = [...digits];
        nextDigits[index] = clean;
        updateDigits(nextDigits);

        if (clean && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace") {
            event.preventDefault();

            const nextDigits = [...digits];

            if (nextDigits[index]) {
                nextDigits[index] = "";
                updateDigits(nextDigits);
            } else if (index > 0) {
                nextDigits[index - 1] = "";
                updateDigits(nextDigits);
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const nextDigits = Array(OTP_LENGTH)
            .fill("")
            .map((_, index) => pasted[index] ?? "");

        updateDigits(nextDigits);
        inputRefs.current[
            Math.min(pasted.length, OTP_LENGTH - 1)
        ]?.focus();
    };

    return (
        <div className="flex items-center justify-between gap-2 sm:gap-2.5">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={OTP_LENGTH}
                    value={digit}
                    onChange={(event) =>
                        handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    onFocus={(event) => event.target.select()}
                    aria-label={`OTP digit ${index + 1}`}
                    aria-invalid={hasError}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold text-[#0f1d2f] bg-white border-[1.5px] rounded-xl sm:rounded-2xl transition-all duration-200 hover:border-slate-300 focus:outline-none ${
                        hasError
                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                            : "border-slate-200 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                    }`}
                />
            ))}
        </div>
    );
}

export default OtpInput;
