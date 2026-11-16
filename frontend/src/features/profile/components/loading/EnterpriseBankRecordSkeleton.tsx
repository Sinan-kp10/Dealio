export function EnterpriseBankRecordSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading bank details">
      <div className="flex items-center justify-between gap-3 sm:gap-4 pb-2 flex-wrap sm:flex-nowrap">
        <div className="space-y-2">
          <div className="h-5 sm:h-6 w-52 bg-slate-200 rounded-lg" />
          <div className="h-3.5 w-72 sm:w-96 max-w-full bg-slate-200/70 rounded-md" />
        </div>
        <div className="h-9 w-24 bg-slate-200 rounded-xl shrink-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        <div className="space-y-1.5">
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
          <div className="h-11 w-full bg-slate-100 border border-slate-200/60 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
          <div className="h-11 w-full bg-slate-100 border border-slate-200/60 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3.5 w-24 bg-slate-200 rounded" />
          <div className="h-11 w-full bg-slate-100 border border-slate-200/60 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3.5 w-24 bg-slate-200 rounded" />
          <div className="h-11 w-full bg-slate-100 border border-slate-200/60 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3.5 w-28 bg-slate-200 rounded" />
          <div className="h-11 w-full bg-slate-100 border border-slate-200/60 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default EnterpriseBankRecordSkeleton;
