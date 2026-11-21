export function QuotationCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 animate-pulse">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="h-5 bg-slate-200 rounded-md w-1/2" />
          <div className="h-5 bg-slate-100 rounded-md w-16" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 bg-slate-100 rounded w-full" />
          <div className="h-3.5 bg-slate-100 rounded w-4/5" />
        </div>
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-16" />
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100">
        <div className="h-9 bg-slate-100 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default QuotationCardSkeleton;
