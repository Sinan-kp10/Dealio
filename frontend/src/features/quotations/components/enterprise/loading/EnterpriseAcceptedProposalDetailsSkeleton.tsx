export function EnterpriseAcceptedProposalDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="h-4 w-36 bg-slate-100 rounded" />
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="h-7 sm:h-8 w-52 sm:w-72 bg-slate-200 rounded-lg" />
              <div className="h-6 w-20 bg-slate-100 rounded-md" />
            </div>
            <div className="pt-0.5">
              <div className="h-4 w-48 bg-slate-100 rounded" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
            <div className="h-[34px] w-44 bg-slate-100 rounded-xl" />
            <div className="h-[34px] w-36 bg-slate-100 rounded-xl" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/80 flex items-start gap-3">
          <div className="w-[18px] h-[18px] rounded-full bg-slate-200 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 sm:h-5 w-56 sm:w-72 bg-slate-200 rounded" />
            <div className="h-4 w-full sm:w-3/4 bg-slate-100 rounded" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 sm:h-5 w-40 bg-slate-200 rounded" />
          <div className="w-full py-2">
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-3.5 right-3.5 sm:left-4 sm:right-4 h-[3px] bg-slate-200 rounded-full" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative z-10 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="flex justify-between w-full mt-3">
              {[1, 2, 3, 4].map((i) => {
                const isFirst = i === 1;
                const isLast = i === 4;
                const alignClass = isFirst ? "items-start" : isLast ? "items-end" : "items-center";
                const widthClass = isFirst || isLast ? "w-[22%] md:w-[18%]" : "w-[28%] md:w-[32%]";

                return (
                  <div key={i} className={`${widthClass} flex flex-col ${alignClass} space-y-1`}>
                    <div className="h-3.5 md:h-4 w-14 sm:w-24 bg-slate-200 rounded" />
                    <div className="h-3.5 w-14 sm:w-24 bg-slate-100 rounded hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="h-6 sm:h-7 w-60 bg-slate-200 rounded" />
            <div className="h-4 w-72 bg-slate-100 rounded" />
          </div>
          <div className="self-start sm:self-center h-6 w-36 bg-slate-100 rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-1.5">
              <div className="h-4 w-28 bg-slate-200 rounded" />
              <div className="h-7 sm:h-8 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-32 bg-slate-100 rounded" />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="h-4 w-44 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-200 rounded" />
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full" />
          <div className="h-4 w-3/4 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default EnterpriseAcceptedProposalDetailsSkeleton;
