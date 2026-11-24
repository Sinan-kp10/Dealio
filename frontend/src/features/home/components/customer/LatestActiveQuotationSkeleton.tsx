export function LatestActiveQuotationSkeleton() {
  return (
    <section className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#0e2238] tracking-tight m-0">
          Latest Active Quotation
        </h2>
        <span className="text-xs sm:text-sm text-slate-500 font-normal">
          Tracking your current active quotation request
        </span>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-6 sm:h-7 w-48 sm:w-60 bg-slate-200 rounded-lg" />
            <div className="h-5 sm:h-6 w-20 bg-slate-100 rounded-full" />
          </div>
          <div className="h-3.5 w-40 bg-slate-100 rounded" />
        </div>

        <div className="self-start sm:self-center h-8 sm:h-8.5 w-24 sm:w-26 bg-slate-100 rounded-xl" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-40 bg-slate-200 rounded" />

        <div className="w-full py-2">
          <div className="relative flex items-center justify-between w-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-3.5 right-3.5 sm:left-4 sm:right-4 h-[3px] bg-slate-200 rounded-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200" />
            ))}
          </div>

          <div className="flex justify-between w-full mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-[18%] space-y-1 text-center sm:text-left">
                <div className="h-3.5 w-16 sm:w-20 bg-slate-200 rounded mx-auto sm:mx-0" />
                <div className="h-2.5 w-12 sm:w-14 bg-slate-100 rounded mx-auto sm:mx-0 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default LatestActiveQuotationSkeleton;
