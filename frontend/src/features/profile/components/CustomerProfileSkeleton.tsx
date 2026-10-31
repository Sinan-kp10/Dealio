export function CustomerProfileSkeleton() {
  return (
    <div className="w-full space-y-6 pb-12 animate-pulse" aria-busy="true" aria-label="Loading profile">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-200 shrink-0" />

          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-5 sm:h-6 w-36 sm:w-44 bg-slate-200 rounded-lg" />
              <div className="h-5 w-20 bg-slate-200 rounded-full" />
            </div>
            <div className="h-3.5 w-44 sm:w-56 bg-slate-200 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-28 sm:w-32 bg-slate-200 rounded-xl" />
          <div className="h-9 w-24 sm:w-26 bg-slate-200 rounded-xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="h-5 sm:h-6 w-40 sm:w-48 bg-slate-200 rounded-lg" />
            <div className="h-3.5 sm:h-4 w-56 sm:w-72 bg-slate-200 rounded-md" />
          </div>
          <div className="h-9 w-18 sm:w-20 bg-slate-200 rounded-xl shrink-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
          <div className="space-y-1.5">
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
            <div className="h-11 w-full bg-slate-200/70 rounded-xl" />
          </div>

          <div className="space-y-1.5">
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="h-11 w-full bg-slate-200/70 rounded-xl" />
          </div>

          <div className="space-y-1.5">
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
            <div className="h-11 w-full bg-slate-200/70 rounded-xl" />
            <div className="h-3 w-64 max-w-full bg-slate-200/60 rounded-md mt-1.5" />
          </div>

          <div className="space-y-1.5">
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex-1 h-11 bg-slate-200/70 rounded-xl" />
              <div className="h-10 sm:h-11 w-full sm:w-28 bg-slate-200 rounded-xl shrink-0" />
            </div>
            <div className="h-3 w-64 max-w-full bg-slate-200/60 rounded-md mt-1.5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="h-5 sm:h-6 w-36 sm:w-44 bg-slate-200 rounded-lg" />
          <div className="h-3.5 sm:h-4 w-60 sm:w-80 bg-slate-200 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export default CustomerProfileSkeleton;

