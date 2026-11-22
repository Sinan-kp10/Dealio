import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#0c2340] via-[#102e52] to-[#0c2340] mt-[var(--navbar-height,5rem)] flex items-center text-white py-12 sm:py-16 lg:py-20 xl:py-24 lg:min-h-[calc(100vh-var(--navbar-height,5rem))] box-border overflow-hidden">
      <div 
        className="absolute -right-24 -top-24 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-[#4D79A8]/20 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -left-24 -bottom-24 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-[#69ACCC]/15 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.5rem] font-extrabold leading-[1.12] tracking-tight text-white m-0">
              Find What You Need.
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">
                Get the Right Proposal.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mt-5 sm:mt-6 mb-0 font-normal leading-relaxed">
              Create structured quotation requests and connect directly with verified enterprises for the best competitive market deals.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                to="/register/customer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white font-semibold rounded-xl text-sm no-underline text-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span>Create a Quotation</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register/enterprise"
                className="inline-flex items-center justify-center px-7 py-3.5 text-white font-medium bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-xs text-sm no-underline text-center transition-all duration-150 shadow-xs cursor-pointer active:scale-[0.98]"
              >
                Join as an Enterprise
              </Link>
            </div>

            <div className="mt-10 sm:mt-12 pt-7 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <ShieldCheck size={16} />
                  <span>Verified</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Direct enterprise sellers</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <Clock size={16} />
                  <span>Fast Turnaround</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Quick proposal turnaround</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <TrendingUp size={16} />
                  <span>Best Pricing</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Direct competitive rates</span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-none flex justify-center lg:justify-end">
              <div 
                className="absolute w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full bg-[#69ACCC]/20 blur-3xl pointer-events-none -z-10" 
                aria-hidden="true" 
              />
              
              <img
                src="/hero-image.png"
                alt="Dealio Quotation Request and Enterprise Proposal Platform"
                className="w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
