export function CustomerReceivedProposalDetailsSkeleton() {
  return (
    <div className="w-full space-y-6 pb-16 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-44 bg-slate-200/80 rounded-lg" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-200 shrink-0 mt-0.5" />
            <div className="space-y-2 min-w-0">
              <div className="h-3 w-36 bg-slate-200 rounded" />
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <div className="h-6 w-48 sm:w-60 bg-slate-200 rounded-lg" />
                <div className="h-5 w-20 bg-slate-100 rounded-md" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <div className="h-9 w-36 bg-slate-100 rounded-xl" />
            <div className="h-9 w-24 bg-slate-100 rounded-xl" />
            <div className="h-9 w-32 bg-slate-200 rounded-xl" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="h-9 w-36 bg-slate-100 rounded-xl" />
          <div className="h-9 w-32 bg-slate-100 rounded-xl" />
          <div className="h-9 w-36 bg-slate-100 rounded-xl" />
          <div className="h-4 w-36 bg-slate-100 rounded sm:ml-auto shrink-0" />
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-3">
          <div className="h-4 w-52 bg-slate-200 rounded" />
          <div className="h-5 w-40 bg-slate-200 rounded" />
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full bg-slate-100 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
            <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2.5">
            <div className="h-4 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-36 bg-slate-100 rounded" />
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2.5">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-4 w-40 bg-slate-100 rounded" />
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/90 space-y-2.5">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-4 w-40 bg-slate-100 rounded" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-4 sm:p-5 space-y-3">
          <div className="h-4 w-44 bg-slate-200 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default CustomerReceivedProposalDetailsSkeleton;
