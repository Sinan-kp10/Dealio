import { useNavigate } from "react-router-dom";
import { Plus, FilePlus } from "lucide-react";

function CustomerHomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Hero Section Banner */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c2340] via-[#102e52] to-[#0c2340] text-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_-4px_rgba(12,35,64,0.25)] overflow-hidden">
        {/* Subtle decorative background glow */}
        <div 
          className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-snug">
            Get Guaranteed Best Prices from Verified Enterprises
          </h1>

          <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm lg:text-[15px] text-slate-200/90 leading-relaxed max-w-3xl">
            Post your requirement in seconds. Verified suppliers across active categories compete to submit competitive proposals, flexible commercial terms, and escrow-protected transactions.
          </p>

          <div className="mt-5 sm:mt-7 flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("/customer/quotations/create")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#0c2340] bg-[#eef5fc] hover:bg-white border border-[#d2e4f5] rounded-xl shadow-xs transition-all duration-150 cursor-pointer active:scale-[0.98] text-center whitespace-nowrap"
            >
              <span className="hidden min-[420px]:inline">Create Quotation Request</span>
              <span className="min-[420px]:hidden">Create Request</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/customer/quotations")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-xs transition-all duration-150 cursor-pointer active:scale-[0.98] text-center whitespace-nowrap"
            >
              <span className="hidden min-[420px]:inline">My Quotation Requests</span>
              <span className="min-[420px]:hidden">My Requests</span>
            </button>
          </div>
        </div>
      </section>

      {/* Empty State Card */}
      <section className="w-full bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300/80 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all">
        {/* Document Icon Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#edf4fb] text-[#204066] flex items-center justify-center mb-5 shadow-xs border border-[#d8e7f5]">
          <FilePlus size={26} strokeWidth={1.9} className="text-[#204066]" />
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight">
          No Quotation Requests Yet
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 sm:mt-2.5 leading-relaxed">
          You have not submitted any quotation requests. Choose a category above or click below to post your requirement and receive competitive bids from verified sellers.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => navigate("/customer/quotations/create")}
          className="mt-6 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#1e3a5f] bg-[#eef5fc] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-xl transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.4} className="text-[#1e3a5f]" />
          <span>Create Your First Quotation Request</span>
        </button>
      </section>
    </div>
  );
}

export default CustomerHomePage;
