export function CustomerQuotationDetailsSkeleton() {
  return (
    <div className="w-full space-y-4 pb-16 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="py-1">
          <div className="h-5 w-48 bg-slate-200 rounded-md" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-6 sm:h-7 w-48 sm:w-64 bg-slate-200 rounded-lg" />
              <div className="h-5 w-20 bg-slate-100 rounded-full" />
            </div>
            <div className="h-3.5 w-36 bg-slate-100 rounded mt-1.5" />
          </div>

          <div className="hidden sm:block self-center shrink-0 h-7 w-28 bg-slate-100 rounded-xl" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 -mb-5 sm:-mb-6 pt-1">
          <div className="pb-3.5 px-3 sm:px-4">
            <div className="h-5 w-36 bg-slate-200 rounded" />
          </div>
          <div className="pb-3.5 px-3 sm:px-4">
            <div className="h-5 w-36 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="h-[34px] w-36 bg-slate-100 rounded-xl" />
          <div className="h-[34px] w-32 bg-slate-100 rounded-xl" />
          <div className="h-[34px] w-28 bg-slate-100 rounded-xl" />
          <div className="h-[34px] w-32 bg-slate-100 rounded-xl" />
          <div className="h-[34px] w-36 bg-slate-100 rounded-xl" />
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 border-l-[3.5px] border-l-slate-300 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 shrink-0" />
              <div className="h-4 w-44 bg-slate-200 rounded" />
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="h-3.5 w-full bg-slate-100 rounded" />
              <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
            </div>
          </div>

          <div className="hidden sm:block self-center h-7 w-36 bg-slate-100 rounded-lg shrink-0" />
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-200 shrink-0" />
            <div className="h-4 w-28 bg-slate-200 rounded" />
          </div>

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
                  <div className="h-2.5 w-12 sm:w-14 bg-slate-100 rounded mx-auto sm:mx-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerQuotationDetailsSkeleton;
