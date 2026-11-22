export function EnterpriseQuotationSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 animate-pulse flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2.5">
          <div className="h-5 w-3/5 bg-slate-200 rounded-lg" />
          <div className="h-5 w-16 bg-slate-100 rounded-md shrink-0" />
        </div>
        <div className="h-3.5 w-24 bg-slate-100 rounded-md" />

        <div className="flex items-center gap-2 pt-0.5">
          <div className="h-6 w-20 bg-slate-100 rounded-lg" />
          <div className="h-6 w-20 bg-slate-100 rounded-lg" />
        </div>

        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full bg-slate-100 rounded" />
          <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default EnterpriseQuotationSkeleton;
