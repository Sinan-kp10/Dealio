import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FilePlus, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { getCustomerRecentQuotations } from "../../services/customer/customer-home.service";
import type { CustomerRecentQuotationItem } from "../../types/customer/customer-home.types";
import { LatestActiveQuotationCard } from "../../components/customer/LatestActiveQuotationCard";
import { RecentQuotationCard } from "../../components/customer/RecentQuotationCard";
import { QuotationCardSkeleton } from "../../components/customer/QuotationCardSkeleton";
import { handleApiError } from "../../../../utils/errorHandler";

function CustomerHomePage() {
  const navigate = useNavigate();

  const [recentQuotations, setRecentQuotations] = useState<CustomerRecentQuotationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchRecentQuotations = async () => {
      setLoading(true);
      try {
        const response = await getCustomerRecentQuotations();
        if (!cancelled && response.data) {
          setRecentQuotations(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load recent quotations");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchRecentQuotations();

    return () => {
      cancelled = true;
    };
  }, []);

  const latestQuotation = recentQuotations.length > 0 ? recentQuotations[0] : null;

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      <section className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c2340] via-[#102e52] to-[#0c2340] text-white p-7 sm:p-9 lg:p-11 xl:p-14 shadow-[0_4px_20px_-4px_rgba(12,35,64,0.25)] overflow-hidden">
        <div 
          className="absolute -right-20 -top-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#4D79A8]/20 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -left-20 -bottom-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#69ACCC]/15 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.7rem] font-extrabold text-white tracking-tight leading-[1.15] m-0">
              Get Guaranteed Best Prices
              <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">
                from Verified Enterprises
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-xs sm:text-sm lg:text-[15px] text-slate-200/90 leading-relaxed max-w-xl m-0 font-normal text-pretty">
              Post your requirement in seconds. Verified suppliers compete to deliver competitive proposals, flexible terms, and escrow-protected quotations.
            </p>

            <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/customer/quotations/create")}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#0c2340] bg-[#eef5fc] hover:bg-white border border-[#d2e4f5] rounded-xl shadow-xs transition-all duration-150 cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                <span>Create Quotation Request</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/customer/quotations")}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-xs transition-all duration-150 cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                <span>My Quotation Requests</span>
              </button>
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-14 pt-7 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <ShieldCheck size={16} />
                  <span>Verified</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Compliant enterprises</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <Clock size={16} />
                  <span>Fast Bids</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Quick proposal turnaround</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sky-300 text-xs sm:text-[13px] font-semibold">
                  <CheckCircle2 size={16} />
                  <span>Protected</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">Escrow-safe transactions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-start xl:justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[660px] flex justify-center lg:justify-start xl:justify-center">
              <div 
                className="absolute w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 rounded-full bg-[#69ACCC]/20 blur-3xl pointer-events-none -z-10" 
                aria-hidden="true" 
              />
              
              <img
                src="/customer-hero-image.png"
                alt="Customer Quotations & Requests"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </section>

      {loading ? (
        <div className="space-y-6">
          <div className="w-full h-56 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((key) => (
              <QuotationCardSkeleton key={key} />
            ))}
          </div>
        </div>
      ) : recentQuotations.length === 0 ? (
        /* Empty State Card when customer has no quotations */
        <section className="w-full bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300/80 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#edf4fb] text-[#204066] flex items-center justify-center mb-5 shadow-xs border border-[#d8e7f5]">
            <FilePlus size={26} strokeWidth={1.9} className="text-[#204066]" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight">
            No Quotation Requests Yet
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 sm:mt-2.5 leading-relaxed">
            You have not submitted any quotation requests. Choose a category above or click below to post your requirement and receive competitive bids from verified sellers.
          </p>

          <button
            type="button"
            onClick={() => navigate("/customer/quotations/create")}
            className="mt-6 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#1e3a5f] bg-[#eef5fc] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-xl transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.4} className="text-[#1e3a5f]" />
            <span>Create Your First Quotation Request</span>
          </button>
        </section>
      ) : (
        <div className="space-y-8">
          {/* Section 1: Latest Active Quotation */}
          {latestQuotation && <LatestActiveQuotationCard quotation={latestQuotation} />}

          <section className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0">
                  Recent Quotation Requests
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs sm:text-sm text-slate-500 font-normal">
                  All your quotation requests and submitted requirements
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/customer/quotations")}
                  className="text-xs sm:text-sm font-semibold text-[#2f5581] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {recentQuotations.map((quotation) => (
                <RecentQuotationCard key={quotation.id} quotation={quotation} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default CustomerHomePage;
