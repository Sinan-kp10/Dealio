import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    "aria-label"?: string;
}

export function Select({ value, onChange, options, "aria-label": ariaLabel }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = selectedOption?.label ?? value;

    return (
        <div
            className="relative inline-block text-left"
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsOpen(false);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
            }}
        >
            <div
                className="h-0 overflow-hidden invisible px-3.5 flex flex-col pointer-events-none select-none"
                aria-hidden="true"
            >
                {options.map((opt) => (
                    <span key={opt.value} className="pr-6 text-sm font-medium whitespace-nowrap">
                        {opt.label}
                    </span>
                ))}
            </div>

            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={ariaLabel}
                aria-expanded={isOpen}
                className="w-full h-10 px-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-700 font-medium flex items-center justify-between gap-2.5 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] transition-colors cursor-pointer text-left whitespace-nowrap"
            >
                <span className="truncate">{displayLabel}</span>
                <ChevronDown
                    size={15}
                    className={`text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute left-0 mt-1.5 w-full max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50"
                >
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-3.5 py-2 text-left text-sm font-medium transition-colors cursor-pointer flex items-center justify-between whitespace-nowrap ${
                                    isSelected
                                        ? "bg-[#244673]/10 text-[#244673] font-semibold"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <span className="truncate">{option.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Select;

