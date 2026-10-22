import { Link } from "react-router-dom";

export function CallToActionSection() {
  return (
    <div id="ready-to-start" className="w-full">
      <section className="bg-white py-24 sm:py-32">
        <div className="w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
          <div className="text-center">
            <h2 className="text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-[var(--text-headline)] tracking-tight m-0">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--text-muted)] mb-0">
              Choose how you want to use Dealio.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[clamp(2rem,3vw,3.5rem)] w-full max-w-[68rem] 2xl:max-w-[76rem] mx-auto">
            <div className="group relative bg-[var(--color-primary)] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-between shadow-md border border-transparent transition-all duration-300 ease-out cursor-default hover:bg-[#28486e] hover:border-[#69accc]/40 hover:-translate-y-2.5 hover:shadow-2xl">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.15em] text-[#b5d3e8] font-bold transition-colors duration-300 group-hover:text-sky-300">
                  CUSTOMER
                </span>
                <h3 className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-bold text-white tracking-tight mb-0">
                  Create a Quotation
                </h3>
                <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-[24rem] mb-0 transition-colors duration-300 group-hover:text-white/95">
                  Create a quotation request and start receiving proposals.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 w-full flex justify-center">
                <Link
                  to="/register/customer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-[var(--color-primary-hover)] font-semibold rounded-lg text-sm no-underline shadow-xs transition-all duration-200 text-center cursor-pointer hover:bg-[#eef4fa] hover:text-[var(--color-primary-active)] hover:scale-105 hover:shadow-md active:scale-[0.98]"
                >
                  Create a Quotation
                </Link>
              </div>
            </div>

            <div className="group relative bg-[var(--color-primary)] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-between shadow-md border border-transparent transition-all duration-300 ease-out cursor-default hover:bg-[#28486e] hover:border-[#69accc]/40 hover:-translate-y-2.5 hover:shadow-2xl">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.15em] text-[#b5d3e8] font-bold transition-colors duration-300 group-hover:text-sky-300">
                  ENTERPRISE
                </span>
                <h3 className="mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] font-bold text-white tracking-tight mb-0">
                  Join as an Enterprise
                </h3>
                <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-[24rem] mb-0 transition-colors duration-300 group-hover:text-white/95">
                  Join Dealio and connect with customer quotation requests.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 w-full flex justify-center">
                <Link
                  to="/register/enterprise"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-[var(--color-primary-hover)] font-semibold rounded-lg text-sm no-underline shadow-xs transition-all duration-200 text-center cursor-pointer hover:bg-[#eef4fa] hover:text-[var(--color-primary-active)] hover:scale-105 hover:shadow-md active:scale-[0.98]"
                >
                  Join as an Enterprise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
