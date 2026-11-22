export function EnterpriseQuotationDetailsSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 animate-pulse">
      <div className="pb-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-7 sm:h-8 w-44 sm:w-64 bg-slate-200 rounded-lg" />
            <div className="h-5 w-20 bg-slate-100 rounded-md" />
          </div>
          <div className="h-3.5 w-28 bg-slate-100 rounded" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="h-8 w-28 bg-slate-100 rounded-xl" />
          <div className="h-8 w-28 bg-slate-200 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="h-8 w-36 bg-slate-100 rounded-xl" />
        <div className="h-8 w-28 bg-slate-100 rounded-xl" />
        <div className="h-8 w-28 bg-slate-100 rounded-xl" />
        <div className="h-8 w-32 bg-slate-100 rounded-xl" />
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 sm:p-6 space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-48 sm:w-60 bg-slate-200 rounded" />
          <div className="h-6 w-28 bg-slate-100 rounded-lg" />
        </div>

        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full bg-slate-100 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
          <div className="h-3.5 w-2/3 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default EnterpriseQuotationDetailsSkeleton;
