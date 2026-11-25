export function EnterpriseAcceptedProposalDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3.5 w-36 bg-slate-100 rounded" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-7 sm:h-8 w-52 sm:w-72 bg-slate-200 rounded-lg" />
              <div className="h-5 w-20 bg-slate-100 rounded-md" />
            </div>
            <div className="h-3.5 w-44 bg-slate-100 rounded" />
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <div className="h-9 w-44 bg-slate-100 rounded-xl" />
            <div className="h-9 w-36 bg-slate-100 rounded-xl" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 w-40 bg-slate-200 rounded" />
          <div className="w-full py-2">
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-3.5 right-3.5 sm:left-4 sm:right-4 h-[3px] bg-slate-200 rounded-full" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="flex justify-between w-full mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[20%] space-y-1">
                  <div className="h-3.5 w-16 sm:w-24 bg-slate-200 rounded" />
                  <div className="h-2.5 w-14 sm:w-20 bg-slate-100 rounded hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-16 rounded-xl bg-slate-100/80 border border-slate-200/70" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="h-5 w-60 bg-slate-200 rounded" />
            <div className="h-3.5 w-72 bg-slate-100 rounded" />
          </div>
          <div className="h-6 w-36 bg-slate-100 rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2.5">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-7 w-24 bg-slate-200 rounded" />
              <div className="h-3 w-32 bg-slate-100 rounded" />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-44 bg-slate-200 rounded" />
            <div className="h-3.5 w-16 bg-slate-200 rounded" />
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full" />
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default EnterpriseAcceptedProposalDetailsSkeleton;
