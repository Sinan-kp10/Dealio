import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs">
      <div className="w-full max-w-[var(--container-wide,1680px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <div className="flex items-center justify-between h-[var(--navbar-height,5rem)]">
          <Link to="/" className="flex items-center no-underline group" aria-label="Dealio home">
            <img
              src="/dealio-logo.png"
              alt="Dealio"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-[clamp(1rem,2vw,2rem)]">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[var(--text-body)] no-underline transition-colors duration-200 hover:text-[var(--color-dark)]"
            >
              How It Works
            </a>
            <a
              href="#for-customers"
              className="text-sm font-medium text-[var(--text-body)] no-underline transition-colors duration-200 hover:text-[var(--color-dark)]"
            >
              For Customers
            </a>
            <a
              href="#for-enterprises"
              className="text-sm font-medium text-[var(--text-body)] no-underline transition-colors duration-200 hover:text-[var(--color-dark)]"
            >
              For Enterprises
            </a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-[var(--text-body)] border border-[var(--color-border)] px-3.5 sm:px-4 py-2 rounded-lg no-underline transition-all duration-200 bg-transparent hover:text-[var(--color-dark)] hover:border-slate-300 hover:bg-slate-50"
            >
              Login
            </Link>
            <a
              href="#ready-to-start"
              className="text-sm font-medium text-white bg-[var(--color-primary)] px-4 sm:px-5 py-2.5 rounded-lg no-underline transition-all duration-200 shadow-xs hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
