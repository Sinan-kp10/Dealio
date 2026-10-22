import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="w-full bg-[var(--color-dark)] mt-[var(--navbar-height,5rem)] flex flex-col justify-center items-center text-center text-white py-16 px-4 sm:py-20 sm:px-6 lg:min-h-[calc(100vh-var(--navbar-height,5rem))] lg:py-16 lg:px-8 box-border">
      <div className="w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.15] tracking-tight text-white m-0 max-w-[68rem] mx-auto">
          Find What You Need.
          <br />
          Get the Right Proposal.
        </h1>

        <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate-300 max-w-[50rem] mx-auto mt-6 mb-0 font-normal leading-relaxed">
          Create a quotation request and connect with relevant enterprises
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register/customer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[var(--color-secondary)] text-white font-medium rounded-lg text-sm no-underline text-center transition-all duration-200 shadow-xs hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-primary)]"
          >
            Create a Quotation
          </Link>
          <Link
            to="/register/enterprise"
            className="w-full sm:w-auto px-7 py-3.5 bg-[var(--color-dark)] border border-[#294668] text-white font-medium rounded-lg text-sm no-underline text-center transition-all duration-200 hover:bg-[#162e49] hover:border-slate-400"
          >
            Join as an Enterprise
          </Link>
        </div>
      </div>
    </section>
  );
}
