export function EnterpriseProfileSkeleton() {
  return (
    <div className="w-full space-y-6 pb-12 animate-pulse" aria-busy="true" aria-label="Loading enterprise profile">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-200 shrink-0" />

          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-5 sm:h-6 w-40 sm:w-52 bg-slate-200 rounded-lg" />
              <div className="h-5 w-20 bg-slate-200 rounded-full" />
            </div>
            <div className="h-3.5 w-44 sm:w-56 bg-slate-200 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-28 sm:w-32 bg-slate-200 rounded-xl" />
          <div className="h-9 w-20 sm:w-24 bg-slate-200 rounded-xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-7">
        <div className="bg-[#f0f4f9] p-1.5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 border border-slate-200/60">
          <div className="h-10 w-full bg-white rounded-xl shadow-xs" />
          <div className="h-10 w-full bg-slate-200/60 rounded-xl" />
          <div className="h-10 w-full bg-slate-200/60 rounded-xl" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 pb-2">
            <div className="h-5 sm:h-6 w-44 bg-slate-200 rounded-lg" />
            <div className="h-8 w-16 bg-slate-200 rounded-xl shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
              <div className="h-3 w-64 max-w-full bg-slate-200/60 rounded mt-1.5" />
            </div>

            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
              <div className="h-3 w-64 max-w-full bg-slate-200/60 rounded mt-1.5" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="h-5 sm:h-6 w-36 bg-slate-200 rounded-lg" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <div className="h-3.5 w-20 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <div className="h-3.5 w-40 bg-slate-200 rounded" />
              <div className="min-h-[46px] w-full bg-slate-100 rounded-xl p-2 flex items-center gap-2 flex-wrap">
                <div className="h-6 w-28 bg-slate-200 rounded-lg" />
                <div className="h-6 w-24 bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="h-5 sm:h-6 w-40 bg-slate-200 rounded-lg" />
          <div className="h-24 w-full bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default EnterpriseProfileSkeleton;

