import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark,#0E2238)] text-white pt-16 pb-12 px-0 border-t border-[#071524]">
      <div className="w-full max-w-[var(--container-wide,1680px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12 border-b border-slate-800">
          <div className="max-w-[24rem]">
            <Link to="/" className="inline-flex items-center no-underline" aria-label="Dealio home">
              <img
                src="/dealio-logo-white.png"
                alt="Dealio"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              A simple platform for connecting customers, enterprises, proposals, and deals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
            <a
              href="#how-it-works"
              className="text-slate-300 no-underline transition-colors duration-200 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#for-customers"
              className="text-slate-300 no-underline transition-colors duration-200 hover:text-white"
            >
              For Customers
            </a>
            <a
              href="#for-enterprises"
              className="text-slate-300 no-underline transition-colors duration-200 hover:text-white"
            >
              For Enterprises
            </a>
            <a
              href="mailto:support@dealio.com"
              className="text-slate-300 no-underline transition-colors duration-200 hover:text-white"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Dealio. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-slate-400 no-underline transition-colors duration-200 hover:text-slate-300"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-slate-400 no-underline transition-colors duration-200 hover:text-slate-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
