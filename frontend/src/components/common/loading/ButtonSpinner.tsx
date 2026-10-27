interface ButtonSpinnerProps {
  size?: "sm" | "md";
}

export function ButtonSpinner({ size = "sm" }: ButtonSpinnerProps) {
  const sizeClass = size === "md" ? "w-6 h-6 border-[3px]" : "w-5 h-5 border-2";

  return (
    <div
      className={`inline-block animate-spin rounded-full border-white/25 border-t-white ${sizeClass}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default ButtonSpinner;
