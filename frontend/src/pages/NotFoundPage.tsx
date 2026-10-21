import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[var(--bg-canvas)] text-[var(--text-headline)]">
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="leading-none select-none">
          <h1 className="text-[7.5rem] sm:text-[10rem] md:text-[12.5rem] lg:text-[14rem] font-black text-[var(--color-primary)] tracking-tight drop-shadow-[0_14px_30px_rgba(53,89,130,0.22)] m-0">
            404
          </h1>
        </div>

        <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-[var(--color-dark)] tracking-tight leading-tight">
          The Page Isn't Available
        </h2>

        <p className="mt-2 sm:mt-2.5 text-sm sm:text-base md:text-[16.5px] text-[var(--text-muted)] font-normal leading-relaxed max-w-md">
          Oops! We can't find that page.
        </p>

        <button
          onClick={handleGoBack}
          type="button"
          className="mt-6 sm:mt-7 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] text-[var(--bg-surface)] text-sm sm:text-[15px] font-medium rounded-lg shadow-[0_4px_12px_rgba(53,89,130,0.26)] hover:shadow-[0_6px_18px_rgba(53,89,130,0.34)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
          <span>Go Back</span>
        </button>
      </main>

      <footer className="w-full px-6 sm:px-10 md:px-14 lg:px-16 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-[13.5px] text-[var(--text-muted)]">
        <p className="m-0 text-center sm:text-left">
          &copy; 2026 Dealio. All rights reserved.
        </p>
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/privacy"
            className="text-[var(--text-muted)] hover:text-[var(--color-dark)] transition-colors duration-150"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-[var(--text-muted)] hover:text-[var(--color-dark)] transition-colors duration-150"
          >
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}