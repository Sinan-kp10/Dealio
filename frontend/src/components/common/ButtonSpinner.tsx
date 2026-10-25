interface ButtonSpinnerProps {
  size?: "sm" | "md";
  className?: string;
}

export function ButtonSpinner({ size = "sm", className = "" }: ButtonSpinnerProps) {
  const sizeClass = size === "md" ? "w-6 h-6 border-[3px]" : "w-5 h-5 border-2";

  return (
    <div
      className={`inline-block animate-spin rounded-full border-white/25 border-t-white ${sizeClass} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default ButtonSpinner;
